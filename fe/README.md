# MyContacts Frontend

O **MyContacts** é um aplicativo para gerenciamento de contatos, desenvolvido com React e estilizado com Styled Components. Ele permite que você organize e gerencie seus contatos de forma eficiente.

## Funcionalidades

-   **Adicionar Contatos:** Crie novos contatos com nome, e-mail e telefone.
-   **Editar Contatos:** Modifique os detalhes de contatos existentes.
-   **Excluir Contatos:** Remova contatos que não são mais necessários.
-   **Validação de Campos:** Garante que os campos de nome e e-mail sejam preenchidos corretamente.
-   **Interface Responsiva:** Adapta-se a diferentes tamanhos de tela para uma melhor experiência do usuário.

## Instalação

Siga estas etapas para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**

    ```bash
    git clone <URL do repositório>
    cd my-contacts-frontend
    ```
2.  **Instale as dependências:**

    ```bash
    yarn install
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `yarn start`

Inicia o aplicativo em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

### `yarn build`

Cria uma versão otimizada para produção na pasta `build`.

### `yarn test`

Executa os testes no modo interativo.

### `yarn lint`

Executa o ESLint para verificar a qualidade do código.

## Tecnologias Utilizadas

-   **React**: Biblioteca para construção de interfaces de usuário.
-   **React Router DOM**: Para gerenciamento de rotas no aplicativo.
-   **Styled Components**: Para estilização com CSS-in-JS.
-   **ESLint**: Linter para manter a qualidade e consistência do código.

## API

O frontend interage com a seguinte API:

-   **URL Base:** `http://localhost:3001` (exemplo)
-   **Endpoints:**
    -   `GET /contacts`: Lista todos os contatos.
    -   `POST /contacts`: Adiciona um novo contato.
    -   `PUT /contacts/:id`: Atualiza um contato existente.
    -   `DELETE /contacts/:id`: Exclui um contato.

## Contribuição

Contribuições são sempre bem-vindas! Se você deseja contribuir, siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma branch para sua feature ou correção de bug: `git checkout -b minha-feature`
3.  Faça as alterações e commit: `git commit -m "Adiciona minha feature"`
4.  Envie para o seu fork: `git push origin minha-feature`
5.  Crie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
