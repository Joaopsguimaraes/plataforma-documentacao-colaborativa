# Teste Técnico Full Stack - Plataforma de Documentação Colaborativa

## Visão Geral

Desenvolver uma plataforma de documentação colaborativa que permita usuários criarem e compartilharem documentação técnica, em tempo real, dentro dos seus espaços de trabalho.

## Stack Tecnológica

### Frontend

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI (componentes base)
- TipTap (editor rich text)
- SWR (data fetching)

### Backend

- NestJS
- GraphQL (Apollo)
- Prisma
- PostgreSQL
- JWT Authentication

## Funcionalidades Essenciais

### 1. Autenticação

- Login/Registro com email e senha
- Proteção de rotas
- Gerenciamento de sessão com JWT

### 2. Workspaces

- CRUD de workspaces
- Gerenciamento de membros
- Níveis de acesso (Admin/Editor/Viewer)

### 3. Documentos

- Editor Rich Text WYSIWYG colaborativo
- Autosave

## Schema do Banco de Dados

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["prismaSchemaFolder"]
}

model User {
  id         String            @id @default(cuid())
  email      String            @unique
  name       String
  password   String
  workspaces WorkspaceMember[]
  createdAt  DateTime          @default(now())
  updatedAt  DateTime          @updatedAt
}

model Workspace {
  id          String            @id @default(cuid())
  name        String
  description String?
  members     WorkspaceMember[]
  documents   Document[]
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

model WorkspaceMember {
  id          String     @id @default(cuid())
  role        MemberRole @default(VIEWER)
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  workspace   Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId String
  createdAt   DateTime   @default(now())

  @@unique([userId, workspaceId])
}

enum MemberRole {
  ADMIN
  EDITOR
  VIEWER
}

model Document {
  id          String     @id @default(cuid())
  title       String
  content     String     @db.Text
  workspace   Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  workspaceId String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

## Entrega

1. Repositório único no GitHub com:

   - Frontend e Backend
   - [README detalhado](#readme)

2. Deploy:
   - Frontend na Vercel/Netlify
   - Backend no Render
   - Banco de dados no Neon/Supabase

## Prazo

O prazo final de entrega é dia 26/01/2025 23h59.

## Cronograma recomendado

1. **Dia 1**

   - Setup do projeto
   - Implementação da autenticação
   - CRUD básico de workspaces

2. **Dia 2**

   - Editor de documentos
   - Estilização básica

3. **Dia 3**

   - Colaboração em tempo real
   - Polimento da UI

4. **Dia 4**

   - Ajustes finais
   - Deploy

## Observações Importantes

- Defina as funcionalidades principais do projeto e comece por elas;
- Priorize o UX em relação ao UI;
- Modularize sempre que possível;
- Mantenha o código limpo e organizado;
- Documente decisões importantes;
- Foque em simplificar seus problemas. Alguns exemplos:
  - Na autenticação não é necessário usar estratégias de refresh tokens, revogação de tokens, rate limiting, etc;
  - No GraphQL não é necessário fazer otimizações de queries, resolver problemas de N+1, etc;

## README

No README será obrigatório ter:

- Passo a passo de como executar o projeto localmente
- Responta as seguintes perguntas em relação ao projeto desenvolvido:
  - O que foi mais desafiador?
  - O que você aprendeu?
  - O que você gostaria de melhorar?
