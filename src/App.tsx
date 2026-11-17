import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { CoursePage } from '@/pages/CoursePage'
import { PrivateLessons } from '@/pages/PrivateLessons'
import { Terms } from '@/pages/Terms'
import { ThankYou } from '@/pages/ThankYou'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<CoursePage />} />
        <Route path="/private-lessons" element={<PrivateLessons />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/thank-you/:courseSlug/:productType" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
