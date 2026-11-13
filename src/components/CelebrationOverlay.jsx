import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, RotateCcw, Stars, Crown } from 'lucide-react'
import Catto from './Catto'

export default function CelebrationOverlay({ onReplay }) {
  useEffect(() => {
    // Launch celebratory fireworks and confetti bursts
    const duration = 6 * 1000
    const end = Date.now() + duration

    const frame = () => {
      // Launch from left
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#e11d48', '#c084fc']
      })
      // Launch from right
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#e11d48', '#c084fc']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    // Heart explosion in center
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#e11d48', '#f43f5e', '#fda4af', '#fbbf24']
      })
    }, 400)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto"
    >
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-500/30 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        className="relative z-10 w-full max-w-lg p-6 sm:p-10 rounded-3xl glass-panel border border-rose-400/40 text-center shadow-2xl glow-box-pink my-auto"
      >
        {/* Crown & Fireworks badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-4">
          <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>SHE SAID YES! 🎉💍</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        </div>

        {/* Celebrating Catto */}
        <div className="my-2">
          <Catto
            mood="celebrating"
            size="md"
            message="Mubarak ho! Samana agreed! Catto is dancing! 🐱🎉"
          />
        </div>

        {/* Romantic Success Title */}
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
          You Just Made Me The
        </h2>
        <h3 className="font-romantic text-4xl sm:text-6xl text-rose-400 font-bold mb-4 glow-pink-text">
          Happiest Person! ❤️
        </h3>

        {/* Romantic Urdu & English Message */}
        <div className="space-y-3 mb-6 bg-black/30 p-4 rounded-2xl border border-rose-500/20 text-rose-100 text-sm sm:text-base leading-relaxed">
          <p className="font-romantic text-2xl sm:text-3xl text-amber-200">
            "Tere muskuraane se hi meri duniya aabaad hai... 🌹"
          </p>
          <p className="text-rose-200/90 font-light">
            Samana, this moment will forever be etched in my heart. I promise to cherish, care for, and bring a smile to your face every single day.
          </p>
          <div className="pt-2 border-t border-rose-500/20 flex items-center justify-center gap-2 text-rose-300 font-medium text-sm">
            <span>Samana</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-ping" />
            <span>Hassan Shair</span>
            <span className="text-amber-300">Forever 💍</span>
          </div>
        </div>

        {/* Action Button: Replay */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium shadow-lg hover:shadow-rose-500/50 transition-all border border-rose-300/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Love Story 🌹</span>
          </motion.button>
        </div>

        {/* Footer Signature */}
        <p className="mt-5 text-xs text-rose-300/60 tracking-wider uppercase font-medium">
          Created with endless love by Hassan Shair for Samana ❤️
        </p>
      </motion.div>
    </motion.div>
  )
}
