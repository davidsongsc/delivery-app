// lib/auth.ts
import { cookies } from 'next/headers'

export function getUser() {
  const token = cookies().get('token')?.value

  if (!token) return null

  // aqui você pode decodificar o token, ou validar com o backend se quiser
  return { name: 'Usuário' }
}
