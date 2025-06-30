'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Servico {
  id: string
  nome: string
  preco: number
  duracaoMinutos: number
  categoria?: string
  tipoComissao: string
  valorComissao: number
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracaoMinutos: '',
    categoria: '',
    tipoComissao: 'PERCENTUAL',
    valorComissao: ''
  })

  const fetchServicos = async () => {
    try {
      const response = await fetch('/api/servicos')
      const data = await response.json()
      
      // Garantir que data seja um array
      const servicosArray = Array.isArray(data) ? data : []
      setServicos(servicosArray)
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
      setServicos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServicos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({
          nome: '', descricao: '', preco: '', duracaoMinutos: '',
          categoria: '', tipoComissao: 'PERCENTUAL', valorComissao: ''
        })
        setShowForm(false)
        fetchServicos()
      }
    } catch (error) {
      console.error('Erro ao criar serviço:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Serviços
            </h1>
            <p className="text-gray-600 mt-2">Catálogo de serviços</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg w-full sm:w-auto"
          >
            {showForm ? 'Cancelar' : '+ Novo Serviço'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Novo Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input
                    id="categoria"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="preco">Preço (R$) *</Label>
                  <Input
                    id="preco"
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duracaoMinutos">Duração (min) *</Label>
                  <Input
                    id="duracaoMinutos"
                    type="number"
                    value={formData.duracaoMinutos}
                    onChange={(e) => setFormData({ ...formData, duracaoMinutos: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tipoComissao">Tipo Comissão</Label>
                  <select
                    id="tipoComissao"
                    value={formData.tipoComissao}
                    onChange={(e) => setFormData({ ...formData, tipoComissao: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="PERCENTUAL">Percentual (%)</option>
                    <option value="VALOR_FIXO">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="valorComissao">
                    Comissão {formData.tipoComissao === 'PERCENTUAL' ? '(%)' : '(R$)'} *
                  </Label>
                  <Input
                    id="valorComissao"
                    type="number"
                    step="0.01"
                    value={formData.valorComissao}
                    onChange={(e) => setFormData({ ...formData, valorComissao: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Button type="submit" className="w-full">Salvar Serviço</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Lista de Serviços ({servicos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : servicos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum serviço cadastrado ainda
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicos.map((servico) => (
                  <div key={servico.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100">
                    <h3 className="font-semibold text-lg">{servico.nome}</h3>
                    {servico.categoria && (
                      <p className="text-xs text-muted-foreground mb-2">{servico.categoria}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        R$ {servico.preco.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {servico.duracaoMinutos}min
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">
                        Comissão: {servico.tipoComissao === 'PERCENTUAL' 
                          ? `${servico.valorComissao}%` 
                          : `R$ ${servico.valorComissao.toFixed(2)}`}
                      </div>
                      <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}