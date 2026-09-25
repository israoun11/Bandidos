import { motion } from 'framer-motion'

export default function FireSection() {
  return (
    <section className="relative flex h-screen items-center justify-center">
      <motion.div
        className="px-6 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-4xl tracking-wide text-cream-50 md:text-5xl">
          Puis vient la cuisson.
        </h2>
      </motion.div>
    </section>
  )
}
