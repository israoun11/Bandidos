import { motion } from 'framer-motion'

export default function FinalDishSection() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-end pb-28 text-center md:pb-36">
      <motion.div
        className="px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-5xl tracking-wide text-cream-50 md:text-6xl">VOTRE BURGER</h2>
        <p className="mt-4 font-body text-base text-cream-100/75">Prêt à déguster.</p>
      </motion.div>
    </section>
  )
}
