# Painel de Cotações de Moedas e Ações

## Visão Geral

Este projeto é uma aplicação web que fornece cotações em tempo real de moedas e ações. Os usuários podem visualizar informações detalhadas sobre taxas de câmbio e preços de ações, incluindo dados históricos apresentados em um gráfico interativo. A aplicação também inclui autenticação de usuários, permitindo que eles façam login e logout.

## Funcionalidades

- **Cotações em Tempo Real:** Busca e exibe cotações atualizadas de moedas e ações.
- **Gráficos Interativos:** Visualiza dados históricos usando gráficos de linha responsivos.
- **Autenticação de Usuários:** Funcionalidade segura de login e logout.
- **Design Responsivo:** Otimizado para dispositivos desktop e mobile.

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) - Framework React para aplicações renderizadas no servidor.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário para estilização.
  - [Recharts](https://recharts.org/) - Biblioteca para criação de gráficos interativos.
  - [Redux Toolkit](https://redux-toolkit.js.org/) - Gerenciamento de estado para aplicações React.
- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Funções serverless para lógica de backend.
- **Autenticação:**
  - [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Para armazenar dados de sessão do usuário.
- **Ferramentas de Desenvolvimento:**
  - [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript.
  - [ESLint](https://eslint.org/) - Linting de código para consistência.
  - [Prettier](https://prettier.io/) - Formatação de código.

## Como Executar o Projeto

1. **Clone o Repositório:**

```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
```

2. **Instale as dependências:**

```bash
 npm install
```

3. **Inicie o Servidor de Desenvolvimento:**

```bash
 npm run dev
```

4. **Acesse a Aplicação:**

Abra <http://localhost:3000> no seu navegador.

## Estrutura do Projeto

/app - Páginas principais e rotas da aplicação.

/components - Componentes reutilizáveis em React.

/lib - Store do Redux, hooks e funções utilitárias.

/public - Arquivos estáticos como imagens e fontes.

/styles - Estilos globais e específicos para componentes.
