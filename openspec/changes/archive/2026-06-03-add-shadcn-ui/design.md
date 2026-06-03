## Context

MotoGestor é um PWA para entregadores com 4 telas: Dashboard, Turnos, Garagem, Config. Componentes atuais são Tailwind puro. shadcn/ui adiciona componentes prontos sem perder customização.

## Goals / Non-Goals

**Goals:**
- Adicionar shadcn/ui com componentes essenciais
- Revisar todas as páginas para usar componentes shadcn
- Manter dark mode e visual existente

**Non-Goals:**
- Mudar comportamento das páginas
- Adicionar novas funcionalidades
- Trocar framework

## Decisions

### 1. shadcn/ui (não MUI/Chakra)
**Choice**: shadcn/ui  
**Why**: Código copiado (não dependência), Tailwind nativo, bundle mínimo

### 2. Componentes selecionados
- Card (métricas, listas)
- Button (ações)
- Input (formulários)
- Select (plataforma)
- Dialog (modais)
- Badge (status)

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Bundle increase | Só componentes usados (~10KB) |
| Curva aprendizado | API similar ao Tailwind |
