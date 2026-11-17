import { Link } from 'react-router-dom'
import type { Course, ProductCard } from '@/content/courses'
import { siteConfig } from '@/content/siteConfig'
import { track } from '@/lib/analytics'

type Props = {
  course: Course
}

function Card({ course, product }: { course: Course; product: ProductCard }) {
  const thankYouPath = `/thank-you/${course.slug}/${product.id}`
  const href = product.paymentUrl || thankYouPath

  return (
    <article
      className={[
        'rounded-2xl bg-white p-5',
        product.highlighted
          ? 'border-[3px] border-navy shadow-xl shadow-slate-200/80'
          : 'border border-slate-200',
      ].join(' ')}
    >
      {product.badge && (
        <div className="-mt-8 mb-3 inline-flex rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
          {product.badge}
        </div>
      )}
      <h3 className="text-xl font-extrabold text-navy">{product.name}</h3>
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <span className="text-3xl font-extrabold tabular text-ink">{product.price}</span>
        {product.crossedPrice && (
          <span className="text-lg text-muted line-through tabular">{product.crossedPrice}</span>
        )}
      </div>
      {product.earlyBirdBadge && (
        <div className="mt-2 inline-flex rounded-full bg-marker px-2.5 py-1 text-xs font-bold">
          {product.earlyBirdBadge}
        </div>
      )}
      {product.priceAnchor && (
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.priceAnchor}</p>
      )}
      <ul className="mt-4 flex flex-col gap-2.5">
        {product.included.map((line) => (
          <li key={line} className="flex gap-2 text-[15px] leading-relaxed">
            <span className="mt-0.5 font-bold text-ok">✓</span>
            <span>{line}</span>
          </li>
        ))}
        {product.excluded?.map((line) => (
          <li key={line} className="flex gap-2 text-[15px] leading-relaxed text-slate-400">
            <span className="mt-0.5">✕</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      {product.scarcity && (
        <p className="mt-3 text-sm font-semibold text-slate-600">{product.scarcity}</p>
      )}
      <a
        href={href}
        onClick={() => track('cta_click', { course: course.slug, product: product.id })}
        className={[
          'mt-5 flex min-h-14 items-center justify-center rounded-xl px-4 text-center text-lg font-extrabold no-underline transition',
          product.secondaryStyle
            ? 'border-2 border-ink bg-white text-ink hover:bg-paper'
            : 'bg-cta text-white shadow-lg shadow-orange-500/25 hover:bg-cta-dark',
        ].join(' ')}
      >
        {product.ctaLabel}
      </a>
      <p className="mt-3 text-center text-xs text-muted">{siteConfig.paymentMicrocopy}</p>
      <div className="mt-2 text-center">
        <Link to="/terms" className="text-sm font-semibold text-navy">
          תקנון ואחריות מעבר
        </Link>
      </div>
    </article>
  )
}

export function ProductCards({ course }: Props) {
  if (course.courseState === 'pre_first_marathon') {
    return (
      <div className="rounded-2xl border border-navy bg-blue-50 p-6 text-center">
        <p className="text-lg font-bold text-navy">המרתון עוד לא נפתח להרשמה</p>
        <a
          href={course.quietWhatsappUrl}
          className="mt-4 inline-flex min-h-14 items-center justify-center rounded-xl bg-wa px-5 font-extrabold text-white no-underline"
        >
          הצטרפות לקבוצת עדכונים לקראת פתיחת המרתון + דף נוסחאות במתנה
        </a>
      </div>
    )
  }

  const products =
    course.courseState === 'off_season'
      ? course.products.filter((p) => p.id === 'recorded')
      : course.products

  return (
    <div className="flex flex-col gap-6">
      {products.map((p) => (
        <Card key={p.id} course={course} product={p} />
      ))}
      {course.courseState === 'open' && course.showSafetyNet && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-paper p-5">
          <p className="font-semibold text-ink">{course.safetyNetText}</p>
          <a
            href={course.quietWhatsappUrl}
            className="mt-3 inline-flex min-h-12 items-center justify-center rounded-xl bg-wa px-4 font-bold text-white no-underline"
          >
            להצטרפות לקבוצת העדכונים
          </a>
        </div>
      )}
    </div>
  )
}
