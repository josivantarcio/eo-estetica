import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const servicos = await prisma.servico.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' }
    })
    return NextResponse.json(servicos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar serviços' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const servico = await prisma.servico.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: parseFloat(data.preco),
        duracaoMinutos: parseInt(data.duracaoMinutos),
        categoria: data.categoria,
        tipoComissao: data.tipoComissao,
        valorComissao: parseFloat(data.valorComissao)
      }
    })
    return NextResponse.json(servico)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}