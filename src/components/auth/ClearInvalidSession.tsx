'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ClearInvalidSession() {
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (!session && event === 'TOKEN_REFRESHED')) {
        // Limpiar localStorage de tokens inválidos
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb-')) {
            localStorage.removeItem(key)
          }
        })
      }
    })
  }, [])
  return null
}
