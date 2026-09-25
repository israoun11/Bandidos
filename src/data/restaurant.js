// Real restaurant info, taken directly from the provided materials.
// Nothing here is invented. The Instagram handle was not captured in the
// provided screenshot, so it is left as a clearly marked placeholder —
// see TODO below.

export const RESTAURANT = {
  name: 'Bandidõs',
  city: 'Gabès',
  address: {
    line1: 'Rue de Paris',
    line2: 'Face au Théâtre (المسرح)',
    city: 'Gabès, Tunisie',
  },
  hours: [{ days: 'Tous les jours (7/7)', time: '12:00 — 01:00' }],
  phone: {
    display: '21 665 004',
    // NOTE: assumed Tunisia country code (+216) for the tel: link only —
    // the number itself is exactly as provided. Confirm before publishing.
    href: 'tel:+21621665004',
  },
  // TODO: add the real Instagram handle/URL — the screenshot provided
  // showed the profile but not the @handle or link.
  instagram: null,
  mapsQuery: 'Bandidos Rue de Paris Gabes Tunisie',
}
