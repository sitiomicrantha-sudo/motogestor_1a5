## ADDED Requirements

### Requirement: shadcn/ui is installed and configured
The system SHALL have shadcn/ui installed with Tailwind CSS integration.

#### Scenario: Install shadcn/ui
- **WHEN** developer runs `npx shadcn@latest init`
- **WHEN** developer runs `npx shadcn@latest add card button input select dialog badge`
- **THEN** components are available in `src/components/ui/`
- **THEN** `cn()` utility is available in `src/lib/utils.ts`
