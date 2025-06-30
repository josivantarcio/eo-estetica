'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Relatorios() {
  const [loading, setLoading] = useState(false)
  const [relatorio, setRelatorio] = useState<any>(null)
  
  // Pré-preencher com primeiro e último dia do mês atual
  const hoje = new Date()
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
  
  const [filtros, setFiltros] = useState({
    tipo: 'agendamentos',
    dataInicio: primeiroDia.toISOString().split('T')[0],
    dataFim: ultimoDia.toISOString().split('T')[0]
  })

  const gerarRelatorio = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        tipo: filtros.tipo,
        ...(filtros.dataInicio && { dataInicio: filtros.dataInicio }),
        ...(filtros.dataFim && { dataFim: filtros.dataFim })
      })

      const response = await fetch(`/api/relatorios?${params}`)
      const data = await response.json()
      setRelatorio(data)
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">📊 Relatórios</h1>
        <p className="text-muted-foreground">Análises e métricas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tipo de Relatório</Label>
              <select
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="agendamentos">Agendamentos</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>
            
            <div>
              <Label>Data Início</Label>
              <Input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              />
            </div>
            
            <div>
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              />
            </div>
            
            <Button onClick={gerarRelatorio} disabled={loading} className="w-full">
              {loading ? 'Gerando...' : 'Gerar Relatório'}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {!relatorio ? (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">
                  Selecione os filtros e clique em "Gerar Relatório"
                </p>
              </CardContent>
            </Card>
          ) : filtros.tipo === 'agendamentos' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{relatorio.stats?.total || 0}</div>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">{relatorio.stats?.concluidos || 0}</div>
                    <p className="text-sm text-muted-foreground">Concluídos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">{relatorio.stats?.cancelados || 0}</div>
                    <p className="text-sm text-muted-foreground">Cancelados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {(relatorio.stats?.receita || 0).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Receita</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(relatorio.agendamentos || []).map((agendamento: any) => (
                      <div key={agendamento.id} className="border rounded p-3">
                        <div className="flex justify-between">
                          <span className="font-medium">{agendamento.cliente.nome}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(agendamento.dataHora).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Status: {agendamento.status} | Valor: R$ {agendamento.valorTotal.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {(relatorio.receitaTotal || 0).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Receita Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      R$ {(relatorio.ticketMedio || 0).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Ticket Médio</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{relatorio.totalAgendamentos || 0}</div>
                    <p className="text-sm text-muted-foreground">Agendamentos</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Serviços Mais Vendidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(relatorio.servicosMaisVendidos || {}).map(([servico, quantidade]: [string, any]) => (
                      <div key={servico} className="flex justify-between border-b pb-2">
                        <span>{servico}</span>
                        <span className="font-medium">{quantidade} vendas</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}