
🎉 PartyTime: O Seu Gestor de Festas Pessoal
PartyTime é uma aplicação Full-Stack completa construída para simplificar o planeamento e a gestão de eventos. Desde o controlo do orçamento até à gestão de serviços e ao envio de convites, o PartyTime centraliza todas as ferramentas necessárias para transformar qualquer festa num sucesso, sem o stress da desorganização.

Este projeto foi desenvolvido com uma arquitetura moderna, focada em segurança, boas práticas e uma excelente experiência de utilizador.

✨ Funcionalidades
A aplicação está dividida numa área pública (para apresentar o produto) e numa área privada para utilizadores autenticados (o Dashboard de gestão).

Gestão de Utilizadores e Autenticação:
🔐 Sistema de Autenticação Seguro: Registo e Login com senhas criptografadas (bcrypt).

🍪 Sessão baseada em JWT: Uso de JSON Web Tokens armazenados em cookies HttpOnly para proteger contra ataques XSS.

👤 Página de Perfil: Utilizadores podem visualizar, atualizar os seus dados (username, senha) e excluir a sua própria conta.

Gestão de Festas (Eventos):
➕ Criação de Festas: Formulário completo com validação no frontend (react-hook-form + zod) e backend (DTOs) para criar novas festas com título, descrição, data, hora e orçamento.

📋 Dashboard Personalizado: Painel de controlo que exibe um sumário (total de festas, orçamento gerido) e uma lista de todas as festas criadas pelo utilizador.

🔍 Página de Detalhes: Uma página completa para cada festa, que serve como central de gestão.

✏️ Edição e Exclusão: Controlo total sobre as festas criadas.

Gestão Financeira e de Serviços:
💰 Painel Financeiro Dinâmico: Na página de detalhes, um resumo em tempo real do Orçamento Total, Total Gasto e Saldo Restante.

🛠️ CRUD de Serviços: Capacidade de adicionar, editar e remover serviços (DJ, Buffet, etc.) para cada festa, com o custo a ser refletido automaticamente no painel financeiro.

Gestão de Convidados e RSVP:
🤵 Lista de Convidados: Adicione convidados a cada festa com nome e telefone.

📱 Convites via WhatsApp: Geração de um link "Click to Chat" do WhatsApp com uma mensagem de convite pré-formatada.

🔗 Sistema de RSVP com Token Único: Cada convite contém um link único e secreto para uma página pública de RSVP.

🔑 Senha de Festa (Opcional): Organizadores podem definir uma senha para a festa, que será exigida na página de RSVP.

📧 Notificação por E-mail: Quando um convidado confirma presença, o organizador da festa recebe uma notificação por e-mail (via Resend API).

🚀 Tecnologias Utilizadas
Backend:
Framework: NestJS

Linguagem: TypeScript

Base de Dados: PostgreSQL (gerido com Sequelize ORM)

Autenticação: Passport.js, JWT (@nestjs/jwt)

Validação: class-validator, class-transformer

Migrations: sequelize-cli

APIs Externas: Resend (para e-mails)

Frontend:
Framework: React com Vite

Linguagem: TypeScript

Roteamento: React Router DOM

Gestão de Formulários: React Hook Form com Zod para validação de schemas

Estilização: CSS Modules e um sistema de design global com Variáveis CSS

Cliente HTTP: Axios

Base de Dados e Serviços:
Base de Dados: Neon (PostgreSQL Serverless)

E-mails Transacionais: Resend

📁 Estrutura de Pastas
O projeto está organizado num monorepo-like, com duas pastas principais:

/PartyTime/
|
├── 📂 backend/      <-- Projeto NestJS
│   ├── src/
│   ├── .env
│   └── package.json
|
└── 📂 frontend/     <-- Projeto React/Vite
    ├── src/
    └── package.json
🏁 Começando
Siga os passos abaixo para executar o projeto localmente.

Pré-requisitos
Node.js (v18 ou superior)

npm ou yarn

Uma conta na Neon para a base de dados PostgreSQL.

Uma conta na Resend para a API de e-mail.

1. Configuração do Backend
Bash

# 1. Navegue para a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Crie o ficheiro de variáveis de ambiente
# Copie o .env.example para .env
cp .env.example .env

# 4. Preencha o ficheiro .env com as suas credenciais
# Abra o ficheiro .env e adicione os seus dados da Neon, Resend, etc.
Conteúdo do .env:

DATABASE_URL="postgres://user:password@host.neon.tech/dbname?sslmode=require"
JWT_SECRET="SEU_SEGREDO_SUPER_SECRETO_PARA_JWT"
RESEND_API_KEY="re_SUA_CHAVE_DA_API_RESEND"
ADMIN_NOTIFICATION_EMAIL="seu_email_verificado_na_resend@exemplo.com"
Bash

# 5. Configure a CLI do Sequelize
# Crie os ficheiros de configuração da CLI (se ainda não existirem).
# O .sequelizerc e o config/sequelize.config.js já devem estar no projeto.
# Garanta que o config/sequelize.config.js está a ler o .env corretamente.

# 6. Execute as migrations para criar as tabelas no banco de dados
npx sequelize-cli db:migrate

# 7. Inicie o servidor de desenvolvimento
npm run start:dev
O backend estará a rodar em http://localhost:3000.

2. Configuração do Frontend
Bash

# 1. Abra um NOVO terminal e navegue para a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
A aplicação frontend estará acessível em http://localhost:5173.

