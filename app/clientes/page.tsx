'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClienteForm } from '@/components/forms/cliente-form'

interface Cliente {
  id: string
  nome: string
  telefone: string
  email?: string
  dataNasc?: string
  observacoes?: string
  ativo: boolean
  createdAt: string
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('TODOS')
  const [pesquisa, setPesquisa] = useState('')
  const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null)

  const fetchClientes = async () => {
    try {
      const response = await fetch('/api/clientes')
      const data = await response.json()
      setClientes(data)
      setClientesFiltrados(data)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtrarClientes = () => {
    let resultado = clientes
    
    if (filtroStatus !== 'TODOS') {
      resultado = resultado.filter(c => 
        filtroStatus === 'ATIVO' ? c.ativo !== false : c.ativo === false
      )
    }
    
    if (pesquisa) {
      resultado = resultado.filter(c => 
        c.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        c.telefone.includes(pesquisa)
      )
    }
    
    setClientesFiltrados(resultado)
  }

  useEffect(() => {
    filtrarClientes()
  }, [filtroStatus, pesquisa, clientes])

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleSuccess = () => {
    setShowForm(false)
    fetchClientes()
  }

  const toggleCliente = async (id: string, ativo: boolean) => {
    try {
      await fetch('/api/clientes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ativo })
      })
      fetchClientes()
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Clientes
            </h1>
            <p className="text-gray-600 mt-2">Gestão completa de clientes</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg w-full sm:w-auto"
          >
            {showForm ? 'Cancelar' : '+ Novo Cliente'}
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Pesquisar por nome ou telefone..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="flex-1"
          />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="TODOS">Todos</option>
            <option value="ATIVO">Ativos</option>
            <option value="INATIVO">Inativos</option>
          </select>
        </div>

        {showForm && (
          <div className="mb-8">
            <ClienteForm onSuccess={handleSuccess} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes ({clientesFiltrados.length})</CardTitle>
            <CardDescription>Todos os clientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Carregando...
              </div>
            ) : clientesFiltrados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum cliente cadastrado ainda
              </div>
            ) : (
              <div className="space-y-4">
                {clientesFiltrados.map((cliente) => (
                  <div key={cliente.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {cliente.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{cliente.nome}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-blue-600">📞</span>
                            <p className="text-sm text-gray-600">{cliente.telefone}</p>
                          </div>
                          {cliente.email && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-green-600">✉️</span>
                              <p className="text-sm text-gray-600">{cliente.email}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {new Date(cliente.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditandoCliente(cliente)}
                            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => toggleCliente(cliente.id, false)}
                            className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                          >
                            {cliente.ativo === false ? 'Ativar' : 'Desativar'}
                          </button>
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
    </div>
  )
}