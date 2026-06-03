## 1. Project Setup

- [x] 1.1 Initialize Next.js project with App Router and TypeScript
- [x] 1.2 Configure Tailwind CSS with dark mode and custom colors
- [x] 1.3 Set up Prisma with PostgreSQL connection
- [x] 1.4 Configure PWA with next-pwa
- [x] 1.5 Create database schema ( User, Motorcycle, Shift, Snapshot )

## 2. Database & API

- [x] 2.1 Run Prisma migrations to create tables
- [x] 2.2 Create API routes for CRUD operations:
  - [ ] 2.2.1 User profile ( GET/PUT )
  - [ ] 2.2.2 Motorcycle config ( GET/PUT )
  - [ ] 2.2.3 Shifts ( POST start, POST end, GET list )
  - [ ] 2.2.4 Snapshots ( POST create, GET list by shift )

## 3. Layout & Navigation

- [x] 3.1 Create root layout with dark theme and bottom navigation
- [x] 3.2 Implement bottom menu with 4 tabs: Dashboard, Turnos, Garagem, Config
- [x] 3.3 Set up route structure for each tab

## 4. Dashboard Screen

- [x] 4.1 Build "No Active Shift" state with "INICIAR TURNO" button
- [x] 4.2 Create start shift modal with odometer and goal inputs ( numpad )
- [x] 4.3 Build "Active Shift" state with metric cards ( time, km, gross, net )
- [x] 4.4 Implement shift timer ( HH:MM display )
- [x] 4.5 Create "NOVO SNAPSHOT" modal with km, platform select, earnings input
- [x] 4.6 Implement snapshot logic ( update platform earnings, not additive )
- [x] 4.7 Add "ENCERRAR TURNO" button with confirmation

## 5. Turnos Screen (History)

- [x] 5.1 Build shift history list with cards ( date, duration, net earnings )
- [x] 5.2 Add filter by period ( this week, this month )
- [x] 5.3 Implement delete shift ( with confirmation )
- [x] 5.4 Add edit button ( mocked, console.log only )

## 6. Garagem Screen (Config)

- [x] 6.1 Build motorcycle config form ( model, year, fuel efficiency, fuel price )
- [x] 6.2 Implement save/load from database
- [x] 6.3 Add mocked "Registrar Manutenção" button

## 7. Config Screen (Profile)

- [x] 7.1 Build user profile form ( name, email )
- [x] 7.2 Implement save/load from database
- [x] 7.3 Add mocked "Sair" and "Alterar Senha" buttons

## 8. Business Logic

- [x] 8.1 Implement km driven calculation ( last km - start km )
- [x] 8.2 Implement gross earnings calculation ( max per platform )
- [x] 8.3 Implement fuel cost calculation ( km / efficiency * price )
- [x] 8.4 Implement net earnings calculation ( gross - fuel cost )

## 9. Polish & Testing

- [ ] 9.1 Test on mobile devices ( iOS Safari, Chrome Android )
- [ ] 9.2 Verify numpad inputs open correctly on mobile
- [ ] 9.3 Test PWA install flow
- [ ] 9.4 Verify dark mode contrast in outdoor conditions
