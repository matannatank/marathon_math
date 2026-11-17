import { siteConfig } from '@/content/siteConfig'

export function waLink(prefill?: string) {
  const base = `https://wa.me/${siteConfig.phoneE164}`
  if (!prefill) return base
  return `${base}?text=${encodeURIComponent(prefill)}`
}
