# News-API
Esta é uma API para gerenciamento de usuários e notícias, onde os usuários podem se cadastrar, fazer login, deletar suas contas e cadastrar notícias. Além disso, é possível obter todas as notícias cadastradas por um determinado usuário.

### Pré-requisitos
1. Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, clone este repositório e instale as dependências:
```bash
git clone https://github.com/diazzqlz/news.git
cd news
npm install
```
2. Configure o MongoDB Atlas:
* Crie uma conta gratuita no MongoDB Atlas.
* Crie um novo cluster e siga as instruções para configurar o cluster.
* Obtenha a string de conexão do seu cluster no MongoDB Atlas e conecte através da extensão MongoDB for VSCode.

### Execução
```bash
npm run dev
```
O servidor será iniciado em `http://localhost:3333`.

## Rotas
### Autenticação
* **POST /login:** Rota para autenticar um usuário. Requer um corpo JSON com as credenciais do usuário (email e senha) e retorna um token JWT válido.

### Usuários
* **POST /register:** Rota para registrar um novo usuário. Requer um corpo JSON com o nome, email e senha do usuário.
* **DELETE /users/:userId:** Rota para excluir um usuário existente. Requer autenticação JWT.
* **POST /news/:userId:** Rota para cadastrar uma nova notícia. Requer autenticação JWT e o corpo da solicitação deve incluir o título e o conteúdo da notícia.
* **GET /news/:userId:** Rota para obter todas as notícias cadastradas por um determinado usuário. Não requer autenticação.
