import { motion } from 'framer-motion'
import { MapPin, Clock, Phone } from 'lucide-react'
import { RESTAURANT } from '../data/restaurant'

export default function LocationSection() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.mapsQuery)}`
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(RESTAURANT.mapsQuery)}&output=embed`

  return (
    <section id="adresse" className="relative bg-cream-100 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs tracking-widest2 text-green-700">ADRESSE</p>
          <h2 className="mt-3 font-display text-3xl tracking-wide text-ink-900 md:text-4xl">
            Nous trouver
          </h2>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin size={20} className="mt-0.5 shrink-0 text-green-700" />
              <div>
                <p className="font-body text-base text-ink-900">{RESTAURANT.address.line1}</p>
                <p className="font-body text-base text-ink-900">{RESTAURANT.address.line2}</p>
                <p className="font-body text-sm text-ink-800/60">{RESTAURANT.address.city}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock size={20} className="mt-0.5 shrink-0 text-green-700" />
              <div>
                {RESTAURANT.hours.map((h) => (
                  <p key={h.days} className="font-body text-base text-ink-900">
                    {h.days} — {h.time}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={20} className="mt-0.5 shrink-0 text-green-700" />
              <a
                href={RESTAURANT.phone.href}
                className="font-body text-base text-ink-900 hover:text-green-700"
                data-cursor-hover
              >
                {RESTAURANT.phone.display}
              </a>
            </div>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-green-700 px-6 py-3 font-body text-sm font-semibold tracking-wide text-cream-50 transition-colors hover:bg-green-600"
            data-cursor-hover
          >
            Itinéraire
          </a>
        </motion.div>

        <motion.div
          className="h-72 w-full overflow-hidden rounded-2xl border border-ink-900/10 md:h-full md:min-h-[22rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            title="Bandidõs — carte"
            src={mapsEmbedSrc}
            className="h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
