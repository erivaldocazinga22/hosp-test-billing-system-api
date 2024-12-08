# Billing System Test Hospedagem

Um sistema básico de autenticação e teste de APIs para gerenciamento de usuários e validação de tokens.

## **Sumário**

- [Recursos](#recursos)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Uso](#uso)
  - [Rotas](#rotas)
- [Scripts](#scripts)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)

---

## **Recursos**

- Testar conectividade com a API.
- Login com email e senha.
- Validação de tokens JWT.

---

## **Pré-requisitos**

- **Node.js**: Versão 18 ou superior.
- **PostgreSQL**: Configurado com um banco de dados.
- **Prisma**: Para gerenciar o banco de dados.
- **npm** ou **yarn**: Para instalar dependências.

---

## **Configuração do Ambiente**

Configure as variáveis de ambiente no arquivo `.env`. Aqui está um exemplo:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="fdjfhjkdhfkfdjsfkjdfjd"
PORT="5500"
CORS_ORIGIN="0.0.0.0"
```

### Detalhes:

- **`DATABASE_URL`**: URL de conexão ao banco de dados PostgreSQL.
- **`JWT_SECRET`**: Chave secreta para assinar tokens JWT.
- **`PORT`**: Porta em que o servidor será executado.
- **`CORS_ORIGIN`**: Configuração de origem para requisições CORS.

---

## **Instalação**

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/billing-system-test-hosp.git
   cd billing-system-test-hosp
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados e gere os modelos Prisma:

   ```bash
   npx prisma generate
   ```

4. Aplique as migrações ao banco de dados:

   ```bash
   npx prisma migrate dev
   ```

---

## **Uso**

### Iniciar o Servidor

Para rodar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

Para rodar em produção:

```bash
npm run build
npm start
```

---

### **Rotas**

#### **1. Home**

- **Método:** `GET`
- **Endpoint:** `/`
- **Descrição:** Verifica se a API está funcional.
- **Resposta:**

  ```json
  {
    "message": "API is running!"
  }
  ```

#### **2. Login**

- **Método:** `POST`
- **Endpoint:** `/login`
- **Descrição:** Realiza login enviando email e senha.
- **Corpo da Requisição:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Resposta:**

  ```json
  {
    "message": "Mensagem",
    "status": 200,
    "data": {
        "token": "Bearer <jwt_token>"
    }
  }
  ```

#### **3. Validate Token**

- **Método:** `POST`
- **Endpoint:** `/validate`
- **Descrição:** Valida um token JWT.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```

---

## **Scripts**

- **`start:dev`**: Inicia o servidor em modo de desenvolvimento com hot-reload.
- **`build`**: Compila o código TypeScript para JavaScript.
- **`start`**: Inicia o servidor em produção.
- **`prisma:migrate`**: Aplica migrações ao banco de dados.
- **`prisma:generate`**: Gera os clientes Prisma.

---

## **Tecnologias Utilizadas**

- **Node.js**: Plataforma de execução do backend.
- **Express**: Framework para criação de servidores HTTP.
- **Prisma**: ORM para gerenciamento do banco de dados.
- **JWT**: Autenticação baseada em tokens.
- **TypeScript**: Para tipagem estática no desenvolvimento.
- **Zod**: Validação de dados.

---

## **Licença**

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.