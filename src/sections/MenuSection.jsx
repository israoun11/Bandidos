import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MENU, MENU_CATEGORIES } from '../data/menu'
import { swatchFor } from '../utils/ingredientColors'

// A small "cross-section" stack — bread cap, then one bar per real
// ingredient, then bread cap — reading top to bottom like the dish itself.
// It's a direct visualization of the printed ingredient list, not a stock
// photo, and it echoes the 3D burger's own separate/reassemble idea.
function IngredientStack({ ingredients, expanded }) {
  return (
    <div className={`flex flex-col items-center gap-[3px] transition-all duration-300 ${expanded ? 'w-24' : 'w-16'}`}>
      <div className="h-2 w-full rounded-full bg-[#EFDBA0]" />
      {ingredients.map((ing, i) => (
        <div
          key={i}
          className="h-[5px] w-full rounded-full"
          style={{ backgroundColor: swatchFor(ing) }}
        />
      ))}
      <div className="h-2 w-full rounded-full bg-[#E4C688]" />
    </div>
  )
}

function MenuItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.button
      layout
      onClick={() => setOpen((v) => !v)}
      className="flex w-full items-start gap-5 border-b border-ink-900/10 py-6 text-left last:border-b-0"
      data-cursor-hover
    >
      <IngredientStack ingredients={item.ingredients} expanded={open} />

      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl tracking-wide text-ink-900 md:text-2xl">{item.name}</h3>
          <span className="shrink-0 font-display text-lg text-green-700">{item.price} DT</span>
        </div>

        <motion.p
          layout
          className={`mt-2 font-body text-sm text-ink-800/70 ${open ? '' : 'line-clamp-1'}`}
        >
          {item.ingredients.join(' · ')}
        </motion.p>
      </div>
    </motion.button>
  )
}

export default function MenuSection() {
  const [category, setCategory] = useState('Burgers')

  return (
    <section id="menu" className="relative bg-cream-100 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-display text-4xl tracking-wide text-ink-900 md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          MENU
        </motion.h2>
        <p className="mt-2 font-body text-sm text-ink-800/50">Prix en dinars tunisiens (DT)</p>

        <div className="mt-10 flex gap-3 border-b border-ink-900/10 pb-5">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 font-body text-sm font-semibold tracking-wide transition-colors ${
                category === cat
                  ? 'bg-green-700 text-cream-50'
                  : 'bg-cream-200/70 text-ink-800/60 hover:bg-cream-200'
              }`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {MENU[category].map((item) => (
              <MenuItem key={item.name} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
