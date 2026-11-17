import { waLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שיחה עם מתן בוואטסאפ"
      onClick={() => track('whatsapp_click', { placement: 'fab' })}
      className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg shadow-green-500/30 transition hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z" />
      </svg>
    </a>
  )
}
