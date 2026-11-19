import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PressureMeter } from '@/components/PressureMeter'
import { VideoMiniCourse } from '@/components/VideoMiniCourse'
import { ProductCards } from '@/components/ProductCards'
import { TestimonialCapsule } from '@/components/TestimonialCapsule'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CourseStickyBar } from '@/components/CourseStickyBar'
import { siteConfig } from '@/content/siteConfig'
import {
  fillTemplate,
  getCourse,
  getCourseTestimonials,
  getInstitution,
  getTracksForCourse,
} from '@/content/courses'
import { track } from '@/lib/analytics'

export function CoursePage() {
  const { slug = '' } = useParams()
  const course = getCourse(slug)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!course) return
    track('page_view', { page: 'course', slug: course.slug })
    const inst = getInstitution(course.institutionId)
    document.title = `מרתון הכנה ל${course.name} (${course.code}) ב-${inst.shortName} | מתן כחלון`
  }, [course])

  if (!course) return <Navigate to="/" replace />

  const institution = getInstitution(course.institutionId)
  const tracks = getTracksForCourse(course)
  const courseTestimonials = getCourseTestimonials(course)
  const useGuarantee = course.courseState === 'open'
  const subtitle = fillTemplate(
    useGuarantee ? siteConfig.courseSubtitleTemplate : siteConfig.courseSubtitleNoGuarantee,
    { courseName: course.name, institution: institution.shortName },
  )

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24 md:pb-0">
      <Navbar sticky={false} courseMode />

      <section ref={heroRef} className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="text-sm font-semibold text-muted">
            {institution.shortName} · קורס{' '}
            <span className="tabular" dir="ltr">
              {course.code}
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-navy">{course.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {tracks.map((t) => (
              <span
                key={t.id}
                className="rounded-full border border-navy/30 bg-white px-3 py-1 text-sm font-semibold text-navy"
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted">
              תאריך מבחן:{' '}
              <span className="tabular font-semibold text-ink" dir="ltr">
                {course.examDate}
              </span>
            </span>
            <PressureMeter examDate={course.examDate} examLabel={course.examLabel} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex gap-4">
          <img
            src={siteConfig.matanAvatar}
            alt={siteConfig.brandName}
            className="h-16 w-16 shrink-0 rounded-full object-cover object-center shadow-md"
          />
          <div>
            <h2 className="text-2xl font-extrabold leading-snug text-navy sm:text-3xl">
              {siteConfig.home.h1Line1}
              <br />
              <span className="marker-hl">{siteConfig.home.h1Line2}</span>
            </h2>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          {subtitle.split('אחריות מעבר').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <Link to="/terms" className="font-bold text-navy underline">
                  אחריות מעבר
                </Link>
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
        <p className="mt-3 text-sm italic text-muted">{siteConfig.home.authorityLine}</p>
      </section>

      {course.videos.length > 0 && (
        <section id="videos" className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
          <h2 className="mb-4 text-xl font-extrabold text-navy">סרטוני פתרון מבחן</h2>
          <VideoMiniCourse
            videos={course.videos}
            onGoPricing={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </section>
      )}

      <section id="plan" className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <h2 className="text-xl font-extrabold text-navy">תוכנית פיצוח המבחן ולו״ז</h2>
          <p className="mt-3 rounded-2xl bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
            {siteConfig.sessionStructureNote}
          </p>
          {course.showLateJoinersNote && course.lateJoinersNote && (
            <p className="mt-3 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-ink">
              {course.lateJoinersNote}
            </p>
          )}
          <ul className="mt-4 flex flex-col gap-2">
            {course.sessions.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border border-line bg-white p-4 shadow-sm"
              >
                <div className="font-bold text-ink">{s.label}</div>
                <div className="mt-1 text-slate-700">{s.topic}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-paper px-2.5 py-1 text-muted">{s.covers}</span>
                  <span className="rounded-full bg-marker px-2.5 py-1 font-bold tabular">
                    {s.points}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h2 className="text-xl font-extrabold text-navy">המחשת החומרים</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="grid h-44 place-items-center rounded-2xl border border-dashed border-slate-300 bg-paper text-sm text-muted">
            צילום מסך תיקיית Drive
          </div>
          <div className="grid h-44 place-items-center rounded-2xl border border-dashed border-slate-300 bg-paper text-sm text-muted">
            עמוד פתרון לדוגמה
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.materialsCaption}</p>
      </section>

      <section id="pricing" className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <h2 className="mb-5 text-xl font-extrabold text-navy">מסלולי ההרשמה</h2>
          <ProductCards course={course} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h2 className="mb-4 text-xl font-extrabold text-navy">סטודנטים מספרים</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {courseTestimonials.map((t) => (
            <TestimonialCapsule key={t.id} item={t} />
          ))}
        </div>
      </section>

      <section id="faq" className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <h2 className="mb-4 text-xl font-extrabold text-navy">שאלות ותשובות</h2>
          <FaqAccordion />
        </div>
      </section>

      <Footer />
      <CourseStickyBar course={course} heroRef={heroRef} />
    </div>
  )
}
