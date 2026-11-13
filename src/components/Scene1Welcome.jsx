import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, ChevronDown } from 'lucide-react'
import FloatingHearts3D from './3d/FloatingHearts3D'
import Catto from './Catto'

export default function Scene1Welcome({ onStart }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Background Hearts & Starlight */}
      <FloatingHearts3D heartsCount={window.innerWidth < 768 ? 5 : 8} />

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[600px] h-[320px] md:h-[600px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[240px] md:w-[450px] h-[240px] md:h-[450px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Cute Welcome Catto */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <Catto
            mood="happy"
            size="md"
            message="Hey Samana! Look what Hassan made for you! 🐾✨"
          />
        </motion.div>

        {/* Small greeting badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-pill text-rose-200 text-xs sm:text-sm font-medium mb-6 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>A Magical Journey For A Queen</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        </motion.div>

        {/* Big Romantic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-romantic text-6xl sm:text-7xl md:text-8xl text-rose-400 font-bold mb-4 glow-pink-text leading-tight"
        >
          Hey Samana ❤️
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl text-rose-100 font-medium mb-4 max-w-2xl px-2"
        >
          "Someone has something special to tell you..."
        </motion.p>

        {/* Dedicated by Hassan Shair */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-panel px-5 py-2.5 rounded-2xl mb-10 border border-rose-500/30 flex items-center gap-2 text-rose-200 text-sm md:text-base font-romantic"
        >
          <span>💌 Dedicated with endless love</span>
          <span className="font-sans font-semibold text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded-full">
            From Hassan Shair
          </span>
        </motion.div>

        {/* Start Experience Button */}
        <motion.button
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(244,63,94,0.6)' }}
          whileTap={{ scale: 0.96 }}
          className="group relative px-8 sm:px-11 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-base sm:text-lg tracking-wide shadow-2xl border border-rose-300/40 glow-box-pink flex items-center gap-3 overflow-hidden"
        >
          {/* Shimmer light effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          <span className="font-heading tracking-wider">Start Experience ✨</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  )
}
