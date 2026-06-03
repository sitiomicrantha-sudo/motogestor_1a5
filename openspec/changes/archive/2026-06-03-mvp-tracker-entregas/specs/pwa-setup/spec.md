## ADDED Requirements

### Requirement: App is installable as PWA
The system SHALL be configured as a Progressive Web App installable on mobile home screens.

#### Scenario: Install prompt
- **WHEN** user visits the app on a supported mobile browser
- **THEN** browser shows install prompt to add app to home screen

#### Scenario: Offline availability
- **WHEN** user has installed the PWA and loses internet connection
- **THEN** app shell and cached pages remain accessible

### Requirement: App has manifest and service worker
The system SHALL include a web manifest and service worker for PWA functionality.

#### Scenario: Manifest exists
- **WHEN** app is deployed
- **THEN** manifest.json is accessible at root with name, icons, theme_color, and display properties

#### Scenario: Service worker registered
- **WHEN** app loads in browser
- **THEN** service worker is registered and caches static assets
