# STORE_BLUEPRINT.md — MARLOWE HOME
# =====================================================
# WHAT THIS FILE IS
# =====================================================
#
# This is the complete section-by-section structure for every page
# of the Marlowe Home Shopify store.
#
# Brand: Marlowe Home
# Niche: Premium home lighting & ambiance
# Market: Belgium + Netherlands
# Vibe: British elegance, warm, moody, dark backgrounds, gold accents
#
# Use this alongside CLAUDE.md when building the theme.
# Every section listed here = one section .liquid file to build.
#
# =====================================================
# GLOBAL ELEMENTS (render on every page)
# =====================================================

ANNOUNCEMENT BAR
- Thin strip at very top of page
- Dark background (--color-bg-dark), gold text (--color-accent-gold)
- 3 rotating messages with left/right arrows:
  Message 1: "Free shipping on orders over €50"
  Message 2: "30-day money back guarantee"
  Message 3: "Spring Sale — 40% off selected items"
- Auto-rotates every 4 seconds

HEADER / NAVIGATION
- Background: --color-bg-dark
- Logo: "Marlowe Home" in Playfair Display, --color-accent-gold
- Nav links: Spring Sale | Collections | About | Track Order | Contact
- Right icons: Search | Account | Cart (with item counter badge in gold)
- Sticky on scroll (stays at top as user scrolls down)
- Mobile: hamburger menu, full-screen dark overlay

FOOTER
- Background: --color-bg-dark (darkest section)
- Gold top border line before footer begins
- 4 columns:
  Col 1: Brand tagline + 2-3 sentence brand story
  Col 2: Newsletter ("Join the Marlowe Circle" + email field + gold CTA button)
  Col 3: Shop links (All Products, Collections, Spring Sale, About Us)
  Col 4: Policies (Privacy, Returns, Shipping, Terms of Service)
- Bottom row: payment icons (Visa, MC, Apple Pay, Shop Pay) + copyright
- All text: --color-text-muted, hover: --color-text-light


# =====================================================
# HOMEPAGE STRUCTURE (top to bottom)
# =====================================================

--- SECTION 1: HERO BANNER ---
Background: full-width lifestyle image (dark, moody, candle-lit room)
Overlay: semi-transparent dark layer (rgba 0,0,0,0.4) so text reads clearly
Content (centered or left-aligned):
  - Small label above heading: "NEW COLLECTION" in gold, letter-spaced caps
  - Main heading: "Light Changes Everything" in Playfair Display, large, --color-text-light
  - Subheading: "Discover premium lighting crafted for the home you deserve."
  - CTA button: "Shop Now" — gold background, dark text, --radius-btn
Height: 90vh on desktop, 70vh on mobile

--- SECTION 2: TRUST BAR ---
Background: --color-bg-green
3 columns with icon + text:
  Left:   [icon] Free Shipping over €50
  Center: [icon] 30-Day Money Back
  Right:  [icon] Secure Payment
All text: --color-text-light
Gold icon color: --color-accent-gold
Thin gold border top and bottom of this section

--- SECTION 3: BRAND STORY / INTRO ---
Background: --color-bg-cream
Max width: --content-max-width, centered
Heading: "Welcome to Marlowe Home" in Playfair Display, --color-text-dark
2-3 short paragraphs in --font-body:
  "At Marlowe Home, we believe your space should feel as good as it looks.
   We curate lighting and ambiance products with one thing in mind — warmth.
   Designed for the modern home. Inspired by British elegance."
No CTA needed here — pure brand voice

--- SECTION 4: FEATURED COLLECTION GRID ---
Background: --color-bg-dark
Heading: "Best Sellers" in Playfair Display, --color-text-light
Subheading: "Our most loved pieces this season." in --color-text-muted
4 product cards in a row (desktop), 2 per row (mobile)
Each card:
  - Product image (warm-toned)
  - Product name: --color-text-light
  - Price: sale price in --color-accent-gold + crossed-out original in --color-text-muted
  - "Save XX%" badge: small, gold background, dark text
  - Hover: subtle gold border around card

--- SECTION 5: LIFESTYLE IMAGE SPLIT ---
Background: --color-bg-navy
2-column layout (50/50):
  Left: Large lifestyle image (moody interior, warm lighting in use)
  Right: Content block
    - Small label: "WHY MARLOWE" in gold caps
    - Heading: "Crafted for the way you live" in Playfair Display
    - 3-4 bullet points with gold dot accents:
      • Curated for Belgian & Dutch homes
      • Premium materials, honest prices
      • Designed to create atmosphere, not just light
      • Every piece tested for warmth and quality
    - CTA: "Discover Our Story" (ghost button — gold border, transparent bg)

--- SECTION 6: SECOND FEATURED COLLECTION ---
Background: --color-bg-cream
Heading: "New Arrivals" in Playfair Display, --color-text-dark
Subheading in --color-text-muted
4-5 product cards horizontal scroll carousel
Same card format as Section 4 but on light background:
  - Product name: --color-text-dark
  - Price: --color-accent-gold sale + --color-text-muted original

--- SECTION 7: FULL-WIDTH MOOD BANNER ---
Background: full-width image (terrace at night, golden light, cozy atmosphere)
Dark overlay
Centered text:
  - Heading: "Your home. Your atmosphere." in Playfair Display, large, light
  - CTA button: "Shop the Collection"
Height: 60vh

--- SECTION 8: SOCIAL PROOF / COMMUNITY ---
Background: --color-bg-dark
Centered:
  - Heading: "Trusted by 10,000+ Homes Across Europe"
  - Trustpilot or star rating badge
  - 3-4 short review quotes displayed in a row
    Each: star rating + quote text + reviewer name (bold)

--- SECTION 9: CONTACT / SUPPORT CTA ---
Background: --color-bg-green
Centered content:
  - Heading: "We're here for you"
  - Body: "Our team is available Monday–Friday, 9am–6pm CET. Average response: 24h."
  - CTA button: "Contact Us" (gold)

--- SECTION 10: TRUST BAR REPEAT ---
Same as Section 2 (repeat trust signals before footer)
Background: --color-bg-dark


# =====================================================
# PRODUCT PAGE STRUCTURE (top to bottom)
# =====================================================

Background of entire page: --color-bg-cream (light, lets product images breathe)

--- SECTION 1: PRODUCT MAIN (2-column layout) ---

LEFT COLUMN — Images:
- Main large product image
- 2-3 thumbnail images below or to the side
- Zoom on click/hover
- Dark background behind image (--color-bg-dark) for premium feel
- Video thumbnail if product video exists

RIGHT COLUMN — Product Info:
- Star rating + "4.8 / 5.0 — based on 500+ reviews" (ABOVE title, in gold stars)
- Product title: Playfair Display, large, --color-text-dark
- Price block:
    Sale price: --color-accent-gold, large
    Original price: crossed out, --color-text-muted
    "Save XX%" badge: gold bg, dark text
- 3 trust icons (small, horizontal row):
    [icon] Free shipping over €50
    [icon] 30-day money back
    [icon] Secure payment
- Urgency line in gold: "🌿 Spring Sale — Only a few left at this price"
- Variant selector (size/color/type) if applicable: styled with gold border on selected
- "Add to Cart" button: full width, --color-accent-gold background, dark text, bold
- Below button — scarcity message in small text:
    "Due to high demand, we recommend ordering soon. Stock is limited."
- Reassurance line: Free returns · Ships in 2-5 days · Tracked delivery

--- SECTION 2: PRODUCT DESCRIPTION ---
Background: --color-bg-cream
Gold divider line above section
Heading with emoji: e.g. "✨ Why You'll Love This"
2-3 paragraphs telling the product story
Bold key phrases that hit emotional desires
Warm, editorial tone — not spec-sheet tone

--- SECTION 3: PRODUCT IMAGE (secondary) ---
Full-width or large lifestyle image showing product in use
Dark overlay with short pull-quote in gold italic text

--- SECTION 4: PRODUCT DETAILS & SIZE/SPEC ---
Background: --color-bg-cream
Heading: "Product Details"
Clean table or bullet list:
  - Dimensions
  - Materials
  - Power source
  - Care instructions
If applicable — size chart table with columns

--- SECTION 5: COLLAPSIBLE INFO BLOCKS ---
Background: --color-bg-cream
3 expandable accordion blocks:
  Block 1: "Shipping Information"
    — carrier, delivery time, tracking
  Block 2: "Returns & Refund Policy"
    — 30-day money back, original condition required
  Block 3: "Have a Question?"
    — link to contact page, response time

--- SECTION 6: SOCIAL PROOF LINE ---
Small centered line:
"[avatar] Margaret V. and 8,000+ others are lighting their home with Marlowe."
Gold checkmark icon

--- SECTION 7: GUARANTEE BLOCK ---
Background: --color-bg-dark
2-column:
  Left: Heading "30-Day Money Back Guarantee"
        Paragraph: warmly written reassurance
        CTA ghost button: "Learn More"
  Right: Lifestyle image (warm, human, relatable)
Gold border accent on left side of left column

--- SECTION 8: UPSELL / BUNDLE ---
Background: --color-bg-cream
Heading: "Complete the Atmosphere — Save 15%"
Subheading: "Customers who bought this also loved:"
4 related product cards
Same card style as homepage but on cream background

--- SECTION 9: COMMUNITY / TRUST ---
Background: --color-bg-navy
Centered:
  Heading: "The Marlowe Home Community"
  "Join over 10,000 European homes that chose warmth."
  Trustpilot/star rating badge in gold

--- SECTION 10: REVIEWS GRID ---
Background: --color-bg-cream
Heading: "What Our Customers Say"
4 review cards in a row (2 on mobile):
  Each card: dark background (--color-bg-dark), gold stars, review title bold,
  review body text, reviewer name + verified badge
Gold border on each card

--- SECTION 11: FAQ ACCORDION ---
Background: --color-bg-cream
Heading: "Frequently Asked Questions"
5 questions:
  1. Do you offer free shipping?
  2. How long does delivery take to Belgium/Netherlands?
  3. Can I return the product if I don't love it?
  4. Is payment secure?
  5. How do I contact customer support?
Bottom line: "Support available Mon–Fri, 9am–6pm CET · Avg. response: 24h"

--- SECTION 12: TRUST BAR ---
Background: --color-bg-dark
Same 3-icon trust bar (Free Shipping / Money Back / Secure Payment)
Repeating trust signal before footer

--- STICKY ADD TO CART BAR (mobile) ---
Fixed at bottom of screen on mobile
Shows when user has scrolled past main Add to Cart button
Contains: product thumbnail + name + price + "Add to Cart" button
Background: --color-bg-dark, gold button


# =====================================================
# SPACING & DESIGN PRINCIPLES
# =====================================================

- Section padding: 100px top/bottom desktop, 50px mobile
- Max content width: 1300px, centered with auto margins
- Alternate section backgrounds for visual rhythm:
  dark → cream → dark → cream (never two darks or two creams in a row)
- Buttons: always gold fill (#C9A84C) with dark text OR gold border ghost style
- Section headings: always Playfair Display serif
- Body text: always Inter sans-serif
- Images: always warm-toned, never cold/clinical/stock-photo-generic
- Every page section should feel like a magazine spread, not a product listing

# =====================================================
# KEY CONVERSION ELEMENTS — NEVER SKIP THESE
# =====================================================

1. Reviews ABOVE the product title on product page
2. Sale price + crossed-out original + Save % badge
3. Urgency line in gold (seasonal angle, not fake countdown)
4. Scarcity note under Add to Cart (stock message)
5. Trust icons repeated minimum 3x across product page
6. Social proof line with customer count
7. 30-day guarantee block mid-page (not just in FAQ)
8. Bundle/upsell section before reviews
9. FAQ to handle objections before checkout
10. Sticky Add to Cart for mobile
11. Newsletter capture in footer with incentive
12. Announcement bar rotating trust/urgency messages
