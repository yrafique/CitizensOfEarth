import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { issueId } = await request.json()
    
    // Verify user
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    let userId: string
    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'secret-key') as any
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check if already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_issueId: {
          userId,
          issueId
        }
      }
    })

    if (existingVote) {
      return NextResponse.json(
        { error: 'Already voted on this issue' },
        { status: 400 }
      )
    }

    // Create vote and update counts
    const [vote, issue, user] = await prisma.$transaction([
      prisma.vote.create({
        data: {
          userId,
          issueId
        }
      }),
      prisma.issue.update({
        where: { id: issueId },
        data: {
          totalVotes: { increment: 1 },
          supporters: { increment: 1 }
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: 10 }
        }
      })
    ])

    // Record activity
    await prisma.activity.create({
      data: {
        userId,
        type: 'vote',
        description: `Voted on ${issue.title}`,
        xpEarned: 10
      }
    })

    // Check for achievements
    const userWithStats = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        votes: true,
        achievements: true
      }
    })

    const newAchievements = []

    // First Vote achievement
    if (userWithStats?.votes.length === 1) {
      const firstVoteAchievement = await prisma.achievement.findFirst({
        where: { requirement: 'first_vote' }
      })
      if (firstVoteAchievement && !userWithStats.achievements.some(a => a.achievementId === firstVoteAchievement.id)) {
        await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: firstVoteAchievement.id
          }
        })
        await prisma.user.update({
          where: { id: userId },
          data: { xp: { increment: firstVoteAchievement.xpReward } }
        })
        newAchievements.push(firstVoteAchievement)
      }
    }

    return NextResponse.json({
      success: true,
      xpEarned: 10,
      newAchievements
    })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    )
  }
}