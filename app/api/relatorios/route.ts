import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')
    const dataInicio = searchParams.get('dataInicio')
    const dataFim = searchParams.get('dataFim')

    const whereClause = {
      ...(dataInicio && dataFim && {
        dataHora: {
          gte: new Date(dataInicio),
          lte: new Date(dataFim)
        }
      })
    }

    if (tipo === 'agendamentos') {
      const agendamentos = await prisma.agendamento.findMany({
        where: whereClause,
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

      const stats = {
        total: agendamentos.length,
        concluidos: agendamentos.filter(a => a.status === 'CONCLUIDO').length,
        cancelados: agendamentos.filter(a => a.status === 'CANCELADO').length,
        receita: agendamentos
          .filter(a => a.status === 'CONCLUIDO')
          .reduce((sum, a) => sum + a.valorTotal, 0)
      }

      return NextResponse.json({ agendamentos, stats })
    }

    if (tipo === 'financeiro') {
      const agendamentos = await prisma.agendamento.findMany({
        where: {
          ...whereClause,
          status: 'CONCLUIDO'
        },
        include: {
          itens: {
            include: {
              servico: true
            }
          }
        }
      })

      const receitaTotal = agendamentos.reduce((sum, a) => sum + a.valorTotal, 0)
      const ticketMedio = agendamentos.length > 0 ? receitaTotal / agendamentos.length : 0
      
      const servicosMaisVendidos = agendamentos
        .flatMap(a => a.itens)
        .reduce((acc: any, item) => {
          const nome = item.servico.nome
          acc[nome] = (acc[nome] || 0) + 1
          return acc
        }, {})

      return NextResponse.json({
        receitaTotal,
        ticketMedio,
        totalAgendamentos: agendamentos.length,
        servicosMaisVendidos
      })
    }

    return NextResponse.json({ error: 'Tipo de relatório inválido' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar relatório' }, { status: 500 })
  }
}