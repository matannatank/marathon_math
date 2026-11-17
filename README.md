# אתר מתן כחלון — מרתונים במתמטיקה

אפליקציית React (Vite + Tailwind) לפי אפיון גרסה 5.

**לינק חי (Firebase Hosting):** https://marathon-math.web.app

## הרצה מקומית

```bash
npm install
npm run dev
```

פתחו את הכתובת שמופיעה בטרמינל (בדרך כלל http://127.0.0.1:5173).

להעלאה ל־Firebase אחרי שינויים:

```bash
npm run deploy
```

צריך קובץ `.env` מקומי (ראו `.env.example`) — לא נשמר בגיט.

## איך מתן מעדכן תוכן

רק קבצים תחת `src/content/`:

| קובץ | מה יש בו |
|---|---|
| `siteConfig.ts` | מותג, טקסטים כלליים, שיעורים פרטיים, וואטסאפ |
| `courses.ts` | מוסדות, מסלולים, קורסים, מחירים, לו״ז, סרטונים |
| `faq.ts` | שאלות ותשובות |
| `testimonials.ts` | המלצות |
| `terms.ts` | תקנון ואחריות מעבר |

תמונות: שימו ב־`public/matan.jpg` ו־`public/matan-avatar.jpg`.

## מבנה עמודים

- `/` — בית
- `/course/:slug` — עמוד קורס
- `/private-lessons` — שיעורים פרטיים
- `/terms` — תקנון
- `/thank-you/:courseSlug/:productType` — תודה אחרי הרשמה

`mockup/` ו־`spec.md` נשארים כמקור אפיון/הדמיה.
