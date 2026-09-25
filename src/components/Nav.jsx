import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { RESTAURANT } from '../data/restaurant'

const LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#apropos', label: 'À propos' },
  { href: '#adresse', label: 'Adresse' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf
    const compute = () => {
      setSolid(window.scrollY > window.innerHeight * 0.7)
      raf = requestAnimationFrame(compute)
    }
    raf = requestAnimationFrame(compute)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-cream-100/95 backdrop-blur-md hairline' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <a href="#top" className="flex items-center gap-3" data-cursor-hover>
          <img
            src="/images/logo-bandidos.png"
            alt="Bandidõs"
            className="h-11 w-11 rounded-full md:h-12 md:w-12"
          />
          <span
            className={`font-display text-xl tracking-wide ${solid ? 'text-ink-900' : 'text-cream-50'}`}
          >
            BANDIDÕS
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-[13px] font-medium tracking-wide transition-colors ${
                solid ? 'text-ink-800/80 hover:text-green-700' : 'text-cream-100/85 hover:text-gold-400'
              }`}
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESTAURANT.phone.href}
            className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 font-body text-[13px] font-semibold tracking-wide text-cream-50 transition-colors hover:bg-green-600"
            data-cursor-hover
          >
            <Phone size={14} />
            Appeler
          </a>
        </nav>

        <button
          className={solid ? 'text-ink-900 md:hidden' : 'text-cream-50 md:hidden'}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          data-cursor-hover
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-ink-900/10 bg-cream-100 px-6 pb-6 pt-2 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-body text-sm font-medium tracking-wide text-ink-800/80"
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESTAURANT.phone.href}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-3 font-body text-sm font-semibold text-cream-50"
          >
            <Phone size={16} />
            Appeler — {RESTAURANT.phone.display}
          </a>
        </div>
      )}
    </header>
  )
}
