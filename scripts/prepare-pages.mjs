import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mockupDir = join(root, 'mockup')
const WA = 'https://wa.me/972559312361'
const PHONE = '055-9312361'
const EMAIL = 'matankahlon@gmail.com'

const pageShell =
  "width: 100%; max-width: 480px; min-height: 100vh; margin: 0 auto; box-sizing: border-box; background: #FFFFFF; color: #0F172A; font-family: 'Heebo', system-ui, sans-serif; font-size: 16px; line-height: 1.55; display: flex; flex-direction: column"
const bodyStyle =
  'body{margin:0;background:#FFFFFF}a{color:#1E3A8A}a:hover{color:#0F172A}h1,h2{color:#1E3A8A}'

const logoBlock = `<a href="index.html" style="display: flex; flex-direction: column; line-height: 1.15; min-width: 0; text-decoration: none; color: inherit"><span style="font-weight: 800; font-size: 20px">מתן כחלון</span><span style="font-size: 11px; color: #4B5563">מרתונים ושיעורים פרטיים לאקדמיה</span></a>`

const waFab = `<a href="${WA}" target="_blank" rel="noopener" aria-label="שיחה עם מתן בוואטסאפ" style="pointer-events: auto; width: 56px; height: 56px; border-radius: 50%; background: #16A34A; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(15,23,42,0.3); text-decoration: none"><svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z"></path></svg></a>`

const waBar = `<a href="${WA}" target="_blank" rel="noopener" aria-label="התייעצות עם מתן בוואטסאפ" style="cursor: pointer; flex: 0 0 28%; height: 52px; border-radius: 12px; background: #16A34A; display: flex; align-items: center; justify-content: center; text-decoration: none"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z"></path></svg></a>`

function upgrade(html, fileName) {
  let out = html

  out = out.replace(
    /<style>[\s\S]*?<\/style>\s*<style>body\{background:#E5E7EB;display:flex;justify-content:center\}<\/style>/,
    `<style>${bodyStyle}</style>`,
  )

  out = out.replace(
    /style="width: 390px; min-height: \d+px; box-sizing: border-box; background: #FFFFFF; color: #0F172A; font-family: 'Heebo', system-ui, sans-serif; font-size: 16px; line-height: 1\.55; display: flex; flex-direction: column"/g,
    `style="${pageShell}"`,
  )

  out = out.replace(
    /<div style="display: flex; flex-direction: column; line-height: 1\.15; min-width: 0"><span style="font-weight: 800; font-size: 20px">מתן כחלון<\/span><span style="font-size: 11px; color: #4B5563">מרתונים ושיעורים פרטיים לאקדמיה<\/span><\/div>/g,
    logoBlock,
  )

  out = out.replace(/href="home\.html"/g, 'href="index.html"')

  if (fileName !== 'home.html') {
    out = out.replace(
      /href="index\.html" style="color: #1E3A8A; text-decoration: none; white-space: nowrap; border: 1px solid #1E3A8A/g,
      'href="index.html#courses" style="color: #1E3A8A; text-decoration: none; white-space: nowrap; border: 1px solid #1E3A8A',
    )
  }

  out = out.replace(/href="#private"/g, 'href="private-lessons.html"')
  out = out.replace(/href="#terms"/g, 'href="terms.html"')
  out = out.replace(/href="#wa"/g, `href="${WA}"`)

  out = out.replace(
    /<a id="terms" href="[^"]*" style="color: #1E3A8A; padding: 8px 0">תקנון ואחריות מעבר<\/a>/g,
    '<a href="terms.html" style="color: #1E3A8A; padding: 8px 0">תקנון ואחריות מעבר</a>',
  )
  out = out.replace(
    /<a id="private" href="[^"]*" style="color: #1E3A8A; padding: 8px 0">שיעורים פרטיים<\/a>/g,
    '<a href="private-lessons.html" style="color: #1E3A8A; padding: 8px 0">שיעורים פרטיים</a>',
  )

  out = out.replace(
    /וואטסאפ וטלפון: \[מספר\]/g,
    `וואטסאפ וטלפון: <a href="${WA}" target="_blank" rel="noopener">${PHONE}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a>`,
  )

  if (fileName === 'home.html') {
    const courseHrefs = [
      'course-linear-algebra.html',
      'course-calculus.html',
      'course-probability.html',
    ]
    let i = 0
    out = out.replace(/href="course-(?:linear-algebra|calculus|probability)\.html"/g, () => {
      return `href="${courseHrefs[Math.min(i++, courseHrefs.length - 1)]}"`
    })
  }

  out = out.replace(
    /<button type="button" aria-label="שיחה עם מתן בוואטסאפ"[\s\S]*?<\/button>/g,
    waFab,
  )

  out = out.replace(
    /<button type="button" aria-label="התייעצות עם מתן בוואטסאפ"[\s\S]*?<\/button>/g,
    waBar,
  )

  out = out.replace(
    /<button type="button" style="cursor: pointer; border: 0; background: #16A34A; color: #FFFFFF; font-family: inherit; font-size: 18px; font-weight: 800; border-radius: 12px; padding: 16px; min-height: 56px; display: flex; align-items: center; justify-content: center; gap: 10px">([\s\S]*?)שלחו לי הודעה בוואטסאפ<\/button>/,
    `<a href="${WA}" target="_blank" rel="noopener" style="cursor: pointer; border: 0; background: #16A34A; color: #FFFFFF; font-family: inherit; font-size: 18px; font-weight: 800; border-radius: 12px; padding: 16px; min-height: 56px; display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none">$1שלחו לי הודעה בוואטסאפ</a>`,
  )

  if (fileName.startsWith('course-')) {
    out = out.replace(
      /<button type="button" style="border: 0; cursor: pointer; background: #EA580C; color: #FFFFFF; font-family: inherit; font-size: 18px; font-weight: 800; border-radius: 12px; padding: 16px; min-height: 56px">להרשמה למרתון החי - 400 ₪<\/button>/g,
      '<a href="thanks.html" style="display: block; text-align: center; text-decoration: none; border: 0; cursor: pointer; background: #EA580C; color: #FFFFFF; font-family: inherit; font-size: 18px; font-weight: 800; border-radius: 12px; padding: 16px; min-height: 56px; box-sizing: border-box">להרשמה למרתון החי - 400 ₪</a>',
    )
    out = out.replace(
      /<button type="button" style="cursor: pointer; background: #FFFFFF; color: #0F172A; border: 2px solid #0F172A; font-family: inherit; font-size: 17px; font-weight: 700; border-radius: 12px; padding: 14px; min-height: 52px">להרשמה למרתון המוקלט - 250 ₪<\/button>/g,
      '<a href="thanks.html" style="display: block; text-align: center; text-decoration: none; cursor: pointer; background: #FFFFFF; color: #0F172A; border: 2px solid #0F172A; font-family: inherit; font-size: 17px; font-weight: 700; border-radius: 12px; padding: 14px; min-height: 52px; box-sizing: border-box">להרשמה למרתון המוקלט - 250 ₪</a>',
    )
    out = out.replace(
      /<button type="button" style="cursor: pointer; background: #16A34A; color: #FFFFFF; border: 0; font-family: inherit; font-size: 16px; font-weight: 700; border-radius: 10px; padding: 12px; min-height: 48px">להצטרפות לקבוצת העדכונים<\/button>/g,
      `<a href="${WA}" target="_blank" rel="noopener" style="display: block; text-align: center; text-decoration: none; cursor: pointer; background: #16A34A; color: #FFFFFF; border: 0; font-family: inherit; font-size: 16px; font-weight: 700; border-radius: 10px; padding: 12px; min-height: 48px; box-sizing: border-box">להצטרפות לקבוצת העדכונים</a>`,
    )
  }

  return out
}

const files = readdirSync(mockupDir).filter((f) => f.endsWith('.html'))
for (const file of files) {
  const raw = readFileSync(join(mockupDir, file), 'utf8')
  const upgraded = upgrade(raw, file)
  const outName = file === 'home.html' ? 'index.html' : file
  writeFileSync(join(root, outName), upgraded, 'utf8')
  console.log('wrote', outName)
}
