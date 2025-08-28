import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Demo credentials for testing
    if (email === 'demo@example.com' && password === 'password123') {
      const demoUser = {
        id: 'demo-user-1',
        name: 'Demo User',
        email: 'demo@example.com',
        xp: 250,
        level: 3,
        title: 'Active Citizen',
        achievements: []
      }

      const token = jwt.sign(
        { userId: demoUser.id, email: demoUser.email },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '7d' }
      )

      const response = NextResponse.json({ user: demoUser })
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7
      })

      return response
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        achievements: {
          include: {
            achievement: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() }
    })

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
        title: user.title,
        achievements: user.achievements.map(ua => ({
          ...ua.achievement,
          unlockedAt: ua.unlockedAt
        }))
      }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}