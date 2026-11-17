import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { getCourse } from '@/content/courses'
import { siteConfig } from '@/content/siteConfig'
import { waLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

export function ThankYou() {
  const { courseSlug = '', productType = '' } = useParams()
  const course = getCourse(courseSlug)
  const isLive = productType === 'live'

  useEffect(() => {
    track('page_view', { page: 'thank-you', course: courseSlug, product: productType })
    document.title = `תודה על ההרשמה | ${siteConfig.brandName}`
  }, [courseSlug, productType])

  if (!course) return <Navigate to="/" replace />

  const shareText = `אחי נרשמתי עכשיו למרתון של מתן כחלון ל-${course.name}, יש שם תיקייה מטורפת עם כל המבחנים פתורים ואחריות מעבר. אם אתה נרשם גם תגיד לו שבאת דרכי, שנינו נקבל 40 ש"ח החזר בביט: ${window.location.origin}/course/${course.slug}`

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10 text-center sm:px-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-3xl text-ok">
          ✓
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-navy">ההרשמה התקבלה!</h1>
        <p className="mt-3 leading-relaxed text-slate-700">
          הגישה לתיקיית ה-Drive נשלחת לכתובת ה-Gmail שהזנתם. בדקו גם בספאם.
        </p>
        {isLive && (
          <a
            href={course.liveWhatsappUrl}
            className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-wa px-4 text-lg font-extrabold text-white no-underline"
          >
            כניסה מיידית לקבוצת הוואטסאפ הסגורה של המרתון
          </a>
        )}
        <div className="mt-8 rounded-2xl border border-line bg-paper p-5 text-right">
          <h2 className="text-lg font-extrabold text-navy">חבר מביא חבר</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            רוצה 40 ש״ח בחזרה ב-Bit עוד היום? לימוד עם חברים מעלה את הציון משמעותית. שלח את הקישור
            לחבר מהקורס — על כל חבר שנרשם למרתון החי ושולח לי בוואטסאפ ״נרשמתי דרך [השם שלך]״,
            שניכם מקבלים ממני 40 ש״ח החזר ל-Bit!
          </p>
          <a
            href={waLink(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-navy font-bold text-white no-underline"
          >
            שיתוף לחבר בוואטסאפ
          </a>
        </div>
        <Link to={`/course/${course.slug}`} className="mt-6 inline-block font-semibold text-navy">
          חזרה לעמוד הקורס
        </Link>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
