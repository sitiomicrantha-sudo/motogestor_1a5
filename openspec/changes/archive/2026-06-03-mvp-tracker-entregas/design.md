## Context

Personal-use PWA for delivery drivers to track shift earnings. Used on motorcycle handlebars in harsh conditions (sun, rain, vibration, gloves). Requires minimal interaction — one-tap snapshots capture odometer and platform earnings at any point.

Currently no existing system — this is a greenfield project.

## Goals / Non-Goals

**Goals:**
- Mobile-first PWA installable on home screen
- Dark mode by default ( saves battery, reduces glare at night )
- Large touch targets ( 48px+ ) for gloved/wet hands
- Numpad inputs for numeric fields
- One-tap snapshot flow during rides
- Accurate earnings calculation ( max per platform, fuel costs )

**Non-Goals:**
- Multi-user / team support
- Route tracking or GPS
- Integration with delivery platform APIs
- Maintenance logging ( mocked only )
- Password change functionality ( mocked only )

## Decisions

### 1. Next.js App Router + React Server Components
**Choice**: Next.js 14+ with App Router  
**Why**: Server components reduce client JS bundle; built-in API routes eliminate separate backend; strong Vercel/Coolify deployment story  
**Alternatives considered**: Vite + Express ( more control but more setup ), Remix ( similar but less ecosystem )

### 2. Prisma ORM
**Choice**: Prisma over Drizzle  
**Why**: Better DX with `prisma studio` for debugging; mature migrations; type-safe queries from schema  
**Trade-off**: Heavier runtime than Drizzle, acceptable for personal project

### 3. PostgreSQL on Coolify
**Choice**: PostgreSQL  
**Why**: Reliable, JSON support if needed later, Coolify has first-class PG support  
**Alternatives considered**: SQLite ( simpler but no concurrent access ), Supabase ( overkill for personal use )

### 4. Tailwind CSS + Dark Mode
**Choice**: Tailwind with `darkMode: 'class'`  
**Why**: Rapid UI prototyping; utility classes ideal for large buttons; easy dark theme  
**Config**: Custom colors ( dark gray, black, neon green for positive values )

### 5. PWA via `next-pwa`
**Choice**: `@ducanh2912/next-pwa` ( maintained fork )  
**Why**: Service worker, offline support, install prompt  
**Trade-off**: Adds complexity; acceptable for mobile-first use case

### 6. Snapshot = Platform Earnings Update
**Choice**: Each snapshot records km + per-platform earnings ( not additive )  
**Why**: Driver sees real-time totals on delivery apps; snapshot captures "current state" not "delta"  
**Logic**: `grossEarnings = max( earnings[platform] )` per platform across snapshots

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| PWA install prompts inconsistent across browsers | Test on iOS Safari + Chrome Android; provide manual install instructions |
| Offline support adds complexity | Start with online-only; add offline caching in follow-up |
| Prisma migrations in production | Use `prisma migrate deploy` in Coolify build step |
| No real-time sync ( single device ) | Acceptable for personal use; could add later if needed |
| Dark mode contrast issues in direct sun | Use high-contrast neon green on black; test户外 readability |
