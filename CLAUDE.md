# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run typecheck    # TypeScript type checking

# Testing
npm run test         # Run all tests
npm test unit        # Run unit tests
npm test functional  # Run functional tests
```

## Architecture Overview

This is an AdonisJS 6 application with Inertia.js and Vue 3 frontend for a Rainbow Six Siege community platform called "Hexagone Six".

### Backend Structure (AdonisJS)

- **Domain-driven organization**: Controllers, models, and services are grouped by feature domain
- **Key domains**: `auth`, `guides`, `maps`, `markers`, `users`, `admin`, `payments`, `suggestions`, `votes`
- **Middleware**: Authentication (`auth`, `guest`, `silentAuth`), role-based access (`userRole`)
- **Database**: PostgreSQL with Lucid ORM
- **Payments**: Stripe integration for guide purchases and Hexaboost subscriptions

### Frontend Structure (Vue 3 + Inertia)

- **Framework**: Vue 3 with Composition API, Inertia.js for SPA-like experience
- **UI**: Nuxt UI components with Tailwind CSS
- **Layout system**: Multiple layouts (`default`, `admin`, `maps`, `publication`)
- **Key features**: Interactive maps with Leaflet, markdown guide system, payment flows

### Import Aliases

The project uses extensive import aliases defined in `package.json`:

- `#auth/*` → `./app/auth/*.js`
- `#guides/*` → `./app/guides/*.js`
- `#maps/*` → `./app/maps/*.js`
- And more for each domain

### Key Features

1. **Interactive Maps**: Leaflet-based map system for R6 Siege maps with markers and suggestions
2. **Guide System**: Markdown-based paid guides with table of contents and payments
3. **Hexaboost**: Subscription service with Discord integration
4. **Admin Panel**: User management, suggestion moderation, analytics
5. **Payment System**: Stripe checkout for guides and subscriptions

### Database Migrations

Located in `database/migrations/` with timestamps. Key tables:

- Users, guides, maps, markers, suggestions, votes, purchases, posts

### Environment Variables

Configure in `.env`:

- Database: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Discord/OAuth: For Hexaboost integration

### Testing Structure

- Unit tests: `tests/unit/**/*.spec.ts`
- Functional tests: `tests/functional/**/*.spec.ts`
- Configured with Japa testing framework
