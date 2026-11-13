import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export default function Catto({ 
  mood = 'pleading', // 'happy' | 'pleading' | 'celebrating' | 'holding-rose' | 'shy'
  message = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  showSpeech = true
}) {
  const [purring, setPurring] = useState(false)
  const [petCount, setPetCount] = useState(0)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-56 md:h-56'
  }[size]

  const handlePet = () => {
    setPurring(true)
    setPetCount(prev => prev + 1)
    setTimeout(() => setPurring(false), 1200)
  }

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Cute speech bubble */}
      {showSpeech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-2 max-w-[260px] md:max-w-[320px] px-3.5 py-1.5 rounded-2xl glass-panel border border-rose-400/30 text-center shadow-lg"
        >
          <p className="text-xs md:text-sm font-medium text-rose-200 flex items-center justify-center gap-1.5">
            <span>🐾</span>
            <span className="font-romantic text-base md:text-lg text-white">
              {message || (mood === 'pleading' ? "Samana, please gussa chhor do na? 🥺" : "Catto loves Samana! ❤️")}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </p>
          {/* Bubble beak */}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#17051e] border-r border-b border-rose-400/30"></div>
        </motion.div>
      )}

      {/* Floating hearts when petted */}
      {purring && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -45, scale: 1.2 }}
          exit={{ opacity: 0 }}
          className="absolute -top-6 text-rose-400 font-romantic font-bold text-lg flex items-center gap-1 pointer-events-none z-20"
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
          <span>Purr... Samana! 💕</span>
        </motion.div>
      )}

      {/* Catto SVG Character */}
      <motion.div
        onClick={handlePet}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClasses} cursor-pointer relative filter drop-shadow-[0_10px_20px_rgba(244,63,94,0.35)]`}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="catGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff5f7" />
              <stop offset="50%" stopColor="#fecdd3" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
            <linearGradient id="earInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="collarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>

          {/* Ears with twitch */}
          <motion.g
            animate={{ rotate: [-1, 2, -1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Left Ear */}
            <polygon points="50,75 30,22 85,48" fill="url(#catGradient)" stroke="#f43f5e" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="52,68 38,32 78,50" fill="url(#earInner)" />
            {/* Right Ear */}
            <polygon points="150,75 170,22 115,48" fill="url(#catGradient)" stroke="#f43f5e" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="148,68 162,32 122,50" fill="url(#earInner)" />
          </motion.g>

          {/* Tail wagging */}
          <motion.path
            d="M 160 155 Q 185 130 180 100 Q 175 80 185 70"
            fill="none"
            stroke="url(#catGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            animate={{ rotate: [0, 8, -6, 0] }}
            style={{ originX: '160px', originY: '155px' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cat Body */}
          <ellipse cx="100" cy="145" rx="55" ry="46" fill="url(#catGradient)" stroke="#f43f5e" strokeWidth="2.5" />
          
          {/* Belly highlight */}
          <ellipse cx="100" cy="150" rx="36" ry="30" fill="#ffffff" opacity="0.8" />

          {/* Cat Head */}
          <ellipse cx="100" cy="95" rx="52" ry="44" fill="url(#catGradient)" stroke="#f43f5e" strokeWidth="2.5" />

          {/* Sweet Cheeks (Blushing) */}
          <motion.ellipse 
            cx="64" cy="108" rx="12" ry="8" 
            fill="#fb7185" 
            opacity="0.65"
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.75, 0.55] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse 
            cx="136" cy="108" rx="12" ry="8" 
            fill="#fb7185" 
            opacity="0.65"
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.75, 0.55] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Eyes based on mood */}
          {mood === 'pleading' ? (
            /* Big pleading anime puppy eyes */
            <g>
              {/* Left Eye */}
              <ellipse cx="78" cy="92" rx="11" ry="14" fill="url(#eyeGradient)" />
              <circle cx="75" cy="88" r="4.5" fill="#ffffff" />
              <circle cx="82" cy="96" r="2.2" fill="#ffffff" />
              {/* Right Eye */}
              <ellipse cx="122" cy="92" rx="11" ry="14" fill="url(#eyeGradient)" />
              <circle cx="119" cy="88" r="4.5" fill="#ffffff" />
              <circle cx="126" cy="96" r="2.2" fill="#ffffff" />
              {/* Pleading brow lines */}
              <path d="M 68 76 Q 78 72 88 78" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 132 76 Q 122 72 112 78" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          ) : mood === 'celebrating' || mood === 'happy' ? (
            /* Happy crescent eyes */
            <g>
              <path d="M 68 94 Q 78 82 88 94" stroke="#881337" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 112 94 Q 122 82 132 94" stroke="#881337" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            /* Regular cute eyes with gentle blink */
            <g>
              <ellipse cx="78" cy="92" rx="9" ry="11" fill="url(#eyeGradient)" />
              <circle cx="75" cy="89" r="3.5" fill="#ffffff" />
              <ellipse cx="122" cy="92" rx="9" ry="11" fill="url(#eyeGradient)" />
              <circle cx="119" cy="89" r="3.5" fill="#ffffff" />
            </g>
          )}

          {/* Little Pink Nose */}
          <polygon points="96,104 104,104 100,109" fill="#f43f5e" />

          {/* Cute Cat Mouth */}
          <path d="M 94 111 Q 100 115 100 110 Q 100 115 106 111" stroke="#be123c" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Whiskers */}
          <line x1="50" y1="102" x2="28" y2="98" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          <line x1="50" y1="108" x2="25" y2="108" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          <line x1="50" y1="114" x2="30" y2="118" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          
          <line x1="150" y1="102" x2="172" y2="98" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          <line x1="150" y1="108" x2="175" y2="108" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          <line x1="150" y1="114" x2="170" y2="118" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />

          {/* Collar with Bell */}
          <path d="M 75 133 Q 100 142 125 133" stroke="url(#collarGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="100" cy="140" r="5.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="100" cy="141" r="1.5" fill="#78350f" />

          {/* Little Front Paws */}
          <ellipse cx="80" cy="165" rx="14" ry="11" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
          <ellipse cx="120" cy="165" rx="14" ry="11" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />

          {/* Cute accessories based on mood */}
          {mood === 'holding-rose' || mood === 'pleading' ? (
            /* Fresh Red Rose in paws */
            <g transform="translate(100, 155) scale(0.85)">
              <path d="M -15 15 Q -5 2 0 -12 Q 10 5 18 18" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Rose Petals */}
              <circle cx="0" cy="-14" r="10" fill="#e11d48" />
              <circle cx="-6" cy="-17" r="8" fill="#f43f5e" />
              <circle cx="6" cy="-17" r="8" fill="#be123c" />
              <circle cx="0" cy="-19" r="6" fill="#fb7185" />
              {/* Leaves */}
              <ellipse cx="-8" cy="2" rx="6" ry="3" fill="#16a34a" transform="rotate(-30 -8 2)" />
              <ellipse cx="9" cy="8" rx="6" ry="3" fill="#16a34a" transform="rotate(30 9 8)" />
            </g>
          ) : mood === 'celebrating' ? (
            /* Party Hat & Sparkles */
            <g>
              <polygon points="100,28 82,65 118,65" fill="#f43f5e" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="100" cy="25" r="4.5" fill="#fbbf24" />
              <line x1="88" y1="46" x2="112" y2="46" stroke="#fbbf24" strokeWidth="2" />
              <line x1="92" y1="56" x2="108" y2="56" stroke="#a855f7" strokeWidth="2" />
            </g>
          ) : null}
        </svg>

        {/* Small hint label */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-rose-300/70 bg-black/40 px-2 py-0.5 rounded-full border border-rose-500/20">
          Tap Catto 🐾
        </div>
      </motion.div>
    </div>
  )
}
