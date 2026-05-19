# LAVA — Los Altos Village Association

A modernized static website for the [Los Altos Village Association](https://downtownlosaltos.org/), built as plain HTML, CSS, and JavaScript with no build step. Drop it on GitHub Pages and you're live.

## Pages

- `index.html` — Home
- `events.html` — Calendar of Events
- `directory.html` — Member Directory (with search + category filter)
- `about.html` — About LAVA
- `join.html` — Become a Member
- `donate.html` — Donate (funnels to the Community Foundation portal)

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `lava-site`).
2. From this folder, initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-ORG/lava-site.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment**. Source: **Deploy from a branch**. Branch: **main**, folder: **/ (root)**. Save.
4. After a minute or two, the site will be live at `https://YOUR-ORG.github.io/lava-site/`.

To use a custom domain (e.g. `downtownlosaltos.org`), add a `CNAME` file at the project root containing the domain, then point the domain's DNS at GitHub Pages per [their docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Replacing the placeholder images

The `images/` folder currently ships with hand-drawn **SVG placeholders** (downtown streetscape, farmers' market, event cards, member-of-the-month). These are intentional stand-ins — swap them for real photography before going public. The HTML references them by filename:

| Placeholder | Where it's used | Suggested real photo |
|---|---|---|
| `downtown-street.svg` | Home hero (main frame), About hero | Wide shot of Main/State Street, ideally evening with the string lights on |
| `farmers-market.svg` | Home hero (sub frame) | Thursday Farmers' Market crowd |
| `event-farmers.svg` | Events page | Same as above, or vendor closeup |
| `event-bike.svg` | Events page | Bike n' Dine photo |
| `event-wine.svg` | Events page | Arts & Wine Festival |
| `event-whiskey.svg` | Events page | Whiskey & Bites |
| `member-hardware.svg` | Home (Member of the Month) | Storefront of the current featured member |

Just drop a `.jpg` or `.webp` in `images/` with the same name (or update the `src` attribute). Recommended dimensions: 1600×1200 for hero shots, 1200×900 for cards.

## Editing content

Everything is plain HTML — no templating engine. To change copy, open the relevant `.html` file in any editor. Repeated regions (header, footer) are inlined on each page; if you update one, update them all.

The Donate button color, the heart-pulse animation, and the entire color palette live as CSS custom properties at the top of `css/style.css`. Change `--terracotta`, `--gold`, or `--forest` there and it cascades everywhere.

## Browser support

Tested in current Chrome, Safari, Firefox, and Edge. Uses `IntersectionObserver` for scroll-triggered animations (universally supported). The `prefers-reduced-motion` media query is respected — animations turn off for users who request reduced motion.

## Credits

Fonts: Cormorant Garamond, Inter Tight, JetBrains Mono — via Google Fonts.

Donation processing: [Los Altos Community Foundation](https://losaltoscf.org/) — the Los Altos Village Fund is a 501(c)(3) managed through LACF.
