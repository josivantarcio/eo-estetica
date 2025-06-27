'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Pagamento {
  id: string
  periodo: string
  valorTotal: number
  status: string
  profissional: { nome: string }
  createdAt: string
}

interface Profissional {
  id: string
  nome: string
}

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    profissionalId: '',
    dataInicio: '',
    dataFim: ''
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/pagamentos').then(r => r.json()),
      fetch('/api/profissionais').then(r => r.json())
    ]).then(([pagamentosData, profissionaisData]) => {
      setPagamentos(pagamentosData)
      setProfissionais(profissionaisData)
      setLoading(false)
    })
  }, [])

  const gerarPagamento = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/pagamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        const novoPagamento = await response.json()
        setPagamentos([novoPagamento, ...pagamentos])
        setShowForm(false)
        setFormData({ profissionalId: '', dataInicio: '', dataFim: '' })
      }
    } catch (error) {
      console.error('Erro ao gerar pagamento:', error)
    }
  }

  const marcarComoPago = async (id: string) => {
    try {
      await fetch(`/api/pagamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PAGO' })
      })
      const response = await fetch('/api/pagamentos')
      const data = await response.json()
      setPagamentos(data)
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">💰 Pagamentos</h1>
          <p className="text-muted-foreground">Controle de comissões</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Gerar Pagamento'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gerar Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={gerarPagamento} className="grid grid-cols-3 gap-4">
              <div>
                <Label>Profissional</Label>
                <select
                  value={formData.profissionalId}
                  onChange={(e) => setFormData({ ...formData, profissionalId: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione</option>
                  {profissionais.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Data Início</Label>
                <Input
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Data Fim</Label>
                <Input
                  type="date"
                  value={formData.dataFim}
                  onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-3">
                <Button type="submit" className="w-full">Gerar Pagamento</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pagamentos ({pagamentos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : pagamentos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum pagamento gerado ainda
            </div>
          ) : (
            <div className="space-y-4">
              {pagamentos.map((pagamento) => (
                <div key={pagamento.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{pagamento.profissional.nome}</h3>
                      <p className="text-sm text-muted-foreground">Período: {pagamento.periodo}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(pagamento.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-lg font-bold text-green-600">
                        R$ {pagamento.valorTotal.toFixed(2)}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          pagamento.status === 'PAGO' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pagamento.status}
                        </span>
                        {pagamento.status !== 'PAGO' && (
                          <button
                            onClick={() => marcarComoPago(pagamento.id)}
                            className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                          >
                            Marcar Pago
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}