import { testimonials } from './testimonials'

export type CourseState = 'open' | 'off_season' | 'pre_first_marathon'
export type VideoTier = 'open' | 'locked'

export type Institution = {
  id: string
  name: string
  shortName: string
}

export type Track = {
  id: string
  name: string
}

export type Session = {
  label: string
  topic: string
  covers: string
  points: string
}

export type CourseVideo = {
  id: string
  title: string
  tier: VideoTier
  youtubeId?: string
  pointsBadge?: string
  topicTrick?: string
  duration?: string
}

export type ProductCard = {
  id: 'live' | 'recorded' | string
  name: string
  price: string
  crossedPrice?: string
  earlyBirdBadge?: string
  priceAnchor?: string
  badge?: string
  highlighted?: boolean
  included: string[]
  excluded?: string[]
  scarcity?: string
  ctaLabel: string
  /** קישור תשלום חיצוני — ריק = מעביר לעמוד תודה כהדגמה */
  paymentUrl: string
  secondaryStyle?: boolean
}

export type Course = {
  slug: string
  name: string
  code: string
  institutionId: string
  trackIds: string[]
  examDate: string
  examLabel: string
  courseState: CourseState
  driveFolderId?: string
  liveWhatsappUrl: string
  quietWhatsappUrl: string
  meetUrl?: string
  stickyUrgency?: string
  showStickyUrgency?: boolean
  lateJoinersNote?: string
  showLateJoinersNote?: boolean
  showSafetyNet?: boolean
  safetyNetText?: string
  sessions: Session[]
  videos: CourseVideo[]
  products: ProductCard[]
  testimonialIds: string[]
  materialsDrivePreview?: string
  materialsSamplePreview?: string
  ogImage?: string
}

export const institutions: Institution[] = [
  { id: 'hit', name: 'מכון טכנולוגי חולון', shortName: 'HIT' },
]

export const tracks: Track[] = [
  { id: 'ee', name: 'הנדסת חשמל' },
  { id: 'cs', name: 'מדעי המחשב' },
  { id: 'ie', name: 'תעשייה וניהול' },
]

const liveIncluded = [
  '5 מפגשים חיים ב-Google Meet (15 שעות נטו פיצוח מבחנים) - עם אפשרות לעצור אותי, לשאול שאלות בזמן אמת ולוודא שלא נשארתם עם חורים בהבנה.',
  'בדיקה אישית של הפתרונות שלכם (שובר השוויון של המרתון) - אתם שולחים לי תרגילים פתורים, ואני מחזיר לכם פידבק מדויק איפה אתם מאבדים נקודות על כתיבה מתמטית וניסוח לפני שהבודק במבחן יוריד לכם עליהם.',
  'קבוצת וואטסאפ סגורה עם ליווי אישי שלי עד המבחן - נתקעתם על שאלה בערב? אתם מצלמים לקבוצה ואני שם כדי לשחרר את הפקק.',
  'גישה מיידית לתיקיית ה-Drive המלאה ולהקלטות כל המפגשים (פתוח עד סוף השנה).',
  'בונוס לנרשמי המרתון החי בלבד: "שעת מענה אחרונה ואיפוס לחץ" בוואטסאפ בערב שלפני המבחן.',
  'תעודת ביטוח למועד א\' (אחריות מעבר מלאה): השתתפתם, הגשתם את התרגילים ולא עברתם? תקבלו 100% מהכסף בחזרה.',
]

const recordedIncluded = [
  'הקלטות מלאות של כל מפגשי המרתון (עולות אחרי כל מפגש חי).',
  'גישה לתיקיית ה-Drive (מבחנים, פתרונות ודפי נוסחאות).',
]

const recordedExcluded = [
  'ללא בדיקת הגשות ומשוב אישי על כתיבה מתמטית.',
  'ללא קבוצת וואטסאפ לשאלות וליווי עד המבחן (למידה עצמאית).',
  'ללא אחריות מעבר והחזר כספי.',
]

function defaultProducts(): ProductCard[] {
  return [
    {
      id: 'live',
      name: 'מרתון חי',
      price: '400 ₪',
      priceAnchor:
        '(פחות מ-27 ש"ח לשעת לימוד - מחיר של שיעור פרטי וחצי, ויש לכם ליווי מלא ואחריות מעבר עד המבחן)',
      badge: 'המסלול המומלץ - כולל אחריות מעבר',
      highlighted: true,
      included: liveIncluded,
      scarcity: 'מספר המקומות במרתון החי מוגבל כדי שאוכל לבדוק אישית את ההגשות של כל סטודנט',
      ctaLabel: 'הרשמה ותשלום',
      paymentUrl: '',
    },
    {
      id: 'recorded',
      name: 'מרתון מוקלט',
      price: '250 ₪',
      included: recordedIncluded,
      excluded: recordedExcluded,
      ctaLabel: 'הרשמה ותשלום',
      paymentUrl: '',
      secondaryStyle: true,
    },
  ]
}

export const courses: Course[] = [
  {
    slug: 'linear-algebra-hit',
    name: 'אלגברה לינארית',
    code: '20046',
    institutionId: 'hit',
    trackIds: ['ee', 'cs', 'ie'],
    examDate: '2026-07-15',
    examLabel: 'מועד א\'',
    courseState: 'open',
    liveWhatsappUrl: 'https://wa.me/972559312361',
    quietWhatsappUrl: 'https://wa.me/972559312361',
    stickyUrgency: 'המרתון החי יוצא לדרך בקרוב - הבטחת מקומות פתוחה',
    showStickyUrgency: true,
    lateJoinersNote:
      'המרתון כבר יצא לדרך? בהרשמה עכשיו תקבלו גישה מיידית להקלטות של המפגשים שכבר התקיימו כדי להשלים פערים, ותצטרפו אלינו בשידור חי למפגשים הבאים!',
    showLateJoinersNote: false,
    showSafetyNet: true,
    safetyNetText:
      'עדיין מתלבטים אם להירשם למרתון? קחו את דף הנוסחאות המלא שלי לקורס + עדכונים לקראת המבחן בחינם לוואטסאפ',
    sessions: [
      {
        label: 'מפגש 1 (14.6, 17:00-20:00)',
        topic: 'לכסון, ערכים עצמיים ופולינום אופייני',
        covers: 'סגירת שאלות 1 ו-2 במבחן',
        points: '40 נק\'',
      },
      {
        label: 'מפגש 2 (16.6, 17:00-20:00)',
        topic: 'מרחבים וקטורים, בסיס וממד',
        covers: 'סגירת שאלה 3 במבחן',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 3 (18.6, 17:00-20:00)',
        topic: 'העתקות לינאריות ומטריצות מייצגות',
        covers: 'סגירת שאלה 4 במבחן',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 4 (21.6, 17:00-20:00)',
        topic: 'אורתוגונליות ותהליך גרם-שמידט',
        covers: 'סגירת שאלה 5 במבחן',
        points: '15 נק\'',
      },
      {
        label: 'מפגש 5 (23.6, 17:00-20:00)',
        topic: 'סימולציה מלאה + מוקשים נפוצים',
        covers: 'חיבור כל חלקי המבחן',
        points: 'מבחן מלא',
      },
    ],
    videos: [
      {
        id: 'v1',
        title: 'שאלה 1 — זיהוי סוג ולכסון ב-30 שניות',
        tier: 'open',
        youtubeId: '',
      },
      {
        id: 'v2',
        title: 'שאלה 2 — ערכים עצמיים בלי להיתקע באמצע',
        tier: 'open',
        youtubeId: '',
      },
      {
        id: 'v3',
        title: 'הטריק שחוזר כמעט בכל מועד א\'',
        tier: 'locked',
        pointsBadge: '25 נק\'',
        topicTrick: 'זיהוי מהיר של מטריצה לכסינה',
        duration: '12:40',
      },
      {
        id: 'v4',
        title: 'איך כותבים לבודק כדי לא לאבד חצי נקודה',
        tier: 'locked',
        pointsBadge: '20 נק\'',
        topicTrick: 'ניסוח מתמטי נקי',
        duration: '09:15',
      },
    ],
    products: defaultProducts(),
    testimonialIds: ['t1', 't2'],
  },
  {
    slug: 'calculus-hit',
    name: 'חדו"א',
    code: '[מספר]',
    institutionId: 'hit',
    trackIds: ['ee', 'cs', 'ie'],
    examDate: '2026-07-20',
    examLabel: 'מועד א\'',
    courseState: 'open',
    liveWhatsappUrl: 'https://wa.me/972559312361',
    quietWhatsappUrl: 'https://wa.me/972559312361',
    showStickyUrgency: true,
    stickyUrgency: 'המרתון החי יוצא לדרך בקרוב - הבטחת מקומות פתוחה',
    showSafetyNet: true,
    safetyNetText:
      'עדיין מתלבטים אם להירשם למרתון? קחו את דף הנוסחאות המלא שלי לקורס + עדכונים לקראת המבחן בחינם לוואטסאפ',
    sessions: [
      {
        label: 'מפגש 1',
        topic: 'גבולות ורציפות — תבניות חוזרות',
        covers: 'סגירת שאלות פתיחה',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 2',
        topic: 'נגזרות וחקירת פונקציה',
        covers: 'סגירת שאלות מרכזיות',
        points: '30 נק\'',
      },
      {
        label: 'מפגש 3',
        topic: 'אינטגרלים מסוימים ולא מסוימים',
        covers: 'סגירת שאלות אינטגרל',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 4',
        topic: 'טורי טיילור וקירובים',
        covers: 'סגירת שאלת בונוס/טור',
        points: '15 נק\'',
      },
      {
        label: 'מפגש 5',
        topic: 'סימולציה מלאה',
        covers: 'חיבור המבחן',
        points: 'מבחן מלא',
      },
    ],
    videos: [
      { id: 'c1', title: 'זיהוי תבנית גבול קלאסית', tier: 'open' },
      {
        id: 'c2',
        title: 'חקירת פונקציה בלי ללכת לאיבוד',
        tier: 'locked',
        pointsBadge: '30 נק\'',
        duration: '14:20',
      },
    ],
    products: defaultProducts(),
    testimonialIds: ['t2', 't3'],
  },
  {
    slug: 'probability-hit',
    name: 'הסתברות',
    code: '[מספר]',
    institutionId: 'hit',
    trackIds: ['ee', 'cs', 'ie'],
    examDate: '2026-07-22',
    examLabel: 'מועד א\'',
    courseState: 'open',
    liveWhatsappUrl: 'https://wa.me/972559312361',
    quietWhatsappUrl: 'https://wa.me/972559312361',
    showStickyUrgency: true,
    stickyUrgency: 'המרתון החי יוצא לדרך בקרוב - הבטחת מקומות פתוחה',
    showSafetyNet: true,
    safetyNetText:
      'עדיין מתלבטים אם להירשם למרתון? קחו את דף הנוסחאות המלא שלי לקורס + עדכונים לקראת המבחן בחינם לוואטסאפ',
    sessions: [
      {
        label: 'מפגש 1',
        topic: 'הסתברות בסיסית וקומבינטוריקה',
        covers: 'סגירת שאלות פתיחה',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 2',
        topic: 'משתנים מקריים בדידים',
        covers: 'סגירת שאלות מרכזיות',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 3',
        topic: 'משתנים מקריים רציפים',
        covers: 'סגירת שאלות צפיפות',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 4',
        topic: 'התפלגויות מפורסמות',
        covers: 'סגירת שאלת זיהוי',
        points: '15 נק\'',
      },
      {
        label: 'מפגש 5',
        topic: 'סימולציה מלאה',
        covers: 'חיבור המבחן',
        points: 'מבחן מלא',
      },
    ],
    videos: [
      { id: 'p1', title: 'איך בוחרים מודל הסתברותי נכון', tier: 'open' },
      {
        id: 'p2',
        title: 'תוחלת ושונות בלי בלבול בנוסחאות',
        tier: 'locked',
        pointsBadge: '25 נק\'',
        duration: '11:05',
      },
    ],
    products: defaultProducts(),
    testimonialIds: ['t1', 't3'],
  },
]

export function getInstitution(id: string) {
  return institutions.find((i) => i.id === id)!
}

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}

export function getTracksForCourse(course: Course) {
  return tracks.filter((t) => course.trackIds.includes(t.id))
}

export function getCourseTestimonials(course: Course) {
  return testimonials.filter((t) => course.testimonialIds.includes(t.id))
}

export function fillTemplate(
  template: string,
  vars: Record<string, string>,
) {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, v),
    template,
  )
}
