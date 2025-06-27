📋 SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA - GUIA COMPLETO
🎯 O QUE O SISTEMA FAZ (PASSO A PASSO)
1. GESTÃO DE CLIENTES
Passo a passo:

Cadastrar Cliente → Clique "Novo Cliente" → Preencha nome, telefone, email, data nascimento → Salvar
Ativar/Desativar → Use botão toggle na lista (clientes inativos não aparecem em agendamentos)
Editar Dados → Clique no ícone de edição → Modifique informações → Salvar
Visualizar Lista → Todos os clientes aparecem em tabela organizada
2. GESTÃO DE SERVIÇOS (Apenas Admin)
Passo a passo:

Criar Serviço → "Novo Serviço" → Nome, descrição, preço, duração em minutos
Configurar Comissão → Escolha "percentual" ou "valor fixo" → Defina valor
Categorizar → Adicione categoria (opcional)
Ativar/Desativar → Controle disponibilidade sem perder histórico
3. GESTÃO DE PROFISSIONAIS (Apenas Admin)
Passo a passo:

Cadastrar Profissional → Nome, telefone, email, CPF/CNPJ, chave PIX
Definir Especialidades → Liste áreas de atuação
Ativar/Desativar → Controle disponibilidade da equipe
4. AGENDAMENTOS (FUNCIONALIDADE PRINCIPAL)
Passo a passo completo:

Iniciar Agendamento → Clique "Novo Agendamento"
Selecionar Cliente → Dropdown com clientes ativos
Adicionar Serviços:
Selecione serviço no dropdown
Escolha profissional para este serviço
Clique "Adicionar Serviço" para múltiplos serviços
Definir Data/Hora → Mínimo 30min no futuro
Forma de Pagamento → Dinheiro, cartão, PIX, etc.
Status → Agendado, confirmado, em andamento, concluído, cancelado
Observações → Informações adicionais
Salvar → Sistema calcula valor total e duração automaticamente
Filtros e Visualização:

Filtrar por Status → Dropdown para ver apenas status desejado
Agrupado por Data → Organização cronológica
Concluir Rapidamente → Botão verde ✓ para marcar como concluído
5. SISTEMA DE PAGAMENTOS/COMISSÕES (Apenas Admin)
Passo a passo:

Gerar Pagamento → Clique "Gerar Pagamento"
Selecionar Profissional → Dropdown da equipe
Definir Período → Data início e fim
Calcular → Sistema busca agendamentos "concluídos" no período
Aplicar Regras → Usa configuração de comissão de cada serviço
Revisar Detalhes → Lista todos os agendamentos incluídos
Confirmar → Cria registro de pagamento pendente
Marcar como Pago → Quando efetuar o pagamento ao profissional
6. GESTÃO DE ANIVERSÁRIOS
Passo a passo:

Sistema Identifica → Automaticamente aniversariantes de hoje e do mês
Visualizar Listas → Separado por "hoje" e "mês"
Selecionar Clientes → Checkbox individual ou "selecionar todos"
Personalizar Mensagem → Edite texto padrão de parabéns
Enviar Emails → Sistema envia para emails válidos
Receber Relatório → Sucessos e erros do envio
7. ASSISTENTE DE IA INTELIGENTE
Passo a passo do funcionamento:

Para Cliente Novo:

Cliente inicia conversa
IA pede nome completo
IA pergunta autorização para cadastro
Se "sim" → Cria cliente com observação "cadastrado via IA"
Se "não" → Continua sem cadastrar
Para Cliente Existente:

IA reconhece pelo telefone
Cumprimenta pelo nome
Oferece ajuda personalizada
Consulta de Disponibilidade:

Cliente pergunta "tem vaga dia X?"
IA consulta agenda em tempo real
Responde apenas horários livres (sem mostrar profissionais)
Fazer Agendamento:

Cliente: "quero agendar manicure dia X"
IA identifica serviço
Se não informou hora → IA pergunta horário
IA verifica se horário está livre
Se livre → Confirma agendamento
Se ocupado → Sugere outros horários
8. RELATÓRIOS GERENCIAIS (Apenas Admin)
Tipos e passo a passo:

Relatório de Agendamentos:

Selecione período
Sistema conta: total, concluídos, cancelados, receita
Relatório Financeiro:

Selecione período
Sistema calcula: receita total, ticket médio, receita por serviço
Inclui comissões pagas no período
Calcula lucro líquido (receita - comissões)
Relatório de Pagamentos:

Lista pagamentos por período
Separa pagos vs pendentes
Totais por profissional
9. CONFIGURAÇÕES DA EMPRESA (Apenas Admin)
Passo a passo:

Dados Básicos → Nome, endereço, telefones, email, Instagram
Upload de Logo → Imagem da empresa
Personalização → Cores primária e secundária
Preview → Visualiza mudanças antes de salvar
Salvar → Aplica mudanças em todo o sistema
10. SEGURANÇA AUTOMÁTICA
Como funciona:

Timer de 30min → Conta inatividade
Aviso 5min antes → Notificação de logout iminente
Botão "Continuar Ativo" → Reseta timer
Logout Automático → Se não houver interação
Botão Manual → Sair sempre disponível
💡 PROMPT COMPLETO DO SISTEMA
Você é um sistema de gestão completo para clínicas de estética. Seu objetivo é:

GERENCIAR:
- Clientes (cadastro, ativação, dados pessoais)
- Agendamentos (múltiplos serviços, cálculos automáticos, status)
- Serviços (preços, durações, comissões)
- Profissionais (equipe, especialidades, ativação)
- Pagamentos (comissões automáticas por período)
- Aniversários (identificação e envio de mensagens)
- Relatórios (financeiro, operacional, comissões)
- Configurações (personalização da empresa)

REGRAS FUNDAMENTAIS:
1. NUNCA delete dados - apenas desative (soft delete)
2. Apenas agendamentos "concluídos" geram comissão
3. Agendamentos devem ser mínimo 30min no futuro
4. Dois níveis: Admin (acesso total) e User (limitado)
5. Logout automático após 30min de inatividade
6. Dados históricos sempre preservados

ASSISTENTE IA:
- Reconhece clientes por telefone
- Cadastra novos clientes com permissão
- Consulta disponibilidade em tempo real
- Realiza agendamentos completos
- Não aprende - cada conversa é independente

INTERFACE:
- Design responsivo (mobile-first)
- Cards visuais e intuitivos
- Filtros por status em agendamentos
- Botões rápidos para ações comuns
- Navegação lateral adaptativa por role

FLUXO PRINCIPAL:
Cliente cadastrado → Agendamento com múltiplos serviços → Atendimento → Conclusão → Geração de comissão → Pagamento ao profissional → Relatórios gerenciais

SEGURANÇA:
- Autenticação Google integrada
- Timer de inatividade com avisos
- Controle de acesso por funcionalidade
- Botão de logout sempre visível

OBJETIVO: Otimizar operações, reduzir trabalho manual, aumentar controle financeiro e melhorar experiência do cliente através de tecnologia intuitiva e segura.
🎯 RESUMO: O sistema automatiza 90% das operações de uma clínica de estética, desde o primeiro contato (via IA) até o pagamento final das comissões, mantendo controle total, segurança e facilidade de uso.