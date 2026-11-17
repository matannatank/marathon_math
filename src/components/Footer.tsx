import { Link } from 'react-router-dom'
import { siteConfig } from '@/content/siteConfig'
import { waLink } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="text-lg font-extrabold text-navy">{siteConfig.brandName}</div>
          <p className="mt-1 text-sm text-muted">{siteConfig.brandTagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/terms" className="text-navy no-underline hover:underline">
            תקנון ואחריות מעבר
          </Link>
          <Link to="/private-lessons" className="text-navy no-underline hover:underline">
            שיעורים פרטיים
          </Link>
          <Link to="/#courses" className="text-navy no-underline hover:underline">
            בחירת קורס
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm" dir="ltr">
          <a href={waLink()} className="text-navy no-underline hover:underline" dir="rtl">
            וואטסאפ / טלפון: <span className="tabular" dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="text-navy no-underline hover:underline">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
