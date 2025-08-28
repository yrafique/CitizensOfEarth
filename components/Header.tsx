'use client'

import { motion } from 'framer-motion'
import { User, Trophy, Globe, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { calculateLevel, formatNumber } from '@/lib/utils'
import { AuthModal } from './AuthModal'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, totalVotes, setUser, signOut } = useStore()

  const levelInfo = user ? calculateLevel(user.xp) : null

  const handleAuthSuccess = (userData: any) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      xp: userData.xp || 0,
      level: userData.level || 1,
      title: userData.title || 'Newcomer',
      votes: 0,
      achievements: userData.achievements || [],
      joinedAt: new Date()
    })
  }

  return (
    <header className="modern-nav modern-nav-dark sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hidden sm:block"
            >
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-headline text-gray-900 dark:text-white">
              Citizens of Earth
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#issues" className="text-body text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition font-medium">
              Issues
            </a>
            <a href="#impact" className="text-body text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition font-medium">
              Impact
            </a>
            <a href="#leaderboard" className="text-body text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition font-medium">
              Leaderboard
            </a>
            <a href="#about" className="text-body text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition font-medium">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-purple-400 font-bold">
                      Level {levelInfo?.level}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-cyan-400 font-bold">
                      {formatNumber(user.xp)} XP
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={signOut}
                  className="ml-2 p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:block btn-primary"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="flex flex-col space-y-2">
              <a href="#issues" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Issues
              </a>
              <a href="#impact" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Impact
              </a>
              <a href="#leaderboard" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Leaderboard
              </a>
              <a href="#about" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                About
              </a>
            </nav>
            {user ? (
              <div className="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Level {levelInfo?.level} • {formatNumber(user.xp)} XP
                </p>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="mt-4 w-full btn-primary"
              >
                Sign In
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Global Stats Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3">
        <div className="container mx-auto px-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">{formatNumber(totalVotes)}</strong> Global Votes
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">1.2M</strong> Citizens Active
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">89</strong> Goals Achieved
            </span>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  )
}