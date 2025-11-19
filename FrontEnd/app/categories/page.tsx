'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
  { 
    name: 'Breakfast', 
    icon: '🌅', 
    color: 'from-orange-400 to-amber-500',
    description: 'Start your day right',
    count: 45
  },
  { 
    name: 'Lunch', 
    icon: '🍱', 
    color: 'from-emerald-400 to-teal-500',
    description: 'Midday fuel',
    count: 67
  },
  { 
    name: 'Dinner', 
    icon: '🌙', 
    color: 'from-purple-400 to-indigo-500',
    description: 'Evening delights',
    count: 89
  },
  { 
    name: 'Snacks', 
    icon: '🍿', 
    color: 'from-pink-400 to-rose-500',
    description: 'Quick bites',
    count: 52
  },
  { 
    name: 'Desserts', 
    icon: '🍰', 
    color: 'from-yellow-400 to-orange-400',
    description: 'Sweet treats',
    count: 38
  },
  { 
    name: 'Healthy', 
    icon: '🥗', 
    color: 'from-green-400 to-emerald-500',
    description: 'Nutritious choices',
    count: 71
  },
  { 
    name: 'Comfort Food', 
    icon: '🍕', 
    color: 'from-red-400 to-orange-500',
    description: 'Soul warming',
    count: 43
  },
  { 
    name: 'International', 
    icon: '🌍', 
    color: 'from-blue-400 to-cyan-500',
    description: 'Global flavors',
    count: 95
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/30 to-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Explore Food Categories
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover meals organized by type, time of day, and cuisine
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/meals?category=${category.name.toLowerCase()}`}>
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.color} p-8 shadow-lg transition-shadow hover:shadow-xl h-full`}>
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="font-bold text-white text-2xl mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm mb-3">{category.description}</p>
                    <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      {category.count} meals
                    </div>
                  </div>
                  
                  {/* Decorative circle */}
                  <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
