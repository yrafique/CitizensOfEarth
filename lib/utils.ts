import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function calculateLevel(xp: number): { level: number; title: string; progress: number } {
  const levels = [
    { min: 0, title: "Newcomer", level: 1 },
    { min: 100, title: "Participant", level: 2 },
    { min: 500, title: "Contributor", level: 3 },
    { min: 1500, title: "Advocate", level: 4 },
    { min: 3000, title: "Champion", level: 5 },
    { min: 6000, title: "Ambassador", level: 6 },
    { min: 12000, title: "Global Leader", level: 7 },
  ]

  let currentLevel = levels[0]
  let nextLevel = levels[1]

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].min) {
      currentLevel = levels[i]
      nextLevel = levels[i + 1] || levels[i]
    }
  }

  const progress = nextLevel.min > currentLevel.min
    ? ((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    progress
  }
}