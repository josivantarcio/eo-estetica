'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Cliente {
  id: string
  nome: string
  email?: string
  dataNasc?: string
}

export default function Aniversarios() {
  const [aniversariantesHoje, setAniversariantesHoje] = useState<Cliente[]>([])
  const [aniversariantesMes, setAniversariantesMes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    const fetchAniversariantes = async () => {
      try {
        const response = await fetch('/api/clientes')
        const data = await response.json()
        
        // Garantir que data seja um array
        const clientes = Array.isArray(data) ? data : []
        
        const hoje = new Date()
        const mesAtual = hoje.getMonth()
        const diaAtual = hoje.getDate()

        const hoje_list = clientes.filter((cliente: Cliente) => {
          if (!cliente.dataNasc) return false
          const nascimento = new Date(cliente.dataNasc)
          return nascimento.getMonth() === mesAtual && nascimento.getDate() === diaAtual
        })

        const mes_list = clientes.filter((cliente: Cliente) => {
          if (!cliente.dataNasc) return false
          const nascimento = new Date(cliente.dataNasc)
          return nascimento.getMonth() === mesAtual
        })

        setAniversariantesHoje(hoje_list)
        setAniversariantesMes(mes_list)
      } catch (error) {
        console.error('Erro ao buscar aniversariantes:', error)
        setAniversariantesHoje([])
        setAniversariantesMes([])
      } finally {
        setLoading(false)
      }
    }

    fetchAniversariantes()
  }, [])

  const enviarParabens = async (clientes: Cliente[]) => {
    setEnviando(true)
    // Simular envio de emails
    setTimeout(() => {
      alert(`Parabéns enviados para ${clientes.length} cliente(s)!`)
      setEnviando(false)
    }, 2000)
  }

  const calcularIdade = (dataNasc: string) => {
    const hoje = new Date()
    const nascimento = new Date(dataNasc)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    return idade
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🎂 Aniversários</h1>
        <p className="text-muted-foreground">Gestão de aniversários dos clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Aniversariantes de Hoje ({aniversariantesHoje.length})</CardTitle>
            {aniversariantesHoje.length > 0 && (
              <Button 
                size="sm" 
                onClick={() => enviarParabens(aniversariantesHoje)}
                disabled={enviando}
              >
                {enviando ? 'Enviando...' : 'Enviar Parabéns'}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : aniversariantesHoje.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum aniversariante hoje
              </div>
            ) : (
              <div className="space-y-3">
                {aniversariantesHoje.map((cliente) => (
                  <div key={cliente.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{cliente.nome}</h3>
                        {cliente.email && (
                          <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">🎉</div>
                        {cliente.dataNasc && (
                          <p className="text-sm font-medium">
                            {calcularIdade(cliente.dataNasc)} anos
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Aniversariantes do Mês ({aniversariantesMes.length})</CardTitle>
            {aniversariantesMes.length > 0 && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => enviarParabens(aniversariantesMes)}
                disabled={enviando}
              >
                Enviar para Todos
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : aniversariantesMes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum aniversariante este mês
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {aniversariantesMes.map((cliente) => (
                  <div key={cliente.id} className="border rounded p-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-sm">{cliente.nome}</h4>
                        {cliente.email && (
                          <p className="text-xs text-muted-foreground">{cliente.email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {cliente.dataNasc && (
                          <p className="text-xs">
                            {new Date(cliente.dataNasc).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Modelo de Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">
              🎉 <strong>Parabéns pelo seu aniversário!</strong><br/>
              <br/>
              Desejamos um dia repleto de alegria e realizações!<br/>
              <br/>
              Como presente especial, você tem <strong>20% de desconto</strong> em qualquer serviço até o final do mês.<br/>
              <br/>
              Agende já o seu horário!<br/>
              <br/>
              Com carinho,<br/>
              <em>Equipe da Clínica</em>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}