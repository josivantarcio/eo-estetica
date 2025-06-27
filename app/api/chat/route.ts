import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { message, telefone } = await request.json()

    // Buscar cliente por telefone
    let cliente = null
    if (telefone) {
      cliente = await prisma.cliente.findFirst({
        where: { telefone }
      })
    }

    // Buscar dados para contexto
    const [servicos, profissionais] = await Promise.all([
      prisma.servico.findMany({ where: { ativo: true } }),
      prisma.profissional.findMany({ where: { ativo: true } })
    ])

    // IA Avançada com processamento inteligente
    let response = ''
    const msgLower = message.toLowerCase().trim()
    
    // Análise de padrões e histórico do cliente
    const agendamentos = await prisma.agendamento.findMany({
      where: { clienteId: cliente?.id },
      include: { itens: { include: { servico: true } } }
    })
    
    const servicosMaisUsados = agendamentos
      .flatMap(a => a.itens)
      .reduce((acc: any, item) => {
        acc[item.servico.nome] = (acc[item.servico.nome] || 0) + 1
        return acc
      }, {})
    
    const servicoFavorito = Object.keys(servicosMaisUsados)[0]
    
    // Processamento inteligente de linguagem natural
    if (msgLower.match(/(oi|olá|boa tarde|bom dia|boa noite|e aí|hey)/)) {
      if (cliente) {
        const recomendacao = servicoFavorito ? `\n\n🎆 Baseado no seu histórico, recomendo ${servicoFavorito}. Gostaria de agendar?` : ''
        response = `Olá, ${cliente.nome}! 😊 Que prazer falar com você novamente!\n\nComo posso ajudá-lo hoje?${recomendacao}`
      } else {
        response = '🌟 Olá! Sou Bella, assistente IA da clínica!\n\nVejo que é a primeira vez que conversamos. Para oferecer um atendimento personalizado, posso salvar seu número e nome do WhatsApp no nosso sistema?\n\n✅ Digite "SIM" para autorizar\n❌ Digite "NÃO" se preferir não cadastrar\n\n🔒 Seus dados estarão seguros conosco!'
      }
    } else if (msgLower.match(/(serviço|procedimento|tratamento|o que vocês fazem|que serviços)/)) {
      const servicosList = servicos.map(s => `• ${s.nome} - R$ ${s.preco.toFixed(2)} (${s.duracaoMinutos}min)`).join('\n')
      const mlSuggestion = servicoFavorito ? `\n\n🎨 Recomendação personalizada: ${servicoFavorito} - seu favorito!` : ''
      response = `💅 Nossos serviços especializados:\n\n${servicosList}${mlSuggestion}\n\nQual desperta seu interesse? Posso dar mais detalhes sobre qualquer um!`
    } else if (msgLower.match(/(agendar|marcar|reservar|quero|gostaria)/)) {
      const suggestion = servicoFavorito ? `\n\n💡 Sugestão inteligente: ${servicoFavorito} (baseado no seu perfil)` : ''
      response = `📅 Excelente escolha! Vou ajudá-lo com o agendamento.\n\nPreciso de algumas informações:\n1. 💅 Qual serviço deseja?\n2. 📆 Que dia prefere?\n3. ⏰ Horário de preferência?${suggestion}`
    } else if (msgLower.match(/(horário|quando|disponível|livre|funciona)/)) {
      response = '🕰️ Nossos horários de funcionamento:\n\n📅 Segunda a Sexta: 8h às 18h\n📅 Sábados: 8h às 14h\n🚫 Domingos: Fechado\n\n💡 Dica inteligente: Horários entre 14h-16h costumam ter mais disponibilidade!\n\nQue dia gostaria de agendar?'
    } else if (msgLower.match(/(preço|valor|custa|quanto)/)) {
      const servicosPreco = servicos.slice(0, 5).map(s => `• ${s.nome}: R$ ${s.preco.toFixed(2)}`).join('\n')
      response = `💰 Nossos preços são justos e competitivos:\n\n${servicosPreco}\n\n🎁 Temos promoções especiais para clientes frequentes!\n\nQual serviço te interessa mais?`
    } else if (msgLower.match(/(obrigad|valeu|brigad)/)) {
      response = '😊 Por nada! Foi um prazer ajudá-lo!\n\nEstou sempre aqui quando precisar. Tenha um ótimo dia! ✨'
    } else if (msgLower.match(/(tchau|até|bye|fui)/)) {
      response = '👋 Até logo! Espero vê-lo em breve na clínica!\n\nQualquer coisa, é só chamar. Cuide-se! 💖'
    } else if (!cliente && msgLower.match(/(sim|autorizo|pode|aceito|ok)/)) {
      // Criar cliente com autorização
      const novoCliente = await prisma.cliente.create({
        data: {
          nome: 'Cliente WhatsApp',
          telefone: telefone || 'Não informado',
          observacoes: 'Cliente cadastrado via IA com autorização'
        }
      })
      
      response = `🎉 Perfeito! Cadastro realizado com sucesso!\n\nAgora preciso do seu nome completo para personalizar o atendimento. Como posso chamá-lo?`
    } else if (!cliente && msgLower.match(/(não|nao|recuso|negativo)/)) {
      response = '😊 Sem problemas! Posso ajudá-lo mesmo assim.\n\nO que gostaria de saber sobre nossos serviços?'
    } else {
      // Resposta inteligente para mensagens não reconhecidas
      response = `🤔 Entendi que você disse "${message}", mas não tenho certeza de como ajudar especificamente.\n\n🎆 Posso ajudá-lo com:\n• 📊 Informações sobre serviços\n• 📅 Agendamentos personalizados\n• 🕰️ Consulta de horários\n• 💰 Preços e promoções\n\nPoderia reformular sua pergunta? Estou aqui para ajudar! 😊`
    }

    return NextResponse.json({ 
      response,
      cliente: cliente ? { id: cliente.id, nome: cliente.nome } : null
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro no chat' }, { status: 500 })
  }
}