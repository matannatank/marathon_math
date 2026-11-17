export type Testimonial = {
  id: string
  quote: string
  /** מילים להדגשת מרקר צהוב בתוך הציטוט */
  highlightPhrases?: string[]
  /** נתיב לתמונה/צילום מסך, או ריק לplaceholder */
  mediaSrc?: string
  mediaType?: 'image' | 'video'
  name: string
  course: string
  institution: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'מציון 42 במועד א\' ל-88 במועד ב\'',
    highlightPhrases: ['42', '88'],
    name: 'נועם',
    course: 'אלגברה לינארית',
    institution: 'HIT',
  },
  {
    id: 't2',
    quote: 'הגעתי למבחן וזיהיתי את השאלות אחת לאחת',
    highlightPhrases: ['זיהיתי את השאלות'],
    name: 'מאיה',
    course: 'חדו"א',
    institution: 'HIT',
  },
  {
    id: 't3',
    quote: 'התיקייה לבד שווה את כל הכסף — הכל מסודר ומפורק',
    highlightPhrases: ['התיקייה'],
    name: 'איתי',
    course: 'הסתברות',
    institution: 'HIT',
  },
]
