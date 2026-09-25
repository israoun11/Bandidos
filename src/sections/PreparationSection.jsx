import { motion } from 'framer-motion'

export default function PreparationSection() {
  return (
    <section className="relative flex h-screen items-end md:items-center">
      <motion.div
        className="max-w-sm px-6 pb-24 md:px-16 md:pb-0"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-3xl tracking-wide text-cream-50 md:text-4xl">
          Couche par couche.
        </h2>
      </motion.div>
    </section>
  )
}
