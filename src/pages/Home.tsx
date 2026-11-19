import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { TestimonialCapsule } from '@/components/TestimonialCapsule'
import { siteConfig } from '@/content/siteConfig'
import { getSubjects, getTracksForCourse, institutions } from '@/content/courses'
import { testimonials } from '@/content/testimonials'
import { track } from '@/lib/analytics'

export function Home() {
  const [openCourse, setOpenCourse] = useState<string | null>(null)
  const showInstitution = institutions.length > 1

  useEffect(() => {
    track('page_view', { page: 'home' })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Hero — copy + video only (photo lives once in About) */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-10 sm:px-6 lg:max-w-4xl lg:py-14">
          <h1 className="text-[1.9rem] font-extrabold leading-[1.18] text-navy sm:text-4xl lg:text-[2.6rem]">
            {siteConfig.home.h1Line1}
            <br />
            <span className="marker-hl">{siteConfig.home.h1Line2}</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {siteConfig.home.subtitle.split('אחריות מעבר').map((part, i, arr) =>
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
          <p className="text-sm italic text-muted sm:text-base">{siteConfig.home.authorityLine}</p>

          {/* Method highlights instead of duplicate photo */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: 'פיצוח מבחנים', d: 'תבניות חוזרות מהשנים האחרונות' },
              { t: 'אחריות מעבר', d: 'החזר מלא אם עשיתם את החלק שלכם' },
              { t: 'תיקיית Drive', d: 'מבחנים, פתרונות והקלטות במקום אחד' },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-2xl border border-line bg-white px-4 py-3.5 shadow-sm"
              >
                <div className="font-extrabold text-navy">{item.t}</div>
                <div className="mt-1 text-sm text-muted">{item.d}</div>
              </div>
            ))}
          </div>

          <div className="font-bold text-ink">{siteConfig.home.videoHeader}</div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            {siteConfig.home.methodVideoYoutubeId ? (
              <iframe
                title="סרטון השיטה"
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${siteConfig.home.methodVideoYoutubeId}?rel=0`}
                allowFullScreen
              />
            ) : (
              <div className="grid h-full place-items-center text-muted">
                <div className="text-center">
                  <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-paper text-2xl text-navy">
                    ▶
                  </div>
                  סרטון השיטה יתווסף בקרוב
                </div>
              </div>
            )}
          </div>
          <a
            href="#courses"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-cta px-6 text-lg font-extrabold text-white no-underline shadow-lg shadow-orange-500/20 transition hover:bg-cta-dark sm:w-fit"
          >
            {siteConfig.home.ctaToCourses}
          </a>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">בחרו את הקורס שלכם</h2>
        {!showInstitution && (
          <p className="mt-1 text-muted">{institutions[0].shortName} · שנה א׳</p>
        )}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {getSubjects().map(({ subject, courses: group }) => {
            const open = openCourse === subject
            return (
              <div key={subject} className="rounded-2xl border border-line bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenCourse(open ? null : subject)}
                  className="flex w-full items-center justify-between gap-3 p-5 text-right"
                >
                  <span>
                    <span className="block text-lg font-extrabold text-ink">{subject}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {group.length > 1 ? 'בחרו מסלול' : (
                        <>
                          קורס <span className="tabular" dir="ltr">{group[0].code}</span>
                        </>
                      )}
                    </span>
                  </span>
                  <span className="text-navy">{open ? '▾' : '◂'}</span>
                </button>
                {open && (
                  <div className="border-t border-line px-5 pb-5 pt-3">
                    <p className="mb-2 text-sm text-muted">בחרו מסלול:</p>
                    <div className="flex flex-col gap-2">
                      {group.map((course) => (
                        <Link
                          key={course.slug}
                          to={`/course/${course.slug}`}
                          className="rounded-xl border border-navy px-3 py-2 text-sm font-semibold text-navy no-underline hover:bg-navy hover:text-white"
                        >
                          {getTracksForCourse(course).map((t) => t.name).join(' / ')}
                          <span className="mr-2 font-normal opacity-70">
                            קורס <span className="tabular" dir="ltr">{course.code}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* About — single photo placement */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[200px_1fr] lg:items-start lg:gap-10">
          <div className="mx-auto w-[120px] sm:w-[132px] lg:mx-0 lg:w-[148px]">
            <img
              src={`${siteConfig.matanAvatar}?v=3`}
              alt={siteConfig.brandName}
              className="aspect-square w-full rounded-full object-cover object-center ring-4 ring-white shadow-md shadow-slate-300/40"
            />
            <p className="mt-3 text-center text-sm font-bold text-navy">{siteConfig.brandName}</p>
            <p className="text-center text-xs text-muted">בוגר מתמטיקה, אונ׳ ת״א</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">מי אני והשיטה</h2>
            <p className="text-lg font-extrabold leading-snug text-ink">{siteConfig.about.lead}</p>
            <p className="leading-relaxed text-slate-700">{siteConfig.about.p1}</p>
            <p className="leading-relaxed text-slate-700">{siteConfig.about.p2}</p>
            <p className="leading-relaxed text-slate-700">{siteConfig.about.p3}</p>
            <ol className="flex flex-col gap-2">
              {siteConfig.about.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl border border-line bg-white p-3.5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <p className="leading-relaxed text-slate-700">{siteConfig.about.closer}</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">סטודנטים מספרים</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCapsule key={t.id} item={t} />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
