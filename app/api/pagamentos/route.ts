import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pagamentos = await prisma.pagamento.findMany({
      include: {
        profissional: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(pagamentos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pagamentos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { profissionalId, dataInicio, dataFim } = await request.json()
    
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        status: 'CONCLUIDO',
        dataHora: {
          gte: new Date(dataInicio),
          lte: new Date(dataFim)
        },
        itens: {
          some: {
            profissionalId
          }
        }
      },
      include: {
        itens: {
          where: { profissionalId },
          include: { servico: true }
        }
      }
    })

    let valorTotal = 0
    const detalhes = agendamentos.map(ag => {
      const item = ag.itens[0]
      const comissao = item.servico.tipoComissao === 'PERCENTUAL' 
        ? (item.preco * item.servico.valorComissao / 100)
        : item.servico.valorComissao
      valorTotal += comissao
      return {
        agendamentoId: ag.id,
        servico: item.servico.nome,
        valor: item.preco,
        comissao
      }
    })

    const pagamento = await prisma.pagamento.create({
      data: {
        profissionalId,
        periodo: `${dataInicio} a ${dataFim}`,
        valorTotal,
        detalhes: JSON.stringify(detalhes)
      },
      include: {
        profissional: true
      }
    })

    return NextResponse.json(pagamento)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar pagamento' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    const pagamento = await prisma.pagamento.update({
      where: { id },
      data: { status }
    })
    return NextResponse.json(pagamento)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar pagamento' }, { status: 500 })
  }
}