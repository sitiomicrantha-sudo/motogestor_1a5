## ADDED Requirements

### Requirement: User can configure motorcycle details
The system SHALL allow the user to store motorcycle configuration used for fuel cost calculations.

#### Scenario: Save motorcycle config
- **WHEN** user enters model, year, fuel efficiency ( km/L ), and fuel price ( R$/L )
- **THEN** system saves the motorcycle config and uses it for future shift calculations

#### Scenario: Edit motorcycle config
- **WHEN** user updates fuel efficiency or fuel price
- **THEN** system updates the config and future shifts use new values ( past shifts unchanged )

### Requirement: Motorcycle config fields
The system SHALL persist the following motorcycle fields:

#### Scenario: Required fields
- **WHEN** user saves motorcycle config
- **THEN** system requires: model ( text ), year ( numeric ), fuel efficiency ( numeric km/L ), fuel price ( numeric R$/L )
