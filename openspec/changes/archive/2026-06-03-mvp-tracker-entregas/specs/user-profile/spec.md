## ADDED Requirements

### Requirement: User can view and edit profile
The system SHALL allow the user to view and edit their name and email.

#### Scenario: View profile
- **WHEN** user navigates to Config screen
- **THEN** system displays current name and email

#### Scenario: Update profile
- **WHEN** user changes name or email and saves
- **THEN** system updates the user record

### Requirement: Profile fields
The system SHALL persist the following user fields:

#### Scenario: Required fields
- **WHEN** user saves profile
- **THEN** system requires: name ( text ), email ( text )
