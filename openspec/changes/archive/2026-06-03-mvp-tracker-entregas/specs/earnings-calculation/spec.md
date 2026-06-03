## ADDED Requirements

### Requirement: Calculate km driven for a shift
The system SHALL calculate total km driven as the difference between the last recorded km and the initial km.

#### Scenario: Calculate km with multiple snapshots
- **WHEN** shift has start_km=100 and snapshots with km=120, km=150
- **THEN** km driven = 150 - 100 = 50 km

### Requirement: Calculate gross earnings as max per platform
The system SHALL calculate gross earnings by taking the maximum value recorded for each platform across all snapshots in the shift.

#### Scenario: Multiple snapshots for same platform
- **WHEN** shift has snapshots: iFood R$30, iFood R$50, 99Food R$20
- **THEN** gross earnings = R$50 ( max iFood ) + R$20 ( 99Food ) = R$70

#### Scenario: Single snapshot per platform
- **WHEN** shift has snapshots: iFood R$40, Lalamove R$25
- **THEN** gross earnings = R$40 + R$25 = R$65

### Requirement: Calculate fuel cost
The system SHALL calculate fuel cost using motorcycle's fuel efficiency and current fuel price.

#### Scenario: Calculate fuel cost
- **WHEN** km driven = 50, motorcycle fuel efficiency = 35 km/L, fuel price = R$5.80/L
- **THEN** fuel cost = ( 50 / 35 ) * 5.80 = R$8.29

### Requirement: Calculate net earnings
The system SHALL calculate net earnings as gross earnings minus fuel cost.

#### Scenario: Calculate net earnings
- **WHEN** gross earnings = R$70, fuel cost = R$8.29
- **THEN** net earnings = R$70 - R$8.29 = R$61.71
