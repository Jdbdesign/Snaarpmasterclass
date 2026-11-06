# AI Sales Growth Masterclass – Next.js page

This is the masterclass landing page, rebuilt as a Next.js site. It looks and behaves exactly like the original `AI Sales Growth Masterclass.html` file.

## What you need
- Node.js 18.18 or newer (download it from https://nodejs.org – choose the "LTS" version).

## Run it on your computer
Open a terminal in this folder, then:

1. `npm install` – downloads what the site needs (only once).
2. `npm run dev` – starts the site for testing. Open http://localhost:3000 in your browser.

## Put it live (production)
1. `npm run build` – prepares the fast, final version.
2. `npm start` – serves it. Open http://localhost:3000.

To use a different port: `npm start -- -p 4000`.

## Where things are
- `app/page.tsx` – the page.
- `components/Masterclass.tsx` – all the page content (same layout as the original).
- `components/useMasterclass.ts` – the interactive parts (dashboard tour, filters, registration form).
- `app/globals.css` – all styling, copied from the original.
- `public/` – the logo and the font.

The original HTML file and `orig.html` (a copy used for comparison) are not part of the site and can be kept or removed.
