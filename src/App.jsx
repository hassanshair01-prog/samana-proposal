import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from './components/AudioPlayer'
import Scene1Welcome from './components/Scene1Welcome'
import Scene2Apology from './components/Scene2Apology'
import Scene3Garden from './components/Scene3Garden'
import Scene4Special from './components/Scene4Special'
import Scene5Proposal from './components/Scene5Proposal'
import CelebrationOverlay from './components/CelebrationOverlay'
import { Heart } from 'lucide-react'

export default function App() {
  const [currentScene, setCurrentScene] = useState(1)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleNext = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReplay = () => {
    setShowCelebration(false)
    setCurrentScene(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sceneNames = [
    "Welcome",
    "Please Don't Be Angry",
    "I'm Sorry",
    "You Are Special",
    "The Proposal"
  ]

  return (
    <div className="relative min-h-screen w-full bg-[#08020d] text-white selection:bg-rose-500 selection:text-white overflow-x-hidden font-sans">
      {/* Background Romantic Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-purple-950/25 rounded-full blur-[160px]" />
      </div>

      {/* Floating Header */}
      <header className="fixed top-4 left-4 z-50 flex items-center gap-3">
        <div className="glass-panel px-4 py-2 rounded-full border border-rose-500/30 flex items-center gap-2 shadow-lg">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="font-romantic text-lg sm:text-xl text-rose-200">
            Samana & Hassan Shair
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
            Forever ❤️
          </span>
        </div>
      </header>

      {/* Romantic Audio Player */}
      <AudioPlayer />

      {/* Scene Navigation Dots / Progress */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-panel px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-xl">
        {sceneNames.map((name, idx) => {
          const step = idx + 1
          const isActive = currentScene === step
          return (
            <button
              key={step}
              onClick={() => {
                setCurrentScene(step)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              title={name}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-7 sm:w-8 h-2.5 bg-gradient-to-r from-rose-500 to-pink-500 shadow-md'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          )
        })}
      </nav>

      {/* Main Dynamic Scene Container */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Scene1Welcome onStart={handleNext} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Scene2Apology onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Scene3Garden onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Scene4Special onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Scene5Proposal onYes={() => setShowCelebration(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Celebration Modal / Fireworks Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay onReplay={handleReplay} />
        )}
      </AnimatePresence>
    </div>
  )
}
