'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, Target, TrendingUp, Award, Zap, Heart, Shield } from 'lucide-react'
import { Header } from '@/components/Header'
import { IssueCard } from '@/components/IssueCard'
import { StatsCard } from '@/components/StatsCard'
import { useStore } from '@/lib/store'

export default function Home() {
  const { issues, voteOnIssue, totalVotes, user, addXP } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleVote = async (issueId: string) => {
    if (!user) {
      alert('Please sign in to vote!')
      return
    }
    voteOnIssue(issueId)
    addXP(10)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-large md:text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empower Global
              <br />
              <span className="text-blue-600 dark:text-blue-400">Change</span>
            </motion.h1>
            
            <motion.p 
              className="text-body md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join millions of global citizens making a difference. Vote on critical issues, 
              drive meaningful change, and help shape a better future for all.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="px-8 py-4 btn-primary text-lg">
                Get Started
              </button>
              
              <button className="px-8 py-4 btn-secondary text-lg">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="modern-card modern-card-dark p-8 text-center group smooth-transition"
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{totalVotes.toLocaleString()}</h3>
              <p className="text-gray-300 text-sm mb-2">Total Votes Cast</p>
              <div className="text-green-400 text-sm font-semibold">↗ +12% this month</div>
            </motion.div>
            
            <motion.div 
              className="modern-card modern-card-dark p-8 text-center group smooth-transition"
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">1.2M</h3>
              <p className="text-gray-300 text-sm mb-2">Active Citizens</p>
              <div className="text-green-400 text-sm font-semibold">↗ +8% this week</div>
            </motion.div>
            
            <motion.div 
              className="modern-card modern-card-dark p-8 text-center group smooth-transition"
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">89</h3>
              <p className="text-gray-300 text-sm mb-2">Issues Resolved</p>
              <div className="text-green-400 text-sm font-semibold">↗ +23% this month</div>
            </motion.div>
            
            <motion.div 
              className="modern-card modern-card-dark p-8 text-center group smooth-transition"
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">92.4</h3>
              <p className="text-gray-300 text-sm mb-2">Impact Score</p>
              <div className="text-green-400 text-sm font-semibold">↗ +5% this quarter</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Issues Section */}
      <section id="issues" className="relative py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-large md:text-6xl mb-6 text-gray-900 dark:text-white">
              Global Issues That Matter
            </h2>
            <p className="text-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your voice matters. Vote on the issues that shape our world and drive meaningful change for everyone.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-16 h-16 text-cyan-400" />
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <IssueCard issue={issue} onVote={handleVote} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Why Join CitizensOfEarth?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Be part of the global movement for positive change
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center group"
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-2xl shadow-cyan-500/25">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Earn Rewards</h3>
              <p className="text-gray-300 leading-relaxed">
                Get XP, badges, and real-world rewards for your civic participation
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center group"
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-2xl shadow-emerald-500/25">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                Your votes directly influence global policy decisions and create lasting change
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with millions of like-minded global citizens
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Transparent</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Blockchain-verified voting ensures complete transparency
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the global movement. Your voice, your vote, your impact.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-2xl transition-shadow text-lg">
            Get Started Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CitizensOfEarth</h3>
              <p className="text-gray-400">
                Empowering global citizens to shape the future of our planet.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Vote</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Learn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Connect</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CitizensOfEarth. All rights reserved. Built with 💙 for a better world.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
