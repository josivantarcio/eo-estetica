import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { from, body } = await request.json()
    
    // Buscar cliente por telefone
    let cliente = await prisma.cliente.findFirst({
      where: { telefone: from }
    })
    
    const msgLower = body.toLowerCase()
    
    // Se não encontrou cliente e mensagem parece ser nome
    if (!cliente && !msgLower.includes('agendar') && !msgLower.includes('serviço')) {
      // Criar novo cliente
      cliente = await prisma.cliente.create({
        data: {
          nome: body,
          telefone: from,
          criadoViaIA: true,
          observacoes: 'Cliente cadastrado via WhatsApp'
        }
      })
      
      return NextResponse.json({
        message: `Olá ${cliente.nome}! 😊 Cadastro realizado com sucesso!\n\nAgora posso ajudá-lo com:\n• Informações sobre serviços\n• Agendamentos\n• Consulta de horários\n\nO que precisa?`
      })
    }
    
    // Se cliente existe, processar mensagem
    if (cliente) {
      if (msgLower.includes('agendar')) {
        const servicos = await prisma.servico.findMany({
          where: { ativo: true },
          take: 5
        })
        
        const servicosList = servicos.map(s => `• ${s.nome} - R$ ${s.preco.toFixed(2)}`).join('\n')
        
        return NextResponse.json({
          message: `${cliente.nome}, nossos serviços disponíveis:\n\n${servicosList}\n\nQual serviço deseja agendar? E para qual dia?`
        })
      }
      
      if (msgLower.includes('serviço')) {
        const servicos = await prisma.servico.findMany({
          where: { ativo: true }
        })
        
        const servicosList = servicos.map(s => `• ${s.nome} - R$ ${s.preco.toFixed(2)} (${s.duracaoMinutos}min)`).join('\n')
        
        return NextResponse.json({
          message: `📋 Nossos serviços:\n\n${servicosList}\n\nGostaria de agendar algum?`
        })
      }
      
      return NextResponse.json({
        message: `Olá ${cliente.nome}! 👋\n\nComo posso ajudá-lo hoje?\n\n• Digite "serviços" para ver nossa lista\n• Digite "agendar" para fazer um agendamento\n• Digite "horários" para consultar disponibilidade`
      })
    }
    
    // Primeira interação - pedir nome
    return NextResponse.json({
      message: '👋 Olá! Sou a IA da Clínica Bella.\n\nPara começar, qual é o seu nome completo?'
    })
    
  } catch (error) {
    return NextResponse.json({ error: 'Erro no WhatsApp' }, { status: 500 })
  }
}