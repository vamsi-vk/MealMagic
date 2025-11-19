'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trash2, Plus, ChefHat, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PlateItem {
  id: number
  name: string
  calories: number
  price: number
  image: string
  layer: number
  position: { x: number; y: number }
  color: string
  type: 'rice' | 'curry' | 'bread' | 'vegetable' | 'protein'
}

const sampleItems: PlateItem[] = [
  { id: 1, name: 'Basmati Rice', calories: 200, price: 3.99, image: '/white-basmati-rice-pile.jpg', layer: 1, position: { x: 50, y: 55 }, color: '#FFF8DC', type: 'rice' },
  { id: 2, name: 'Butter Chicken', calories: 280, price: 8.99, image: '/butter-chicken-curry.png', layer: 2, position: { x: 30, y: 40 }, color: '#D2691E', type: 'curry' },
  { id: 3, name: 'Naan Bread', calories: 150, price: 2.99, image: '/naan-bread.png', layer: 3, position: { x: 70, y: 35 }, color: '#F5DEB3', type: 'bread' },
]

function FoodItemSVG({ item }: { item: PlateItem }) {
  const { type, color, position, name } = item
  
  if (type === 'rice') {
    return (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <ellipse cx="0" cy="0" rx="45" ry="35" fill={color} stroke="#E6D5B8" strokeWidth="1"/>
        {[...Array(30)].map((_, i) => (
          <ellipse 
            key={i}
            cx={(Math.random() - 0.5) * 70}
            cy={(Math.random() - 0.5) * 50}
            rx="2"
            ry="4"
            fill="#FFF"
            opacity="0.6"
            transform={`rotate(${Math.random() * 360})`}
          />
        ))}
      </g>
    )
  }
  
  if (type === 'curry') {
    return (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <ellipse cx="0" cy="0" rx="40" ry="32" fill={color} opacity="0.9"/>
        <ellipse cx="0" cy="0" rx="40" ry="32" fill="url(#curryGradient)" opacity="0.6"/>
        <ellipse cx="-10" cy="-5" rx="12" ry="10" fill="#FFE4B5" stroke="#DEB887" strokeWidth="1"/>
        <ellipse cx="8" cy="3" rx="10" ry="8" fill="#FFE4B5" stroke="#DEB887" strokeWidth="1"/>
        <ellipse cx="-5" cy="8" rx="9" ry="7" fill="#FFE4B5" stroke="#DEB887" strokeWidth="1"/>
        <ellipse cx="8" cy="-12" rx="10" ry="8" fill="#FF8C00" opacity="0.8"/>
      </g>
    )
  }
  
  if (type === 'bread') {
    return (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <ellipse cx="0" cy="0" rx="35" ry="25" fill={color} stroke="#D2B48C" strokeWidth="1.5"/>
        <circle cx="-8" cy="-4" r="5" fill="#DEB887" opacity="0.4"/>
        <circle cx="10" cy="2" r="4" fill="#DEB887" opacity="0.4"/>
        <circle cx="-5" cy="6" r="3" fill="#DEB887" opacity="0.4"/>
        <ellipse cx="5" cy="-6" rx="6" ry="4" fill="#FFF" opacity="0.2"/>
      </g>
    )
  }
  
  if (type === 'vegetable') {
    return (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <circle cx="0" cy="0" r="15" fill="#90EE90" opacity="0.8"/>
        <circle cx="-18" cy="5" r="12" fill="#FF6347" opacity="0.8"/>
        <circle cx="15" cy="8" r="13" fill="#FFD700" opacity="0.8"/>
        <ellipse cx="8" cy="-12" rx="10" ry="8" fill="#FF8C00" opacity="0.8"/>
      </g>
    )
  }
  
  if (type === 'protein') {
    return (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <ellipse cx="0" cy="0" rx="30" ry="22" fill="#CD853F" stroke="#8B4513" strokeWidth="1.5"/>
        <line x1="-25" y1="-8" x2="25" y2="-8" stroke="#654321" strokeWidth="2" opacity="0.6"/>
        <line x1="-25" y1="0" x2="25" y2="0" stroke="#654321" strokeWidth="2" opacity="0.6"/>
        <line x1="-25" y1="8" x2="25" y2="8" stroke="#654321" strokeWidth="2" opacity="0.6"/>
      </g>
    )
  }
  
  return null
}

export default function MyPlatePage() {
  const [plateItems, setPlateItems] = useState<PlateItem[]>(sampleItems)

  const totalCalories = plateItems.reduce((sum, item) => sum + item.calories, 0)
  const totalPrice = plateItems.reduce((sum, item) => sum + item.price, 0)

  const removeItem = (id: number) => {
    setPlateItems(plateItems.filter(item => item.id !== id))
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
            <Link href="/meals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Meals
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-2">
            My Plate
          </h1>
          <p className="text-lg text-muted-foreground">
            Build your perfect meal combination
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Plate Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-3xl bg-card p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-orange-500" />
                Your Plate
              </h2>

              <div className="relative aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="plateGradient">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#F5F5F5" />
                      <stop offset="100%" stopColor="#E0E0E0" />
                    </radialGradient>
                    <radialGradient id="curryGradient">
                      <stop offset="0%" stopColor="#FF6347" />
                      <stop offset="100%" stopColor="#D2691E" />
                    </radialGradient>
                    <filter id="plateShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                      <feOffset dx="0" dy="4" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <ellipse cx="100" cy="105" rx="82" ry="78" fill="#000" opacity="0.1" filter="blur(8px)"/>
                  
                  <circle cx="100" cy="100" r="80" fill="url(#plateGradient)" filter="url(#plateShadow)" stroke="#D0D0D0" strokeWidth="2"/>
                  
                  <circle cx="100" cy="100" r="75" fill="none" stroke="#E8E8E8" strokeWidth="1" opacity="0.6"/>
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#F0F0F0" strokeWidth="0.5" opacity="0.4"/>

                  <AnimatePresence>
                    {plateItems.length === 0 ? (
                      <g>
                        <text x="100" y="100" textAnchor="middle" fill="#999" fontSize="14" fontWeight="500">
                          Empty Plate
                        </text>
                      </g>
                    ) : (
                      plateItems.map((item, index) => (
                        <motion.g
                          key={item.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            type: 'spring',
                            delay: index * 0.15,
                            duration: 0.6
                          }}
                        >
                          <FoodItemSVG item={item} />
                        </motion.g>
                      ))
                    )}
                  </AnimatePresence>
                </svg>

                {plateItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Start adding items to your plate</p>
                      <Button asChild className="rounded-full">
                        <Link href="/meals">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Items
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Items List & Summary */}
          <div className="space-y-6">
            {/* Items */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-card p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6">Items on Your Plate</h2>

              {plateItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No items added yet. Start building your meal!
                </p>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {plateItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-4 rounded-2xl bg-muted/50 p-4"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.calories} cal • ${item.price}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 shadow-xl text-white"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Meal Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">Total Calories</span>
                  <span className="text-2xl font-bold">{totalCalories}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">Total Price</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">Items</span>
                  <span className="text-2xl font-bold">{plateItems.length}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild variant="secondary" size="lg" className="w-full rounded-full">
                  <Link href="/nutrition">View Nutrition Details</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link href="/meals">
                    <Plus className="mr-2 h-4 w-4" />
                    Add More Items
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
