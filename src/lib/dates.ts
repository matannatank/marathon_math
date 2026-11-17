/** החישוב האוטומטי היחיד באתר — ימים עד המבחן */
export function daysUntilExam(examDateIso: string, now = new Date()): number | null {
  const exam = new Date(`${examDateIso}T23:59:59`)
  if (Number.isNaN(exam.getTime())) return null
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  const end = new Date(exam)
  end.setHours(0, 0, 0, 0)
  const diff = Math.ceil((end.getTime() - start.getTime()) / 86_400_000)
  if (diff < 0) return null
  return diff
}
