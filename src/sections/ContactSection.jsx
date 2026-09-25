import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { RESTAURANT } from '../data/restaurant'

export default function ContactSection() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-green-800 px-6 py-24 text-center">
      <motion.img
        src="/images/logo-bandidos.png"
        alt="Bandidõs"
        className="h-16 w-16 rounded-full"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      />
      <motion.h2
        className="mt-6 max-w-xl font-display text-4xl tracking-wide text-cream-50 md:text-5xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Pour commander
      </motion.h2>
      <motion.p
        className="mt-2 font-body text-sm text-cream-100/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Appelez-nous directement.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <a
          href={RESTAURANT.phone.href}
          className="flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-ink-900 transition-colors hover:bg-gold-500"
          data-cursor-hover
        >
          <Phone size={16} />
          {RESTAURANT.phone.display}
        </a>
        <a
          href="#menu"
          className="px-8 py-3.5 font-body text-sm tracking-wide text-cream-100/80 transition-colors hover:text-cream-50"
          data-cursor-hover
        >
          Voir le menu
        </a>
      </motion.div>
    </section>
  )
}
