# CLAUDE.md — MARLOWE HOME | SHOPIFY THEME BUILD RULES
# =====================================================
# READ THIS FIRST — WHAT THIS PROJECT IS
# =====================================================
#
# We are building a Shopify theme for a brand called MARLOWE HOME.
# Marlowe Home is a premium British-inspired home lighting and ambiance brand
# targeting Belgian and Dutch buyers (Belgium / Netherlands market).
#
# BRAND OVERVIEW:
# - Name: Marlowe Home
# - Niche: Creative home lighting & ambiance products
# - Target market: Belgium + Netherlands
# - Target customer: Women + Men, 25-45, homeowners/renters who care about
#   how their living space looks and feels. They want premium, not generic.
# - Brand personality: British, elegant, warm, premium.
#   NOT generic. NOT flat. NOT the typical white-background dropshipping store.
# - Competitor reference: creative.lighting (Swedish lighting store,
#   290 products, 350+ active ads — we build something more premium and localized)
#
# BRAND DESIGN DIRECTION:
# - Dark deep backgrounds for hero/feature sections (charcoal, forest green, navy)
# - Warm cream/off-white for text-heavy sections
# - Gold/brass accents throughout (#C9A84C)
# - Serif headings (Playfair Display) — elegant British feel
# - Warm moody photography — candle-lit, golden hour, cozy interiors
# - Think: high-end British interiors magazine. NOT IKEA catalog.
#
# CURSOR COMPATIBILITY NOTE:
# After Claude Code builds the theme, it can be tweaked in Cursor safely.
# Cursor rules:
# - Edit .liquid, .css, .js files freely
# - Never rename core files (theme.liquid, settings_schema.json etc.)
# - Never change file extensions
# - Never add npm/React/build tools — this is NOT a Node project
# - If Cursor suggests converting to React/Next.js — REFUSE
#
# DEPLOYMENT AFTER BUILD:
# Push to GitHub → Shopify Admin → Online Store → Themes → Add theme
# → Connect from GitHub → select repo → sync
#
# FILES IN THIS PROJECT:
# CLAUDE.md (this file) = rules Claude Code follows at all times
# STORE_BLUEPRINT.md = full section-by-section page structure to build
# Read BOTH before writing any code.
#
# =====================================================
# SHOPIFY RULES — NON-NEGOTIABLE
# =====================================================

1. THIS IS A SHOPIFY THEME — NOT A REGULAR WEBSITE
   No Next.js, React, Vue, or any JS framework.
   No package.json. No npm install.
   No standalone HTML pages. Shopify generates pages from templates.
   No backend code. Shopify handles all backend.

2. REQUIRED FOLDER STRUCTURE
   /assets/       → CSS, JS, images, fonts
   /config/       → settings_schema.json, settings_data.json
   /layout/       → theme.liquid
   /locales/      → en.default.json
   /sections/     → all .liquid section files
   /snippets/     → small reusable .liquid partials
   /templates/    → page templates (.json or .liquid)

3. FILE EXTENSIONS
   Templates: .liquid or .json only
   Styles: .css or .css.liquid only
   Scripts: .js only (vanilla ES6+, no TypeScript)
   Config: .json only

4. LIQUID TEMPLATING ONLY
   {{ variable }} for output
   {% logic %} for conditionals and loops
   All dynamic data via Shopify Liquid objects
   No PHP, JSX, Handlebars, or template strings outside of JS

5. EVERY SECTION FILE NEEDS A SCHEMA
   Every file in /sections/ MUST end with {% schema %}...{% endschema %}
   Schema must be valid JSON or Shopify rejects the section

# =====================================================
# BRAND CSS TOKENS — USE THESE IN EVERY FILE
# =====================================================

Define in /assets/theme.css:

:root {
  --color-bg-dark:        #1C2526;
  --color-bg-green:       #1F2D2A;
  --color-bg-cream:       #F5F0E8;
  --color-bg-navy:        #1A1F2E;
  --color-accent-gold:    #C9A84C;
  --color-accent-gold-lt: #E8C96A;
  --color-text-light:     #F2EDE4;
  --color-text-dark:      #2C2C2C;
  --color-text-muted:     #8A8070;
  --font-heading:         'Playfair Display', Georgia, serif;
  --font-body:            'Inter', 'Helvetica Neue', sans-serif;
  --section-pad-desktop:  100px;
  --section-pad-mobile:   50px;
  --content-max-width:    1300px;
  --border-gold:          1px solid var(--color-accent-gold);
  --radius-btn:           4px;
  --radius-card:          6px;
}

Load fonts in theme.liquid <head>:
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

# =====================================================
# ALLOWED vs FORBIDDEN
# =====================================================

ALLOWED:
- Liquid templating
- Vanilla JavaScript ES6+
- Plain CSS with CSS variables
- JSON config files
- Shopify CDN: {{ 'file.css' | asset_url | stylesheet_tag }}
- Section schema blocks
- Google Fonts via CDN in <head>
- Responsive mobile-first CSS
- Native HTML5 elements

FORBIDDEN:
- React, Vue, Angular, Next.js, Nuxt, Svelte
- Webpack, Vite, Rollup, Parcel, esbuild
- SASS, SCSS, LESS, PostCSS pipelines
- TypeScript
- npm install / package.json dependencies
- Any backend code
- Hardcoded product data (use Liquid objects)
- Inline API keys or credentials

# =====================================================
# MINIMUM FILES TO GENERATE
# =====================================================

/layout/theme.liquid
/templates/index.json
/templates/product.json
/templates/collection.json
/templates/cart.json
/templates/page.json
/templates/404.json
/templates/search.json
/sections/header.liquid
/sections/footer.liquid
/sections/announcement-bar.liquid
/sections/main-product.liquid
/sections/main-collection.liquid
/sections/main-cart.liquid
/assets/theme.css
/assets/theme.js
/config/settings_schema.json
/config/settings_data.json
/locales/en.default.json

# =====================================================
# LIQUID QUICK REFERENCE
# =====================================================

{{ product.title }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.featured_image | image_url: width: 800 | image_tag }}
{{ product.description }}
{{ section.settings.heading }}
{{ 'theme.css' | asset_url | stylesheet_tag }}
{{ 'theme.js' | asset_url | script_tag }}

{% for product in collection.products %}...{% endfor %}
{% if product.compare_at_price > product.price %}On sale{% endif %}
{% if product.available %}Add to cart{% else %}Sold out{% endif %}

# =====================================================
# SECTION SCHEMA TEMPLATE
# =====================================================

{% schema %}
{
  "name": "Section Name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Heading"
    },
    {
      "type": "richtext",
      "id": "subheading",
      "label": "Subheading"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Link"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button Label",
      "default": "Shop Now"
    }
  ],
  "presets": [{ "name": "Section Name" }]
}
{% endschema %}

# =====================================================
# PRE-WRITE CHECKLIST
# =====================================================

Before every file confirm:
[ ] Correct folder?
[ ] Correct extension (.liquid / .json / .css / .js)?
[ ] Section ends with valid schema block?
[ ] Using Liquid not JSX?
[ ] Dynamic data from Liquid objects not hardcoded?
[ ] CSS uses brand tokens from :root?
[ ] Design matches Marlowe Home dark/gold premium aesthetic?
[ ] Dawn-compatible structure?

If any answer is NO — fix before proceeding.

# =====================================================
# REFERENCES
# =====================================================

Dawn theme: github.com/Shopify/dawn
Shopify docs: shopify.dev/docs/themes
Liquid docs: shopify.dev/docs/api/liquid
Competitor: creative.lighting

ALWAYS build for Marlowe Home.
ALWAYS premium, British, warm, elegant.
NEVER generic white dropshipping store.
