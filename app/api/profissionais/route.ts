import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const profissionais = await prisma.profissional.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' }
    })
    return NextResponse.json(profissionais)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar profissionais' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const profissional = await prisma.profissional.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        cpfCnpj: data.cpfCnpj,
        chavePix: data.chavePix,
        especialidades: data.especialidades
      }
    })
    return NextResponse.json(profissional)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar profissional' }, { status: 500 })
  }
}