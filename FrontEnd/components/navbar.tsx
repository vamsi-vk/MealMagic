'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChefHat, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Meals', href: '/meals' },
  { name: 'My Plate', href: '/my-plate' },
  { name: 'Nutrition', href: '/nutrition' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="rounded-full bg-gradient-to-br from-orange-500 to-amber-500 p-2">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              MealMagic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.name} asChild variant="ghost" className="rounded-full">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  className="justify-start rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
