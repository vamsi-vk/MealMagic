'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Activity, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const macroData = [
  { name: 'Protein', value: 25, color: '#f97316' },
  { name: 'Carbs', value: 50, color: '#fb923c' },
  { name: 'Fats', value: 25, color: '#fdba74' },
]

const caloriesData = [
  { name: 'Basmati Rice', calories: 200 },
  { name: 'Butter Chicken', calories: 280 },
  { name: 'Naan Bread', calories: 150 },
]

const nutritionFacts = [
  { label: 'Total Calories', value: '630', unit: 'kcal', icon: Zap, color: 'text-orange-500' },
  { label: 'Protein', value: '32', unit: 'g', icon: Activity, color: 'text-emerald-500' },
  { label: 'Carbohydrates', value: '78', unit: 'g', icon: TrendingUp, color: 'text-blue-500' },
  { label: 'Fats', value: '18', unit: 'g', icon: Activity, color: 'text-purple-500' },
]

export default function NutritionPage() {
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
            <Link href="/my-plate">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Plate
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-2">
            Nutrition Summary
          </h1>
          <p className="text-lg text-muted-foreground">
            Detailed breakdown of your meal's nutritional content
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {nutritionFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl bg-card p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`rounded-full bg-muted p-2 ${fact.color}`}>
                  <fact.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{fact.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{fact.value}</span>
                <span className="text-muted-foreground">{fact.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Macro Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-card p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Macronutrient Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
              {macroData.map((macro) => (
                <div key={macro.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: macro.color }} />
                    <span className="font-medium">{macro.name}</span>
                  </div>
                  <span className="text-muted-foreground">{macro.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calories per Item */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl bg-card p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Calories Per Item</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="calories" 
                    fill="#f97316" 
                    radius={[8, 8, 0, 0]}
                    animationBegin={0}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-8 shadow-xl text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Nutritional Insights</h2>
          <div className="space-y-3">
            <p className="text-emerald-50">
              ✓ Your meal provides a balanced mix of macronutrients
            </p>
            <p className="text-emerald-50">
              ✓ Total calories are within the recommended range for a main meal
            </p>
            <p className="text-emerald-50">
              ✓ Good protein content to support muscle maintenance
            </p>
            <p className="text-emerald-50">
              💡 Consider adding more vegetables for extra fiber and vitamins
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
