'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Filter, Star, Clock, Flame, Plus, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

const meals = [
  { id: 1, name: 'Veg Biryani', type: 'Veg', category: 'lunch', calories: 520, price: 12.99, rating: 4.8, time: '25 min', image: '/veg-biryani-bowl-top-view.jpg' },
  { id: 2, name: 'Paneer Bowl', type: 'Veg', category: 'lunch', calories: 350, price: 10.99, rating: 4.6, time: '15 min', image: '/paneer-tikka-bowl-top-view.jpg' },
  { id: 3, name: 'Grilled Chicken', type: 'Non-Veg', category: 'dinner', calories: 480, price: 14.99, rating: 4.9, time: '30 min', image: '/grilled-chicken-bowl-top-view.jpg' },
  { id: 4, name: 'Buddha Bowl', type: 'Veg', category: 'healthy', calories: 380, price: 11.99, rating: 4.7, time: '20 min', image: '/buddha-bowl-healthy-top-view.jpg' },
  { id: 5, name: 'Salmon Teriyaki', type: 'Non-Veg', category: 'dinner', calories: 450, price: 16.99, rating: 4.8, time: '25 min', image: '/salmon-teriyaki-bowl-top-view.jpg' },
  { id: 6, name: 'Falafel Wrap', type: 'Veg', category: 'lunch', calories: 420, price: 9.99, rating: 4.5, time: '15 min', image: '/falafel-wrap-bowl-top-view.jpg' },
  { id: 7, name: 'Chicken Tikka', type: 'Non-Veg', category: 'dinner', calories: 490, price: 13.99, rating: 4.9, time: '28 min', image: '/chicken-tikka-bowl-top-view.jpg' },
  { id: 8, name: 'Quinoa Salad', type: 'Veg', category: 'healthy', calories: 320, price: 10.99, rating: 4.6, time: '12 min', image: '/quinoa-salad-bowl-top-view.jpg' },
  { id: 9, name: 'Samosa', type: 'Veg', category: 'snacks', calories: 280, price: 4.99, rating: 4.7, time: '10 min', image: '/crispy-samosa-plate-top-view.jpg' },
  { id: 10, name: 'Spring Rolls', type: 'Veg', category: 'snacks', calories: 220, price: 5.99, rating: 4.5, time: '12 min', image: '/spring-rolls-plate-top-view.jpg' },
  { id: 11, name: 'Nachos', type: 'Veg', category: 'snacks', calories: 450, price: 7.99, rating: 4.6, time: '8 min', image: '/loaded-nachos-plate-top-view.jpg' },
  { id: 12, name: 'Chicken Wings', type: 'Non-Veg', category: 'snacks', calories: 380, price: 9.99, rating: 4.8, time: '20 min', image: '/chicken-wings-plate-top-view.jpg' },
  { id: 13, name: 'Chocolate Cake', type: 'Veg', category: 'desserts', calories: 420, price: 6.99, rating: 4.9, time: '5 min', image: '/chocolate-cake-slice-plate-top-view.jpg' },
  { id: 14, name: 'Ice Cream Sundae', type: 'Veg', category: 'desserts', calories: 350, price: 5.99, rating: 4.7, time: '3 min', image: '/ice-cream-sundae-top-view.jpg' },
  { id: 15, name: 'Gulab Jamun', type: 'Veg', category: 'desserts', calories: 280, price: 4.99, rating: 4.8, time: '2 min', image: '/gulab-jamun-dessert-plate-top-view.jpg' },
  { id: 16, name: 'Tiramisu', type: 'Veg', category: 'desserts', calories: 390, price: 7.99, rating: 4.9, time: '5 min', image: '/tiramisu-dessert-plate-top-view.jpg' },
  { id: 17, name: 'Pancakes', type: 'Veg', category: 'breakfast', calories: 340, price: 8.99, rating: 4.6, time: '15 min', image: '/pancake-stack-plate-top-view.jpg' },
  { id: 18, name: 'Eggs Benedict', type: 'Non-Veg', category: 'breakfast', calories: 420, price: 11.99, rating: 4.8, time: '18 min', image: '/eggs-benedict-plate-top-view.jpg' },
  { id: 19, name: 'Avocado Toast', type: 'Veg', category: 'breakfast', calories: 290, price: 9.99, rating: 4.7, time: '10 min', image: '/avocado-toast-plate-top-view.jpg' },
  { id: 20, name: 'Margherita Pizza', type: 'Veg', category: 'comfort food', calories: 580, price: 13.99, rating: 4.9, time: '25 min', image: '/margherita-pizza-slice-plate-top-view.jpg' },
  { id: 21, name: 'Burger', type: 'Non-Veg', category: 'comfort food', calories: 650, price: 12.99, rating: 4.8, time: '20 min', image: '/burger-with-fries-plate-top-view.jpg' },
  { id: 22, name: 'Sushi Platter', type: 'Non-Veg', category: 'international', calories: 420, price: 18.99, rating: 4.9, time: '30 min', image: '/sushi-platter-top-view.jpg' },
  { id: 23, name: 'Tacos', type: 'Non-Veg', category: 'international', calories: 480, price: 10.99, rating: 4.7, time: '15 min', image: '/tacos-plate-top-view.jpg' },
  { id: 24, name: 'Pad Thai', type: 'Non-Veg', category: 'international', calories: 520, price: 13.99, rating: 4.8, time: '22 min', image: '/placeholder.svg?height=400&width=400' },
]

export default function MealsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All')
  const [addedMeals, setAddedMeals] = useState<number[]>([])

  const filteredMeals = meals.filter(meal => {
    const matchesCategory = !categoryParam || meal.category === categoryParam
    const matchesType = filter === 'All' || meal.type === filter
    return matchesCategory && matchesType
  })

  const handleAddToPlate = (mealId: number) => {
    if (addedMeals.includes(mealId)) {
      setAddedMeals(addedMeals.filter(id => id !== mealId))
    } else {
      setAddedMeals([...addedMeals, mealId])
    }
  }

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
          
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-2">
                {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Meals` : 'All Meals'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {filteredMeals.length} delicious options to choose from
              </p>
            </div>

            {addedMeals.length > 0 && (
              <Button asChild size="lg" className="rounded-full">
                <Link href="/my-plate">
                  View My Plate ({addedMeals.length})
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex items-center gap-3"
        >
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2">
            {(['All', 'Veg', 'Non-Veg'] as const).map((type) => (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Meals Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredMeals.map((meal, index) => {
              const isAdded = addedMeals.includes(meal.id)
              
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-3xl bg-card shadow-lg transition-shadow hover:shadow-xl h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={meal.type === 'Veg' ? 'default' : 'secondary'} className="rounded-full">
                          {meal.type}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-medium shadow-md">
                        <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                        <span>{meal.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-lg mb-3">{meal.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>{meal.calories} cal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{meal.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-xl">${meal.price}</span>
                        <Button
                          onClick={() => handleAddToPlate(meal.id)}
                          variant={isAdded ? 'secondary' : 'default'}
                          size="sm"
                          className="rounded-full"
                        >
                          {isAdded ? (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-4 w-4" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
