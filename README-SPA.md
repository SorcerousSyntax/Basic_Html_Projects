# Apology Website - Single Page Application (SPA)

## Overview

This website has been refactored from multiple HTML pages into a modern single-page application (SPA). All content is now accessible through a single `index.html` file with smooth JavaScript-based navigation.

## Features

### Structure
- **Single HTML File**: `index.html` contains all page content
- **Modular JavaScript**: `app.js` handles all interactivity and navigation
- **Shared Styles**: `apology-style.css` maintains consistent theming

### Pages (Sections)
1. **Home** (`#home`) - Welcome page with journey introduction
2. **Apology** (`#apology`) - Sincere apology message with heart animations
3. **Game** (`#game`) - Interactive Tic-Tac-Toe game
4. **Message** (`#message`) - Personal heartfelt message with love counter
5. **Flashcards** (`#flashcards`) - Memory matching game with difficulty levels
6. **Song** (`#song`) - Song lyrics with interactive music player
7. **Thank You** (`#thankyou`) - Gratitude message with floating hearts

### Navigation
- **Hash-based routing**: Each section has a unique URL hash (e.g., `#apology`, `#game`)
- **Smooth transitions**: Fade in/out animations between sections
- **Navigation menu**: Always visible at the top with links to all sections
- **Deep linking**: Direct access to any section via URL hash

### Animations & Effects
- **Christmas lights**: Animated twinkling lights across the top
- **Floating pandas**: Cute animated pandas throughout the page
- **Heart animations**: Various heart effects on different pages
- **Smooth scrolling**: Seamless navigation experience
- **Interactive elements**: Games, buttons, and counters

### Theme
- **Color scheme**: Light pink (#fce4ec), dark pink (#e91e63), purple (#9c27b0)
- **Typography**: Clean, modern font (Segoe UI)
- **Responsive design**: Works on desktop and mobile devices

## Usage

Simply open `index.html` in any modern web browser. No server required - all functionality is client-side.

### Direct Section Access
You can link directly to specific sections using URL hashes:
- `index.html#home` - Home page
- `index.html#apology` - Apology section
- `index.html#game` - Game section
- `index.html#message` - Message section
- `index.html#flashcards` - Flashcards section
- `index.html#song` - Song section
- `index.html#thankyou` - Thank you section

## Files

### Main Files
- `index.html` - Single-page application HTML
- `app.js` - All JavaScript functionality
- `apology-style.css` - Global styles and theme

### Legacy Files (Preserved)
The original multi-page HTML files have been preserved:
- `index-old.html` (original home page)
- `apology.html`
- `game.html`
- `message.html`
- `flashcards.html`
- `song.html`
- `thank-you.html`

## Technical Details

### JavaScript Architecture
- **Section Management**: Show/hide sections with fade animations
- **Game State**: Isolated state management for each interactive element
- **Event Delegation**: Efficient event handling
- **Hash Routing**: URL hash-based navigation with browser history support

### Performance
- **No external dependencies**: Pure vanilla JavaScript
- **Minimal HTTP requests**: Single HTML file with embedded styles
- **Lazy initialization**: Game logic only runs when section is active
- **Optimized animations**: CSS-based animations with GPU acceleration

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS3 animations and transitions
- No polyfills required for modern browsers

## Deployment

### Static Hosting
This SPA can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

Simply upload the following files:
- `index.html`
- `app.js`
- `apology-style.css`

### Local Testing
Use any static file server:
```bash
# Python 3
python3 -m http.server 8080

# Node.js (with http-server)
npx http-server -p 8080

# PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## Customization

### Adding New Sections
1. Add a new `<section>` with unique ID in `index.html`
2. Add corresponding styles in the `<style>` block
3. Update navigation menu with new link
4. Add JavaScript functionality in `app.js` if needed

### Modifying Styles
All theme colors are defined in CSS variables in `apology-style.css`:
```css
:root {
    --light-pink: #fce4ec;
    --dark-pink: #e91e63;
    --purple: #9c27b0;
    --purple-light: #ba68c8;
    --white: #ffffff;
    --text-dark: #2c2c2c;
}
```

### Adjusting Animations
Animation durations and effects can be modified in the CSS keyframes and JavaScript timing functions.

## Credits

Created with ❤️ to say sorry in a special way.
