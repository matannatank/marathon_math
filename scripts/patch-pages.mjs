import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  'course-linear-algebra.html',
  'course-calculus.html',
  'course-probability.html',
  'private-lessons.html',
  'terms.html',
  'thanks.html',
]

const cssLink = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&family=Rubik:wght@600;700;800&display=swap">
<link rel="stylesheet" href="site.css">`

const photoCircle = `<img src="/matan-avatar.jpg" alt="מתן כחלון" width="84" height="84" style="flex:none;width:84px;height:84px;border-radius:50%;object-fit:cover;border:2px solid #FEF08A;box-shadow:0 4px 12px rgba(15,23,42,.2)">`

for (const f of files) {
  let html = readFileSync(join(root, f), 'utf8')
  if (!html.includes('href="site.css"')) {
    html = html.replace('</title>', `</title>\n${cssLink}`)
  }
  html = html.replace(
    /<div role="img" aria-label="מקום לתמונה של מתן"[^>]*>התמונה של מתן<\/div>/,
    photoCircle,
  )
  html = html.replace(
    'style="width: 100%; max-width: 480px; min-height: 100vh; margin: 0 auto; box-sizing: border-box; background: #FFFFFF; color: #0F172A; font-family: \'Heebo\', system-ui, sans-serif; font-size: 16px; line-height: 1.55; display: flex; flex-direction: column"',
    'class="shell shell-narrow" style="font-family:\'Heebo\',system-ui,sans-serif"',
  )
  writeFileSync(join(root, f), html)
  console.log('updated', f)
}
