## MODIFIED Requirements

### Requirement: Sistema de temas light/dark
O sistema SHALL permitir ao usuário alternar entre temas light, dark e amber, com opção de usar a preferência do sistema.

#### Scenario: Toggle de tema disponível
- **WHEN** o usuário acessa a página de configurações
- **THEN** o sistema exibe um toggle com opções: Claro, Escuro, Âmbar, Sistema

#### Scenario: Persistência da preferência
- **WHEN** o usuário seleciona um tema
- **THEN** o sistema salva a preferência no localStorage

#### Scenario: Tema aplicado na inicialização
- **WHEN** o app carrega
- **THEN** o sistema verifica localStorage e aplica o tema salvo

#### Scenario: Fallback para preferência do sistema
- **WHEN** não há tema salvo no localStorage
- **THEN** o sistema usa a preferência do sistema operacional (prefers-color-scheme)

## ADDED Requirements

### Requirement: Suporte a múltiplos temas
O sistema SHALL suportar múltiplas classes de tema no elemento raiz.

#### Scenario: Remoção de classes anteriores
- **WHEN** o usuário troca de tema
- **THEN** o sistema remove todas as classes de tema anteriores (light, dark, amber) antes de aplicar a nova

#### Scenario: Validação de tema
- **WHEN** o tema salvo no localStorage é inválido
- **THEN** o sistema usa o fallback do sistema operacional
