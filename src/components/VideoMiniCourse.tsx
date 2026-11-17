import { useState } from 'react'
import type { CourseVideo } from '@/content/courses'
import { siteConfig } from '@/content/siteConfig'
import { track } from '@/lib/analytics'

type Props = {
  videos: CourseVideo[]
  onGoPricing: () => void
}

export function VideoMiniCourse({ videos, onGoPricing }: Props) {
  const openVideos = videos.filter((v) => v.tier === 'open')
  const [activeId, setActiveId] = useState(openVideos[0]?.id ?? videos[0]?.id)
  const [lockedOpen, setLockedOpen] = useState<string | null>(null)
  const active = videos.find((v) => v.id === activeId) ?? openVideos[0]

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="aspect-video bg-slate-900">
        {active?.youtubeId ? (
          <iframe
            title={active.title}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => track('video_play', { id: active.id })}
          />
        ) : (
          <div className="grid h-full place-items-center px-4 text-center text-white/80">
            <div>
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/15">▶</div>
              <div className="font-semibold">{active?.title ?? 'סרטון לדוגמה'}</div>
              <div className="mt-1 text-sm opacity-70">מזהה YouTube יתווסף בקובץ התוכן</div>
            </div>
          </div>
        )}
      </div>
      <ul className="divide-y divide-line">
        {videos.map((v) => {
          const isActive = v.id === active?.id
          const isLocked = v.tier === 'locked'
          return (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => {
                  if (isLocked) {
                    track('locked_video_click', { id: v.id })
                    setLockedOpen(lockedOpen === v.id ? null : v.id)
                    return
                  }
                  setActiveId(v.id)
                  setLockedOpen(null)
                }}
                className={[
                  'flex w-full items-start gap-3 px-4 py-3.5 text-right transition',
                  isActive && !isLocked ? 'bg-blue-50' : '',
                  isLocked ? 'bg-paper text-muted' : 'hover:bg-slate-50',
                ].join(' ')}
              >
                <span className="mt-0.5 text-lg">{isLocked ? '🔒' : '▶'}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{v.title}</span>
                  <span className="mt-1 flex flex-wrap gap-2 text-xs">
                    {!isLocked && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 font-bold text-ok">
                        פתוח לצפייה חופשית
                      </span>
                    )}
                    {v.pointsBadge && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                        {v.pointsBadge}
                      </span>
                    )}
                    {v.duration && <span className="tabular text-muted">{v.duration}</span>}
                  </span>
                </span>
              </button>
              {isLocked && lockedOpen === v.id && (
                <div className="border-t border-amber-100 bg-amber-50 px-4 py-4 text-sm leading-relaxed">
                  <p className="text-ink">{siteConfig.lockedVideoBanner}</p>
                  <button
                    type="button"
                    onClick={onGoPricing}
                    className="mt-3 font-bold text-navy underline"
                  >
                    למעבר למסלולי ההרשמה ↓
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
