import type { Testimonial } from '@/content/testimonials'

function highlightQuote(quote: string, phrases: string[] = []) {
  if (!phrases.length) return quote
  let parts: (string | { hl: string })[] = [quote]
  for (const phrase of phrases) {
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return [part]
      const idx = part.indexOf(phrase)
      if (idx < 0) return [part]
      return [
        part.slice(0, idx),
        { hl: phrase },
        part.slice(idx + phrase.length),
      ].filter(Boolean)
    })
  }
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i} className="marker-hl font-extrabold">
        {p.hl}
      </span>
    ),
  )
}

export function TestimonialCapsule({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm">
      <blockquote className="text-lg font-extrabold leading-snug text-navy">
        "{highlightQuote(item.quote, item.highlightPhrases)}"
      </blockquote>
      <div className="grid h-36 place-items-center rounded-xl border border-dashed border-slate-300 bg-paper text-sm text-muted">
        {item.mediaSrc ? (
          item.mediaType === 'video' ? (
            <video src={item.mediaSrc} controls className="h-full w-full rounded-xl object-cover" />
          ) : (
            <img src={item.mediaSrc} alt="" className="h-full w-full rounded-xl object-cover" />
          )
        ) : (
          'צילום מסך / סרטון המלצה'
        )}
      </div>
      <figcaption className="text-sm text-muted">
        {item.name} · {item.course}, {item.institution}
      </figcaption>
    </figure>
  )
}
