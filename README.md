# Puzzle Profis 🧩

Eine kinderfreundliche Puzzle-App für Kinder von 3-5 Jahre, entwickelt mit React, Vite und Tailwind CSS.

## 🎯 Features

- 🎨 Kinderfreundliches Design mit großen Buttons und bunten Farben
- 📱 Mobile-optimiert für Smartphones und Tablets  
- 🔧 Touch-optimierte Bedienung ohne störende Browser-Features
- 🧩 Drag & Drop Puzzle-Spiel mit 3x3 Raster
- 🏆 Belohnungssystem mit Trophäen
- 💾 Progressive Web App (PWA) für Offline-Nutzung

## 🚀 Development

### Voraussetzungen
- Node.js 20.x oder höher
- npm

### Installation
```bash
npm install
```

### Development Server starten
```bash
npm run dev
```
Die App ist dann unter `http://localhost:5173/puzzle-profis/` verfügbar.

### Build erstellen
```bash
npm run build
```

### Preview des Builds
```bash
npm run preview
```

### Tests ausführen
```bash
npm run test        # Watch mode
npm run test:run    # Einmalig
npm run test:ui     # UI Interface
```

## 📦 Deployment

Die App wird automatisch über GitHub Actions auf GitHub Pages deployed, wenn Änderungen auf den `main` Branch gepusht werden.

### GitHub Pages Setup
1. Repository auf GitHub erstellen
2. Code auf `main` Branch pushen
3. In Repository Settings > Pages > Source: "GitHub Actions" auswählen
4. Die App wird automatisch unter `https://[username].github.io/puzzle-profis/` verfügbar sein

## 🏗️ Architektur

### Komponenten-Struktur
```
src/
├── components/
│   ├── HomeScreen/
│   │   ├── HomeScreen.tsx
│   │   ├── LogoAndDescription.tsx
│   │   └── ImageSelection.tsx
│   ├── GameBoard/          # (Coming Soon)
│   ├── TrophyScreen/       # (Coming Soon)
│   ├── NavBar/             # (Coming Soon)
│   └── Utils/
│       └── CustomButton.tsx
├── data/
│   └── images.ts
├── types/
│   └── index.ts
└── test/
    └── setup.ts
```

### Technologie-Stack
- ⚛️ React 19
- ⚡ Vite 7  
- 🎨 Tailwind CSS 4
- 🧪 Vitest + Testing Library
- 📱 PWA Support (geplant)
- 🚀 GitHub Actions Deployment

## 🎮 Geplante Features

- [ ] GameBoard Komponente mit Drag & Drop
- [ ] Puzzle-Logik und Teile-Generierung  
- [ ] Trophy Screen mit Animations
- [ ] Navigation Bar
- [ ] Progressive Web App (PWA)
- [ ] Offline-Funktionalität
- [ ] Sound-Effekte
- [ ] Mehr Puzzle-Bilder

## 🧪 Tests

Das Projekt hat eine umfassende Test-Suite mit 43 Unit-Tests die folgende Bereiche abdecken:
- Komponenten-Rendering
- Benutzerinteraktionen
- Props-Handling
- Edge Cases
- Accessibility

## 📄 Lizenz

MIT License
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
