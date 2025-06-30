'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Profissional {
  id: string
  nome: string
  telefone: string
  email?: string
  especialidades?: string
}

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpfCnpj: '',
    chavePix: '',
    especialidades: ''
  })

  const fetchProfissionais = async () => {
    try {
      const response = await fetch('/api/profissionais')
      const data = await response.json()
      
      // Garantir que data seja um array
      const profissionaisArray = Array.isArray(data) ? data : []
      setProfissionais(profissionaisArray)
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error)
      setProfissionais([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfissionais()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/profissionais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({
          nome: '', telefone: '', email: '',
          cpfCnpj: '', chavePix: '', especialidades: ''
        })
        setShowForm(false)
        fetchProfissionais()
      }
    } catch (error) {
      console.error('Erro ao criar profissional:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Profissionais
            </h1>
            <p className="text-gray-600 mt-2">Equipe de profissionais</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg w-full sm:w-auto"
          >
            {showForm ? 'Cancelar' : '+ Novo Profissional'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Novo Profissional</CardTitle>
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
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="chavePix">Chave PIX</Label>
                  <Input
                    id="chavePix"
                    value={formData.chavePix}
                    onChange={(e) => setFormData({ ...formData, chavePix: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="especialidades">Especialidades</Label>
                  <Input
                    id="especialidades"
                    value={formData.especialidades}
                    onChange={(e) => setFormData({ ...formData, especialidades: e.target.value })}
                    placeholder="Ex: Manicure, Pedicure, Massagem"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Button type="submit" className="w-full">Salvar Profissional</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Lista de Profissionais ({profissionais.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : profissionais.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum profissional cadastrado ainda
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profissionais.map((profissional) => (
                  <div key={profissional.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100">
                    <h3 className="font-semibold text-lg">{profissional.nome}</h3>
                    <p className="text-sm text-muted-foreground">{profissional.telefone}</p>
                    {profissional.email && (
                      <p className="text-sm text-muted-foreground">{profissional.email}</p>
                    )}
                    {profissional.especialidades && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-blue-600">
                          {profissional.especialidades}
                        </p>
                      </div>
                    )}
                    <div className="mt-3 text-right">
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