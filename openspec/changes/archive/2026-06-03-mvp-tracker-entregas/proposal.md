## Why

Delivery drivers need a quick, glanceable way to track shift metrics ( earnings, km, fuel costs ) without fiddling with complex UI while riding. Current solutions require too much interaction — this MVP enables one-tap "snapshots" that capture platform earnings and odometer readings at any point during a shift, then auto-calculates net profit.

## What Changes

- Create a new Next.js PWA project with dark-mode-first design, large touch targets, and numpad inputs
- Implement a database schema for users, motorcycles, shifts ( work sessions ), and snapshots ( point-in-time readings )
- Build 4 main screens: Dashboard ( active shift ), Turnos ( history ), Garagem ( motorcycle config ), Config ( user profile )
- Implement business logic for calculating km driven, gross earnings ( max per platform ), fuel cost, and net earnings
- Support multiple delivery platforms ( iFood, 99Food, Lalamove, Other ) per snapshot
- Enable shift lifecycle: start with odometer + goal, take snapshots, end shift

## Capabilities

### New Capabilities

- `shift-management`: Start, snapshot, and end delivery work shifts with odometer tracking
- `earnings-calculation`: Calculate gross earnings ( max per platform ), fuel costs, and net profit per shift
- `motorcycle-config`: Store motorcycle details ( model, year, fuel efficiency, fuel price ) used in cost calculations
- `user-profile`: Basic user data persistence ( name, email )
- `pwa-setup`: Progressive Web App configuration for offline-capable mobile installation

### Modified Capabilities

- None ( new project )

## Impact

- **New project**: Next.js app with App Router, Tailwind CSS, Prisma ORM, PostgreSQL
- **Dependencies**: next-pwa or equivalent for PWA support
- **Database**: New PostgreSQL schema with 4 tables ( User, Motorcycle, Shift, Snapshot )
- **Deployment**: Target Coolify for hosting
