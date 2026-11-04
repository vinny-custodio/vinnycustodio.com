# Project context

Vinny Custodio's portfolio. Plain HTML/CSS/JS, Geist typography, shared top navigation and floating bottom dock, light/dark theme, case-study bottom sheets. UI icons use Iconoir; playful motifs are custom SVGs. No CMS/backend is deployed.

## File map

- `dist/index.html`: homepage; `home-motion.js`: work card deck/filter behavior; `work-reel.js` and reel-related files: reel.
- `dist/hero-shapes.js`: hover-only letter motifs. The experimental automatic hero scroll swaps were removed at the user's request. Keep hover only unless instructed otherwise.
- `dist/nav.js`, `about-top-nav.js/css`, `theme.css`: shared navigation, theme, contact/email confirmation.
- `dist/case-studies.js`: case-study content, media, and layout manifests. Later overrides in the file affect the final content.
- `dist/case-study.js/css`: case page renderer. Case study dialogs are bottom sheets.
- `dist/about-me/`: About page, always pure black with neutral pills and a photo marquee.
- `dist/hire-me/`: mentorship only; public label is Mentorship. Other service offers were removed.
- `dist/about-chat.js/css`: chat panel UI; `about-chat-knowledge.js`: curated professional responses, matching, typo handling, and boundaries.
- `dist/assets/`: local image/animation assets. Everkind craft assets live in `assets/everkind/`; interactive demos are in `dist/everkind/`.

## Current content decisions

- Hero: Crafty / User-Centred / Data-Informed, plus the fun-to-work-with pill. Keep approved copy unless asked.
- Work covers Everkind, Melon Trains, RISD, Design Labs, Mary Washington, CTRL, Vista, Pantrx, and Georgia Agriculture. Melon flight search, checkout, and Qatar pages remain in source but were hidden from the homepage. Do not unhide them incidentally.
- CTRL and Vista are personal UI concepts, not tested/launched products. No professional finance experience claim.
- Everkind: first vision began with WhatsApp and ChatGPT references, many V1 iterations, V2 added journaling; over 200K global downloads is user-confirmed app reach.
- RISD: rebrand, visual storytelling, craft, digital brand expression, W3 Gold. Do not invent interviews/workshops.
- Melon Trains: 4,000 customers; earlier Amtrak-based booking patterns were not a good fit for UK commuters.
- Qatar was client work with SC.qa at Zoocha, not a personal concept.
- Current role: Senior Product Designer at Absorb, designing and coding, helping product shape new features with AI. No internal roadmap details.
- Case study tone should use direct language, e.g. “I designed” rather than “collaborated.” Avoid em dashes and invented results.

## Interaction decisions

- Mobile cards: no blur reveal/depth-of-field filter; one subtle outline plus one soft shadow. Desktop retains its treatment.
- Mobile VNY logos stay circular and compact; desktop hover expands.
- Chat opens at the right and shifts desktop content left; mobile uses a bottom sheet. It has a short typing pause, no project suggestion chips, sourced professional facts, same-topic follow-ups, typo-tolerant matching, and varied playful boundaries for insults/off-topic requests. It has no model/API key, runtime data access, or persistent chat storage.

## Figma design source

Main file: https://www.figma.com/design/2DvqG5OnntGFzMSHLnhmpS/
Everkind craft frame: https://www.figma.com/design/2DvqG5OnntGFzMSHLnhmpS/?node-id=8048-25
Exported assets needed to run the site are already in this repository. Figma editing access is separate from website recovery.
