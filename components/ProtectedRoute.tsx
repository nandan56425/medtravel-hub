'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem('isLoggedIn')

    if (isLoggedIn === 'true') {
      setAuthorized(true)
    } else {
      router.push('/login')
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return null
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}
