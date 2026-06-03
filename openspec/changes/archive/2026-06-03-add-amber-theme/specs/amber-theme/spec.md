## ADDED Requirements

### Requirement: Modo de cores âmbar
O sistema SHALL oferecer um modo de cores âmbar com fundo quase preto e texto âmbar puro para preservação da visão noturna.

#### Scenario: Cores do modo âmbar
- **WHEN** o tema âmbar está ativo
- **THEN** o sistema usa fundo quase preto (oklch 0.12) e texto âmbar puro (oklch 0.80 0.16 75)

#### Scenario: Contraste adequado no modo âmbar
- **WHEN** o tema âmbar está ativo
- **THEN** o contraste entre texto e fundo SHALL ser pelo menos 4.5:1

### Requirement: Preservação da visão noturna
O sistema SHALL usar cores que minimizam a disrupção da visão noturna no modo âmbar.

#### Scenario: Zero azul no modo âmbar
- **WHEN** o tema âmbar está ativo
- **THEN** o sistema NÃO usa componentes de cor azul

#### Scenario: Matiz consistente
- **WHEN** o tema âmbar está ativo
- **THEN** todas as cores usam matiz entre 70-80 (faixa âmbar)
