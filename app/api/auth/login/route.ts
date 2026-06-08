import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// In-memory user store (shared with register route in production, use database)
const users: Array<{
  _id: string
  fullName: string
  email: string
  password: string
  phone?: string
  countryOfOrigin?: string
  isInternationalPatient: boolean
  role: 'patient' | 'admin'
  createdAt: string
  lastLogin?: string
}> = [
  // Demo user for testing
  {
    _id: 'demo_user_1',
    fullName: 'Demo Patient',
    email: 'demo@medtravelhub.com',
    password: 'hashed_demo123_8',
    phone: '+91-9876543210',
    countryOfOrigin: 'UAE',
    isInternationalPatient: true,
    role: 'patient',
    createdAt: new Date().toISOString(),
  }
]

// Simple password hashing (must match register route)
function hashPassword(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return `hashed_${Math.abs(hash).toString(36)}_${password.length}`
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  // For demo user with plain text check
  if (hashedPassword === 'hashed_demo123_8' && password === 'demo1234') {
    return true
  }
  return hashPassword(password) === hashedPassword
}

// Simple JWT-like token
function generateToken(userId: string, email: string): string {
  const payload = { userId, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export async function POST(req: Request) {
  try {

    await connectDB()

    const body = await req.json()

    const user =
      await User.findOne({
        email: body.email,
      })

    if (!user) {

      return Response.json(
        {
          error:
            'User not found',
        },

        { status: 404 }
      )
    }

    if (
      user.password !==
      body.password
    ) {

      return Response.json(
        {
          error:
            'Invalid password',
        },

        { status: 401 }
      )
    }

    return Response.json({
      success: true,
      token: 'demo-token',
      user,
    })

  } catch (error) {

    console.error(error)

    return Response.json(
      {
        error:
          'Login failed',
      },

      { status: 500 }
    )
  }
}

  
