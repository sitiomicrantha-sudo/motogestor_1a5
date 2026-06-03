## ADDED Requirements

### Requirement: User can start a shift
The system SHALL allow the user to start a new shift by providing initial odometer reading and earnings goal.

#### Scenario: Start shift with valid data
- **WHEN** user taps "INICIAR TURNO" and enters valid odometer ( numeric ) and goal ( numeric )
- **THEN** system creates a new Shift record with status "em_andamento", stores start_km and goal, and starts a timer on the Dashboard

#### Scenario: Start shift with empty fields
- **WHEN** user taps "INICIAR TURNO" and leaves odometer or goal empty
- **THEN** system shows validation error and does not create shift

### Requirement: User can take a snapshot during a shift
The system SHALL allow the user to record a snapshot capturing current odometer and per-platform earnings.

#### Scenario: Take snapshot with new platform
- **WHEN** user taps "NOVO SNAPSHOT", enters km and earnings for a platform not yet recorded
- **THEN** system creates a Snapshot record linked to the current shift with the platform earnings

#### Scenario: Take snapshot updating existing platform
- **WHEN** user taps "NOVO SNAPSHOT", enters km and earnings for a platform already recorded in a previous snapshot
- **THEN** system updates the earnings value for that platform ( not additive ) to the new value

#### Scenario: Snapshot pre-fills last km
- **WHEN** user opens the snapshot form
- **THEN** system pre-fills the km field with the last recorded km from the current shift

### Requirement: User can end a shift
The system SHALL allow the user to end the current shift, calculating final metrics.

#### Scenario: End shift
- **WHEN** user taps "ENCERRAR TURNO" and confirms
- **THEN** system sets shift status to "encerrado", records end time, and calculates final km driven

### Requirement: Dashboard shows active shift metrics
The system SHALL display real-time metrics when a shift is active.

#### Scenario: View active shift metrics
- **WHEN** a shift is active
- **THEN** Dashboard displays: shift duration ( HH:MM ), km driven, gross earnings, net earnings

#### Scenario: No active shift
- **WHEN** no shift is active
- **THEN** Dashboard displays "INICIAR TURNO" button only
