import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { siteConfig } from '@/content/siteConfig'
import { waLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

export function PrivateLessons() {
  useEffect(() => {
    track('page_view', { page: 'private-lessons' })
    document.title = `שיעורים פרטיים | ${siteConfig.brandName}`
  }, [])

  const { privateLessons: pl } = siteConfig

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-navy">{pl.title}</h1>
        <p className="mt-1 text-muted">{pl.subtitle}</p>
        <div className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">{pl.body}</div>
        <a
          href={waLink(pl.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { placement: 'private-lessons' })}
          className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-wa px-5 text-lg font-extrabold text-white no-underline"
        >
          שלחו לי הודעה בוואטסאפ
        </a>
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-navy">הזמינות שלי</h2>
          <p className="mt-2 text-muted">בחרו יום ושעה שנוחים לכם, והשיעור נקבע ביומן.</p>
          {pl.calComUrl ? (
            <iframe
              title="לוח זמינות"
              src={pl.calComUrl}
              className="mt-4 h-[520px] w-full rounded-2xl border border-line"
            />
          ) : (
            <div className="mt-4 grid h-64 place-items-center rounded-2xl border border-dashed border-slate-300 bg-paper text-muted">
              לוח cal.com יתווסף בקובץ התוכן
            </div>
          )}
          {pl.calComUrl && (
            <a
              href={pl.calComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-12 items-center justify-center rounded-xl border-2 border-ink font-bold text-ink no-underline"
            >
              לקביעת שיעור ביומן
            </a>
          )}
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-navy">הקורסים שאני מלמד</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {pl.coursesTaught.map((c) => (
              <li key={c} className="rounded-xl border border-line bg-paper px-4 py-3 font-bold">
                {c}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
