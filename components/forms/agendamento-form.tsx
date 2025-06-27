'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Cliente {
  id: string
  nome: string
}

interface Servico {
  id: string
  nome: string
  preco: number
  duracaoMinutos: number
}

interface Profissional {
  id: string
  nome: string
}

export function AgendamentoForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  
  const [formData, setFormData] = useState({
    clienteId: '',
    dataHora: '',
    servicoId: '',
    profissionalId: '',
    formaPagamento: '',
    observacoes: ''
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/clientes').then(r => r.json()),
      fetch('/api/servicos').then(r => r.json()),
      fetch('/api/profissionais').then(r => r.json())
    ]).then(([clientesData, servicosData, profissionaisData]) => {
      setClientes(clientesData)
      setServicos(servicosData)
      setProfissionais(profissionaisData)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const servico = servicos.find(s => s.id === formData.servicoId)
    if (!servico) return

    const agendamentoData = {
      clienteId: formData.clienteId,
      dataHora: formData.dataHora,
      formaPagamento: formData.formaPagamento,
      observacoes: formData.observacoes,
      valorTotal: servico.preco,
      duracaoTotal: servico.duracaoMinutos,
      itens: [{
        servicoId: formData.servicoId,
        profissionalId: formData.profissionalId,
        preco: servico.preco,
        duracao: servico.duracaoMinutos
      }]
    }

    try {
      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendamentoData)
      })

      if (response.ok) {
        setFormData({
          clienteId: '',
          dataHora: '',
          servicoId: '',
          profissionalId: '',
          formaPagamento: '',
          observacoes: ''
        })
        onSuccess?.()
      }
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Agendamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clienteId">Cliente *</Label>
            <select
              id="clienteId"
              value={formData.clienteId}
              onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="dataHora">Data e Hora *</Label>
            <Input
              id="dataHora"
              type="datetime-local"
              value={formData.dataHora}
              onChange={(e) => setFormData({ ...formData, dataHora: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="servicoId">Serviço *</Label>
            <select
              id="servicoId"
              value={formData.servicoId}
              onChange={(e) => setFormData({ ...formData, servicoId: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Selecione um serviço</option>
              {servicos.map(servico => (
                <option key={servico.id} value={servico.id}>
                  {servico.nome} - R$ {servico.preco.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="profissionalId">Profissional *</Label>
            <select
              id="profissionalId"
              value={formData.profissionalId}
              onChange={(e) => setFormData({ ...formData, profissionalId: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Selecione um profissional</option>
              {profissionais.map(profissional => (
                <option key={profissional.id} value={profissional.id}>{profissional.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
            <Input
              id="formaPagamento"
              value={formData.formaPagamento}
              onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
              placeholder="Dinheiro, Cartão, PIX..."
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Input
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Salvando...' : 'Criar Agendamento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}