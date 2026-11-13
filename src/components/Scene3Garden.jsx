import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import RoseGarden3D from './3d/RoseGarden3D'
import Catto from './Catto'

export default function Scene3Garden({ onNext }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Rose Garden & Falling Petals */}
      <RoseGarden3D />

      {/* Atmospheric Garden Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c0316]/40 to-[#08020d] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Sweet Garden Catto with flowers */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <Catto
            mood="holding-rose"
            size="md"
            message="These roses are for you, sweet Samana 🌹🐾"
          />
        </motion.div>

        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-pill text-rose-200 text-xs sm:text-sm font-medium mb-6"
        >
          <span>🌹 A Garden of True Apology</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Main Apology Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-rose-500/30 glow-box-pink mb-8 w-full"
        >
          <h2 className="font-heading text-3xl sm:text-5xl text-rose-300 font-bold mb-4">
            "I'm Sorry, Samana 🥺"
          </h2>

          <div className="space-y-4 text-rose-100 text-base sm:text-lg leading-relaxed font-light">
            <p className="font-romantic text-2xl sm:text-3xl text-amber-200">
              "I don't want to win an argument. I want to win your smile." 💕
            </p>
            <p className="text-rose-200">
              "Your happiness means more to me than anything else in this world."
            </p>
            <div className="pt-3 border-t border-rose-500/20 text-xs sm:text-sm text-rose-300/80 font-romantic text-xl">
              "Aapki narazgi se mera din adhoora rehta hai..." — Hassan Shair 🌹
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 sm:px-11 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-medium text-base sm:text-lg tracking-wide shadow-xl border border-rose-300/40 glow-box-pink flex items-center gap-3"
        >
          <span className="font-heading">Do You Know How Special You Are? ✨</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  )
}
