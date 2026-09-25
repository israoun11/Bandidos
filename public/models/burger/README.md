# /public/models/burger

`burger.glb` — a real photoscanned/sculpted burger (CC0, sourced from
Pixabay), used ONLY for the two "whole burger" bookend moments (the
opening hero shot and the final reconstructed shot). It crossfades with
the Kenney Food Kit ingredients from `../food/`, which still handle the
entire exploded/rebuild scroll sequence in between — this asset is a
single fused mesh (one continuous scan: bun, patty, cheese, lettuce,
tomato are not separable), so it cannot participate in that animation.

Notes for anyone swapping this asset later:
- It's authored **Z-up**, not glTF's standard Y-up — `RealisticBurger.jsx`
  applies a corrective rotation. A different model may already be Y-up.
- `SCALE` and `LIFT_Y` in `src/three/scenes/RealisticBurger.jsx` were
  computed from this specific file's bounding box. Re-derive them for any
  replacement model (read the accessor min/max, don't guess).
- Its own baked PBR materials (base color + normal + combined
  occlusion/roughness/metalness map) are used as-is and are not
  recolored/retuned, per the brief this was built to.
