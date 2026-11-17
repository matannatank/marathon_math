import { useEffect, useState } from 'react'
import type { Course } from '@/content/courses'
import { waLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

type Props = {
  course: Course
  heroRef: React.RefObject<HTMLElement | null>
}

export function CourseStickyBar({ course, heroRef }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [heroRef])

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
    >
      {course.showStickyUrgency && course.stickyUrgency && (
        <p className="mb-2 text-center text-xs font-semibold text-slate-600">
          {course.stickyUrgency}
        </p>
      )}
      <div className="flex gap-2">
        <a
          href="#pricing"
          onClick={() => track('cta_click', { placement: 'sticky', course: course.slug })}
          className="flex-[7] rounded-xl bg-cta py-3.5 text-center text-[15px] font-extrabold text-white no-underline"
        >
          להרשמה למרתון
        </a>
        <a
          href={waLink(`היי, שאלה לגבי מרתון ${course.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { placement: 'sticky' })}
          className="flex-[3] grid place-items-center rounded-xl bg-wa text-white no-underline"
          aria-label="וואטסאפ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
