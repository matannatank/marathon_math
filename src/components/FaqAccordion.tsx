import { useState } from 'react'
import { faqItems } from '@/content/faq'

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-2">
      {faqItems.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="overflow-hidden rounded-2xl border border-line bg-white">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-right font-bold text-ink"
            >
              <span>{item.q}</span>
              <span className="text-muted">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="whitespace-pre-line border-t border-line px-4 py-3 text-[15px] leading-relaxed text-slate-700">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
