<p align="center">
  <img src="public/assets/images/meraz-logo.png" alt="MERAZ 6.0 Logo" width="200" />
</p>

<h1 align="center">MERAZ 6.0 - Steampunk: Gears of Glory</h1>

<p align="center">
  <strong>Central India's Largest Techno-Cultural Festival</strong><br/>
  <em>IIT Bhilai | January 30 - February 1, 2025</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#design-system">Design System</a>
</p>

---

## 🎭 About MERAZ

MERAZ is the annual techno-cultural festival of **IIT Bhilai**, bringing together students from across India for three days of innovation, creativity, and celebration. The 6th edition embraces the **"Steampunk: Gears of Glory"** theme, blending Victorian-era aesthetics with futuristic technology.

### 📊 Festival Statistics

| Metric | Value |
|--------|-------|
| 👥 Expected Participants | 1000+ |
| 🎯 Total Events | 100+ |
| 🏆 Prize Pool | ₹5,00,000+ |
| 📅 Duration | 3 Days |
| 📍 Venue | IIT Bhilai, Raipur |

---

## ✨ Features

### 🎨 Premium Visual Design
- **Steampunk Aesthetic** - Animated gears, brass accents, and Victorian-meets-futuristic styling
- **Glassmorphism UI** - Modern glass-panel effects with backdrop blur
- **Dynamic Animations** - Framer Motion powered micro-interactions
- **Scroll-Driven Effects** - Frame-by-frame scroll animations using canvas

### 🖼️ Homepage Highlights
- **Hero Scroll Sequence** - 456-frame scroll-driven animation
- **Floating Particles** - Ambient cyan and amber particle effects
- **Live Countdown Timer** - Animated flip-style countdown to the event
- **3D Event Cards** - Mouse-tracking tilt effects on hover
- **Parallax Sections** - Depth-creating scroll effects

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

### ⚡ Performance Optimized
- Next.js App Router for optimal rendering
- Image optimization with Next/Image
- Canvas-based animations for smooth 60fps
- Code splitting and lazy loading

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |

### Styling
| Technology | Purpose |
|------------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| Custom CSS | Keyframe animations & effects |

### UI Components
| Technology | Purpose |
|------------|---------|
| [Lucide React](https://lucide.dev/) | Icon library |
| Custom Components | Reusable UI components |

### Fonts
| Font | Usage |
|------|-------|
| [Outfit](https://fonts.google.com/specimen/Outfit) | Headings (--font-heading) |
| [Inter](https://fonts.google.com/specimen/Inter) | Body text (--font-body) |
| [Orbitron](https://fonts.google.com/specimen/Orbitron) | Monospace/tech (--font-mono) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshtripathi272/meraz.git
   cd meraz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
meraz/
├── public/
│   └── assets/
│       ├── images/           # Static images
│       ├── sequences/        # Scroll animation frames
│       │   ├── hero/         # 456 frames (0001.jpg - 0456.jpg)
│       │   └── more/         # 165 frames (ezgif-frame-001.jpg - 165.jpg)
│       └── video/            # Video assets
│
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles & animations
│   │   ├── layout.tsx        # Root layout with fonts
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About page
│   │   ├── events/           # Events listing & detail pages
│   │   └── register/         # Registration page
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroScroll.tsx      # Hero with countdown & gears
│   │   │   ├── ScrollSequence.tsx  # Canvas scroll animations
│   │   │   ├── StatsSection.tsx    # Animated statistics
│   │   │   ├── AboutPreview.tsx    # About section preview
│   │   │   ├── EventsPreview.tsx   # Featured events grid
│   │   │   └── CountdownTimer.tsx  # Countdown component
│   │   │
│   │   ├── features/
│   │   │   └── VibeCheck.tsx       # Interactive vibe analyzer
│   │   │
│   │   ├── ui/                     # Reusable UI components
│   │   └── layout/                 # Layout components
│   │
│   └── lib/
│       ├── data/              # Static data & content
│       └── utils/             # Utility functions
│
├── MERAZ_CONTENT_OVERVIEW.md  # Full event content reference
├── tailwind.config.ts         # Tailwind configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies & scripts
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Cyan Beam** | `#00d4ff` | Primary accent, CTAs, tech elements |
| **Amber Gold** | `#d4a574` | Secondary accent, steampunk brass |
| **Obsidian** | `#030303` | Primary background |
| **Charcoal** | `#0a0a0a` | Secondary background |
| **Chrome** | `#e0e0e0` | Metallic text effects |

### CSS Custom Properties

```css
:root {
  --bg-obsidian: #030303;
  --bg-charcoal: #0a0a0a;
  --accent-chrome: #e0e0e0;
  --accent-indigo: #4f46e5;
  --accent-plasma: #818cf8;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Orbitron', monospace;
}
```

### Animation Classes

| Class | Effect |
|-------|--------|
| `shimmer` | Gradient text shimmer animation |
| `glow-cyan` | Cyan box-shadow glow |
| `glow-amber` | Amber box-shadow glow |
| `glass-panel` | Glassmorphism effect |
| `chrome-border` | Metallic gradient border |

### Typography Scale

```
Headings: clamp(2rem, 5vw, 8rem) - Bold, tight tracking
Body: 1rem - 1.25rem - Relaxed line-height
Mono: 0.75rem - 0.875rem - Wide letter-spacing
```

---

## 🧩 Key Components

### HeroScroll
The main hero section featuring:
- Animated steampunk gears that rotate on scroll
- Floating particle system (25 particles)
- Shimmer gradient text effect
- Live countdown timer
- Premium glassmorphism CTA buttons

### ScrollSequence
Canvas-based scroll animation system:
- Loads and renders image sequences frame-by-frame
- Supports 456+ frames for hero animation
- Smooth interpolation between frames
- Fallback loading indicators

### EventsPreview
3D event card grid with:
- Mouse-tracking tilt effect using `useMotionValue`
- Individual glow colors per category
- Animated hover states
- Prize and category badges

### StatsSection
Animated statistics display:
- Counter animation on viewport entry
- Rotating decorative gears
- Gradient icon containers
- Responsive 4-column grid

---

## 📄 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎯 Event Categories

| Category | Events | Description |
|----------|--------|-------------|
| **Sci-Tech** | 25+ | Hackathons, coding, robotics |
| **Cultural** | 20+ | Dance, music, drama, art |
| **Varchasva** | 15+ | Sports tournaments |
| **E-Cell** | 10+ | Entrepreneurship competitions |
| **FinTech** | 5+ | Finance & trading events |
| **Informal** | 25+ | Fun activities & gaming |

### Featured Events
- 🏆 **Meraz Hackathon** - ₹2,00,000 prize pool
- 🤖 **RoboWars** - ₹1,50,000 prize pool
- 💻 **AlgoClash** - ₹50,000 prize pool
- 🎭 **Cult Nite** - Grand cultural night
- 📈 **Pitch Perfect** - Startup competition

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with scroll animations |
| `/events` | All events with category filters |
| `/events/[id]` | Individual event details |
| `/about` | About MERAZ & IIT Bhilai |
| `/register` | Event registration |

---

## 🔧 Configuration

### Tailwind Config
Custom extensions in `tailwind.config.ts`:
- Custom colors (obsidian, charcoal, chrome)
- Custom fonts (heading, body, mono)
- Custom animations (spin-slow)

### Next.js Config
Optimizations in `next.config.ts`:
- Image optimization settings
- Build configurations

---

## 📞 Contact

**General Inquiries**  
📧 contact@meraz.iitbhilai.ac.in

**Technical Events**  
📧 tech@meraz.iitbhilai.ac.in

**Cultural Events**  
📧 cultural@meraz.iitbhilai.ac.in

**Sponsorship**  
📧 sponsors@meraz.iitbhilai.ac.in

---

## 🔗 Social Links

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/meraziitbh)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/meraziitbh)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@meraziitbh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/company/meraz-iitbhilai)

---

## 📜 License

This project is proprietary software developed for MERAZ 6.0, IIT Bhilai.

---

<p align="center">
  <strong>⚙️ MERAZ 6.0 - Steampunk: Gears of Glory ⚙️</strong><br/>
  <em>Where imagination meets innovation</em><br/><br/>
  Built with ❤️ by the MERAZ Tech Team
</p>
