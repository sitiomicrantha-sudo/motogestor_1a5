## ADDED Requirements

### Requirement: Sistema de temas light/dark
O sistema SHALL permitir ao usuário alternar entre temas light e dark, com opção de usar a preferência do sistema.

#### Scenario: Toggle de tema disponível
- **WHEN** o usuário acessa a página de configurações
- **THEN** o sistema exibe um toggle com opções: Claro, Escuro, Sistema

#### Scenario: Persistência da preferência
- **WHEN** o usuário seleciona um tema
- **THEN** o sistema salva a preferência no localStorage

#### Scenario: Tema aplicado na inicialização
- **WHEN** o app carrega
- **THEN** o sistema verifica localStorage e aplica o tema salvo

#### Scenario: Fallback para preferência do sistema
- **WHEN** não há tema salvo no localStorage
- **THEN** o sistema usa a preferência do sistema operacional (prefers-color-scheme)

### Requirement: Paleta de cores otimizada para noite
O sistema SHALL usar cores quentes (amber/sepia) no modo escuro para reduzir cansaço ocular.

#### Scenario: Cores do modo escuro
- **WHEN** o tema escuro está ativo
- **THEN** o sistema usa cores com matiz entre 60-80 (amber/sepia)

#### Scenario: Contraste adequado
- **WHEN** o tema escuro está ativo
- **THEN** o contraste entre texto e fundo SHALL ser pelo menos 4.5:1

### Requirement: Paleta de cores para modo claro
O sistema SHALL usar branco quente no modo claro para boa leitura sob sol.

#### Scenario: Cores do modo claro
- **WHEN** o tema claro está ativo
- **THEN** o sistema usa branco quente (#faf8f5) como fundo

#### Scenario: Texto legível no modo claro
- **WHEN** o tema claro está ativo
- **THEN** o texto SHALL ter contraste adequado contra o fundo branco quente
