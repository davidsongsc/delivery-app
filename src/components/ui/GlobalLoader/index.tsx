'use client'
import { useAuth } from '@/contexts/AuthContext'
import LoaderOverlay from '@/components/ui/loaderOverlay'
import { useGlobalLoadingStore } from '@/store/useGlobalLoadingStore'

export default function GlobalLoader() {
  const { usuarioPerfilLoading } = useAuth()
  const isGlobalLoading = useGlobalLoadingStore((s) => s.isLoading)

  if (!isGlobalLoading && !usuarioPerfilLoading) return null
  return <LoaderOverlay />
}
