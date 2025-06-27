'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Ajuda() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            📚 Manual do Sistema
          </h1>
          <p className="text-gray-600 mt-2">Guia completo de uso da plataforma</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🏠 Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visão geral do sistema com métricas em tempo real:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Total de clientes cadastrados</li>
                <li>Agendamentos do dia</li>
                <li>Receita mensal</li>
                <li>Lista de agendamentos de hoje</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👥 Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Gestão completa de clientes:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Cadastrar:</strong> Clique em "+ Novo Cliente"</li>
                <li><strong>Visualizar:</strong> Lista com todos os clientes</li>
                <li><strong>Desativar:</strong> Botão "Desativar" em cada cliente</li>
                <li><strong>Campos:</strong> Nome, telefone, email, data nascimento</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📅 Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sistema completo de agendamentos:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Criar:</strong> Selecione cliente, serviço, profissional e horário</li>
                <li><strong>Filtrar:</strong> Por status (Agendado, Confirmado, etc.)</li>
                <li><strong>Visualizar:</strong> Lista ou calendário</li>
                <li><strong>Pagamento:</strong> Botão "Marcar Pago" para concluir</li>
                <li><strong>Status:</strong> Agendado → Confirmado → Concluído</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💼 Serviços (Apenas Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Catálogo de serviços oferecidos:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Cadastrar:</strong> Nome, preço, duração, categoria</li>
                <li><strong>Comissão:</strong> Percentual ou valor fixo</li>
                <li><strong>Visualizar:</strong> Cards com informações completas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👨‍⚕️ Profissionais (Apenas Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Equipe de profissionais:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Cadastrar:</strong> Nome, telefone, email, especialidades</li>
                <li><strong>Dados:</strong> CPF/CNPJ, chave PIX</li>
                <li><strong>Especialidades:</strong> Lista de serviços que realiza</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💰 Pagamentos (Apenas Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Controle de comissões:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Gerar:</strong> Selecione profissional e período</li>
                <li><strong>Calcular:</strong> Automático baseado nos serviços</li>
                <li><strong>Status:</strong> Pendente → Pago</li>
                <li><strong>Marcar:</strong> Botão "Marcar Pago"</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎂 Aniversários</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Gestão de aniversários:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Hoje:</strong> Aniversariantes do dia</li>
                <li><strong>Mês:</strong> Todos do mês atual</li>
                <li><strong>Enviar:</strong> Mensagens de parabéns automáticas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Relatórios (Apenas Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Análises e métricas:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Agendamentos:</strong> Por status e período</li>
                <li><strong>Financeiro:</strong> Receita e ticket médio</li>
                <li><strong>Filtros:</strong> Por data (pré-preenchido com mês atual)</li>
                <li><strong>Serviços:</strong> Mais vendidos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚙️ Configurações (Apenas Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Personalização do sistema:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Empresa:</strong> Nome, endereço, telefone</li>
                <li><strong>Visual:</strong> Logo e cores personalizadas</li>
                <li><strong>Integrações:</strong> WhatsApp e Telegram API</li>
                <li><strong>Usuários:</strong> Adicionar Admin/Usuário</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔐 Controle de Acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Níveis de permissão:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Administrador:</strong> Acesso total ao sistema</li>
                <li><strong>Usuário:</strong> Dashboard, Clientes, Agendamentos, Aniversários</li>
                <li><strong>Logout:</strong> Automático após 30min de inatividade</li>
                <li><strong>Sessão:</strong> Aviso 5min antes do logout</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🚨 Dicas Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-1">
                <li>Dados não são excluídos, apenas desativados</li>
                <li>Backup automático dos dados</li>
                <li>Sistema responsivo para mobile</li>
                <li>Notificações automáticas por WhatsApp/Telegram</li>
                <li>IA integrada para atendimento automatizado</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}