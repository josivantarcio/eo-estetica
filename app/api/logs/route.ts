import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}
    
    if (userId) where.userId = userId
    if (action) where.action = { contains: action }
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    const logs = await prisma.log.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar logs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, action, details, ip } = await request.json()
    
    const log = await prisma.log.create({
      data: {
        userId,
        action,
        details: details || '',
        ip: ip || request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json(log)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar log' }, { status: 500 })
  }
}