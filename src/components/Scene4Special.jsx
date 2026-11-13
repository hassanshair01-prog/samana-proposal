import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Star, ArrowRight } from 'lucide-react'
import FloatingHearts3D from './3d/FloatingHearts3D'
import Catto from './Catto'

export default function Scene4Special({ onNext }) {
  const specialReasons = [
    {
      title: "Your Magical Smile",
      desc: "Your smile makes ordinary moments extraordinary.",
      urdu: "Tumhari muskurahat meri duniya roshan karti hai 🌸"
    },
    {
      title: "Our Conversations",
      desc: "Even a simple conversation with you can make my whole day.",
      urdu: "Tumse baat karke dil ko jo sukoon milta hai, kahin aur nahi ✨"
    },
    {
      title: "Your Pure Soul",
      desc: "Do you know how special you are, Samana? You are one of a kind.",
      urdu: "Samana, tum meri zindagi ka sabse khoobsurat hissa ho 💖"
    }
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Starlight & Floating Hearts */}
      <FloatingHearts3D heartsCount={window.innerWidth < 768 ? 6 : 10} />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-purple-700/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Special Catto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <Catto
            mood="happy"
            size="md"
            message="Samana is the most special person! Catto agrees! 🐾✨"
          />
        </motion.div>

        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-pill text-rose-200 text-xs sm:text-sm font-medium mb-6"
        >
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>You Are Beyond Special</span>
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-romantic text-5xl sm:text-7xl text-rose-300 font-bold mb-8 glow-pink-text"
        >
          Do You Know How Special You Are? 💖
        </motion.h2>

        {/* 3 Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          {specialReasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 + 0.2, duration: 0.7 }}
              className="glass-panel p-5 rounded-2xl border border-rose-500/20 text-left flex flex-col justify-between hover:border-rose-400/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <h3 className="font-heading text-lg font-bold text-rose-200 mb-1">
                  {item.title}
                </h3>
                <p className="text-rose-100/90 text-sm mb-3 font-light">
                  "{item.desc}"
                </p>
              </div>
              <p className="font-romantic text-base text-amber-200/90 pt-2 border-t border-white/5">
                {item.urdu}
              </p>
            </motion.div>
          ))}
        </div>

        {/* From Hassan Quote */}
        <div className="mb-8 text-rose-200 text-sm sm:text-base font-romantic text-2xl">
          "— Hassan Shair loves every little thing about you, Samana ❤️"
        </div>

        {/* Advance to Proposal */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="px-9 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-lg tracking-wide shadow-2xl border border-rose-300/40 glow-box-pink flex items-center gap-3"
        >
          <Heart className="w-5 h-5 fill-white text-white animate-bounce" />
          <span className="font-heading">I Have One Question For You... 💍</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  )
}
