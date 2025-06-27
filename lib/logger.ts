interface LogData {
  userId?: string
  action: string
  details?: string
  ip?: string
}

export const logger = {
  async log(data: LogData) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Erro ao registrar log:', error)
    }
  },

  // Ações específicas
  login: (userId: string) => logger.log({ userId, action: 'LOGIN', details: 'Usuário fez login' }),
  logout: (userId: string) => logger.log({ userId, action: 'LOGOUT', details: 'Usuário fez logout' }),
  
  // CRUD operations
  create: (userId: string, entity: string, id: string) => 
    logger.log({ userId, action: 'CREATE', details: `Criou ${entity} ID: ${id}` }),
  
  update: (userId: string, entity: string, id: string) => 
    logger.log({ userId, action: 'UPDATE', details: `Editou ${entity} ID: ${id}` }),
  
  delete: (userId: string, entity: string, id: string) => 
    logger.log({ userId, action: 'DELETE', details: `Excluiu ${entity} ID: ${id}` }),
  
  view: (userId: string, page: string) => 
    logger.log({ userId, action: 'VIEW', details: `Acessou página: ${page}` }),
  
  // Ações específicas do sistema
  payment: (userId: string, amount: number) => 
    logger.log({ userId, action: 'PAYMENT', details: `Processou pagamento: R$ ${amount}` }),
  
  appointment: (userId: string, clientName: string) => 
    logger.log({ userId, action: 'APPOINTMENT', details: `Agendamento para: ${clientName}` }),
  
  chat: (userId: string, message: string) => 
    logger.log({ userId, action: 'CHAT', details: `Chat IA: ${message.substring(0, 50)}...` })
}