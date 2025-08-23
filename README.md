# 🎯 SPARDHA 2025 - Tech Fest Website

A cutting-edge cyberpunk-themed website for "Spardha 2025" - the annual techno-cultural festival by ACM VVITU Student Chapter. Built with React 18, TypeScript, and featuring sophisticated glassmorphism effects, advanced animations, and modern web technologies.

![Spardha 2025 Banner](https://img.shields.io/badge/SPARDHA-2025-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

## 🎨 Design Features

### Visual Design System
- **Dark Cyberpunk Theme** with electric blue and cyan accents
- **Sophisticated Glassmorphism** with multiple blur and transparency layers
- **Advanced Neumorphism** for buttons and interactive elements
- **Holographic Text Effects** with animated gradients
- **Crystal Facet Effects** with rotating elements

### Typography System
- **Audiowide** - Primary cyberpunk headings
- **Orbitron** - Technical text and labels
- **Inter** - Clean body text
- **Bebas Neue** - Display headings

### Animation System
- **Framer Motion** powered page transitions
- **Floating 3D elements** with physics-based movement
- **Scanning line effects** across components
- **Crystal rotation animations** with multiple layers
- **Glow pulse effects** for interactive elements

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Preloader.tsx      # Animated loading screen with rotating logo
│   │   ├── Header.tsx         # Fixed glassmorphism navigation with routing
│   │   └── Footer.tsx         # Cyberpunk footer with live status
│   ├── sections/
│   │   ├── Hero.tsx           # Main landing with holographic title
│   │   ├── About.tsx          # Festival description with animated cards
│   │   ├── Events.tsx         # Interactive event schedule with filtering
│   │   ├── Experience.tsx     # Experience showcase section
│   │   ├── MainMedia.tsx      # Media gallery and registration
│   │   ├── CampusNavigation.tsx # 3x2 campus map with crystal effects
│   │   └── Contact.tsx        # Contact information with team details
│   ├── ui/
│   │   ├── MagicCard.tsx      # Reusable card component with effects
│   │   ├── LazyImage.tsx      # Optimized image loading
│   │   ├── CircularGallery.tsx # Circular image gallery
│   │   └── GlobalEffects.tsx  # Global visual effects
│   └── pages/
│       └── NotFound.tsx       # 404 error page
├── pages/
│   ├── MainPage.tsx           # Home page with all sections
│   ├── EventsPage.tsx         # Dedicated events page
│   ├── EventDetailPage.tsx    # Individual event details
│   └── CampusPage.tsx         # Campus navigation page
├── assets/
│   ├── images/                # Event posters and graphics
│   ├── videos/                # Video content
│   ├── optimized/             # Optimized media files
│   └── backup/                # Backup assets
├── styles/
│   ├── animations.css         # Custom animations
│   ├── base.css              # Base styles
│   ├── components.css         # Component-specific styles
│   ├── glass-effects.css      # Glassmorphism effects
│   └── magicBento.css         # Magic card effects
├── hooks/                     # Custom React hooks
├── utils/
│   ├── mediaCache.ts          # Media caching utilities
│   ├── particlePool.ts        # Particle system optimization
│   └── performanceOptimizer.tsx # Performance optimization
├── types/
│   └── video.d.ts             # TypeScript type definitions
├── index.css                  # Global styles and custom CSS
└── App.tsx                    # Main application with routing
```

## 🎭 Component Specifications

### Preloader Component
- **Rotating VVIT ACM logo** with multiple rings
- **3D rotation effects** with scale animations
- **Progress bar** with scanning animation
- **Floating particles** background
- **3-second loading duration**

### Header Component
- **Fixed glassmorphism background** that appears on scroll
- **Smooth scroll navigation** to sections
- **Theme toggle** (dark/light mode)
- **Mobile responsive** hamburger menu
- **HUD elements** with scanning effects

### Hero Section
- **Massive "SPARDHA 2025" title** with holographic gradient
- **Animated subtitle** with glow effects
- **Event details** in glassmorphism badges
- **Call-to-action buttons** with hover animations
- **Side HUD elements** for desktop
- **Floating particles** throughout

### Campus Navigation
- **3x2 grid layout** representing campus blocks
- **Interactive block selection** with detailed information
- **Crystal glass effects** on each block
- **HUD interface elements** for cyberpunk aesthetic
- **Animated legends** and facility listings

### Events Section
- **Day-wise event filtering** with smooth transitions
- **Event cards** with glassmorphism and crystal effects
- **Category-based color coding** for different event types
- **Registration buttons** with neumorphic styling
- **Statistics display** with animated counters

## 🎨 CSS Effects Library

### Glassmorphism Classes
```css
.dashboard-glass     # Primary glassmorphism effect
.crystal-glass       # Secondary glass with more transparency
.ultra-liquid-glass  # Premium glass with enhanced blur
```

### Crystal Effects
```css
.crystal-facet-top       # Top shine effect
.crystal-facet-corner    # Corner highlight
.crystal-facet-center    # Center glow
.crystal-rotate-8s       # 8-second rotation
.crystal-rotate-12s      # 12-second reverse rotation
```

### HUD Elements
```css
.hud-corner-top-right    # Corner indicator (top-right)
.hud-corner-bottom-left  # Corner indicator (bottom-left)
.hud-status-vertical     # Vertical status bar
.hud-status-horizontal   # Horizontal status bar
```

### Text Effects
```css
.text-gradient       # Animated holographic gradient
.text-holographic    # Full spectrum holographic effect
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd spardha-2025
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Start development server
npm start

# Build for production (optimized)
npm run build

# Build with React scripts (alternative)
npm run build:react

# Eject from Create React App (not recommended)
npm run eject
```

## 🎯 Key Features Implemented

### ✅ Completed Features
- [x] **Sophisticated Glassmorphism** - Multiple blur layers and transparency effects
- [x] **Advanced Animations** - Framer Motion with staggered children
- [x] **Responsive Design** - Mobile-first approach with breakpoint optimization
- [x] **Interactive Campus Map** - 3x2 grid with detailed block information
- [x] **Event Schedule** - Day-wise filtering with smooth transitions
- [x] **Cyberpunk Aesthetics** - HUD elements, scan lines, crystal effects
- [x] **Theme System** - Dark/light mode toggle
- [x] **Performance Optimized** - Efficient animations and loading

### 🎨 Visual Effects
- **Floating Particles** - Physics-based particle system
- **Scanning Lines** - Animated scan effects across components
- **Crystal Rotations** - Multiple layered rotation animations
- **Glow Effects** - Pulsing glow animations on interactive elements
- **3D Transforms** - Card hover effects with perspective
- **Background Orbs** - Animated background elements

### 📱 Responsive Features
- **Mobile Optimization** - Reduced blur effects for performance
- **Touch Interactions** - Optimized for mobile devices
- **Flexible Layouts** - Grid and flexbox responsive systems
- **Compressed Effects** - Lighter animations on mobile

## 🔧 Technical Implementation

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.8.1",
  "typescript": "^4.9.5",
  "framer-motion": "^12.23.12",
  "gsap": "^3.13.0",
  "lucide-react": "^0.539.0",
  "ogl": "^1.0.11",
  "web-vitals": "^2.1.4"
}
```

### Development Dependencies
```json
{
  "@craco/craco": "^7.1.0",
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6",
  "react-scripts": "5.0.1",
  "tailwindcss": "^3.4.17"
}
```

### Tailwind Configuration
- **Custom Colors** - Cyberpunk color palette
- **Custom Animations** - Keyframe definitions
- **Custom Fonts** - Google Fonts integration
- **Extended Utilities** - Backdrop blur and custom effects

### Performance Optimizations
- **Efficient Re-renders** - Optimized component structure
- **Animation Performance** - Hardware-accelerated transforms
- **Mobile Considerations** - Reduced effects on smaller screens
- **Lazy Loading** - Components load as needed

## 🎪 Event Sections

### Day 1 Events
- Opening Ceremony
- Hackathon Launch
- Dance Competition
- Gaming Tournament

### Day 2 Events
- Tech Workshops
- Coding Contests
- Music Battles
- Robo Wars

### Day 3 Events
- Project Showcase
- Cultural Night
- Award Ceremony

## 🏫 Campus Blocks

### Block Layout (3x2 Grid)
```
[Block A - CS]  [Block B - ECE]  [New Block - AI/ML]
[Block C - Sci] [Block D - Mech] [        -        ]
```

Each block features:
- **Department-specific labs**
- **Specialized facilities**
- **Interactive selection**
- **Detailed information panels**

## 🎨 Color Palette

```css
/* Dark Theme */
--background: 220 50% 4%      /* Deep Navy Blue */
--foreground: 210 100% 95%    /* Bright White */
--primary: 210 100% 65%       /* Electric Blue */
--primary-glow: 215 100% 75%  /* Bright Cyan Glow */
--accent: 195 100% 60%        /* Cyan */
--secondary: 220 50% 10%      /* Dark Blue-Grey */
--muted: 220 50% 8%           /* Very Dark Blue */
```

## 🎭 Animation Specifications

### Page Transitions
- **Entry Animation** - 0.8s duration with 0.2s delay
- **Staggered Children** - 0.1s stagger between elements
- **Hover Effects** - 0.3s smooth transitions
- **Loading Animations** - 3s preloader sequence

### Interactive Elements
- **Button Hovers** - Scale and elevation changes
- **Card Interactions** - 3D rotation effects
- **Scroll Animations** - Intersection observer triggers
- **Particle Systems** - Infinite loop animations

## 🚀 Deployment

### Build Process
1. Run `npm run build`
2. Deploy the `build` folder to your hosting service
3. Ensure proper routing for single-page application

### Recommended Hosting
- **Vercel** - Optimal for React applications
- **Netlify** - Great for static sites
- **GitHub Pages** - Free hosting option

## 🎯 Future Enhancements

### Potential Additions
- **3D Spline Integration** - Replace background with 3D models
- **Registration System** - Backend integration for event registration
- **Admin Dashboard** - Event management interface
- **Real-time Updates** - Live event updates and notifications
- **Social Integration** - Share buttons and social feeds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Credits

**Developed by ACM VVITU Student Chapter**
- **Institution:** Vasavi Vidya Vihar Institute of Technology
- **Location:** Chevella, Hyderabad, Telangana, India
- **Year:** 2025

### Technology Stack
- **React 18** - Modern JavaScript framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful icon library

---

**Made with ❤️ by ACM VVIT for the cyberpunk future of technology and culture.**

🎭 *"ENTERING CYBERPUNK MODE... SYSTEM READY"* 🎭#   S p a r d h a 2 K 2 5 
 
 