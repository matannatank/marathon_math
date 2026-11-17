import { logEvent } from 'firebase/analytics'
import { getFirebaseAnalytics } from '@/lib/firebase'

type EventName =
  | 'page_view'
  | 'video_play'
  | 'locked_video_click'
  | 'cta_click'
  | 'whatsapp_click'

export function track(event: EventName, props?: Record<string, string | number | boolean>) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, props ?? {})
  }

  void getFirebaseAnalytics().then((analytics) => {
    if (!analytics) return
    // Custom + reserved event names share one helper; cast for GA typings.
    logEvent(analytics, event as string, props)
  })
}
