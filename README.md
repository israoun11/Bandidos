# Bandidõs — Burgers & Ciabattas, Gabès

A real restaurant website for **Bandidõs** (Gabès, Tunisia), built with
React, Vite, Three.js / React Three Fiber, Framer Motion, and Lenis for
smooth scrolling. No backend, no database, no fake ordering system.

The signature piece is an interactive, scroll-driven 3D burger built from
real assets (Kenney's Food Kit): it separates into its real components
(bottom bun, lettuce, patty, cheese, tomato, top bun, plus an onion garnish)
as you scroll, then reconstructs — sitting on top of the real menu, address
and contact info for the restaurant.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## What's real vs. what's placeholder

Everything on the site — the name, logo, menu items, prices (in DT), and
the address/hours/phone — was taken directly from materials the client
provided (see `src/data/menu.js` and `src/data/restaurant.js`). Nothing
was invented.

**Still needed from the client:**
- The exact Instagram handle/URL (a profile screenshot was provided, but
  not the @handle itself). Currently shown as a marked placeholder in the
  footer (`src/data/restaurant.js` → `instagram: null`).
- Confirmation that `+216` is the correct country code to dial the
  provided phone number from outside Tunisia (used only in the `tel:` link
  — the displayed number is exactly as given).
- Real food photography, if you'd like it added anywhere the 3D burger
  isn't — currently the site has no dish photos, by design, since none
  were provided.

## The 3D burger

Two burger assets work together, each doing the job it's suited for:

- **`public/models/food/`** (Kenney Food Kit) — six separate, named meshes
  (bottom bun, lettuce, patty, cheese, tomato, top bun) that drive the
  entire scroll-driven exploded/rebuild animation, exactly as before.
- **`public/models/burger/burger.glb`** (real photoscanned burger, CC0,
  Pixabay) — a single fused mesh with genuine baked photo textures
  (base color + normal + ORM). It cannot be split into ingredients, so
  instead it's shown only at the two moments the burger is whole anyway —
  the opening hero shot and the final reconstructed shot — crossfading in
  as the Kenney pieces crossfade out (`src/utils/bookend.js`). The
  existing camera choreography and the middle of the scroll sequence are
  completely unchanged.

Realism pass on top of both: per-ingredient material tuning (glossy
cheese, matte bread, shiny tomato), a small offline procedural
environment map for real reflections, `drei`'s `<ContactShadows>` for a
grounded soft shadow, and a subtle autofocus depth-of-field pass via
`@react-three/postprocessing` — see `src/three/Experience.jsx` and
`src/three/Lighting.jsx`.

**Not yet verified — I couldn't `npm install` in this sandbox:** the
`@react-three/postprocessing` + `postprocessing` dependency pair added for
the depth-of-field effect. The API usage follows the standard documented
pattern, but this is the one piece of this change I haven't been able to
build-test. If the 3D scene fails to render after `npm install`, this is
the first thing to check — removing the `<CinematicDepthOfField />` line
in `Experience.jsx` isolates it immediately.

## Project structure

```
src/
  components/   Loader, custom cursor, nav, footer, scroll progress bar
  sections/     Hero + cinematic burger scenes, menu, about, location, contact
  three/        Canvas, camera rig, lighting, plate, ingredient journey
  hooks/        Lenis smooth-scroll wiring, scroll-progress hook for UI
  data/         Real menu + restaurant data
  utils/        Keyframe interpolation math, scroll-state singleton, ingredient→color mapping
```

## Accessibility & performance

- Respects `prefers-reduced-motion`.
- Custom cursor (mix-blend-mode based, visible on both the dark cinematic
  track and the light content sections) is disabled on touch devices.
- `dpr` capped at `[1, 1.8]`; no unbounded particle counts.
