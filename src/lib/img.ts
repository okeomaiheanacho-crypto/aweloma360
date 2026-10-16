/** Route an image through the Netlify Image CDN so pages never ship full-size originals. */
export function cdn(src: string, width: number, quality = 75) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}&fm=webp`
}

/** Responsive srcset helper for <img>. */
export function cdnSet(src: string, widths: number[] = [480, 800, 1200, 1600]) {
  return widths.map((w) => `${cdn(src, w)} ${w}w`).join(', ')
}
