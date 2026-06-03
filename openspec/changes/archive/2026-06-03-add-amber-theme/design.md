## Context

O MotoGestor é um app Next.js 16 com Tailwind CSS 4 e shadcn/ui. Atualmente possui dois modos de tema: light e dark, implementados via variáveis CSS e classes no `<html>`. O sistema de temas já funciona com persistência no localStorage e detecção de preferência do sistema.

**Estado atual:**
- Tipos de tema: `type Theme = "light" | "dark" | "system"`
- Classes CSS: `.light` e `.dark` no `<html>`
- Toggle: 3 botões (Claro, Escuro, Sistema)
- Script inline: Detecta tema salvo e aplica classe

## Goals / Non-Goals

**Goals:**
- Adicionar modo âmbar como terceira opção de tema
- Criar paleta de cores âmbar com fundo quase preto e texto âmbar puro
- Manter usabilidade existente (toggle, persistência, detecção de sistema)
- Garantir contraste adequado (mínimo 4.5:1)

**Non-Goals:**
- Mudanças em APIs ou backend
- Novas dependências externas
- Modificações na estrutura de dados
- Alterar comportamento dos modos light/dark existentes

## Decisions

### 1. Paleta de Cores Âmbar

**Decisão**: Usar oklch com matiz 75 ( âmbar puro) para todas as variáveis.

**Valores:**
```
Background:   oklch(0.12 0.01 70)  ← quase preto, tom quente
Card:         oklch(0.15 0.012 70) ← levemente mais claro
Foreground:   oklch(0.80 0.16 75)  ← âmbar puro (#FFB000 ≈ oklch(0.75 0.16 75))
Primary:      oklch(0.75 0.18 75)  ← âmbar brilhante
Muted:        oklch(0.18 0.01 70)  ← âmbar escuro
Muted-fg:     oklch(0.65 0.12 75)  ← âmbar suave
Border:       oklch(0.22 0.01 70)  ← borda sutil
```

**Alternativas consideradas:**
- Usar a paleta dark existente com mais saturação → Rejeitada: dark já tem tons quentes, mas não é âmbar puro
- Criar paleta completamente nova → Escolhida: maximiza a preservação da visão noturna

**Racional**: Âmbar puro (590-620nm) é a cor menos disruptiva para a visão noturna humana.

### 2. Estrutura de Tema

**Decisão**: Manter a mesma estrutura de classes CSS, adicionando `.amber` como nova classe.

**Alternativas consideradas:**
- Usar data-attribute (data-theme="amber") → Rejeitada: requer mudança na lógica de detecção
- Manter classe CSS → Escolhida: consistente com implementação atual

**Racional**: A abordagem atual com classes CSS já funciona bem, adicionar `.amber` é simples e consistente.

### 3. UI do Toggle

**Decisão**: Adicionar 4º botão "Âmbar" ao lado dos existentes.

**Layout proposto:**
```
┌───────┬───────┬───────┬───────┐
│ Claro │ Escuro│ Âmbar │Sistema│
└───────┴───────┴───────┴───────┘
```

**Alternativas consideradas:**
- Select dropdown → Rejeitada: menos acessível, mais cliques
- Radio buttons → Rejeitada: visualmente menos atraente
- Botões lado a lado → Escolhida: consistente com UI atual

**Racional**: Botões lado a lado são mais fáceis de usar em tela de Moto (touch targets grandes).

## Risks / Trade-offs

**[Contraste insuficiente]** → Mitigado: testar contraste de todas as combinações de cores, garantir mínimo 4.5:1

**[Daltonismo]** → Mitigado: âmbar é seguro para a maioria dos daltonismos (protanopia, deuteranopia, tritanopia)

**[Manutenção]** → Mitigado: documentar paleta de cores e manter consistência com outros temas

**[Performance]** → Risco baixo: apenas mais uma classe CSS, sem impacto significativo

## Migration Plan

1. Adicionar classe `.amber` no globals.css
2. Atualizar tipo Theme no config/page.tsx
3. Adicionar botão Âmbar no toggle
4. Atualizar handleThemeChange para remover classe "amber"
5. Testar alternância entre os 3 modos

**Rollback**: Reverter commits em ordem reversa.

## Open Questions

- O toggle deve ter 4 botões ou usar um layout diferente?
  → Decisão: 4 botões lado a lado, consistente com UI atual

- O modo Sistema deve considerar horário do dia para sugerir âmbar?
  → Decisão: Não, manter apenas preferência do sistema (light/dark). Âmbar é ativação manual.
