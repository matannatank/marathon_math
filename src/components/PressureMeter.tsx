import { daysUntilExam } from '@/lib/dates'

type Props = {
  examDate: string
  examLabel: string
}

export function PressureMeter({ examDate, examLabel }: Props) {
  const days = daysUntilExam(examDate)
  if (days === null) return null
  return (
    <span className="inline-flex items-center rounded-full bg-marker px-3 py-1 text-sm font-bold text-ink">
      נשארו רק <span className="mx-1 tabular">{days}</span> ימים ל{examLabel}!
    </span>
  )
}
