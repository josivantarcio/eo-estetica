'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgendamentoForm } from '@/components/forms/agendamento-form'

interface Agendamento {
  id: string
  dataHora: string
  status: string
  valorTotal: number
  cliente: { nome: string }
  itens: Array<{
    servico: { nome: string }
    profissional: { nome: string }
  }>
}

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('TODOS')
  const [viewMode, setViewMode] = useState<'lista' | 'calendario'>('lista')
  const [pesquisa, setPesquisa] = useState('')
  const [editandoAgendamento, setEditandoAgendamento] = useState<Agendamento | null>(null)

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch('/api/agendamentos')
      const data = await response.json()
      setAgendamentos(data)
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgendamentos()
  }, [])

  const handleSuccess = () => {
    setShowForm(false)
    fetchAgendamentos()
  }

  const marcarComoConcluido = async (id: string) => {
    try {
      await fetch(`/api/agendamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CONCLUIDO' })
      })
      fetchAgendamentos()
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
    }
  }

  const agendamentosFiltrados = agendamentos.filter(ag => {
    const matchStatus = filtroStatus === 'TODOS' || ag.status === filtroStatus
    const matchPesquisa = !pesquisa || 
      ag.cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      ag.itens.some(item => item.servico.nome.toLowerCase().includes(pesquisa.toLowerCase())) ||
      new Date(ag.dataHora).toLocaleDateString('pt-BR').includes(pesquisa)
    return matchStatus && matchPesquisa
  })

  const getStatusColor = (status: string) => {
    const colors = {
      'AGENDADO': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md',
      'CONFIRMADO': 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md',
      'EM_ANDAMENTO': 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md',
      'CONCLUIDO': 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-md',
      'CANCELADO': 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Agendamentos
            </h1>
            <p className="text-gray-600 mt-2">Gestão completa de agendamentos</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setViewMode(viewMode === 'lista' ? 'calendario' : 'lista')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {viewMode === 'lista' ? '📅 Calendário' : '📋 Lista'}
            </Button>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg w-full sm:w-auto"
            >
              {showForm ? 'Cancelar' : '+ Novo Agendamento'}
            </Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Pesquisar por nome, serviço ou data..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="flex-1"
          />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="TODOS">Todos os Status</option>
            <option value="AGENDADO">Agendado</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        {showForm && (
          <div className="mb-8">
            <AgendamentoForm onSuccess={handleSuccess} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Lista de Agendamentos ({agendamentos.length})</CardTitle>
            <CardDescription>Todos os agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Carregando...
              </div>
            ) : agendamentos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum agendamento cadastrado ainda
              </div>
            ) : (
              viewMode === 'lista' ? (
                <div className="space-y-4">
                  {agendamentosFiltrados.map((agendamento) => (
                    <div key={agendamento.id} className={`rounded-xl p-6 shadow-md hover:shadow-lg transition-all border ${
                      agendamento.status === 'CONCLUIDO' 
                        ? 'bg-gray-100 border-gray-300 opacity-60' 
                        : 'bg-white border-gray-100'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {agendamento.cliente.nome.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{agendamento.cliente.nome}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-blue-600">🕰️</span>
                              <p className="text-sm text-gray-600">
                                {new Date(agendamento.dataHora).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(agendamento.status)}`}>
                            {agendamento.status.replace('_', ' ')}
                          </span>
                          <div className="text-right space-y-2">
                            <div className="text-xl font-bold text-green-600">
                              R$ {agendamento.valorTotal.toFixed(2)}
                            </div>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => setEditandoAgendamento(agendamento)}
                                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                              >
                                Editar
                              </button>
                              {agendamento.status !== 'CONCLUIDO' ? (
                                <button
                                  onClick={() => marcarComoConcluido(agendamento.id)}
                                  className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                                >
                                  Pagar
                                </button>
                              ) : (
                                <div className="text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded">
                                  Pago!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        {agendamento.itens.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-purple-600">💼</span>
                              <span className="font-medium text-gray-700">{item.servico.nome}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-orange-600">👨‍⚕️</span>
                              <span className="text-sm text-gray-600">{item.profissional.nome}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                    <div key={dia} className="p-3 text-center font-semibold bg-gray-100 rounded">
                      {dia}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const hoje = new Date()
                    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
                    const diaSemana = primeiroDia.getDay()
                    const dia = i - diaSemana + 1
                    const dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), dia)
                    
                    const agendamentosDia = agendamentosFiltrados.filter(ag => {
                      const dataAg = new Date(ag.dataHora)
                      return dataAg.toDateString() === dataAtual.toDateString()
                    }).length
                    
                    return (
                      <div key={i} className="min-h-[100px] p-2 border rounded hover:bg-gray-50 transition-colors">
                        <div className="text-sm font-medium mb-2">
                          {dia > 0 && dia <= new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate() ? dia : ''}
                        </div>
                        {agendamentosDia > 0 && (
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full text-center">
                            {agendamentosDia} agend.
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}