'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Configuracao {
  id: string
  nomeEmpresa: string
  endereco?: string
  telefone?: string
  email?: string
  instagram?: string
  corPrimaria: string
  corSecundaria: string
}

export default function Configuracoes() {
  const [config, setConfig] = useState<Configuracao>({
    id: '',
    nomeEmpresa: '',
    endereco: '',
    telefone: '',
    email: '',
    instagram: '',
    corPrimaria: '#3b82f6',
    corSecundaria: '#64748b'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setConfig({
        id: '1',
        nomeEmpresa: 'Clínica de Estética Bella',
        endereco: 'Rua das Flores, 123 - Centro',
        telefone: '(11) 99999-9999',
        email: 'contato@clinicabella.com',
        instagram: '@clinicabella',
        corPrimaria: '#3b82f6',
        corSecundaria: '#64748b'
      })
      setLoading(false)
    }, 1000)
  }, [])

  const salvarConfiguracoes = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    setTimeout(() => {
      alert('Configurações salvas com sucesso!')
      setSaving(false)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">Carregando configurações...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ⚙️ Configurações
          </h1>
          <p className="text-gray-600 mt-2">Personalização da empresa</p>
        </div>

        <form onSubmit={salvarConfiguracoes}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                  <Input
                    id="nomeEmpresa"
                    value={config.nomeEmpresa}
                    onChange={(e) => setConfig({ ...config, nomeEmpresa: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={config.endereco}
                    onChange={(e) => setConfig({ ...config, endereco: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={config.telefone}
                    onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={config.instagram}
                    onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                    placeholder="@suaempresa"
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo">Logo da Empresa</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG até 2MB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalização Visual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="corPrimaria">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="corPrimaria"
                      type="color"
                      value={config.corPrimaria}
                      onChange={(e) => setConfig({ ...config, corPrimaria: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.corPrimaria}
                      onChange={(e) => setConfig({ ...config, corPrimaria: e.target.value })}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="corSecundaria">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="corSecundaria"
                      type="color"
                      value={config.corSecundaria}
                      onChange={(e) => setConfig({ ...config, corSecundaria: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.corSecundaria}
                      onChange={(e) => setConfig({ ...config, corSecundaria: e.target.value })}
                      placeholder="#64748b"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Label>Preview das Cores</Label>
                  <div className="mt-2 space-y-2">
                    <div 
                      className="h-12 rounded flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: config.corPrimaria }}
                    >
                      Cor Primária
                    </div>
                    <div 
                      className="h-12 rounded flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: config.corSecundaria }}
                    >
                      Cor Secundária
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="whatsappToken">Token WhatsApp API</Label>
                  <Input
                    id="whatsappToken"
                    type="password"
                    placeholder="Token da API do WhatsApp"
                  />
                  <p className="text-xs text-gray-500 mt-1">Para integração com IA</p>
                </div>
                
                <div>
                  <Label htmlFor="whatsappPhone">Número WhatsApp</Label>
                  <Input
                    id="whatsappPhone"
                    placeholder="5511999999999"
                  />
                  <p className="text-xs text-gray-500 mt-1">Número com código do país</p>
                </div>
                
                <div>
                  <Label htmlFor="telegramToken">Token Telegram Bot</Label>
                  <Input
                    id="telegramToken"
                    type="password"
                    placeholder="Token do Bot Telegram"
                  />
                  <p className="text-xs text-gray-500 mt-1">Para integração com Telegram</p>
                </div>
                
                <div>
                  <Label htmlFor="telegramChatId">Chat ID Telegram</Label>
                  <Input
                    id="telegramChatId"
                    placeholder="ID do chat ou grupo"
                  />
                  <p className="text-xs text-gray-500 mt-1">ID do chat para notificações</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Usuários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="userLogin">Login do Usuário</Label>
                  <Input
                    id="userLogin"
                    placeholder="usuario123"
                  />
                </div>
                
                <div>
                  <Label htmlFor="userPassword">Senha</Label>
                  <Input
                    id="userPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <Label htmlFor="userName">Nome Completo</Label>
                  <Input
                    id="userName"
                    placeholder="João Silva"
                  />
                </div>
                
                <div>
                  <Label htmlFor="userRole">Nível de Acesso</Label>
                  <select
                    id="userRole"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="USER">Usuário</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Cadastrar Usuário
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Usuários Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { login: 'admin', nome: 'Administrador', role: 'ADMIN' },
                  { login: 'funcionario1', nome: 'Maria Silva', role: 'USER' },
                  { login: 'funcionario2', nome: 'João Santos', role: 'USER' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-gray-500">@{user.login}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'ADMIN' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                      <button className="text-xs text-red-600 hover:text-red-800">
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo das Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Empresa:</strong> {config.nomeEmpresa}
                </div>
                <div>
                  <strong>Telefone:</strong> {config.telefone || 'Não informado'}
                </div>
                <div>
                  <strong>Email:</strong> {config.email || 'Não informado'}
                </div>
                <div>
                  <strong>Instagram:</strong> {config.instagram || 'Não informado'}
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" disabled={saving} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                  {saving ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}