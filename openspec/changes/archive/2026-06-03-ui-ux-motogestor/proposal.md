## Why

O MotoGestor é usado por motoboys no guidão da moto, em condições adversas: noite, chuva, vento. O app atual está fixo em modo escuro sem opção de alternância, e o layout não é otimizado para uso rápido em movimento. Cores frias causam cansaço ocular em uso noturno prolongado, e botões pequenos são difíceis de acertar com luvas ou molhados.

## What Changes

- Adicionar sistema de temas light/dark com toggle de configuração
- Otimizar paleta de cores do modo escuro com tons quentes (amber/sepia) para reduzir cansaço ocular noturno
- Implementar paleta de cores do modo claro com branco quente para boa leitura sob sol
- Reestruturar dashboard para layout fullscreen do turno ativo
- Aumentar tamanhos de touch targets (botões 64px, inputs 56px)
- Aumentar fontes para leitura rápida em movimento (relógio 72px, métricas 28-32px)
- Manter métricas financeiras (ganho bruto, custo combustível, líquido) no turno ativo

## Capabilities

### New Capabilities
- `theme-system`: Sistema de temas light/dark com detecção de preferência do sistema e persistência no localStorage
- `dashboard-fullscreen`: Layout fullscreen do turno ativo com card principal ocupando quase toda a viewport
- `touch-optimization`: Otimização de tamanhos de elementos interativos para uso em moto (touch targets grandes)

### Modified Capabilities
(nenhuma)

## Impact

- **Arquivos modificados**:
  - `src/app/globals.css` - Variáveis de tema light/dark
  - `src/app/layout.tsx` - Lógica de detecção de tema
  - `src/app/page.tsx` - Layout fullscreen do dashboard
  - `src/app/config/page.tsx` - Toggle de tema
  - `src/components/BottomNav.tsx` - Ajustes de tamanho
- **Dependências**: Nenhuma nova dependência necessária
- **APIs**: Nenhuma mudança em APIs existentes
- **Breaking changes**: Nenhuma mudança breaking
