import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        cliente: true,
        itens: {
          include: {
            servico: true,
            profissional: true
          }
        }
      },
      orderBy: { dataHora: 'desc' }
    })
    return NextResponse.json(agendamentos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Verificar conflitos de agenda
    const dataHora = new Date(data.dataHora)
    const conflitos = await prisma.agendamento.findMany({
      where: {
        dataHora,
        status: { not: 'CANCELADO' },
        itens: {
          some: {
            profissionalId: { in: data.itens.map((item: any) => item.profissionalId) }
          }
        }
      }
    })
    
    if (conflitos.length > 0) {
      return NextResponse.json({ 
        error: 'Conflito de agenda: Profissional já possui agendamento neste horário' 
      }, { status: 400 })
    }
    
    const agendamento = await prisma.agendamento.create({
      data: {
        clienteId: data.clienteId,
        dataHora,
        status: data.status || 'AGENDADO',
        formaPagamento: data.formaPagamento,
        observacoes: data.observacoes,
        valorTotal: data.valorTotal,
        duracaoTotal: data.duracaoTotal,
        itens: {
          create: data.itens.map((item: any) => ({
            servicoId: item.servicoId,
            profissionalId: item.profissionalId,
            preco: item.preco,
            duracao: item.duracao
          }))
        }
      },
      include: {
        cliente: true,
        itens: {
          include: {
            servico: true,
            profissional: true
          }
        }
      }
    })
    
    // Enviar notificação de lembrete
    const mensagem = `📅 Agendamento confirmado!\n\nOlá ${agendamento.cliente.nome},\n\nSeu agendamento foi confirmado para:\n📆 ${dataHora.toLocaleDateString('pt-BR')} às ${dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\nServiços: ${agendamento.itens.map(i => i.servico.nome).join(', ')}\n\nAguardamos você! 😊`
    
    // Enviar para WhatsApp e Telegram
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'whatsapp',
          telefone: agendamento.cliente.telefone,
          mensagem,
          agendamento: agendamento.id
        })
      })
    } catch (notificationError) {
      console.error('Erro ao enviar notificação:', notificationError)
    }
    
    return NextResponse.json(agendamento)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 })
  }
}