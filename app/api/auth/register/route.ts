import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { NextResponse } from 'next/server'

// In-memory user store (replace with database in production)
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
}> = []

// Simple password hashing (use bcrypt in production)
function hashPassword(password: string): string {
  // This is a simple hash for demo - use bcrypt in production
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return `hashed_${Math.abs(hash).toString(36)}_${password.length}`
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

// Simple JWT-like token (use jsonwebtoken in production)
function generateToken(userId: string, email: string): string {
  const payload = { userId, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export async function POST(
  req: Request
) {
  try {

    await connectDB()

    const body = await req.json()

    const existingUser =
      await User.findOne({
        email: body.email,
      })

    if (existingUser) {

      return Response.json(
        {
          error:
            'User already exists',
        },

        { status: 400 }
      )
    }

    const user = await User.create({
      fullName: body.fullName,

      email: body.email,

      password: body.password,

      phone: body.phone,

      countryOfOrigin:
        body.countryOfOrigin,
    })

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
          'Registration failed',
      },

      { status: 500 }
    )
  }
}
