# AccessPremium pending demos map

Source of truth: `src/data/invitations.ts`.

Vault note: the requested external vault path `C:\Users\Cristo\Documents\AssetExtractor\replicas` was not present in this workspace. Available references used for this map are `AssetExtractor/Inspo`, `capturas/manifest.json`, and the existing analysis files.

Status guide:
- `completada`: routed to a real React template and visually above placeholder level.
- `pendiente`: falls back to `ComingSoonPlaceholder`.
- `legacy`: available outside the dynamic catalog route.

| Template | Category | Route | Visual family | Priority | Suggested Vault reference | Main assets to use | Relevant animation cues | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Boda Botanica Verde Olivo | bodas | `/bodas/botanica-verde-olivo` | botanical-elegance | mvp | `AssetExtractor/Inspo/Bodas/boda1 (1).png` | paper texture, envelope, botanical line art, polaroid photo | envelope reveal, soft float, breathing music button | completada |
| Boda Dark Mode Noir | bodas | `/bodas/dark-mode-noir` | dark-mode-premium | fase4 | `AssetExtractor/Inspo/Bodas/boda10 (1).png`, `boda10 (2).png` | `/assets/templates/bodas/dark-mode-noir/white-rose-noir-frame.png`, selected wedding photos, black paper, white roses, candles | candle glow, slow fade-up, gold shimmer, music button | completada |
| Boda Editorial Fine Art | bodas | `/bodas/editorial-fine-art` | editorial-fine-art | fase4 | legacy `/demo/boda-editorial` | editorial B/W photo, monogram, serif typography | subtle fade, photo reveal | legacy |
| Boda Western Sunset | bodas | `/bodas/western-sunset` | rustic-chic | fase5 | `AssetExtractor/Inspo/Bodas/boda16.png` | `/assets/templates/bodas/western-sunset/western-sunset-frame.png`, pampas, torn paper, sunset photo, western ornaments | paper reveal, warm dust float, dual RSVP, music button | completada |
| XV Princesa Encantada | xv-anos | `/xv-anos/princesa-encantada` | princess-fantasy | mvp | `AssetExtractor/Inspo/XV anos/redise-o-de-cenicienta` | royal blue texture, crown, castle, sparkles, carriage/shoe motifs | sparkle, shimmer gold, floating crown, intro open | completada |
| XV Gatsby Gold Black | xv-anos | `/xv-anos/gatsby-gold` | dark-mode-premium | fase4 | `AssetExtractor/Inspo/XV anos/screencapture-lirioinvitaciones-gatsby-xv-a-os-2026-05-26-10_47_10.png` | `/assets/templates/xv-anos/gatsby-gold/art-deco-frame.png`, black-gold texture, feather, selected gala photos | staged reveal, art deco shimmer, music button | completada |
| XV Bosque Encantado | xv-anos | `/xv-anos/bosque-encantado` | botanical-elegance | fase5 | `AssetExtractor/Inspo/XV anos/dise-o-25-nuevo-mis-xv` | `/assets/templates/xv-anos/bosque-encantado/enchanted-forest-gate.svg`, `/assets/templates/xv-anos/bosque-encantado/enchanted-forest-lake.svg`, `/assets/templates/xv-anos/bosque-encantado/enchanted-portrait-card.svg`, fireflies, fairy florals | firefly float, glow pulses, upload-photo state, music button | completada |
| XV Hombre Gold Waves | xv-hombres | `/xv-hombres/gold-waves` | dark-mode-premium | mvp | `AssetExtractor/Inspo/XV Años hombres/screencapture-lirioinvitaciones-xv-hombre-3-2026-05-26-10_57_10.png` | `/assets/templates/xv-hombres/gold-waves/waves-frame.png`, `/assets/templates/xv-hombres/gold-waves/oscar-suit-portrait.png`, navy satin texture | wave shimmer, sparkle, slow reveal, music button | completada |
| XV Hombre Racing Speed | xv-hombres | `/xv-hombres/racing-speed` | racing-action | fase4 | `AssetExtractor/Inspo/XV Años hombres/xv-hombre-7` | `/assets/templates/xv-hombres/racing-speed/racing-speed-frame.svg`, `/assets/templates/xv-hombres/racing-speed/racing-car.svg`, black/gold tickets, selected portraits | racing float, ticket reveal, upload-photo state, music button | completada |
| XV Hombre Gatsby Gold | xv-hombres | `/xv-hombres/gatsby-gold-men` | dark-mode-premium | fase5 | `AssetExtractor/Inspo/XV Años hombres/xv-hombre-3/4` | `/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-frame.svg`, `/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-portrait.svg`, red-black envelope, wax seal, art deco geometry | art deco float, staged reveal, upload-photo state, music button | completada |
| Cumple Golden Glam | cumpleanos | `/cumpleanos/golden-glam` | dark-mode-premium | mvp | `AssetExtractor/Inspo/Cumpleaños/dise-o-7-nuevo-cumplea-os-7` | `/assets/templates/cumpleanos/golden-glam/gold-party-frame.png`, gold balloons, big 30, confetti, selected party photos | confetti fall, foil shine, pop reveal, music button | completada |
| Kawaii Friends | cumpleanos | `/cumpleanos/kawaii-friends` | coquette-aesthetic | mvp | `AssetExtractor/Inspo/Cumpleaños/cumplea-os-hello-kitty` | `/assets/templates/cumpleanos/kawaii-friends/kawaii-party-frame.png`, original kawaii friends, cake, balloons, stickers | sticker float, bounce, sparkle, music button | completada |
| Coquette Bows | cumpleanos | `/cumpleanos/coquette-bows` | coquette-aesthetic | fase4 | `AssetExtractor/Inspo/Cumpleaños/redise-o-4-cumplea-os` | `/assets/templates/cumpleanos/coquette-bows/coquette-bows-frame.svg`, selected party photos, bows, cherries, pink paper line art | bow float, journal reveal, upload-photo state, music button | completada |
| Racing Champion | cumpleanos | `/cumpleanos/racing-champion` | racing-action | fase4 | `AssetExtractor/Inspo/Cumpleaños/cumplea-os-1-cars` | checkered flags, badge, car photo, trophy | racing streak, pulse, pit-pass intro | completada |
| Summer Brunch | cumpleanos | `/cumpleanos/summer-brunch` | botanical-elegance | fase4 | `AssetExtractor/Inspo/Cumpleaños/dise-o-6-cumplea-os` | `/assets/templates/cumpleanos/summer-brunch/summer-brunch-frame.svg`, selected brunch cocktail photo, watercolor fruit art | watercolor fade, fruit float, music button | completada |
| Baby Shower Selva Suave | baby-shower | `/baby-shower/selva-suave` | safari-animal-friends | mvp | `AssetExtractor/Inspo/Baby Shower/diseno-1-baby-shower` | safari animals, clouds, watercolor leaves | cloud float, animal peek, ticket reveal | completada |
| Baby Shower Coquette Bebe | baby-shower | `/baby-shower/coquette-bebe` | coquette-aesthetic | mvp | `AssetExtractor/Inspo/Baby Shower/redise-o-baby-shower` | `/assets/templates/baby-shower/coquette-bebe/coquette-baby-frame.png`, bows, teddy, pink clouds, lace panel | bow float, soft sparkle, music button | completada |
| Baby Shower Jirafa Pastel | baby-shower | `/baby-shower/jirafa-pastel` | safari-animal-friends | fase4 | `AssetExtractor/Inspo/Baby Shower/baby-shower-2` | `/assets/templates/baby-shower/jirafa-pastel/giraffe-pastel-frame.svg`, giraffe plush photo, safari watercolor gallery | gentle bob, cloud float, music button | completada |
| Bautizo Jardin de la Gracia | bautizo | `/bautizo/jardin-de-la-gracia` | botanical-elegance | mvp | `AssetExtractor/Inspo/Bautizo/dise-o-3-nuevo-bautizo` | cross, white flowers, olive leaves, paper, envelope | envelope open, solemn fade-up, light rays | completada |
| Bautizo Trazo Celestial | bautizo | `/bautizo/trazo-celestial` | religious-classic | fase4 | `AssetExtractor/Inspo/Bautizo/dise-no-2-nuevo-bautizo` | `/assets/templates/bautizo/trazo-celestial/blue-toile-baptism-frame.png`, local baby portrait and ceremony detail, toile line art, circular photo | soft reveal, halo glow, music button | completada |
| Comunion Sacramento Elegance | comunion | `/comunion/sacramento-elegance` | botanical-elegance | mvp | `AssetExtractor/Inspo/Comunion/dise-o-1-comunion` | `/assets/templates/comunion/sacramento-elegance/communion-botanical-frame.png`, local chalice/cake gallery, botanical arches, envelope, chalice | envelope open, floral float, music button | completada |
| Comunion Modern Block | comunion | `/comunion/modern-block` | dark-mode-premium | fase4 | `AssetExtractor/Inspo/Comunion/comunion-24` | `/assets/templates/comunion/modern-block/modern-block-frame.svg`, first communion portrait, chalice detail | block slide, subtle reveal, music button | completada |
| Revelacion Teddy Boho | revelacion | `/revelacion/teddy-boho` | boho-natural | fase4 | `AssetExtractor/Inspo/Revelacion de Genero/dise-o-3-revelaci-n` | teddy, kraft tags, pampas, team cards | teddy float, team vote pulse, collage reveal | completada |
| Revelacion Classic Balloons | revelacion | `/revelacion/classic-balloons` | coquette-aesthetic | mvp | `AssetExtractor/Inspo/Revelacion de Genero/revelacion-dise-o-5` | `/assets/templates/revelacion/classic-balloons/classic-balloons-frame.png`, local party/vote gallery, pink-blue balloons, clouds, teddy details | balloon float, native Team vote pulse, music button | completada |
| Grad Honor Classic | graduacion | `/graduacion/honor-classic` | academic-formal | mvp | `AssetExtractor/Inspo/Graduacion/redise-o-graduaci-n` | `/assets/templates/graduacion/honor-classic/academic-laurel-frame.png`, `/assets/templates/graduacion/honor-classic/graduate-cap-courtyard.png`, graduate portrait | laurel shimmer, academic float, paper reveal, music button | completada |
| Grad Midnight Gala | graduacion | `/graduacion/midnight-gala` | dark-mode-premium | fase4 | `AssetExtractor/Inspo/Graduacion/screencapture-lirioinvitaciones-graduacion3-page-2-2026-05-26-11_08_35.png` | `/assets/templates/graduacion/midnight-gala/midnight-paper.png`, `/assets/templates/graduacion/midnight-gala/graduate-portrait.png`, paper texture, navy/gold academic ornaments | cap float, scroll reveal, music button | completada |
| Jubilacion Golden Blooms | jubilacion | `/jubilacion/golden-blooms` | botanical-elegance | fase4 | `AssetExtractor/Inspo/Jubilacion/jubilacion-1`, `jubilacion-1-page-2` | `/assets/templates/jubilacion/golden-blooms/golden-blooms-envelope.svg`, `/assets/templates/jubilacion/golden-blooms/golden-blooms-frame.svg`, selected career photos | envelope intro, floral float, warm reveal, music button | completada |
| Jubilacion Executive Prestige | jubilacion | `/jubilacion/executive-prestige` | dark-mode-premium | fase5 | `AssetExtractor/Inspo/Jubilacion/jubilacion-2`, `analysis/Jubilacion-analisis.md` | `/assets/templates/jubilacion/executive-prestige/executive-envelope.svg`, `/assets/templates/jubilacion/executive-prestige/executive-prestige-frame.svg`, navy executive texture, silver frame, timeline | satin shine, measured fade, upload-memory state, music button | completada |
| Homenaje Clasico | luctuoso | `/luctuoso/homenaje-clasico` | religious-classic | mvp | `AssetExtractor/Inspo/Luctuoso/luctuoso-1` | `/assets/templates/luctuoso/homenaje-clasico/memorial-classic-frame.svg`, candle card, chapel detail, grayscale portrait, black ribbon, subtle floral pattern | restrained scroll reveal, ribbon/glow motion, music button, memory upload state | completada |

## Immediate priority

Batch 1 is now focused on:

1. Keep `Boda Botanica Verde Olivo` as the quality baseline.
2. Elevate `XV Princesa Encantada`.
3. Elevate `Racing Champion`.

Completed next batch:

1. `XV Hombre Gold Waves`
2. `XV Gatsby Gold Black`
3. `Grad Midnight Gala`

Completed third upgrade batch:

1. `Boda Dark Mode Noir`
2. `Cumple Golden Glam`
3. `Grad Honor Classic`

Completed fourth upgrade batch:

1. `Boda Western Sunset`
2. `Kawaii Friends`
3. `Baby Shower Coquette Bebe`

Completed fifth upgrade batch:

1. `Comunion Sacramento Elegance`
2. `Revelacion Classic Balloons`
3. `Bautizo Trazo Celestial`

Completed sixth upgrade batch:

1. `Comunion Modern Block`
2. `Summer Brunch`
3. `Baby Shower Jirafa Pastel`

Completed seventh upgrade batch:

1. `Coquette Bows`
2. `XV Hombre Racing Speed`
3. `Jubilacion Golden Blooms`

Completed eighth upgrade batch:

1. `XV Bosque Encantado`
2. `XV Hombre Gatsby Gold`
3. `Jubilacion Executive Prestige`

Completed final upgrade batch:

1. `Homenaje Clasico`

Catalog completion note:

- All non-legacy dynamic catalog demos in this map are routed to real React templates and marked `completada`.
