import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react'

// Heartfelt Indian/Urdu Romantic Ghazal & Bollywood notes progression (Raag Darbari / Pahadi romantic mood)
// Frequencies in Hz for D Minor romantic scale (D, E, F, G, A, Bb, C, D)
const NOTES = {
  D3: 146.83, F3: 174.61, A3: 220.00, C4: 261.63,
  D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
  A4: 440.00, Bb4: 466.16, C5: 523.25, D5: 587.33,
  E5: 659.25, F5: 698.46
}

// Romantic Urdu Melody motif (Tum Hi Ho / Raabta mood)
const MELODY = [
  // Phrase 1: "Tum hi ho... meri aashiqui"
  { note: 'A4', dur: 0.6, rest: 0.1 },
  { note: 'Bb4', dur: 0.4, rest: 0.05 },
  { note: 'A4', dur: 0.4, rest: 0.05 },
  { note: 'G4', dur: 0.5, rest: 0.1 },
  { note: 'F4', dur: 0.8, rest: 0.2 },
  { note: 'G4', dur: 0.5, rest: 0.1 },
  { note: 'A4', dur: 0.9, rest: 0.3 },

  // Phrase 2: "Kyunki tum hi ho... ab tum hi ho"
  { note: 'D4', dur: 0.5, rest: 0.05 },
  { note: 'F4', dur: 0.5, rest: 0.05 },
  { note: 'G4', dur: 0.5, rest: 0.05 },
  { note: 'A4', dur: 0.8, rest: 0.2 },
  { note: 'G4', dur: 0.5, rest: 0.1 },
  { note: 'F4', dur: 0.6, rest: 0.1 },
  { note: 'E4', dur: 0.7, rest: 0.2 },
  { note: 'D4', dur: 1.2, rest: 0.4 },

  // Phrase 3: "Tere liye hi jiye hum..." (Sweet high flute)
  { note: 'D5', dur: 0.6, rest: 0.1 },
  { note: 'C5', dur: 0.4, rest: 0.05 },
  { note: 'Bb4', dur: 0.5, rest: 0.1 },
  { note: 'A4', dur: 0.8, rest: 0.2 },
  { note: 'G4', dur: 0.5, rest: 0.05 },
  { note: 'A4', dur: 0.5, rest: 0.05 },
  { note: 'Bb4', dur: 0.7, rest: 0.2 },
  { note: 'A4', dur: 1.4, rest: 0.5 },
]

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [showNotification, setShowNotification] = useState(true)

  const audioCtxRef = useRef(null)
  const isPlayingRef = useRef(false)
  const loopTimeoutRef = useRef(null)
  const masterGainRef = useRef(null)

  // Initialize Web Audio Engine
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioContext()

      const masterGain = audioCtxRef.current.createGain()
      masterGain.gain.setValueAtTime(volume * 0.35, audioCtxRef.current.currentTime)
      masterGain.connect(audioCtxRef.current.destination)
      masterGainRef.current = masterGain
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  // Play a single flute/piano note with soft vibrato and reverb envelope
  const playTone = (freq, duration, delay) => {
    if (!audioCtxRef.current || !isPlayingRef.current) return

    const ctx = audioCtxRef.current
    const startTime = ctx.currentTime + delay

    // Flute-like warm sine wave with triangle overtone
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const noteGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    // Warm lowpass for acoustic bansuri feel
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1400, startTime)
    filter.Q.setValueAtTime(3, startTime)

    // Gentle pitch vibrato
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()
    vibrato.frequency.setValueAtTime(5, startTime) // 5Hz vibrato
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime) // subtle 1.5% pitch variation
    vibrato.connect(osc1.frequency)
    vibrato.start(startTime + 0.1)
    vibrato.stop(startTime + duration)

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, startTime)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq, startTime)

    // Soft attack, singing sustain, gentle release envelope
    noteGain.gain.setValueAtTime(0.0001, startTime)
    noteGain.gain.exponentialRampToValueAtTime(0.4, startTime + 0.12)
    noteGain.gain.setValueAtTime(0.35, startTime + duration * 0.7)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    osc1.connect(noteGain)
    osc2.connect(noteGain)
    noteGain.connect(filter)
    filter.connect(masterGainRef.current)

    osc1.start(startTime)
    osc2.start(startTime)
    osc1.stop(startTime + duration)
    osc2.stop(startTime + duration)

    // Deep warm drone piano bass note in background on main beats
    if (freq > 350) {
      const bassOsc = ctx.createOscillator()
      const bassGain = ctx.createGain()
      bassOsc.type = 'sine'
      bassOsc.frequency.setValueAtTime(NOTES.D3, startTime)
      bassGain.gain.setValueAtTime(0.001, startTime)
      bassGain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.05)
      bassGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.5)

      bassOsc.connect(bassGain)
      bassGain.connect(masterGainRef.current)
      bassOsc.start(startTime)
      bassOsc.stop(startTime + duration * 1.5)
    }
  }

  // Play continuous melody loop
  const startMelodyLoop = () => {
    let currentDelay = 0

    MELODY.forEach((item) => {
      const freq = NOTES[item.note] || 440
      playTone(freq, item.dur, currentDelay)
      currentDelay += item.dur + item.rest
    })

    // Schedule next loop repetition
    if (isPlayingRef.current) {
      loopTimeoutRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          startMelodyLoop()
        }
      }, currentDelay * 1000)
    }
  }

  const togglePlay = () => {
    initAudio()
    setHasInteracted(true)

    if (isPlaying) {
      isPlayingRef.current = false
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
      setIsPlaying(false)
    } else {
      isPlayingRef.current = true
      setIsPlaying(true)
      startMelodyLoop()
    }
  }

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume * 0.35, audioCtxRef.current.currentTime)
    }
  }, [volume])

  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Floating Info Pill on start */}
      <AnimatePresence>
        {!hasInteracted && showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden sm:flex items-center gap-2 glass-pill px-4 py-2 rounded-full cursor-pointer hover:border-rose-400/60 transition-all text-xs text-rose-200"
            onClick={togglePlay}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Play Romantic Music for Samana 🎵</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
              className="text-white/40 hover:text-white ml-1 text-sm font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Control Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 shadow-xl ${
          isPlaying 
            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border border-rose-300/40 glow-box-pink' 
            : 'bg-black/60 backdrop-blur-md text-rose-200 border border-white/10 hover:border-rose-500/40'
        }`}
        title={isPlaying ? 'Pause Romantic Music' : 'Play Romantic Urdu Music'}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Wave */}
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-white rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-4"></span>
              <span className="w-1 bg-white rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-2"></span>
              <span className="w-1 bg-white rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.1s] h-3.5"></span>
            </div>
            <span className="text-xs font-semibold tracking-wide flex items-center gap-1 font-sans">
              <span>Romantic Song</span>
              <Heart className="w-3 h-3 fill-white text-white animate-pulse" />
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-medium tracking-wide">Play Music 🎵</span>
          </>
        )}
      </motion.button>
    </div>
  )
}
