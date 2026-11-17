import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { termsContent } from '@/content/terms'
import { siteConfig } from '@/content/siteConfig'
import { track } from '@/lib/analytics'

export function Terms() {
  useEffect(() => {
    track('page_view', { page: 'terms' })
    document.title = `${termsContent.title} | ${siteConfig.brandName}`
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-navy">{termsContent.title}</h1>
        <p className="mt-4 leading-relaxed text-slate-700">{termsContent.intro}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          {termsContent.guaranteeRows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-b border-line bg-white px-4 py-3 last:border-b-0 sm:grid-cols-[180px_1fr]"
            >
              <div className="font-bold text-navy">{row.label}</div>
              <div className="text-slate-700">{row.value}</div>
            </div>
          ))}
        </div>
        {termsContent.extraSections.map((s) => (
          <section key={s.title} className="mt-8">
            <h2 className="text-xl font-extrabold text-navy">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{s.body}</p>
          </section>
        ))}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
