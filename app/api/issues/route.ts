import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Get user from token if available
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')
    let userId: string | null = null

    if (token) {
      try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'secret-key') as any
        userId = decoded.userId
      } catch (error) {
        // Token invalid, continue as guest
      }
    }

    // Get all issues with vote status
    const issues = await prisma.issue.findMany({
      include: {
        votes: userId ? {
          where: { userId }
        } : false
      }
    })

    // Format response
    const formattedIssues = issues.map(issue => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      image: issue.image || `/api/placeholder/400/300`,
      votes: issue.totalVotes,
      userVoted: userId ? issue.votes.length > 0 : false,
      impact: issue.impact,
      urgency: issue.urgency,
      progress: issue.progress,
      supporters: issue.supporters
    }))

    return NextResponse.json(formattedIssues)
  } catch (error) {
    console.error('Issues fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    )
  }
}