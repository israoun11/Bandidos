// Maps a real ingredient name (as printed on the menu) to a representative
// swatch color, used to render each dish as a small "cross-section" stack —
// purely a visualization of the real ingredient list, nothing invented.
// Order matters: more specific matches are checked before generic ones.

const RULES = [
  [/cheddar|mozzarella|gruy[eè]re|parmigiano|fromage/i, '#E8B93D'],
  [/oignons? caram[eé]lis[eé]s?/i, '#C98A3F'],
  [/oignon/i, '#E4D6A6'],
  [/laitue|roquette|pesto/i, '#6E8F4E'],
  [/sauce tomate|^tomate$|tomate\b/i, '#B4472E'],
  [/harissa|sriracha/i, '#C43A1E'],
  [/sauce/i, '#C7A063'],
  [/bacon/i, '#8A3A2A'],
  [/merguez/i, '#8A2E22'],
  [/crevettes/i, '#D98B72'],
  [/steak hach[eé]|viande hach[eé]e|viande cuite|double steak|triple steak/i, '#6B4226'],
  [/poulet|cordon bleu/i, '#E6C892'],
  [/œuf|oeuf/i, '#F0D9A0'],
  [/champignons/i, '#8C7B5C'],
]

export function swatchFor(ingredient) {
  for (const [pattern, color] of RULES) {
    if (pattern.test(ingredient)) return color
  }
  return '#D8C79A'
}
