'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function LogoutTimer() {
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    const resetTimer = () => {
      setTimeLeft(30 * 60)
      setShowWarning(false)
    }

    const handleActivity = () => {
      resetTimer()
    }

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 300) { // 5 minutes left
          setShowWarning(true)
        }
        if (prev <= 1) {
          signOut()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!showWarning) return null

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded shadow-lg z-50">
      <div className="flex items-center space-x-3">
        <span className="text-sm">
          Sessão expira em: <strong>{formatTime(timeLeft)}</strong>
        </span>
        <Button 
          size="sm" 
          onClick={() => setTimeLeft(30 * 60)}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}