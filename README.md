# Desafio Autoflex

### 🗺️ Roadmap

Este documento rastreia o progresso do desenvolvimento do sistema de controle de estoque e produção.
**Stack:** Java 17 (Quarkus), PostgreSQL, React (Vite + Tailwind + Zustand).

---

### 📅 Fase 1: Configuração e Alicerce (Dia 1)
O objetivo é ter o ambiente rodando e o banco de dados pronto para receber tabelas.

- [X] **Setup do Monorepo**
    - [X] Criar pasta raiz do projeto.
    - [X] Inicializar Git (`git init`).
    - [X] Criar `.gitignore` (ignorando `target/`, `node_modules/`, `.env`).
- [X] **Setup do Backend (Quarkus)**
    - [X] Gerar projeto no code.quarkus.io (Extensões: Quarkus Rest, Hibernate ORM Panache, JDBC Driver - PostgreSQL).
    - [X] Baixar e descompactar na pasta `/backend`.
    - [X] Rodar "Hello World" (`./mvnw quarkus:dev`).
- [X] **Setup do Frontend (React)**
    - [X] Criar projeto Vite (`npm create vite@latest frontend -- --template react-ts`).
    - [X] Instalar e configurar o TailwindCSS.
    - [X] Instalar bibliotecas essenciais: `axios`, `react-router-dom` (ou tanstack router).
- [X] **Infraestrutura (Docker)**
    - [X] Criar `docker-compose.yml` na raiz configurando o serviço do PostgreSQL.
    - [X] Rodar o banco (`docker-compose up -d`) e conectar via DBeaver/PgAdmin para testar.

---

### 📅 Fase 2: Modelagem e CRUDs Básicos - Backend (Dia 2)
Foco total na API e persistência de dados. Lembre-se: **Código em Inglês**.

- [X] **Modelagem de Entidades (JPA/Panache)**
    - [X] Criar Entity `RawMaterial` (id, name, stockQuantity).
    - [X] Criar Entity `Product` (id, name, price).
    - [X] Criar Entity `ProductComposition` (Relacionamento N:N - id, product, rawMaterial, requiredQuantity).
- [X] **Repositórios e Services**
    - [X] Usar o padrão Active Record do Panache.
    - [X] Criar DTOs (Data Transfer Objects) para não expor as entidades diretamente.
- [X] **Endpoints Básicos (REST)**
    - [X] Implementar `GET /raw-materials` e `POST /raw-materials`.
    - [X] Implementar `GET /products` e `POST /products` (apenas dados básicos, sem composição ainda).
    - [X] Testar endpoints via Postman/Insomnia/Curl.

---

### 📅 Fase 3: Lógica de Negócio e Associação - Backend (Dia 3)
O dia mais difícil. Implementar a lógica "inteligente" do sistema.

- [ ] **Funcionalidade de Associação (RF003)**
    - [ ] Ajustar o `POST /products` ou criar endpoint específico para receber a lista de matérias-primas e quantidades.
    - [ ] Garantir que ao salvar um produto, as linhas na tabela `ProductComposition` sejam criadas.
- [ ] **Algoritmo de Produção (RF004)**
    - [ ] Criar Service `ProductionService`.
    - [ ] Implementar lógica: Buscar produtos -> Ordenar por valor (Decrescente) -> Verificar estoque -> Calcular Qtd Possível.
    - [ ] Criar endpoint `GET /products/production-plan` que retorna o JSON com a sugestão de produção e valor total.
- [ ] **Testes (Desejável)**
    - [ ] Escrever 1 Teste Unitário (JUnit) para validar o algoritmo de cálculo de produção (mockando o banco).

---

### 📅 Fase 4: Frontend - Estrutura e Cadastros Simples (Dia 4)
Começar a dar vida visual ao sistema.

- [ ] **Componentes Base**
    - [ ] Criar Layout Principal (Sidebar + Header + Área de Conteúdo).
    - [ ] Configurar Rotas (`/`, `/products`, `/materials`, `/production`).
- [ ] **Integração com API**
    - [ ] Configurar instância do Axios (baseURL).
    - [ ] Criar Services do Front (`ProductService`, `MaterialService`).
- [ ] **Tela de Matérias-Primas (Raw Materials)**
    - [ ] Criar Tabela de listagem.
    - [ ] Criar Modal ou Página de Cadastro.
    - [ ] Integrar com o Backend (Listar e Criar).

---

### 📅 Fase 5: Frontend - Telas Complexas (Dia 5)
Foco na tela de Produtos, que exige selecionar matérias-primas dinamicamente.

- [ ] **Tela de Produtos (Products)**
    - [ ] Criar Tabela de listagem de produtos.
    - [ ] **Formulário de Produto (O Desafio):**
        - [ ] Campos básicos (Nome, Preço).
        - [ ] Seção de "Receita": Botão "Adicionar Matéria-Prima".
        - [ ] Dropdown para selecionar Matéria-Prima + Input de Quantidade.
        - [ ] Lógica visual para adicionar/remover linhas da receita.
    - [ ] Enviar o JSON completo para o Backend salvar.

---

### 📅 Fase 6: Dashboard e Refinamento (Dia 6)
Visualizar o resultado da inteligência do sistema.

- [ ] **Tela de Planejamento de Produção (Dashboard)**
    - [ ] Consumir o endpoint `/products/production-plan`.
    - [ ] Exibir Cards com: "Valor Total Estimado", "Total de Itens Produzidos".
    - [ ] Exibir Tabela: Produto | Qtd Sugerida | Valor Unitário | Subtotal.
- [ ] **Refinamentos (UI/UX)**
    - [ ] Feedback ao usuário (Toasts de "Salvo com sucesso" ou "Erro ao conectar").
    - [ ] Tratamento de erros (ex: tentar criar produto sem nome).
    - [ ] Verificar responsividade (telas menores).

---

### 📅 Fase 7: Entrega e Documentação (Dia 7)
O polimento final que garante a contratação.

- [ ] **Documentação (README.md)**
    - [ ] Descrever o projeto.
    - [ ] **Como Rodar:** "Basta ter Docker e rodar `docker-compose up`".
    - [ ] **Decisões Técnicas:** Explicar por que usou Quarkus, Zustand e o algoritmo Guloso.
- [ ] **Limpeza de Código**
    - [ ] Remover `console.log` e código comentado.
    - [ ] Verificar se nomes de variáveis estão em Inglês.
- [ ] **Build e Deploy (Opcional)**
    - [ ] Gerar build do React (`npm run build`).
    - [ ] (Opcional) Subir no Render/Railway/Vercel.
- [ ] **Entrega**
    - [ ] Commit final.
    - [ ] Push para o GitHub.
    - [ ] Gravar vídeo curto (Loom/OBS) mostrando o fluxo funcionando.

---

### 🚀 Status
- [ ] **Backend Pronto**
- [ ] **Frontend Pronto**
- [ ] **Integração Completa**
- [ ] **Pronto para Entrega**