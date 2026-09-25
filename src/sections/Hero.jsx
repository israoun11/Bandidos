import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen flex-col items-center justify-center text-center">
      <motion.img
        src="/images/logo-bandidos.png"
        alt="Bandidõs"
        className="h-24 w-24 rounded-full shadow-lg md:h-28 md:w-28"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.h1
        className="mt-6 font-display text-6xl leading-none tracking-wide text-cream-50 sm:text-7xl md:text-8xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        BANDIDÕS
      </motion.h1>

      <motion.p
        className="mt-4 font-body text-sm tracking-widest2 text-gold-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        BURGERS · CIABATTAS — GABÈS
      </motion.p>

      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1 }}
      >
        <span className="font-body text-[10px] tracking-widest2 text-cream-100/60">DÉFILER</span>
        <motion.span
          className="h-10 w-px bg-cream-50/40"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  )
}
