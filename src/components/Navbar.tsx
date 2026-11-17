import { Link } from 'react-router-dom'
import { siteConfig } from '@/content/siteConfig'

type Props = {
  sticky?: boolean
  courseMode?: boolean
}

export function Navbar({ sticky = true, courseMode = false }: Props) {
  return (
    <header
      className={[
        'border-b border-line bg-white/95 backdrop-blur-md',
        courseMode ? 'relative' : sticky ? 'sticky top-0 z-40' : 'relative',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="min-w-0 leading-tight text-ink no-underline">
          <div className="font-extrabold text-[1.15rem] text-navy sm:text-xl">
            {siteConfig.brandName}
          </div>
          <div className="truncate text-[11px] text-muted sm:text-xs">
            {siteConfig.brandTagline}
          </div>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 text-sm font-semibold sm:gap-3">
          <Link
            to="/#courses"
            className="rounded-full border border-navy px-3 py-1.5 text-navy no-underline transition hover:bg-navy hover:text-white"
          >
            בחירת קורס
          </Link>
          <Link to="/private-lessons" className="px-1 py-1.5 text-ink no-underline hover:text-navy">
            שיעורים פרטיים
          </Link>
        </nav>
      </div>
    </header>
  )
}
