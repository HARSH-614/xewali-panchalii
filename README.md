XEWALI — Panchalii
A premium front-end web application for a fictional modern Assamese and Indian restaurant. This project is a demonstration of advanced UI/UX design, vanilla JavaScript architecture, data-driven rendering, and cultural branding.
Important Disclaimer
XEWALI — Panchalii is a fictional restaurant concept created strictly as a web-development portfolio project.
Restaurant details, menu items, prices, reviews, events, and other business information are demo content. No backend exists; all orders, inquiries, and reservations are frontend simulations.
Technical Features
Data-Driven Architecture: The entire menu (~30+ items), events, offers, and reviews are generated dynamically via JavaScript objects (restaurant-data.js).
Frontend State Management: Cart operations, tax calculation, and quantities persist using localStorage.
Custom Theme Engine: Built-in Dark/Light mode switcher manipulating CSS custom properties.
Internationalization (i18n): Basic English/Assamese UI toggle demonstrating translation scaling.
Zero Dependencies: Built entirely with HTML5, CSS3, and ES6+. No React, no Tailwind, no Bootstrap.
Accessibility (a11y): ARIA labels, semantic HTML, and keyboard-navigable modals.
Project Directory Structuretext
xewali-panchalii/
├── index.html
├── css/
│   ├── style.css (Variables, typography, core UI)
│   ├── responsive.css (Media queries)
│   └── animations.css (Keyframes, reveals)
├── js/
│   ├── main.js (Init, Theme, i18n, DOM bindings)
│   ├── menu.js (Filter algorithms, modal injection)
│   ├── cart.js (Cart math, localStorage syncing)
│   ├── reservation.js (Form validation, demo simulation)
│   ├── gallery.js (Lightbox logic)
│   ├── translations.js (Language dictionaries)
│   └── effects.js (Intersection observers)
└── data/
└── restaurant-data.js (JSON-like config and arrays)


## Run Locally
1. Clone this repository to your local machine.
2. Open `index.html` in any modern web browser or serve via Live Server (VS Code).
3. No build steps, compilation, or `npm install` required.

## Customization Guide
To repurpose this template for an actual deployment, modify `data/restaurant-data.js`. The structure allows immediate updates to the restaurant's name, tax rates, operating hours, and menu without altering HTML.
