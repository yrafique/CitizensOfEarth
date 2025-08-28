import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  xp: number
  level: number
  title: string
  votes: number
  achievements: Achievement[]
  joinedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  xpReward: number
}

export interface Issue {
  id: string
  title: string
  description: string
  category: string
  image: string
  votes: number
  userVoted: boolean
  impact: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  supporters: number
}

interface AppState {
  user: User | null
  issues: Issue[]
  totalVotes: number
  dailyStreak: number
  setUser: (user: User | null) => void
  signOut: () => void
  voteOnIssue: (issueId: string) => void
  addXP: (amount: number) => void
  unlockAchievement: (achievement: Achievement) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      issues: [
        {
          id: '1',
          title: 'Climate Action',
          description: 'Our planet is burning. Rising seas threaten millions while extreme weather devastates communities worldwide. Support renewable energy and carbon reduction to save our home.',
          category: 'Environment',
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '13.7M tons CO2 reduced',
          urgency: 'critical',
          progress: 42,
          supporters: 324567
        },
        {
          id: '2',
          title: 'Global Health Initiative',
          description: 'Every 3 seconds, someone dies from preventable diseases. Help build resilient healthcare systems and ensure no one dies from treatable conditions.',
          category: 'Health',
          image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '2.3M lives improved',
          urgency: 'high',
          progress: 67,
          supporters: 289432
        },
        {
          id: '3',
          title: 'Peace & Security',
          description: 'Over 100 million people are displaced by conflict and violence. Support peacekeeping efforts and humanitarian aid to protect the most vulnerable.',
          category: 'Peace',
          image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '89 conflicts mediated',
          urgency: 'high',
          progress: 38,
          supporters: 198765
        },
        {
          id: '4',
          title: 'Quality Education',
          description: '244 million children are out of school, their dreams stolen by poverty and conflict. Support universal education to unlock human potential and break cycles of poverty.',
          category: 'Education',
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '5.2M students reached',
          urgency: 'medium',
          progress: 71,
          supporters: 412398
        },
        {
          id: '5',
          title: 'Clean Water Access',
          description: '2 billion people lack clean water at home. Children walk hours for dirty water while diseases spread. Help provide life-saving clean water and sanitation.',
          category: 'Water',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '1.8M people served',
          urgency: 'high',
          progress: 54,
          supporters: 276543
        },
        {
          id: '6',
          title: 'Gender Equality',
          description: 'Women and girls face violence, discrimination, and denied opportunities worldwide. Support policies that ensure equal rights, safety, and economic empowerment for all.',
          category: 'Equality',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&auto=format',
          votes: 0,
          userVoted: false,
          impact: '423 policies changed',
          urgency: 'medium',
          progress: 61,
          supporters: 389012
        }
      ],
      totalVotes: 0,
      dailyStreak: 0,

      setUser: (user) => set({ user }),
      
      signOut: () => set({ user: null, totalVotes: 0 }),
      
      voteOnIssue: (issueId) => set((state) => {
        const issue = state.issues.find(i => i.id === issueId)
        if (!issue || issue.userVoted) return state

        const updatedIssues = state.issues.map(i =>
          i.id === issueId
            ? { ...i, votes: i.votes + 1, userVoted: true, supporters: i.supporters + 1 }
            : i
        )

        const xpGained = 10
        let updatedUser = state.user
        if (updatedUser) {
          updatedUser = {
            ...updatedUser,
            xp: updatedUser.xp + xpGained,
            votes: updatedUser.votes + 1
          }
        }

        return {
          issues: updatedIssues,
          totalVotes: state.totalVotes + 1,
          user: updatedUser
        }
      }),

      addXP: (amount) => set((state) => {
        if (!state.user) return state
        return {
          user: {
            ...state.user,
            xp: state.user.xp + amount
          }
        }
      }),

      unlockAchievement: (achievement) => set((state) => {
        if (!state.user) return state
        if (state.user.achievements.some(a => a.id === achievement.id)) return state
        
        return {
          user: {
            ...state.user,
            achievements: [...state.user.achievements, { ...achievement, unlockedAt: new Date() }],
            xp: state.user.xp + achievement.xpReward
          }
        }
      })
    }),
    {
      name: 'citizens-earth-storage',
    }
  )
)