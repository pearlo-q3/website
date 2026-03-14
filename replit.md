# Qube Catalyst Website

## Overview

This is a static marketing website for Qube Catalyst, a product consulting service targeting non-technical founders building software products. The site provides information about the service, the founder's background, and offers contact methods for potential clients. The website uses a clean, professional design with a teal/green color scheme and focuses on building trust and credibility with the target audience.

## Recent Changes

**March 2026 - Guides Section Built + Mobile Nav Fix**
- Created guides.html hub page and 5 individual SEO guide pages at root level:
  - how-to-plan-a-software-project.html (Stage 1)
  - how-to-choose-a-development-agency.html (Stage 2)
  - what-a-realistic-mvp-scope-looks-like.html (Stage 3)
  - how-to-track-progress-on-a-software-build.html (Stage 4)
  - how-to-know-if-your-app-is-ready-to-launch.html (Stage 5)
- All guide pages use `guide-*` CSS prefix (no blog classes), document-style layout with 740px centred content column
- Guide CSS includes: teal gradient hero, key-takeaways card (green ticks), callout boxes (orange border), tables (blue headers), CTA blocks, related reading strip, stage cards for hub page, checklists
- Mobile nav dropdown fixed: service/resource items always visible in slide-out menu (no click toggle needed), dropdown toggle styled as non-interactive label, arrow hidden on mobile
- sitemap.xml updated with 6 new guide URLs (hub priority 0.8, individual guides priority 0.7)
- CSS version bumped to ?v=5 across all 17 pages (12 existing + 5 new guides + hub)

**March 2026 - Resources Nav Tab Added**
- Added "Resources" dropdown to the navigation bar on all 11 pages (7 root + 5 blog)
- Resources sits after Services in the nav order; dropdown reveals "Guides" submenu item
- Updated nav.js to v4: rewrote dropdown logic from single `querySelector` to `querySelectorAll` so both Services and Resources dropdowns work independently; clicking one closes the other
- nav.js cache-busted to `?v=4` across all pages

**March 2026 - Delivery Catalyst Programme Page Redesign**
- Premium redesign of delivery-catalyst.html as flagship high-ticket service page
- Deep teal gradient hero (#004d40 → #00695c) with white text, checklist card, ghost button variant
- New trust bar section: 4 credential stats (20+ years, Meta, Founder-first, Independent)
- Benefits grid with teal top-border cards, check icons, hover lift animation
- Numbered process steps with solid teal circles, white numbers, connecting vertical line
- Featured pricing box with deep teal background, large £550 amount display
- Two testimonial quote cards with decorative quotation mark
- All DC page styles use `dc-*` prefix class names in styles.css to avoid conflicts
- Navigation dropdown now fully click-based (no hover) for desktop and mobile
- Shared nav.js handles hamburger + dropdown toggle; duplicate inline nav JS removed from all 11 pages
- CSS version bumped to ?v=4 across all pages for cache busting

**November 30, 2025 - Blog Article Styling Enhancement**
- Improved article typography with narrower container (720px max-width) for better readability
- Added teal accent line under article headers for visual polish
- Styled intro paragraph with teal left border callout
- Made email and calendar contact links bold with teal color for emphasis
- Added styled CTA section with gradient background
- Implemented auto-generated blog previews using JavaScript (fetches article intro, truncates to 180 chars)
- Blog cards use data-article-url attribute to dynamically load preview text

**November 29, 2025 - Blog Section Added**
- Created blog.html listing page with consistent site styling
- Created blog/ folder for article storage
- Added first blog post: VerAIQ launch announcement (blog/veraiq-launch.html)
- Added Blog link to navigation menu on all pages (index, about, contact, privacy)
- Added blog-specific CSS styles (blog cards, article layout, meta tags styling)
- Updated sitemap.xml to include blog.html and blog/veraiq-launch.html
- All blog pages include SEO meta tags (title, description, keywords, Open Graph)

**November 27, 2025 - SEO Files Added**
- Created robots.txt in root folder to allow search engine crawling and reference sitemap
- Created sitemap.xml with all four pages (index, about, contact, privacy) with priority levels
- Domain configured as https://qubecatalyst.com/

**November 15, 2025 - GDPR Cookie Consent Banner & Privacy Page**
- Created privacy.html page with placeholder content structure (Privacy Policy, Cookie Policy, Data Protection sections)
- Implemented GDPR-compliant cookie consent banner across all pages with Accept and Reject buttons
- Banner stores user choice in localStorage ('accepted' or 'rejected') and respects prior selections
- Added Privacy & Cookies link to footer navigation on all pages
- CSS styling includes dark charcoal background, teal accent for Accept button, responsive mobile layout
- Note: Future non-essential scripts/cookies should check localStorage.getItem('cookieConsent') === 'accepted' before loading

**November 15, 2025 - Launch Compass Button Styling**
- Created .btn.small modifier class for smaller button variant
- Shortened button text from "Use Launch Compass" to "Launch Compass" and centered it
- Changed button color to brand teal (#00796B) with white text
- Increased font weight to 600 for better visibility and emphasis
- Added hover state with darker teal (#00695c)

**November 15, 2025 - Transformation Section Alignment Fix**
- Centered transformation box with max-width (900px) for better visual balance
- Added auto margins to align with service cards grid layout above
- Increased top spacing from 3rem to 4rem for improved separation from service cards
- Maintained mobile responsiveness with breakpoint-specific margin adjustment

**November 15, 2025 - Favicon Fix**
- Created square 1:1 aspect ratio favicon to prevent browser squishing
- Generated dedicated favicon.png file from Q³ cube icon
- Updated all three pages to use the new square favicon for proper display in browser tabs

**November 15, 2025 - Contact Page Redesign with Calendar Embed**
- Restructured contact page with qualifier section at top ("Is this for you?")
- Integrated Calendly inline calendar embed for direct on-page booking
- Redesigned contact methods as 3 styled cards (Book a Call, Email, LinkedIn)
- Applied consistent visual styling with alternating backgrounds and brand color accents
- Improved mobile responsiveness with adaptive calendar container
- Added favicon using Q³ logo across all pages for browser tab branding

**November 15, 2025 - About Page Visual Enhancement**
- Transformed "How Q³ Fixes This" numbered list into 2-column benefit grid with hover effects
- Added alternating section backgrounds (white, gradients) for visual rhythm
- Styled problem narrative section with bordered boxes and highlighted climax text
- Added transformation section at bottom of services with teal border and grid layout
- Moved service card images from homepage to about page services section
- Added headshot image to About section using two-column layout
- Reduced section padding from 4rem to 3rem for tighter page flow

**November 15, 2025 - Homepage Redesign**
- Added professional stock images throughout the homepage for better visual engagement
- Implemented uniform spacing system with CSS variables for consistent vertical rhythm
- Enhanced visual hierarchy with grid layouts, card hover effects, and improved typography
- Added responsive design breakpoints (968px, 768px, 640px) for mobile optimization
- Removed images from "How Qube Catalyst helps" service cards for cleaner text-focused design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Multi-Page Website**
- Architecture: Traditional multi-page HTML structure with separate files for each page
- Pages: Home (index.html), About (about.html), Contact (contact.html)
- Rationale: Simple, SEO-friendly approach suitable for a marketing website with limited interactivity
- Pros: Fast loading, easy to maintain, excellent for search engine crawlers
- Cons: Some content duplication (header/navigation), no dynamic content management

**Styling Approach**
- CSS Variables for theming: Centralized color palette and typography using CSS custom properties
- Design System: Defined brand colors (primary teal #00796B, accent green #00C853) and typography hierarchy
- Responsive Design: Mobile-first approach with dedicated mobile padding variables
- Font Stack: Google Fonts (Poppins for headings, Open Sans for body text) with system font fallbacks

**Layout System**
- Container-based layout: Max-width constraint (1080px) for readable content width
- Grid-based layouts: Two-column hero (text + image), three-column service cards, two-column benefit grids
- Section spacing: CSS variables (--section-padding: 3rem desktop, --section-padding-mobile: 2rem)
- Responsive breakpoints: 968px (grid to single column), 768px (mobile adjustments), 640px (footer layout)
- Visual rhythm: Alternating section backgrounds (white, gradients, teal accents) for improved scanability
- Rationale: Provides visual consistency, predictable spacing, and excellent mobile experience

### Asset Management

**Images and Resources**
- Logo storage: `/assets/q3Logo.png`
- Headshot: `/assets/headshot.png` (displayed on about page)
- Stock images: `/attached_assets/stock_images/` (hero, service cards on about page, founders section)
- External fonts: Google Fonts CDN integration
- Rationale: Professional imagery enhances credibility while maintaining reasonable page weight

### Navigation Structure

**Header Component**
- Fixed navigation pattern across all pages
- Logo-based home link with text-based navigation
- Pages: Home, About & Services, Contact
- Issue: Navigation HTML is duplicated across all pages (technical debt opportunity for componentization)

### Call-to-Action Strategy

**Conversion Points**
- Primary CTA: "Book a Micro Confidence Review" (links to contact page)
- Secondary CTA: "Use Launch Compass" (external tool, placeholder URL)
- Contact methods: Direct email (pearlo@qubecatalyst.com) and Calendly scheduling link
- Rationale: Multiple conversion paths to accommodate different user preferences

## External Dependencies

### Third-Party Services

**Font Delivery**
- Service: Google Fonts CDN
- Fonts: Poppins (weights: 600, 700), Open Sans (weights: 400, 500)
- Integration: Preconnect optimization for performance

**Scheduling Integration**
- Service: Calendly
- Purpose: 15-minute triage call booking
- URL: https://calendly.com/pearlo-qubecatalyst/clarity-call
- Integration: Inline embed on contact page using Calendly's embed.js API
- Implementation: Calendar widget loads directly on the page for seamless booking experience

**Placeholder External Tool**
- Launch Compass: Referenced but URL not yet configured
- Purpose: Self-service tool for users (appears to be a product offering)

### Browser Compatibility

**Font Loading Strategy**
- Preconnect to Google Fonts domains for performance
- System font fallbacks defined in CSS variables
- Ensures graceful degradation if external fonts fail to load