# Feature: Materials (Matérias-Primas)

Esta feature gerencia o cadastro e visualização de matérias-primas do sistema.

## 📁 Estrutura de Arquivos

```
materials/
├── index.tsx                          # Barrel export (ponto de entrada)
├── materials-page.tsx                 # Componente principal da página
├── components/                        # Componentes específicos da feature
│   ├── material-form-dialog.tsx       # Dialog com formulário de cadastro
│   └── materials-table.tsx            # Tabela de listagem de materiais
└── schemas/                           # Schemas de validação
    └── material.schema.ts             # Schema Zod para validação do formulário
```

## 🎯 Responsabilidades

### `materials-page.tsx`
- Componente orquestrador da página
- Gerencia o efeito de carregar dados ao montar
- Compõe os subcomponentes (dialog e tabela)

### `components/material-form-dialog.tsx`
- Dialog modal para cadastro de nova matéria-prima
- Gerencia estado do formulário com React Hook Form
- Integra com o store global para criar materiais
- Exibe notificações de sucesso

### `components/materials-table.tsx`
- Renderiza a tabela de materiais
- Exibe estados de loading e empty
- Gerencia ações por linha (ex: deletar)

### `schemas/material.schema.ts`
- Define o schema de validação com Zod
- Exporta o tipo TypeScript derivado do schema
- Centraliza regras de validação

## 🔄 Fluxo de Dados

1. `MaterialsPage` busca dados ao montar via `fetchMaterials()`
2. `MaterialsTable` consome dados do store e renderiza
3. `MaterialFormDialog` submete novos materiais via `createMaterial()`
4. Store notifica componentes sobre mudanças de estado

## 🚀 Como Usar

```tsx
import { MaterialsPage } from '@/features/materials'

<Route path="/materials" element={<MaterialsPage />} />
```

## 🎨 Benefícios desta Estrutura

- ✅ **Separação de Responsabilidades**: Cada arquivo tem uma função clara
- ✅ **Reutilização**: Componentes podem ser usados em outros contextos
- ✅ **Testabilidade**: Componentes menores são mais fáceis de testar
- ✅ **Manutenibilidade**: Mudanças isoladas não afetam toda a feature
- ✅ **Escalabilidade**: Fácil adicionar novos componentes ou funcionalidades

## 📝 Padrões Seguidos

- **Feature-based structure**: Agrupa código por funcionalidade, não por tipo
- **Barrel exports**: `index.tsx` como ponto de entrada único
- **Colocation**: Mantém código relacionado próximo
- **Single Responsibility**: Cada componente faz uma coisa bem feita
