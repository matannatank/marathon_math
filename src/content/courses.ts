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
  /** נושא לאיחוד כרטיסים בעמוד הבית - קורסים עם אותו subject מוצגים ככרטיס אחד עם בחירת מסלול */
  subject: string
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
  'הקלטות מעבר על החומר לכל נושא, לצפייה לפני המפגש - כך שבמפגשים עצמם מתרכזים רק בפתרון שאלות ממבחנים.',
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
    slug: 'linear-algebra-20046',
    subject: 'אלגברה ליניארית',
    name: 'אלגברה ליניארית לניהול טכנולוגיה',
    code: '20046',
    institutionId: 'hit',
    trackIds: ['ie'],
    examDate: '2027-01-31',
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
    // מבנה המבחן: 5 שאלות, פותרים 4, 25 נק' לשאלה. מפגש לכל שאלה לפי הסדר במבחן.
    // התאריכים והשעות זמניים - מתעדכנים לפי המשמרות.
    sessions: [
      {
        label: 'מפגש 1 (17.1, 18:00-21:00)',
        topic: 'גאומטריה אנליטית - ישרים ומישורים, מצב הדדי, שטח במכפלה וקטורית, משוואת מישור, זווית',
        covers: 'סגירת שאלה 1 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 2 (19.1, 18:00-21:00)',
        topic: 'מערכת משוואות עם פרמטר - דירוג מטריצה מורחבת, מספר פתרונות לפי הפרמטר, פתרון כללי',
        covers: 'סגירת שאלה 2 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 3 (22.1, 12:15-15:15)',
        topic: 'מטריצות - הפיכות לפי פרמטר, מטריצה הופכית, משוואה מטריציונית, הוכחת זהות',
        covers: 'סגירת שאלה 3 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 4 (26.1, 18:00-21:00)',
        topic: 'תתי-מרחבים - הוכחת תת-מרחב, בסיס ומימד, תלות ליניארית',
        covers: 'סגירת שאלה 4 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 5 (28.1, 18:00-21:00)',
        topic: 'ערכים ווקטורים עצמיים והעתקות ליניאריות - הוכחת ליניאריות, גרעין ותמונה, חח"ע ועל',
        covers: 'סגירת שאלה 5 במבחן',
        points: '25 נק\'',
      },
    ],
    // פתרון מלא של מועד א' 2026. youtubeId ריק עד שהסרטונים יעלו ל-YouTube.
    videos: [
      {
        id: 'v1',
        title: 'שאלה 1 - שני מישורים: מצב הדדי, זווית וישר חיתוך',
        tier: 'open',
        youtubeId: '',
      },
      {
        id: 'v2',
        title: 'שאלה 2 - מערכת משוואות עם פרמטר',
        tier: 'open',
        youtubeId: '',
      },
      {
        id: 'v3',
        title: 'שאלה 3 - מטריצות והוכחת זהות',
        tier: 'locked',
        youtubeId: '',
        pointsBadge: '25 נק\'',
        topicTrick: 'הפיכות לפי פרמטר ומטריצה הופכית',
      },
      {
        id: 'v4',
        title: 'שאלה 4 - תתי-מרחבים, בסיס ומימד',
        tier: 'locked',
        youtubeId: '',
        pointsBadge: '25 נק\'',
        topicTrick: 'הוכחת תת-מרחב בשלושה תנאים',
      },
    ],
    products: defaultProducts(),
    testimonialIds: ['t1', 't2'],
  },
  {
    slug: 'linear-algebra-20077',
    subject: 'אלגברה ליניארית',
    name: 'אלגברה ליניארית',
    code: '20077',
    institutionId: 'hit',
    trackIds: ['ee', 'cs'],
    examDate: '2027-02-07',
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
    // מבנה המבחן (סמסטר א'): 5 שאלות, פותרים 4, 25 נק' לשאלה. מבחן משותף לחשמל ולמדעי המחשב.
    // התאריכים והשעות זמניים - מתעדכנים לפי המשמרות.
    sessions: [
      {
        label: 'מפגש 1 (25.1, 18:00-21:00)',
        topic: 'גאומטריה אנליטית - ישרים ומישורים, נקודת חיתוך, משוואת מישור, מישור מאונך, זווית בין מישורים',
        covers: 'סגירת שאלה 1 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 2 (29.1, 9:00-12:00)',
        topic: 'מערכת משוואות עם פרמטר - דירוג מטריצה מורחבת, מספר פתרונות לפי הפרמטר, פתרון כללי + סעיף מספרים מרוכבים',
        covers: 'סגירת שאלה 2 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 3 (31.1, 18:00-21:00)',
        topic: 'מטריצות ולכסון - הפיכות לפי פרמטר, מטריצה הופכית כמכפלת מטריצות אלמנטריות, ערכים עצמיים ולכסון',
        covers: 'סגירת שאלה 3 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 4 (3.2, 18:00-21:00)',
        topic: 'תתי-מרחבים - בסיס ומימד, סכום וחיתוך של תתי-מרחבים, שייכות וקטור',
        covers: 'סגירת שאלה 4 במבחן',
        points: '25 נק\'',
      },
      {
        label: 'מפגש 5 (4.2, 18:00-21:00)',
        topic: 'העתקות ליניאריות - גרעין ותמונה, חח"ע ועל, קואורדינטות ומעבר בין בסיסים',
        covers: 'סגירת שאלה 5 במבחן',
        points: '25 נק\'',
      },
    ],
    // עדיין אין סרטונים מוקלטים לקורס הזה - אזור הסרטונים מוסתר כל עוד הרשימה ריקה.
    videos: [],
    products: defaultProducts(),
    testimonialIds: ['t1', 't2'],
  },
  {
    slug: 'calculus-20027',
    subject: 'חדו"א (אינפי 1)',
    name: 'חשבון אינפי 1 לניהול טכנולוגיה',
    code: '20027',
    institutionId: 'hit',
    trackIds: ['ie'],
    examDate: '2027-01-21',
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
    // מבנה המבחן לפי מועדי 2018 ו-2021 (המבחנים החדשים ביותר שיש): שאלות 1-3 חובה, 2 מתוך שאלות 4-6, 20 נק' לשאלה.
    // לעדכן אם יגיע מבחן מ-2022 ואילך שמראה שינוי במבנה. התאריכים והשעות זמניים.
    sessions: [
      {
        label: 'מפגש 1 (7.1, 18:00-21:00)',
        topic: 'חקירת פונקציה מלאה - תחום הגדרה ורציפות, קיצון, עלייה וירידה, קמירות ופיתול, אסימפטוטות ושרטוט',
        covers: 'סגירת שאלה 1 במבחן',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 2 (8.1, 9:00-12:00)',
        topic: 'גבולות - כלל לופיטל, גבולות מיוחדים וטכניקות חישוב (פותרים 2 מתוך 3)',
        covers: 'סגירת שאלה 2 במבחן',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 3 (10.1, 18:00-21:00)',
        topic: 'אינטגרלים - הצבה, אינטגרציה בחלקים, פונקציות רציונליות (פותרים 2 מתוך 3)',
        covers: 'סגירת שאלה 3 במבחן',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 4 (13.1, 13:30-16:30)',
        topic: 'שאלות הבחירה, חלק א\' - רציפות וגזירות עם פרמטרים, קיצון מוחלט בקטע סגור, משוואת משיק',
        covers: 'סגירת שאלות 4-6 במבחן',
        points: '20 נק\' לשאלה',
      },
      {
        label: 'מפגש 5 (17.1, 9:00-12:00)',
        topic: 'שאלות הבחירה, חלק ב\' - פולינום טיילור, אסימפטוטות, ניתוח גרף הנגזרת, הוכחות עם משפט לגראנז\'',
        covers: 'סגירת שאלות 4-6 במבחן',
        points: '20 נק\' לשאלה',
      },
    ],
    videos: [],
    products: defaultProducts(),
    testimonialIds: ['t2', 't3'],
  },
  {
    slug: 'calculus-20151',
    subject: 'חדו"א (אינפי 1)',
    name: 'חשבון אינפיניטסימלי 1',
    code: '20151',
    institutionId: 'hit',
    trackIds: ['ee'],
    examDate: '2027-01-24',
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
    // מבנה המבחן: שאלה 1 חובה (חקירת פונקציה, 20%) + 4 מתוך 5 שאלות בחלק ב', כל שאלה 20% בשני סעיפים של 10%.
    // סוגי הסעיפים בחלק ב' מתחלפים בין מספרי השאלות, לכן המפגשים בנויים לפי סוג שאלה.
    // התאריכים והשעות זמניים - מתעדכנים לפי המשמרות.
    sessions: [
      {
        label: 'מפגש 1 (11.1, 18:00-21:00)',
        topic: 'חקירת פונקציה מלאה - תחום הגדרה, קיצון, קמירות ופיתול, אסימפטוטות ושרטוט',
        covers: 'סגירת שאלה 1 (שאלת החובה)',
        points: '20 נק\'',
      },
      {
        label: 'מפגש 2 (13.1, 18:00-21:00)',
        topic: 'אינטגרלים - פונקציות רציונליות ושברים חלקיים, הצבה, אינטגרציה בחלקים',
        covers: 'סעיפי האינטגרל בחלק ב\'',
        points: '10 נק\' לסעיף',
      },
      {
        label: 'מפגש 3 (14.1, 18:00-21:00)',
        topic: 'גבולות וסדרות - כלל לופיטל, גבולות מהצורה 1 בחזקת אינסוף, התכנסות סדרה רקורסיבית',
        covers: 'סעיפי הגבול והסדרה בחלק ב\'',
        points: '10 נק\' לסעיף',
      },
      {
        label: 'מפגש 4 (17.1, 13:30-16:30)',
        topic: 'שימושי האינטגרל - שטח בין עקומות, נפח גוף סיבוב, אורך קשת',
        covers: 'סעיפי השטח, הנפח והקשת בחלק ב\'',
        points: '10 נק\' לסעיף',
      },
      {
        label: 'מפגש 5 (20.1, 18:00-21:00)',
        topic: 'רציפות, גזירות והוכחות - רציפות עם פרמטרים, גזירות לפי הגדרה, אי-שוויונים במשפט לגראנז\', קיום שורש יחיד, קיצון בקטע סגור',
        covers: 'סעיפי ההוכחה והרציפות בחלק ב\'',
        points: '10 נק\' לסעיף',
      },
    ],
    videos: [],
    products: defaultProducts(),
    testimonialIds: ['t2', 't3'],
  },
  {
    slug: 'discrete-math-20069',
    subject: 'מתמטיקה בדידה',
    name: 'מתמטיקה בדידה',
    code: '20069',
    institutionId: 'hit',
    trackIds: ['cs'],
    examDate: '2027-02-01',
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
    // מבנה המבחן (לפי מבחני הקוד הקודם 20067): שאלות של 25 נק', כל שאלה מורכבת מסעיפים קצרים מנושאים שונים.
    // לכן המפגשים בנויים לפי נושא ולא לפי מספר שאלה. התאריכים והשעות זמניים.
    sessions: [
      {
        label: 'מפגש 1 (20.1, 13:30-16:30)',
        topic: 'לוגיקה ושיטות הוכחה - טבלאות אמת, טאוטולוגיה, צורת CNF, הוכחה בשלילה וקונטרפוזיטיב',
        covers: 'סעיפי הלוגיקה וההוכחה',
        points: 'סעיפים של 5-12 נק\'',
      },
      {
        label: 'מפגש 2 (22.1, 9:00-12:00)',
        topic: 'קבוצות - פעולות על קבוצות, הוכחת הכלה ושוויון, קבוצת החזקה וספירת תתי-קבוצות',
        covers: 'סעיפי הקבוצות',
        points: 'סעיפים של 5-12 נק\'',
      },
      {
        label: 'מפגש 3 (25.1, 13:30-16:30)',
        topic: 'אינדוקציה ותורת המספרים - אינדוקציה על סכומים והתחלקות, gcd, אלגוריתם אוקלידס המורחב, מספרים ראשוניים',
        covers: 'סעיפי האינדוקציה ותורת המספרים',
        points: 'סעיפים של 5-12 נק\'',
      },
      {
        label: 'מפגש 4 (26.1, 13:30-16:30)',
        topic: 'יחסים - יחס שקילות ומחלקות שקילות, יחס סדר חלקי ומלא',
        covers: 'סעיפי היחסים',
        points: 'סעיפים של 5-12 נק\'',
      },
      {
        label: 'מפגש 5 (28.1, 13:30-16:30)',
        topic: 'פונקציות ועוצמות - חד-חד-ערכית ועל, קבוצות שוות עוצמה, ושאלת ההגדרות (שאלה 1)',
        covers: 'סעיפי הפונקציות ושאלה 1',
        points: 'סעיפים של 5-12 נק\'',
      },
    ],
    videos: [],
    products: defaultProducts(),
    testimonialIds: ['t1', 't3'],
  },
]

/** קורסים מקובצים לפי נושא, בסדר ההופעה בקובץ */
export function getSubjects() {
  const map = new Map<string, Course[]>()
  for (const c of courses) {
    map.set(c.subject, [...(map.get(c.subject) ?? []), c])
  }
  return [...map.entries()].map(([subject, list]) => ({ subject, courses: list }))
}

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
