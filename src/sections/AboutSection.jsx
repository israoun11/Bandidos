import { motion } from 'framer-motion'

// Kept deliberately short — only what's actually known about the
// restaurant (name, what it serves, where). No invented history, no
// claims about awards, reviews, or practices that weren't provided.
export default function AboutSection() {
  return (
    <section id="apropos" className="relative bg-cream-200/60 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          className="font-body text-xs tracking-widest2 text-green-700"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          À PROPOS
        </motion.p>
        <motion.h2
          className="mt-3 font-display text-3xl tracking-wide text-ink-900 md:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Burgers &amp; ciabattas, à Gabès.
        </motion.h2>
      </div>
    </section>
  )
}
