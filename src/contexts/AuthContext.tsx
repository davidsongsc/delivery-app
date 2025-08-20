'use client'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useUsuarioPerfil } from '@/hooks/useUsuarioPerfil'
import getUserPermissions from '@/utils/permissions'
import type { AuthState } from '@/store/authStore'

interface ExtendedAuthState extends AuthState {
  permissions: string[]
  usuarioPerfilLoading: boolean
  usuarioPerfilRefresh: () => void
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
}

const AuthContext = createContext<ExtendedAuthState | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(useAuthStore.getState())
  const [globalLoading, setGlobalLoading] = useState(false)

  const userId = state.user?.id

  const { usuarioPerfil, usuarioPerfilLoading, usuarioPerfilRefresh } = useUsuarioPerfil(
    useMemo(() => ({ id: userId ?? '' }), [userId])
  )

  const permissions = useMemo(
    () => getUserPermissions(usuarioPerfil),
    [usuarioPerfil]
  )

  const extendedState: ExtendedAuthState = {
    ...state,
    permissions,
    usuarioPerfilLoading,
    usuarioPerfilRefresh,
    globalLoading,
    setGlobalLoading,
  }

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe(setState)
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={extendedState}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): ExtendedAuthState => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
