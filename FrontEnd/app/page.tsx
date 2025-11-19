'use client'

import { motion } from 'framer-motion'
import { Search, ChefHat, Sparkles, TrendingUp, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = [
  { name: 'Breakfast', icon: '🌅', color: 'from-orange-400 to-amber-500' },
  { name: 'Lunch', icon: '🍱', color: 'from-emerald-400 to-teal-500' },
  { name: 'Dinner', icon: '🌙', color: 'from-purple-400 to-indigo-500' },
  { name: 'Snacks', icon: '🍿', color: 'from-pink-400 to-rose-500' },
  { name: 'Desserts', icon: '🍰', color: 'from-yellow-400 to-orange-400' },
]

const topPicks = [
  { id: 1, name: 'Veg Biryani', calories: 520, price: 12.99, rating: 4.8, image: '/veg-biryani-bowl-top-view.jpg' },
  { id: 2, name: 'Paneer Bowl', calories: 350, price: 10.99, rating: 4.6, image: '/paneer-tikka-bowl-top-view.jpg' },
  { id: 3, name: 'Grilled Chicken', calories: 480, price: 14.99, rating: 4.9, image: '/grilled-chicken-bowl-top-view.jpg' },
  { id: 4, name: 'Buddha Bowl', calories: 380, price: 11.99, rating: 4.7, image: '/buddha-bowl-healthy-top-view.jpg' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                <Sparkles className="h-4 w-4" />
                <span>Craft Your Perfect Meal</span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
                Build Your Dream Plate with{' '}
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  MealMagic
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground text-pretty md:text-xl">
                Create personalized meals with our interactive plate builder. Track nutrition, explore flavors, and make every meal magical.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full text-base">
                  <Link href="/meals">
                    <ChefHat className="mr-2 h-5 w-5" />
                    Start Building
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full text-base">
                  <Link href="/categories">Explore Categories</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-orange-400 to-pink-400" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">10k+ Users</div>
                    <div className="text-muted-foreground">Building meals daily</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img 
                    src="/colorful-food-bowl-with-rice-curry-vegetables-top-.jpg" 
                    alt="Hero meal"
                    className="h-full w-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 3, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 rounded-2xl bg-white p-4 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                    <span className="font-bold">4.9</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    x: [0, 3, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-20 left-10 rounded-2xl bg-white p-4 shadow-xl backdrop-blur-sm"
                >
                  <div className="text-sm font-medium text-orange-600">520 cal</div>
                  <div className="text-xs text-muted-foreground">Balanced</div>
                </motion.div>

                {/* Decorative gradient orbs */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute top-1/4 left-0 h-32 w-32 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-400/30 blur-2xl"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-1/4 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-pink-400/20 to-orange-400/20 blur-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for meals, ingredients, or cuisines..."
              className="h-14 rounded-full pl-12 pr-4 text-base shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Find the perfect meal for any time of day</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/categories">
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.color} p-6 shadow-lg transition-shadow hover:shadow-xl`}>
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-white text-lg">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Top Meal Picks</h2>
              <p className="mt-2 text-muted-foreground">Most loved by our community</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/meals">
                View All
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topPicks.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl bg-card shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                    <img
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-medium shadow-md">
                      <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                      <span>{meal.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{meal.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meal.calories} cal
                      </span>
                      <span className="font-bold text-foreground text-base">${meal.price}</span>
                    </div>
                    <Button className="w-full rounded-full" size="sm">
                      Add to Plate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-12 text-center shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
                Ready to Create Your Perfect Meal?
              </h2>
              <p className="text-lg text-orange-50 mb-8 max-w-2xl mx-auto">
                Join thousands of food lovers building personalized, nutritious meals every day
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full text-base">
                <Link href="/my-plate">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Build My Plate Now
                </Link>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
