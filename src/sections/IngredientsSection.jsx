import { motion } from 'framer-motion'

const LABELS = [
  { text: 'PAIN', className: 'left-[8%] top-[28%]' },
  { text: 'STEAK HACHÉ', className: 'right-[10%] top-[20%]' },
  { text: 'CHEDDAR', className: 'left-[12%] bottom-[30%]' },
  { text: 'LAITUE · TOMATE · OIGNON', className: 'right-[6%] bottom-[24%]' },
]

export default function IngredientsSection() {
  return (
    <section className="relative flex h-screen items-center justify-center">
      <motion.div
        className="max-w-sm px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-3xl tracking-wide text-cream-50 md:text-4xl">
          Chaque ingrédient a sa place.
        </h2>
      </motion.div>

      {LABELS.map((label, i) => (
        <motion.span
          key={label.text}
          className={`pointer-events-none absolute hidden font-body text-[11px] tracking-widest2 text-cream-100/70 md:block ${label.className}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
        >
          {label.text}
        </motion.span>
      ))}
    </section>
  )
}
