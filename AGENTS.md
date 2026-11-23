# Project Design & UI Rules — AST Macramé

These rules apply strictly across the entire project (`e:\AST Macrame`). Always follow them without exception across all pages, components, modals, and styles.

---

### 1. Zero Strokes / Borders (Strict Rule)
* **NEVER EVER use strokes or borders**, unless the user explicitly requests one in a prompt.
* **Prohibited Utilities**:
  * Do not use `border`, `border-t`, `border-b`, `border-l`, `border-r`, `border-stone`, `border-gray`, `border-slate`, `border-black`, `border-white`, etc.
  * Do not use `ring`, `ring-1`, `ring-2`, `ring-offset`, or outline utilities (except subtle default accessibility focus rings for screen readers / keyboard tab navigation).
* **Surface Separation**:
  * Delineate cards, containers, sections, and tables purely through calibrated tonal background contrast (`#FAF8F5`, `#FAF7F2`, `#FFFFFF`, `#1C2841`, `#131E33`, `#F2EDE4`) and generous whitespace.

---

### 2. Zero Drop Shadows (Strict Rule)
* **NEVER use drop shadows**.
* **Prohibited Utilities**:
  * Do not use `shadow`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, or custom `shadow-[...]`.
* **Flat Architecture**:
  * All cards, modals, drawers, and buttons must be 100% flat.
  * Ensure global stylesheet rules (such as attribute selectors applying elevation in `src/index.css`) are overridden with `box-shadow: none !important;` where applicable.

---

### 3. Zero Dots (Strict Rule)
* **NEVER use decorative or bullet dots**.
* **Prohibited Patterns**:
  * No `•`, `·`, `●`, or middle dots anywhere in copy, metadata, subtitles, or badges.
  * No `list-disc` or bulleted lists.
  * No decorative circular dot spans or colored dot indicators.
* **Separation Alternatives**:
  * Use em-dashes (`—`), vertical dividers (`|`), commas (`, `), or clean flex spacing.
  * For lists, use structured stacked cards, numbered steps (`01`, `02`), or clean key-value rows.

---

### 4. Zero Generic / AI Slop Icons (Strict Rule)
* **NEVER use decorative, generic "AI slop" icons**.
* **Prohibited Patterns**:
  * Do NOT place random Lucide or SVG icons inside cards, section titles, headers, badges, or tip boxes (e.g., `Sparkles`, `Zap`, `Factory`, `Box`, `Plane`, `Layers`, `Sliders`, `Tag`, `Palette`, `ShieldCheck`, `CheckCircle`, etc.).
  * Let high-end editorial typography, authentic workshop photography, and spacious layout structure carry the visual weight.
* **Permitted Exceptions (Functional Only)**:
  * Indispensable interactive controls only:
    * Modal/drawer close buttons (`<X />`)
    * Quantity counter adjustments (`<Plus />`, `<Minus />`)
    * Directional links (`<ArrowRight />` / `<ArrowUpRight />` on primary action buttons)
    * External direct communication channels (`<MessageCircle />` for WhatsApp, `<Mail />` for Email)

---

### 5. Brand Color Palette (Strict Rule)
* Adhere strictly to the authentic AST Macramé identity:
  * **Linen / Canvas**: `#FAF8F5`, `#FAF7F2`, `#F2EDE4`
  * **Pure White**: `#FFFFFF`
  * **Deep Navy**: `#1C2841`, `#131E33`
  * **Terracotta**: `#C85A32`, `#BD532B`
  * **Dark Charcoal & Soft Black**: `#1A1A1A`, `#222222`, `#2C2C2C`
* **Prohibited**:
  * No random template colors: no emerald/mint greens, no generic SaaS blues, no purple/amber badges, no pastel gradients.
