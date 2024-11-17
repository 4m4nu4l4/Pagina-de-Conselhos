# Página de Conselhos 💡

Este projeto consiste em uma aplicação web que oferece conselhos aleatórios aos usuários de forma simples e rápida. Desenvolvida com React no frontend e Node.js no backend, segue o padrão de arquitetura MVC (Model-View-Controller) para uma melhor organização e manutenção do código.

---

## 📋 Descrição

A **Página de Conselhos** é uma aplicação de conselhos online que consome a API [Advice Slip](https://api.adviceslip.com/), exibindo um conselho novo a cada solicitação. O objetivo é fornecer um espaço de apoio e orientação com a possibilidade de gerenciar conselhos e perfis. Para acessar a aplicação, **é necessário realizar cadastro e login**, garantindo maior controle sobre os recursos oferecidos.

---

## 🚀 Funcionalidades

- **Exibição de conselhos aleatórios** através de integração com a API Advice Slip.
- **Atualização dinâmica** de conselhos com apenas um clique.
- **Cadastro e login obrigatórios**:
  - O sistema exige que os usuários realizem o cadastro para acessar a aplicação.
  - Apenas usuários autenticados podem utilizar as funcionalidades disponíveis.
- **Cadastro e gestão de usuários**:
  - Apenas os seguintes e-mails cadastrados na aplicação recebem automaticamente privilégios de administrador:
    - **admin@alunos.sc.senac.br**
    - **emanuele.pries@alunos.sc.senac.br**
    - **maria.benevenutti@alunos.sc.senac.br**
  - Caso seja necessário atribuir privilégios de administrador a outro usuário, isso poderá ser feito na tela de **Gestão de Usuários**.
- **Gerenciamento de acesso à aplicação**:
  - Administradores podem **bloquear e desbloquear o acesso** de qualquer usuário.
- **Tela de perfil**:
  - Os usuários podem acessar e editar seus dados pessoais através de uma interface dedicada.
- **Criação, alteração e exclusão de conselhos**:
  - Existe uma tela específica para criação de conselhos.
  - Somente **usuários administradores** têm permissão para **alterar ou excluir conselhos existentes**.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: 
  - [React](https://reactjs.org/): Para construção da interface do usuário.
  - **CSS3**: Para estilização e layout da página.
  
- **Backend**: 
  - [Node.js](https://nodejs.org/): Para o servidor e integração com o frontend.
  - [Express](https://expressjs.com/): Framework web para Node.js.
  - **Fetch API**: Para consumo da Advice Slip API.

- **Arquitetura**:
  - **MVC (Model-View-Controller)**: O projeto segue este padrão para manter a separação de responsabilidades e facilitar a organização do código.

---

## 📦 Como Clonar e Executar o Projeto Localmente

### 1. Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

### 2. Clonar o repositório

```bash
git clone https://github.com/4m4nu4l4/Pagina-de-Conselhos.git
```

### 3. Instalar dependências

Navegue até o diretório do projeto e instale as dependências tanto para o backend quanto para o frontend:

```bash
cd Pagina-de-Conselhos
npm install
```

### 4. Executar o projeto

Inicie o servidor backend:

```bash
npm run dev
```

Inicie o frontend React:

```bash
npm run dev
```

---

## 🌐 API Utilizada

- **Advice Slip API**: [https://api.adviceslip.com](https://api.adviceslip.com) para fornecer conselhos aleatórios.

---

## 📂 Estrutura do Projeto

A estrutura do projeto foi organizada seguindo o padrão MVC:

```
/backend
│
├── /controllers   # Lógica dos controladores da aplicação
├── /api           # Lógica da API (recebimento de requisições) da aplicação
├── /models        # Modelos do banco de dados
├── /routes        # Definição das rotas da aplicação
└── server.js      # Ponto de entrada para o backend

/frontend
│
├── /api           # Rotas do frontend para o backend 
├── /components    # Componentes React
├── /pages         # Páginas e views
├── /routes        # Privatização de rotas
└── index.js       # Ponto de entrada para o React
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

## WishDaily ✨

O **WishDaily** é uma aplicação web projetada para ajudar os usuários a registrar e acompanhar seus conselhos e desejos diários. Com uma interface amigável e recursos poderosos, o sistema permite leitura de conselhos mensais, diários, aleatórios e a criação dos seus próprios conselhos.

###### Desenvolvido por **Emanuele** e **Maria Edª**.