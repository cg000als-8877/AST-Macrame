# AST MACRAMÉ - NEW PRODUCT ADDITION PROTOCOL & OATH

## STRICT COMMITMENTS & RULES:

Whenever a new product or color variant is added to AST Macramé:

### 1. Products Page (/products)
- The primary display image (`displayImage`) MUST have its background isolated/cut out and placed on the uniform **#F5F5F5** canvas with a soft drop shadow (`drop-shadow-[0_8px_16px_rgba(0,0,0,0.10)]`).
- Run `node scripts/process-all-gallery-images.js` to auto-generate the clean display image.
- It must appear in the Product Gallery grid automatically via `ALL_GALLERY_ITEMS` in `src/data/products.js`.

### 2. Retail Page (/retail) & Sample Order Page (/sample-order)
- Both order pages MUST receive the full set of **original, uncropped studio photos** (`images: [1, 2, 3, 4, 5, 6]`) with high-resolution zoom and authentic lighting/textures.
- Color pickers, swatch circles, size selectors, tiered pricing matrices, and checkout modals MUST auto-populate without manual page redesign.

### 3. Layout & Data Integrity
- NEVER alter existing page layouts, padding, navbar, checkout flows, or other product data when introducing new products.
- Always verify with `npm run build` to ensure zero compilation or runtime errors.
