import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Gift } from 'lucide-react'
import RingBox3D from './3d/RingBox3D'
import FloatingHearts3D from './3d/FloatingHearts3D'
import Catto from './Catto'

export default function Scene5Proposal({ onYes }) {
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)

  const handleOpenBox = () => {
    setIsBoxOpen(true)
    setTimeout(() => {
      setHasRevealed(true)
    }, 900)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Floating Hearts in background */}
      <FloatingHearts3D heartsCount={window.innerWidth < 768 ? 5 : 9} />

      {/* Atmospheric Proposal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Proposal Catto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-2"
        >
          <Catto
            mood={hasRevealed ? 'celebrating' : 'holding-rose'}
            size="md"
            message={
              hasRevealed
                ? "Say YES Samana! Hassan loves you so much! 💍🐾"
                : "Open the box, Samana! Something magical inside! 🎁✨"
            }
          />
        </motion.div>

        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-pill text-rose-200 text-xs sm:text-sm font-medium mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Grand Moment For Samana</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        </motion.div>

        <h1 className="font-romantic text-5xl sm:text-7xl text-rose-400 font-bold mb-2 glow-pink-text">
          Samana ❤️
        </h1>
        <p className="font-heading text-lg sm:text-2xl text-rose-100 font-medium mb-4">
          "I have something important to ask you..."
        </p>

        {/* 3D Ring Box with smooth opening animation */}
        <div className="w-full max-w-md relative -my-4 sm:-my-2">
          <RingBox3D isOpen={isBoxOpen} />
        </div>

        {/* Button to open box if not open yet */}
        {!isBoxOpen && (
          <motion.button
            onClick={handleOpenBox}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-medium text-base shadow-xl border border-amber-300/40 glow-box-gold flex items-center gap-2.5"
          >
            <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
            <span className="font-heading">Open The Ring Box 💍</span>
          </motion.button>
        )}

        {/* Question & The Two YES Buttons */}
        <AnimatePresence>
          {hasRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="mt-4 flex flex-col items-center"
            >
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/40 glow-box-pink mb-8 max-w-xl text-center">
                <h2 className="font-romantic text-4xl sm:text-6xl text-rose-300 font-bold mb-3 glow-pink-text">
                  Will You Be Mine Forever? 💍
                </h2>
                <p className="text-rose-100 text-sm sm:text-base font-light">
                  "Har pal, har saans, sirf tumhare naam karna chahta hoon..."
                </p>
                <p className="font-romantic text-2xl text-amber-200 mt-2">
                  — Hassan Shair 🌹
                </p>
              </div>

              {/* The Two Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <motion.button
                  onClick={onYes}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 35px rgba(244,63,94,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 text-white font-heading text-xl font-bold tracking-wide shadow-2xl border border-rose-300/40 glow-box-pink flex items-center justify-center gap-3"
                >
                  <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
                  <span>YES! ❤️</span>
                </motion.button>

                <motion.button
                  onClick={onYes}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 35px rgba(236,72,153,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-heading text-xl font-bold tracking-wide shadow-2xl border border-pink-300/40 glow-box-pink flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
                  <span>Of Course! 🥰</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
