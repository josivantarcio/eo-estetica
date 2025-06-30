'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Stats {
  totalClientes: number
  agendamentosHoje: number
  receitaMensal: number
  totalProfissionais: number
  statusDistribution: {
    agendados: number
    concluidos: number
    cancelados: number
  }
  agendamentosHojeDetalhes: any[]
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalClientes: 0,
    agendamentosHoje: 0,
    receitaMensal: 0,
    totalProfissionais: 0,
    statusDistribution: {
      agendados: 0,
      concluidos: 0,
      cancelados: 0
    },
    agendamentosHojeDetalhes: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientesRes, agendamentosRes, profissionaisRes] = await Promise.all([
          fetch('/api/clientes'),
          fetch('/api/agendamentos'),
          fetch('/api/profissionais')
        ])
        
        const [clientes, agendamentos, profissionais] = await Promise.all([
          clientesRes.json(),
          agendamentosRes.json(),
          profissionaisRes.json()
        ])
        
        // Garantir que são arrays
        const clientesArray = Array.isArray(clientes) ? clientes : []
        const agendamentosArray = Array.isArray(agendamentos) ? agendamentos : []
        const profissionaisArray = Array.isArray(profissionais) ? profissionais : []
        
        const hoje = new Date().toDateString()
        const agendamentosHojeArray = agendamentosArray.filter((a: any) => 
          new Date(a.dataHora).toDateString() === hoje
        )
        
        const receitaMensal = agendamentosArray
          .filter((a: any) => a.status === 'CONCLUIDO')
          .reduce((sum: number, a: any) => sum + (a.valorTotal || 0), 0)
        
        // Calcular distribuição por status
        const totalAgendamentos = agendamentosArray.length
        const agendados = agendamentosArray.filter((a: any) => a.status === 'AGENDADO').length
        const concluidos = agendamentosArray.filter((a: any) => a.status === 'CONCLUIDO').length
        const cancelados = agendamentosArray.filter((a: any) => a.status === 'CANCELADO').length
        
        setStats({
          totalClientes: clientesArray.length,
          agendamentosHoje: agendamentosHojeArray.length,
          receitaMensal,
          totalProfissionais: profissionaisArray.length,
          statusDistribution: {
            agendados: totalAgendamentos > 0 ? Math.round((agendados / totalAgendamentos) * 100) : 0,
            concluidos: totalAgendamentos > 0 ? Math.round((concluidos / totalAgendamentos) * 100) : 0,
            cancelados: totalAgendamentos > 0 ? Math.round((cancelados / totalAgendamentos) * 100) : 0
          },
          agendamentosHojeDetalhes: agendamentosHojeArray
        })
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Clientes</CardTitle>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">👥</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{loading ? '...' : stats.totalClientes}</div>
            <p className="text-sm text-blue-600 mt-1">Clientes cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Agendamentos Hoje</CardTitle>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📅</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">{loading ? '...' : stats.agendamentosHoje}</div>
            <p className="text-sm text-green-600 mt-1">Para hoje</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Receita Mensal</CardTitle>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💰</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">
              {loading ? '...' : `R$ ${stats.receitaMensal.toFixed(2)}`}
            </div>
            <p className="text-sm text-purple-600 mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Profissionais</CardTitle>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">👨‍⚕️</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800">{loading ? '...' : stats.totalProfissionais}</div>
            <p className="text-sm text-orange-600 mt-1">Ativos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/agendamentos">
              <Button className="w-full justify-start" variant="outline">
                📅 Novo Agendamento
              </Button>
            </Link>
            <Link href="/clientes">
              <Button className="w-full justify-start" variant="outline">
                👥 Cadastrar Cliente
              </Button>
            </Link>
            <Link href="/servicos">
              <Button className="w-full justify-start" variant="outline">
                💼 Adicionar Serviço
              </Button>
            </Link>
            <Link href="/profissionais">
              <Button className="w-full justify-start" variant="outline">
                👨‍⚕️ Cadastrar Profissional
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos por Status</CardTitle>
            <CardDescription>Distribuição dos agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Agendados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${stats.statusDistribution.agendados}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{stats.statusDistribution.agendados}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Concluídos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: `${stats.statusDistribution.concluidos}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{stats.statusDistribution.concluidos}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Cancelados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: `${stats.statusDistribution.cancelados}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{stats.statusDistribution.cancelados}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Rápido</CardTitle>
            <CardDescription>Informações importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Total de Agendamentos</span>
                <span className="text-lg font-bold text-blue-600">{loading ? '...' : stats.agendamentosHojeDetalhes.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Receita do Mês</span>
                <span className="text-lg font-bold text-green-600">
                  {loading ? '...' : `R$ ${stats.receitaMensal.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Clientes Ativos</span>
                <span className="text-lg font-bold text-purple-600">{loading ? '...' : stats.totalClientes}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos de Hoje</CardTitle>
            <CardDescription>Clientes e serviços do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Carregando...</div>
              ) : stats.agendamentosHojeDetalhes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum agendamento para hoje
                </div>
              ) : (
                stats.agendamentosHojeDetalhes.map((agendamento: any) => (
                  <div key={agendamento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {agendamento.cliente?.nome?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{agendamento.cliente?.nome || 'Cliente'}</p>
                        <p className="text-xs text-gray-500">
                          {agendamento.itens?.[0]?.servico?.nome || 'Serviço'} - {agendamento.itens?.[0]?.profissional?.nome || 'Profissional'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">
                        {new Date(agendamento.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}