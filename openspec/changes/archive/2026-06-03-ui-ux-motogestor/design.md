## Context

O MotoGestor é um app Next.js 16 com Tailwind CSS 4 e shadcn/ui. Atualmente usa variáveis CSS oklch para temas, mas está fixo em modo escuro (classe `dark` no `<html>`). O app é usado por motoboys no guidão da moto, em condições adversas (noite, chuva, vento).

**Estado atual:**
- Layout: Dashboard com cards 2x2 + botões de ação
- Tema: Fixo dark, sem toggle
- Touch targets: ~48px (padrão web)
- Fontes: 16-20px (padrão web)

## Goals / Non-Goals

**Goals:**
- Sistema de temas light/dark com persistência
- Dashboard fullscreen para turno ativo
- Touch targets grandes (64px botões, 56px inputs)
- Fontes grandes para leitura rápida (72px relógio, 28-32px métricas)
- Cores quentes no modo escuro (pouco cansaço ocular)
- Manter métricas financeiras no turno ativo

**Non-Goals:**
- Mudanças em APIs ou backend
- Novas dependências externas
- Modificações na estrutura de dados
- Funcionalidades novas além de UI/UX

## Decisions

### 1. Sistema de Tema com CSS Variables + localStorage

**Decisão**: Usar variáveis CSS para cores e localStorage para persistência.

**Alternativas consideradas:**
- `next-themes`: Biblioteca externa → Rejeitada para evitar dependência
- Context API React: Mais complexo → CSS variables é mais simples e performático

**Racional**: CSS variables é nativo, performático, e funciona sem JavaScript. localStorage persiste entre sessões.

### 2. Paleta de Cores Quentes para Modo Escuro

**Decisão**: Usar oklch com matiz (hue) em 60-80 (amber/sepia) para modo escuro.

**Valores:**
```
Background: oklch(0.16 0.012 65)
Surface:    oklch(0.20 0.015 65)
Texto:      oklch(0.92 0.01 80)
Destaque:   oklch(0.72 0.16 70)
```

**Alternativas consideradas:**
- Tons azulados: Causam mais fadiga ocular noturna
- Tons cinza puros: Sem personalidade, podem ser frios
- Vermelho: Muito intenso para uso prolongado

**Racional**: Tons quentes (amber) são mais confortáveis para olhos noturnos, similares a "night shift mode" de iOS/Android.

### 3. Layout Fullscreen com CSS Grid

**Decisão**: Usar CSS Grid para layout fullscreen do turno ativo.

**Estrutura:**
```
grid-template-rows: auto 1fr auto
- Header (discreto)
- Conteúdo (flexível)
- Botões de ação (fixos embaixo)
```

**Alternativas consideradas:**
- Flexbox: Menos controle sobre distribuição de espaço
- Fixed positioning: Problemas de scroll em diferentes tamanhos de tela

**Racional**: Grid permite distribuição flexível de espaço entre header, métricas e botões.

### 4. Detecção de Tema com Script Inline

**Decisão**: Script inline no `<head>` para evitar flash de tema errado.

**Fluxo:**
1. Script verifica localStorage
2. Se não tiver, usa `prefers-color-scheme` do sistema
3. Aplica classe `dark` ou `light` no `<html>` antes do render

**Alternativas consideradas:**
- useEffect no React: Causa flash (FOUC)
- Middleware Next.js: Mais complexo, sem necessidade

**Racional**: Script inline executa antes do render, evitando flash.

## Risks / Trade-offs

**[Flash de tema]** → Mitigado com script inline no `<head>`

**[Incompatibilidade oklch]** → Mitigado com fallback para hex em browsers antigos

**[Manutenção de variáveis]** → Mitigado com documentação clara das variáveis

**[Performance do script]** → Risco baixo, script é mínimo (~20 linhas)

## Migration Plan

1. Adicionar variáveis CSS light/dark no globals.css
2. Adicionar script inline no layout.tsx
3. Adicionar toggle no config/page.tsx
4. Reestruturar page.tsx para layout fullscreen
5. Ajustar BottomNav.tsx

**Rollback**: Reverter commits em ordem reversa.

## Open Questions

- Preferência do usuário: Salvar no localStorage ou sempre usar sistema?
  → Decisão: Salvar no localStorage, com opção "Sistema" no toggle
