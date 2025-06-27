'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const allNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z', roles: ['ADMIN', 'USER'] },
  { name: 'Clientes', href: '/clientes', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', roles: ['ADMIN', 'USER'] },
  { name: 'Agendamentos', href: '/agendamentos', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', roles: ['ADMIN', 'USER'] },
  { name: 'Serviços', href: '/servicos', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6.273V10a2 2 0 00-2-2H8a2 2 0 00-2 2v8.273', roles: ['ADMIN'] },
  { name: 'Profissionais', href: '/profissionais', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', roles: ['ADMIN'] },
  { name: 'Pagamentos', href: '/pagamentos', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', roles: ['ADMIN'] },
  { name: 'Relatórios', href: '/relatorios', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', roles: ['ADMIN'] },
  { name: 'Configurações', href: '/configuracoes', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', roles: ['ADMIN'] },
  { name: 'Ajuda', href: '/ajuda', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', roles: ['ADMIN', 'USER'] },
]

export function Navigation() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { data: session } = useSession()
  
  const userRole = session?.user?.role || 'USER'
  const navigation = allNavigation.filter(item => item.roles.includes(userRole))

  return (
    <div className={cn(
      'fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 shadow-2xl',
      'lg:block',
      collapsed ? 'w-16' : 'w-64 lg:w-64'
    )}>
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h3m4 0h3M7 12h3m4 0h3m-7 4h3" />
            </svg>
          </div>
          {!collapsed && (
            <div>
              <div className="text-lg font-bold">Clínica Bella</div>
              <div className="text-xs text-slate-400">Sistema de Gestão</div>
            </div>
          )}
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setCollapsed(!collapsed)
              const main = document.getElementById('main-content')
              const footer = document.getElementById('footer-content')
              if (main && footer) {
                if (!collapsed) {
                  main.className = main.className.replace('lg:ml-64', 'lg:ml-16')
                  footer.className = footer.className.replace('lg:ml-64', 'lg:ml-16')
                } else {
                  main.className = main.className.replace('lg:ml-16', 'lg:ml-64')
                  footer.className = footer.className.replace('lg:ml-16', 'lg:ml-64')
                }
              }
            }}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group',
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-slate-700 pt-4">
          {session?.user && (
            <div className="px-3 py-2 text-slate-300 text-sm">
              {!collapsed && (
                <div>
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-xs text-slate-400">{session.user.role}</p>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-red-600 transition-all"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!collapsed && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </div>
    </div>
  )
}