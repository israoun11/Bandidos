import { motion } from 'framer-motion'

export default function PlatingSection() {
  return (
    <section className="relative flex h-screen items-start justify-center pt-28 md:pt-32">
      <motion.div
        className="px-6 text-center"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs tracking-widest2 text-gold-400">RECONSTRUCTION</p>
        <h2 className="mt-3 font-display text-3xl tracking-wide text-cream-50 md:text-4xl">
          Il se reconstruit, pièce par pièce.
        </h2>
      </motion.div>
    </section>
  )
}
