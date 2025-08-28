'use client'

import { motion } from 'framer-motion'
import { Vote, TrendingUp, Users, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'

interface IssueCardProps {
  issue: {
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
  onVote: (id: string) => void
}

export function IssueCard({ issue, onVote }: IssueCardProps) {
  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'status-error'
      case 'high':
        return 'status-warning'
      case 'medium':
        return 'bg-blue-600 text-white'
      case 'low':
        return 'status-success'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -10 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="modern-card modern-card-dark group cursor-pointer overflow-hidden smooth-transition"
      onClick={() => !issue.userVoted && onVote(issue.id)}
    >
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {/* Strong dark overlay for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 z-10" />
        
        {/* Main image with enhanced effects */}
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out filter brightness-75 contrast-125 saturate-110"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'block';
          }}
        />
        
        {/* Fallback gradient background */}
        <div 
          className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 hidden" 
          style={{ display: 'none' }}
        />
        
        {/* Color overlay for theme consistency */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 z-10" />
        
        {/* Urgency badge with enhanced styling */}
        <div className="absolute top-4 left-4 z-30">
          <span className={cn(
            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
            getUrgencyStyle(issue.urgency)
          )}>
            <div className="w-2 h-2 rounded-full bg-current" />
            {issue.urgency.toUpperCase()}
          </span>
        </div>
        
        {/* Strong text overlay with maximum contrast */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <h3 className="text-white font-black text-3xl mb-2 leading-tight tracking-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
            {issue.title}
          </h3>
          <p className="text-blue-400 text-base font-bold mb-3" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
            {issue.category}
          </p>
          
          {/* Larger progress indicator */}
          <div className="w-24 h-2 bg-white/40 rounded-full overflow-hidden shadow-lg">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(issue.progress / 100) * 96}px` }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-green-500 rounded-full shadow-sm"
            />
          </div>
        </div>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-t from-blue-500/20 to-blue-400/20 z-10" />
      </div>

      <div className="p-6">
        <p className="text-body text-gray-800 dark:text-gray-200 mb-6 line-clamp-3">
          {issue.description}
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <span className="flex items-center gap-2 text-caption">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold">Impact</span>
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{issue.impact}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <span className="flex items-center gap-2 text-caption">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold">Supporters</span>
            </span>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {formatNumber(issue.supporters)}
            </span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-caption font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              Progress
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">{issue.progress}%</span>
          </div>
          <div className="modern-progress">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${issue.progress}%` }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              className="modern-progress-fill"
              style={{ backgroundColor: 'var(--primary-green)' }}
            />
          </div>
        </div>

        <button
          className={cn(
            "w-full py-4 px-6 font-bold flex items-center justify-center gap-3 text-lg smooth-transition",
            issue.userVoted
              ? "btn-secondary text-green-600 cursor-not-allowed"
              : "btn-primary"
          )}
          disabled={issue.userVoted}
        >
          <motion.div
            animate={issue.userVoted ? {} : { scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Vote className="w-5 h-5" />
          </motion.div>
          <span className="relative z-10">
            {issue.userVoted ? 'Voted ✓' : 'Vote Now'}
          </span>
          {!issue.userVoted && (
            <motion.div
              className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </button>

        <div className="mt-4 flex items-center justify-center p-2 bg-gray-800/80 rounded-lg border border-gray-600/50">
          <TrendingUp className="w-4 h-4 mr-2 text-cyan-400" />
          <span className="font-bold text-cyan-400 text-lg">{formatNumber(issue.votes)}</span>
          <span className="ml-1 text-gray-300 font-medium">votes</span>
        </div>
      </div>
    </motion.div>
  )
}