'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <svg className="w-8 h-8 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h3m4 0h3M7 12h3m4 0h3m-7 4h3" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Clínica Bella
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto px-4">
            Sistema completo de gestão para clínicas de estética com Machine Learning
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-green-600 font-semibold">✓ 100% Funcional</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-blue-600 font-semibold">🧠 ML Integrado</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/clientes'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Clientes</h3>
            <p className="text-sm lg:text-base text-gray-600">Gestão completa com cadastro, histórico e aniversários</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/agendamentos'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Agendamentos</h3>
            <p className="text-sm lg:text-base text-gray-600">Sistema avançado com múltiplos serviços e status</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/pagamentos'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Pagamentos</h3>
            <p className="text-sm lg:text-base text-gray-600">Controle automático de comissões e pagamentos</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/chat'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">IA com ML</h3>
            <p className="text-sm lg:text-base text-gray-600">Machine Learning para agendamentos inteligentes</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/relatorios'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Relatórios</h3>
            <p className="text-sm lg:text-base text-gray-600">Análises detalhadas e métricas em tempo real</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/servicos'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6.273V10a2 2 0 00-2-2H8a2 2 0 00-2 2v8.273" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Serviços</h3>
            <p className="text-sm lg:text-base text-gray-600">Catálogo completo com gestão de preços</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/profissionais'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Profissionais</h3>
            <p className="text-sm lg:text-base text-gray-600">Gestão da equipe e especialidades</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer" onClick={() => window.location.href = '/configuracoes'}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">Configurações</h3>
            <p className="text-sm lg:text-base text-gray-600">Personalização completa da identidade visual</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <a href="/dashboard" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-lg">
            <span className="mr-2">🚀</span>
            Dashboard
          </a>
          <div className="mt-8 flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-600">Sistema Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">10 Módulos Ativos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-gray-600">IA Integrada</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}