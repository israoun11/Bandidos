import { Instagram } from 'lucide-react'
import { RESTAURANT } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 px-6 py-14 text-cream-100/80 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo-bandidos.png" alt="Bandidõs" className="h-12 w-12 rounded-full" />
          <div>
            <p className="font-display text-lg tracking-wide text-cream-50">BANDIDÕS</p>
            <p className="font-body text-xs text-cream-100/50">Burgers &amp; Ciabattas — Gabès</p>
          </div>
        </div>

        <div className="font-body text-sm">
          <p className="text-cream-50/90">{RESTAURANT.address.line1}</p>
          <p className="text-cream-50/90">{RESTAURANT.address.line2}</p>
          <p className="mt-2 text-cream-100/60">{RESTAURANT.address.city}</p>
          <a href={RESTAURANT.phone.href} className="mt-2 block text-cream-100/60 hover:text-gold-400" data-cursor-hover>
            {RESTAURANT.phone.display}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <nav className="flex gap-6 font-body text-sm">
            <a href="#menu" className="text-cream-100/70 hover:text-gold-400" data-cursor-hover>
              Menu
            </a>
            <a href="#apropos" className="text-cream-100/70 hover:text-gold-400" data-cursor-hover>
              À propos
            </a>
            <a href="#adresse" className="text-cream-100/70 hover:text-gold-400" data-cursor-hover>
              Adresse
            </a>
          </nav>

          {RESTAURANT.instagram ? (
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-body text-sm text-cream-100/70 hover:text-gold-400"
              data-cursor-hover
            >
              <Instagram size={16} /> Instagram
            </a>
          ) : (
            <span className="flex items-center gap-2 font-body text-sm text-cream-100/30">
              <Instagram size={16} /> Instagram — [lien à ajouter]
            </span>
          )}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl border-t border-cream-100/10 pt-6 font-body text-xs text-cream-100/40">
        © {new Date().getFullYear()} Bandidõs
      </p>
    </footer>
  )
}
