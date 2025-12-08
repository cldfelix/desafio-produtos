# Documentação - Sistema de Gerenciamento de Produtos

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Rotas da Aplicação](#rotas-da-aplicação)
5. [Componentes](#componentes)
6. [Gerenciamento de Estado](#gerenciamento-de-estado)
7. [API Mock (MSW)](#api-mock-msw)
8. [Como Executar](#como-executar)
9. [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

Este é um sistema completo de gerenciamento de produtos desenvolvido com **Next.js 16**, **TypeScript** e **Tailwind CSS**. A aplicação permite listar, cadastrar, filtrar e ordenar produtos de forma eficiente, utilizando gerenciamento de estado global com Zustand e API mock com MSW (Mock Service Worker).

### Principais Características

- ✅ Interface moderna e responsiva
- ✅ Gerenciamento de estado global com Zustand
- ✅ API mock com MSW para desenvolvimento
- ✅ Rotas separadas para melhor organização
- ✅ Filtros avançados e ordenação
- ✅ TypeScript para type safety
- ✅ Estilização com Tailwind CSS

---

## 🛠 Tecnologias Utilizadas

### Core
- **Next.js 16.0.7** - Framework React com App Router
- **React 19.2.0** - Biblioteca UI
- **TypeScript 5** - Tipagem estática

### Estado e Dados
- **Zustand 5.0.9** - Gerenciamento de estado global
- **MSW 2.12.4** - Mock Service Worker para API mock

### Estilização
- **Tailwind CSS 4.1.17** - Framework CSS utility-first
- **PostCSS** - Processamento de CSS

---

## 📁 Estrutura do Projeto

```
gerenciamento-produtos/
├── app/                          # App Router do Next.js
│   ├── layout.tsx                # Layout principal com navegação
│   ├── page.tsx                  # Página inicial (Dashboard)
│   ├── globals.css               # Estilos globais
│   └── produtos/                 # Rotas de produtos
│       ├── page.tsx              # Listagem de produtos
│       └── novo/
│           └── page.tsx           # Cadastro de novo produto
│
├── components/                    # Componentes React
│   ├── Navigation.tsx            # Barra de navegação
│   ├── ProductForm.tsx           # Formulário de cadastro
│   ├── ProductList.tsx           # Lista de produtos
│   ├── ProductFilters.tsx        # Filtros e ordenação
│   └── MSWProvider.tsx           # Provider do MSW
│
├── store/                         # Gerenciamento de estado
│   └── productStore.ts            # Store Zustand para produtos
│
├── types/                         # Definições TypeScript
│   └── product.ts                 # Tipos de produtos
│
├── lib/                           # Utilitários e helpers
│   └── api.ts                     # Funções de API
│
├── mocks/                         # Configuração MSW
│   ├── handlers.ts                # Handlers das rotas mock
│   ├── browser.ts                 # Configuração para browser
│   └── server.ts                  # Configuração para servidor
│
├── public/                        # Arquivos estáticos
│   └── mockServiceWorker.js       # Service Worker do MSW
│
└── docs/                          # Documentação
    └── DOCUMENTACAO.md            # Este arquivo
```

---

## 🗺 Rotas da Aplicação

A aplicação utiliza o **App Router** do Next.js, onde cada pasta dentro de `app/` representa uma rota.

### `/` - Dashboard (Página Inicial)

**Arquivo:** `app/page.tsx`

Página inicial que exibe:
- Estatísticas gerais (total de produtos, produtos filtrados)
- Cards informativos
- Links rápidos para ações principais
- Informações sobre o sistema

**Funcionalidades:**
- Carrega produtos automaticamente ao montar
- Exibe resumo estatístico
- Navegação rápida para outras seções

---

### `/products` - Listagem de Produtos

**Arquivo:** `app/products/page.tsx`

Página principal para visualização de produtos com:
- Lista completa de produtos
- Filtros por nome e faixa de preço
- Ordenação por nome ou preço
- Contador de produtos encontrados
- Botão para cadastrar novo produto

**Funcionalidades:**
- Carrega produtos da API ao montar
- Aplica filtros em tempo real
- Ordena produtos conforme seleção
- Exibe mensagens de erro quando necessário

---

### `/products/new` - Cadastro de Produto

**Arquivo:** `app/products/new/page.tsx`

Página dedicada para cadastro de novos produtos:
- Formulário completo com validação
- Campos: Nome, Categoria, Preço, Descrição, URL da Imagem
- Redirecionamento automático após cadastro bem-sucedido
- Link para voltar à lista de produtos

**Funcionalidades:**
- Validação de campos obrigatórios
- Integração com API mock
- Atualização do estado global
- Feedback visual durante submissão

---

## 🧩 Componentes

### Navigation.tsx

Componente de navegação superior que exibe:
- Logo/título da aplicação
- Links para todas as rotas principais
- Indicação visual da rota ativa
- Design responsivo

**Localização:** `components/Navigation.tsx`

**Uso:** Incluído no `layout.tsx` para aparecer em todas as páginas

---

### ProductForm.tsx

Formulário completo para cadastro de produtos.

**Campos:**
- Nome do Produto (obrigatório)
- Categoria (select com opções pré-definidas)
- Preço (obrigatório, numérico)
- Descrição (obrigatório, textarea)
- URL da Imagem (obrigatório, validação de URL)

**Funcionalidades:**
- Validação de campos
- Estado de loading durante submissão
- Integração com store Zustand
- Chamada à API mock
- Limpeza automática após sucesso
- Redirecionamento para lista após cadastro

**Localização:** `components/ProductForm.tsx`

---

### ProductList.tsx

Componente que renderiza a lista de produtos em formato de grid.

**Funcionalidades:**
- Grid responsivo (1 coluna mobile, 2 tablet, 3 desktop)
- Cards de produto com imagem, nome, categoria, preço e descrição
- Estado de loading
- Mensagem quando não há produtos
- Uso do componente Image do Next.js para otimização

**Subcomponente:**
- `ProductCard`: Card individual de produto

**Localização:** `components/ProductList.tsx`

---

### ProductFilters.tsx

Componente para filtros e ordenação de produtos.

**Filtros:**
- **Por Nome:** Busca case-insensitive
- **Preço Mínimo:** Filtra produtos com preço >= valor
- **Preço Máximo:** Filtra produtos com preço <= valor

**Ordenação:**
- Nome (A-Z)
- Nome (Z-A)
- Preço (Menor-Maior)
- Preço (Maior-Menor)

**Funcionalidades:**
- Aplicação de filtros em tempo real
- Botão para limpar todos os filtros
- Interface intuitiva com labels descritivos

**Localização:** `components/ProductFilters.tsx`

---

### MSWProvider.tsx

Provider que inicializa o Mock Service Worker no browser.

**Funcionalidades:**
- Inicializa o MSW apenas no cliente (browser)
- Exibe loading durante inicialização
- Tratamento de erros na inicialização
- Permite que a aplicação continue mesmo se MSW falhar

**Localização:** `components/MSWProvider.tsx`

**Uso:** Envolve toda a aplicação no `layout.tsx`

---

## 🔄 Gerenciamento de Estado

O estado global é gerenciado com **Zustand**, uma biblioteca leve e performática.

### Store: productStore.ts

**Localização:** `store/productStore.ts`

**Estado:**
```typescript
{
  products: Product[]              // Lista completa de produtos
  filteredProducts: Product[]      // Produtos após filtros/ordenação
  filterState: FilterState         // Estado dos filtros
  sortOption: SortOption          // Opção de ordenação atual
  isLoading: boolean              // Estado de carregamento
  error: string | null            // Mensagens de erro
}
```

**Actions:**
- `setProducts(products)` - Define lista de produtos e aplica filtros
- `addProduct(product)` - Adiciona novo produto à lista
- `setFilterState(filters)` - Atualiza filtros e reaplica
- `setSortOption(option)` - Define ordenação e reaplica
- `applyFiltersAndSort()` - Aplica filtros e ordenação aos produtos
- `setLoading(loading)` - Controla estado de loading
- `setError(error)` - Define mensagem de erro

**Características:**
- Filtros e ordenação aplicados automaticamente
- Estado reativo - componentes atualizam automaticamente
- Type-safe com TypeScript

---

## 🌐 API Mock (MSW)

A aplicação utiliza **MSW (Mock Service Worker)** para simular uma API REST sem necessidade de backend real.

### Handlers

**Localização:** `mocks/handlers.ts`

**Rotas Mockadas:**

1. **GET /api/products**
   - Retorna lista completa de produtos
   - Inclui produtos iniciais pré-cadastrados

2. **POST /api/products**
   - Cria novo produto
   - Retorna produto criado com ID gerado
   - Adiciona à lista em memória

### Dados Iniciais

A aplicação vem com 5 produtos pré-cadastrados:
- Notebook Dell Inspiron
- Smartphone Samsung Galaxy
- Mesa de Escritório
- Cadeira Ergonômica
- Fone de Ouvido Bluetooth

### Configuração

- **Browser:** `mocks/browser.ts` - Para desenvolvimento no navegador
- **Server:** `mocks/server.ts` - Para testes no servidor
- **Service Worker:** `public/mockServiceWorker.js` - Intercepta requisições HTTP

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Build para Produção

```bash
# Criar build de produção
npm run build

# Executar build de produção
npm start
```

### Linting

```bash
# Executar linter
npm run lint
```

---

## ✨ Funcionalidades

### 1. Listagem de Produtos

- ✅ Exibe todos os produtos cadastrados
- ✅ Cards com imagem, nome, categoria, preço e descrição
- ✅ Layout responsivo em grid
- ✅ Contador de produtos encontrados

### 2. Cadastro de Produtos

- ✅ Formulário completo e validado
- ✅ Campos: Nome, Categoria, Preço, Descrição, URL da Imagem
- ✅ Validação de campos obrigatórios
- ✅ Feedback visual durante submissão
- ✅ Produto aparece imediatamente na lista após cadastro

### 3. Filtros

- ✅ **Filtro por Nome:** Busca parcial case-insensitive
- ✅ **Filtro por Preço Mínimo:** Filtra produtos >= valor
- ✅ **Filtro por Preço Máximo:** Filtra produtos <= valor
- ✅ Filtros aplicados em tempo real
- ✅ Botão para limpar todos os filtros

### 4. Ordenação

- ✅ **Por Nome:** Crescente (A-Z) ou Decrescente (Z-A)
- ✅ **Por Preço:** Crescente (Menor-Maior) ou Decrescente (Maior-Menor)
- ✅ Ordenação aplicada instantaneamente

### 5. Navegação

- ✅ Barra de navegação superior
- ✅ Rotas separadas para melhor organização
- ✅ Indicação visual da rota ativa
- ✅ Links para todas as seções principais

### 6. Interface

- ✅ Design moderno com Tailwind CSS
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Estados de loading
- ✅ Tratamento de erros com mensagens claras
- ✅ Animações e transições suaves

---

## 📝 Tipos TypeScript

### Product

```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}
```

### SortOption

```typescript
type SortOption =
  | 'name-asc'    // Nome A-Z
  | 'name-desc'   // Nome Z-A
  | 'price-asc'   // Preço Menor-Maior
  | 'price-desc'; // Preço Maior-Menor
```

### FilterState

```typescript
interface FilterState {
  name: string;
  minPrice: number | '';
  maxPrice: number | '';
}
```

---

## 🔧 Configurações Importantes

### Next.js Config

**Arquivo:** `next.config.ts`

Configurado para permitir imagens externas do Unsplash:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### MSW Config

**Arquivo:** `package.json`

```json
"msw": {
  "workerDirectory": ["public"]
}
```

---

## 🎨 Estilização

A aplicação utiliza **Tailwind CSS 4** para estilização:

- **Cores:** Paleta azul para ações principais, cinza para textos
- **Layout:** Container responsivo com max-width
- **Cards:** Sombras e bordas arredondadas
- **Formulários:** Inputs com focus states
- **Botões:** Estados hover e disabled
- **Grid:** Sistema de grid responsivo do Tailwind

---

## 📚 Próximos Passos / Melhorias Futuras

- [ ] Edição de produtos existentes
- [ ] Exclusão de produtos
- [ ] Paginação para listas grandes
- [ ] Busca avançada com múltiplos critérios
- [ ] Exportação de dados (CSV, JSON)
- [ ] Upload de imagens (ao invés de URL)
- [ ] Autenticação de usuários
- [ ] Persistência de dados (localStorage ou backend real)
- [ ] Testes unitários e de integração
- [ ] Modo escuro/claro

---

## 🤝 Contribuindo

Este é um projeto de demonstração. Para melhorias:

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional e de demonstração.

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS**

