import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample issues
  const issues = await Promise.all([
    prisma.issue.create({
      data: {
        title: 'Climate Action',
        description: 'Combat climate change through renewable energy and carbon reduction',
        category: 'Environment',
        image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop&auto=format',
        impact: '13.7M tons CO2 reduced',
        urgency: 'critical',
        progress: 42,
        supporters: 324567,
        totalVotes: 324567
      }
    }),
    prisma.issue.create({
      data: {
        title: 'Global Health Initiative',
        description: 'Ensure universal healthcare access and pandemic preparedness',
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format',
        impact: '2.3M lives improved',
        urgency: 'high',
        progress: 67,
        supporters: 289432,
        totalVotes: 289432
      }
    }),
    prisma.issue.create({
      data: {
        title: 'Peace & Security',
        description: 'Promote peaceful resolution of conflicts and humanitarian aid',
        category: 'Peace',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=400&fit=crop&auto=format',
        impact: '89 conflicts mediated',
        urgency: 'high',
        progress: 38,
        supporters: 198765,
        totalVotes: 198765
      }
    }),
    prisma.issue.create({
      data: {
        title: 'Quality Education',
        description: 'Ensure inclusive and quality education for all',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop&auto=format',
        impact: '5.2M students reached',
        urgency: 'medium',
        progress: 71,
        supporters: 412398,
        totalVotes: 412398
      }
    }),
    prisma.issue.create({
      data: {
        title: 'Clean Water Access',
        description: 'Provide clean water and sanitation to underserved communities',
        category: 'Water',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format',
        impact: '1.8M people served',
        urgency: 'high',
        progress: 54,
        supporters: 276543,
        totalVotes: 276543
      }
    }),
    prisma.issue.create({
      data: {
        title: 'Gender Equality',
        description: 'Achieve gender equality and empower all women and girls',
        category: 'Equality',
        image: 'https://images.unsplash.com/photo-1594736797933-d0bea7d18bf2?w=500&h=400&fit=crop&auto=format',
        impact: '423 policies changed',
        urgency: 'medium',
        progress: 61,
        supporters: 389012,
        totalVotes: 389012
      }
    })
  ])

  // Create sample achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'First Vote',
        description: 'Cast your first vote on a global issue',
        icon: '🗳️',
        xpReward: 50,
        requirement: 'first_vote'
      }
    }),
    prisma.achievement.create({
      data: {
        name: 'Active Citizen',
        description: 'Vote on 10 different issues',
        icon: '🌍',
        xpReward: 100,
        requirement: '10_votes'
      }
    }),
    prisma.achievement.create({
      data: {
        name: 'Daily Streak',
        description: 'Vote every day for 7 days',
        icon: '🔥',
        xpReward: 200,
        requirement: '7_day_streak'
      }
    }),
    prisma.achievement.create({
      data: {
        name: 'Climate Champion',
        description: 'Support 5 environmental initiatives',
        icon: '🌱',
        xpReward: 150,
        requirement: '5_climate_votes'
      }
    })
  ])

  console.log('Database has been seeded. 🌱')
  console.log(`Created ${issues.length} issues`)
  console.log(`Created ${achievements.length} achievements`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })