# Billing System API

## Descrição
A **Billing System API** é uma solução backend desenvolvida para gerenciar transações e faturamento, utilizando tecnologias modernas como Node.js, Prisma e PostgreSQL. Este projeto está configurado para facilitar o deploy e a integração com o Cloudinary para gerenciamento de arquivos.

---

## Configuração do Projeto

### 1. Variáveis de Ambiente
As variáveis de ambiente são essenciais para o funcionamento correto da API. Abaixo estão as variáveis necessárias e sua descrição:

| Variável             | Descrição                                              |
|----------------------|------------------------------------------------------|
| `DATABASE_URL`       | String de conexão com o banco de dados PostgreSQL.     |
| `CORS_ORIGIN`        | Origem permitida para requisições CORS.                |
| `PORT`               | Porta onde o servidor será executado.                  |
| `JWT_SECRET_ACCESS`  | Segredo para geração de tokens de acesso (JWT).        |
| `JWT_SECRET_REFRESH` | Segredo para geração de tokens de refresh (JWT).       |
| `CLOUDINARY_CLOUD_NAME` | Nome da conta no Cloudinary.                       |
| `CLOUDINARY_API_KEY`    | Chave de API para o Cloudinary.                    |
| `CLOUDINARY_API_SECRET` | Segredo da API do Cloudinary.                      |

#### Exemplo de `.env`:
```env
DATABASE_URL="postgresql://postgres:bcbc@localhost:5432/billing-system-test?schema=public"
CORS_ORIGIN="0.0.0.0"
PORT="5500"
```

---

### 2. Pré-requisitos
Antes de iniciar o projeto, certifique-se de ter as seguintes dependências instaladas:
- **Node.js** (versão 16+)
- **npm** ou **yarn**
- **PostgreSQL**

---

### 3. Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/erivaldocazinga22/hosp-test-billing-system-api.git billing-system-api
   cd billing-system-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o arquivo `.env` com base no exemplo acima.

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

---

### 4. Executando o Projeto

#### Modo de Desenvolvimento:
```bash
npm run dev
```

#### Modo de Produção:
1. Compile o projeto:
   ```bash
   npm run build
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

A API será executada na porta especificada em `PORT` (por padrão, `5500`).

---

## Recursos Principais

- **Autenticação JWT**:
  - Tokens de acesso e refresh.
  - Duração configurável (máximo de 7 dias).

- **Integração com Cloudinary**:
  - Upload de arquivos e gerenciamento de mídia.

- **Banco de Dados**:
  - Banco relacional gerenciado pelo PostgreSQL.
  - Prisma como ORM.


## Contribuindo
Sinta-se à vontade para contribuir com melhorias, correções ou novas funcionalidades. Para começar:
1. Faça um fork do repositório.
2. Crie uma branch com sua funcionalidade/correção: `git checkout -b minha-feature`.
3. Envie um pull request.

---

## Licença
Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.
