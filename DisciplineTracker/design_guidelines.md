# 100 Days Discipline Challenge - Design Guidelines

## Design Approach
**Selected Approach**: Design System (Material Design principles) with productivity app inspirations from Linear and Notion
**Justification**: This is a utility-focused app prioritizing readability, daily usability, and information hierarchy over visual flair.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 219 91% 16% (deep navy blue)
- Background: 0 0% 98% (near white)
- Cards: 0 0% 100% (pure white)
- Text Primary: 220 13% 18% (dark charcoal)
- Text Secondary: 220 9% 46% (medium gray)
- Accent: 142 76% 36% (success green for completed states)

**Dark Mode:**
- Primary: 219 91% 84% (light blue)
- Background: 220 13% 7% (very dark gray)
- Cards: 220 13% 11% (dark card background)
- Text Primary: 210 20% 98% (near white)
- Text Secondary: 220 9% 64% (light gray)
- Accent: 142 76% 64% (lighter success green)

### B. Typography
**Font Family**: Inter from Google Fonts
- **Headings**: Inter 600 (Semi-bold)
- **Body Text**: Inter 400 (Regular)
- **Highlights**: Inter 500 (Medium)
- **Mobile Scale**: Base 16px, headers 20-24px
- **Desktop Scale**: Base 18px, headers 24-32px

### C. Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 6, and 8 units
- **Container**: p-4, max-width constrained
- **Card Spacing**: p-4 internal, mb-4 between cards
- **Section Gaps**: space-y-6 for major sections
- **Component Margins**: mt-2, mb-4, mx-4 patterns

### D. Component Library

**Timeline Cards:**
- Rounded corners (rounded-lg)
- Subtle shadow in light mode, border in dark mode
- Left border accent (4px width) in primary color
- Time display: Bold, larger text
- Activity: Medium weight, primary text
- Psychological impact: Smaller italic text in secondary color

**Navigation:**
- Sticky header with day counter
- Floating "Start Day" button (bottom-right, primary color)
- Dark/light mode toggle (top-right header)

**Interactive Elements:**
- Motivational quotes: Floating cards with fade-in animation
- Smooth scroll behavior for timeline navigation
- Touch-friendly tap targets (minimum 44px)

### E. Animations
**Minimal Motion Design:**
- Smooth scroll behavior for navigation
- Fade-in for motivational quotes (3-second intervals)
- Simple scale transform on button press (scale-95)
- No complex animations to maintain performance

## Content Strategy
**Motivational Header**: Large, prominent display of "Motivation fades. Discipline stays. Let's Create Discipline."

**Timeline Structure**: 18 time slots from 5 AM to 11 PM, each with:
- Clear time range
- Actionable activity description
- Brief psychological benefit explanation

**Day Counter**: Manual increment system with clear visual hierarchy in sticky header.

## Mobile-First Considerations
- Single column layout on mobile
- Large touch targets for all interactive elements
- Readable font sizes without zooming
- Efficient vertical scrolling experience
- Dark mode as default for better battery life

## Images
**No Hero Image**: This app focuses on content over imagery
**Icon Usage**: Heroicons for UI elements (clock, sun/moon toggle, arrow indicators)
**Motivational Elements**: Text-based quotes rather than image-heavy content