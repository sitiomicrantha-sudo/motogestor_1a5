## Why

O modo âmbar é a cor que menos causa problemas na visão humana durante a noite, incluindo artefatos visuais. Por isso é comumente usado em odômetros de carros, aviônicos e displays marítimos. Para motoboys que usam o app à noite no guidão da moto, o modo âmbar preserva a visão periférica e reduz o cansaço ocular significativamente comparado ao modo escuro comum.

## What Changes

- Adicionar modo âmbar como terceira opção de tema (Claro, Escuro, Âmbar, Sistema)
- Criar paleta de cores âmbar com fundo quase preto e texto âmbar puro (#FFB000)
- Atualizar toggle de tema na página de configurações para incluir opção Âmbar
- Atualizar script inline de detecção de tema para suportar classe "amber"

## Capabilities

### New Capabilities
- `amber-theme`: Modo de cores âmbar otimizado para preservação da visão noturna

### Modified Capabilities
- `theme-system`: Adicionar opção "amber" ao tipo Theme e ao toggle de tema

## Impact

- **Arquivos modificados**:
  - `src/app/globals.css` - Adicionar classe `.amber` com variáveis de tema
  - `src/app/config/page.tsx` - Adicionar botão Âmbar no toggle, atualizar tipo Theme
- **Dependências**: Nenhuma nova dependência necessária
- **APIs**: Nenhuma mudança em APIs existentes
- **Breaking changes**: Nenhuma mudança breaking
