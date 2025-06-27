import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { ativo: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(clientes)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ativo } = await request.json()
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { ativo }
    })
    return NextResponse.json(cliente)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const cliente = await prisma.cliente.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        dataNasc: data.dataNasc ? new Date(data.dataNasc) : null,
        observacoes: data.observacoes
      }
    })
    return NextResponse.json(cliente)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 })
  }
}