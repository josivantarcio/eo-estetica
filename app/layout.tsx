import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { AuthProvider } from '@/components/auth/session-provider'
import { LogoutTimer } from '@/components/auth/logout-timer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clínica de Estética - Sistema de Gestão',
  description: 'Sistema completo para gestão de clínicas de estética',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <LogoutTimer />
          <main className="lg:ml-64 min-h-screen transition-all duration-300" id="main-content">
            {children}
          </main>
          <footer className="lg:ml-64 bg-gray-800 text-white py-4 px-6 transition-all duration-300" id="footer-content">
            <div className="text-center text-sm">
              © 2024 Edinalda Oliveira - CNPJ: 59.233.294/0001-44. Todos os direitos reservados.
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}