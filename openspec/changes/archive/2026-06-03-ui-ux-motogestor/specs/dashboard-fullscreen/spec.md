## ADDED Requirements

### Requirement: Layout fullscreen do turno ativo
O dashboard SHALL exibir o turno ativo em layout fullscreen, com o card principal ocupando quase toda a viewport.

#### Scenario: Turno ativo ocupa a tela
- **WHEN** há um turno ativo
- **THEN** o card do turno SHALL ocupar pelo menos 90% da viewport

#### Scenario: Layout com grid
- **WHEN** o turno ativo é exibido
- **THEN** o sistema usa CSS Grid com rows: auto 1fr auto

### Requirement: Relógio de tempo grande
O sistema SHALL exibir o tempo de turno com fonte de 72px para leitura rápida.

#### Scenario: Tamanho do relógio
- **WHEN** o turno ativo está sendo exibido
- **THEN** o relógio de tempo SHALL ter fonte de 72px

#### Scenario: Formato do relógio
- **WHEN** o tempo é exibido
- **THEN** o formato SHALL ser HH:MM:SS

### Requirement: Grid de métricas 2x2
O sistema SHALL exibir métricas em grid 2x2 com cards grandes.

#### Scenario: Métricas exibidas
- **WHEN** o turno ativo está sendo exibido
- **THEN** o sistema exibe: KM Rodado, Ganho Bruto, Custo Combustível, Ganho Líquido

#### Scenario: Tamanho dos cards de métricas
- **WHEN** as métricas são exibidas
- **THEN** cada card SHALL ter altura mínima de 80px

### Requirement: Botões de ação grandes
O sistema SHALL exibir botões de ação com altura mínima de 64px.

#### Scenario: Botão Novo Snapshot
- **WHEN** o turno ativo está sendo exibido
- **THEN** o botão "Novo Snapshot" SHALL ter altura de 64px

#### Scenario: Botão Encerrar Turno
- **WHEN** o turno ativo está sendo exibido
- **THEN** o botão "Encerrar Turno" SHALL ter altura de 56px
