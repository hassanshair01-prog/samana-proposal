import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import FloatingHearts3D from './3d/FloatingHearts3D'
import Catto from './Catto'

export default function Scene2Apology({ onNext }) {
  const [isForgiven, setIsForgiven] = useState(false)
  const [showHeartBurst, setShowHeartBurst] = useState(false)

  const handleForgive = () => {
    setIsForgiven(true)
    setShowHeartBurst(true)
    setTimeout(() => {
      setShowHeartBurst(false)
    }, 2500)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Floating Hearts in soft purple/pink */}
      <FloatingHearts3D heartsCount={window.innerWidth < 768 ? 4 : 7} />

      {/* Heart Burst Animation when forgiven */}
      <AnimatePresence>
        {showHeartBurst && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i * 360) / 30
              const dist = 120 + Math.random() * 200
              const rad = (angle * Math.PI) / 180
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.6, 0.8],
                    x: Math.cos(rad) * dist,
                    y: Math.sin(rad) * dist,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  className="absolute text-2xl sm:text-3xl text-rose-500"
                >
                  ❤️
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Animated Catto holding red rose and pleading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-3"
        >
          <Catto
            mood={isForgiven ? 'happy' : 'holding-rose'}
            size="lg"
            message={
              isForgiven
                ? "Yay! Samana smiled! Hassan is so relieved! 🥰💖"
                : "Samana, please gussa mat ho na... 🥺🌹"
            }
          />
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass-panel p-6 sm:p-9 rounded-3xl border border-rose-500/30 glow-box-pink mb-8 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium mb-4">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Please Don't Be Angry</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl text-rose-300 font-bold mb-4">
            "Samana, I know you're upset with me..." 🥺
          </h2>

          <div className="space-y-3 text-rose-100 text-base sm:text-lg leading-relaxed font-light">
            <p>
              "Maybe I made a mistake, but seeing you upset doesn't feel right."
            </p>
            <p className="font-romantic text-2xl sm:text-3xl text-amber-200">
              "I just want to see your beautiful smile again." ✨
            </p>
            <p className="text-sm text-rose-300/80 pt-2 italic">
              — Dil se maafi mangta hoon Samana, galti ho gayi mujhse 🌹 (Hassan)
            </p>
          </div>
        </motion.div>

        {/* Action Button: Can You Forgive Me? */}
        {!isForgiven ? (
          <motion.button
            onClick={handleForgive}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-lg tracking-wide shadow-xl border border-rose-300/40 glow-box-pink flex items-center gap-3"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span className="font-heading">Can You Forgive Me? ❤️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="px-6 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
              <span>Thank you for your sweet heart, Samana! 💖</span>
            </div>

            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-pink-600 text-white font-medium text-base sm:text-lg tracking-wide shadow-xl border border-rose-300/40 flex items-center gap-3"
            >
              <span className="font-heading">Step Into Our Rose Garden 🌹</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
