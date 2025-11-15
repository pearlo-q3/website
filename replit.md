# Qube Catalyst Website

## Overview

This is a static marketing website for Qube Catalyst, a product consulting service targeting non-technical founders building software products. The site provides information about the service, the founder's background, and offers contact methods for potential clients. The website uses a clean, professional design with a teal/green color scheme and focuses on building trust and credibility with the target audience.

## Recent Changes

**November 15, 2025 - Homepage Redesign**
- Added professional stock images throughout the homepage for better visual engagement
- Implemented uniform spacing system with CSS variables for consistent vertical rhythm
- Enhanced visual hierarchy with grid layouts, card hover effects, and improved typography
- Added responsive design breakpoints (968px, 768px, 640px) for mobile optimization
- Integrated images: hero collaboration image, service card images (quality review, compass, partnership), and founders section image

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
- Grid-based layouts: Two-column hero (text + image), three-column service cards, two-column who-section
- Section spacing: CSS variables (--section-padding: 4rem desktop, --section-padding-mobile: 2.5rem)
- Responsive breakpoints: 968px (grid to single column), 768px (mobile adjustments), 640px (footer layout)
- Rationale: Provides visual consistency, predictable spacing, and excellent mobile experience

### Asset Management

**Images and Resources**
- Logo storage: `/assets/q3Logo.png`
- Stock images: `/attached_assets/stock_images/` (hero, service cards, founders section)
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
- Contact methods: Direct email (pearlo@qubecatalyst.com) and SavvyCal scheduling link
- Rationale: Multiple conversion paths to accommodate different user preferences

## External Dependencies

### Third-Party Services

**Font Delivery**
- Service: Google Fonts CDN
- Fonts: Poppins (weights: 600, 700), Open Sans (weights: 400, 500)
- Integration: Preconnect optimization for performance

**Scheduling Integration**
- Service: SavvyCal
- Purpose: 15-minute triage call booking
- URL: https://savvycal.com/pearlo/free-strategy-session

**Placeholder External Tool**
- Launch Compass: Referenced but URL not yet configured
- Purpose: Self-service tool for users (appears to be a product offering)

### Browser Compatibility

**Font Loading Strategy**
- Preconnect to Google Fonts domains for performance
- System font fallbacks defined in CSS variables
- Ensures graceful degradation if external fonts fail to load