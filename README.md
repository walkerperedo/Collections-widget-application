# React Filter Widget for Shopify

This project is a **React + TypeScript + GraphQL widget app** designed to be embedded into a Shopify storefront.  
It provides a modular architecture that balances **scalability**, **developer experience**, and **ease of installation** inside Shopify themes.

---

## Project Architecture

The app follows a **feature-oriented modular architecture**, optimized for Shopify widget embedding.

```
src/
 ┣ api/                  # GraphQL client, queries, mutations
 ┣ assets/               # Images, icons, styles
 ┣ components/           # Reusable UI (buttons, modals, widget UI)
 ┣ hooks/                # Business logic hooks
 ┣ types/                # Global TypeScript definitions
 ┣ utils/                # Helpers (formatting, validation, constants)
 ┣ App.tsx               # Root React component
 ┣ main.tsx              # Entry point
 ┗ shopify.config.ts     # Shopify-specific configuration
```

### 🔹 Styles & Design Choices

- **Layered structure (UI → Hooks → API):**  
  Separates concerns — UI components don’t directly know about Shopify API, they only consume hooks.

- **Feature modularization (optional):**  
  If the widget grows, features (e.g., `filters/`) can each contain their own UI, hooks, and queries.

- **Typed GraphQL responses:**  
  Strong typing with TypeScript improves maintainability and reduces runtime errors.

- **Build output:**  
  The app compiles to a **single JS and CSS file** (`react-app.js`, `react-app.css`) so it can be embedded in Shopify themes.

- **Test-Friendly Design**  
   - Hooks have dedicated `__tests__` directories to encourage isolated unit testing.
   - Clear file boundaries make mocking and dependency injection easier.

### Trade-offs

- **Pros:**
  - Clean separation of concerns → easy to extend.
  - Type safety with TypeScript.
  - Reusable components & hooks.
  - Shopify-friendly build (single JS/CSS file).

- **Cons:**
  - Slightly more complex setup than a single `index.js` app.
  - GraphQL setup requires a valid **Storefront API token** in Shopify metafields.
  - Limited by Shopify’s theme embedding rules (must bundle as static assets).



## Tech Stack

- **React** – UI rendering
- **TypeScript** – Type safety
- **Vite** – Fast development/build tooling
- **Jest + Testing Library** – Unit and integration testing
- **Shopify API** – Product and collection data source

## Installation in Shopify

### 1. Build the app
Clone the project and install dependencies:
```bash
npm install
npm run build
```

This generates a `dist/` folder with:
- `react-app.js`
- `react-app.css`

---

### 2. Upload assets to Shopify
1. Go to your **Shopify Admin** → **Online Store** → **Themes** → **Edit code**.  
2. Upload `react-app.js` and `react-app.css` to the **Assets** folder.  

---

### 3. Create a Storefront API token
1. In **Shopify Admin**, go to **Settings → Apps & sales channels → Develop apps**.  
2. Create or edit a custom app and enable **Storefront API access**, make sure to enable read_products permission.  
3. Copy the **Storefront API token**.  
4. Save it in a shop metafield:  

   - Namespace: `custom`  
   - Key: `store_front_api_token`  
   - Value: the token  

---

### 4. Add the React section
Create a new section in your Shopify theme, e.g. `sections/react-filter-widget.liquid`:

```liquid
{% comment %}
  This section hosts the React application.
{% endcomment %}

{{ 'react-app.css' | asset_url | stylesheet_tag }}

<div
  id="react-filter-app"
  data-storefront-api-token="{{ shop.metafields.custom.store_front_api_token }}"
  data-store-url="https://{{ shop.permanent_domain }}"
  data-collection-handle="{{ collection.handle }}"
>
  <p>Loading products...</p>
</div>

<script src="{{ 'react-app.js' | asset_url }}" defer="defer"></script>

{% schema %}
{
  "name": "React Filter Widget",
  "tag": "section",
  "settings": [],
  "presets": [
    {
      "name": "React Filter Widget"
    }
  ]
}
{% endschema %}
```

---

### 5. Add section in Theme Customizer
1. Go to **Online Store → Themes → Customize**.  
2. Add the **React Filter Widget** section a collection page.  

---

## Development Workflow

- Run locally with Vite:
  ```bash
  npm run dev
  ```
- Run tests with vitest
  ```bash
  npm run tests
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Deploy → upload `dist/react-app.js` & `dist/react-app.css` to Shopify assets.  
