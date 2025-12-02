# 📋 Lista de Tarefas CLI

Bem-vindo ao **Lista de Tarefas CLI**, um gerenciador de tarefas interativo e elegante executado diretamente no seu terminal. Este projeto demonstra o poder do Node.js para criar ferramentas de linha de comando modernas e funcionais.

## ✨ Funcionalidades

O projeto oferece um conjunto completo de funcionalidades para gerenciamento de tarefas:

*   **📝 Criação de Tarefas**: Adicione novas tarefas com nome e descrição.
*   **👀 Listagem Visual**: Visualize suas tarefas com indicadores de status coloridos.
*   **✏️ Atualização Completa**:
    *   Edite o nome e a descrição.
    *   Altere o status (*Em andamento*, *Concluída*, *Cancelada*).
*   **🗑️ Exclusão**: Remova tarefas que não são mais necessárias.
*   **💾 Persistência de Dados**: Suas tarefas são salvas automaticamente em um arquivo JSON, garantindo que nada seja perdido ao fechar o programa.

## 🛠️ Tecnologias e Técnicas Abordadas

Este projeto foi construído utilizando práticas modernas de desenvolvimento Node.js:

*   **Node.js**: Plataforma de execução.
*   **Modularização (ES Modules)**: O código é organizado em módulos (`import`/`export`) para melhor manutenção e separação de responsabilidades:
    *   `src/manager`: Lógica de negócios e persistência de dados.
    *   `src/menus`: Interface do usuário e fluxos de interação.
*   **File System (fs)**: Utilização do módulo nativo `fs` para leitura e escrita síncrona de arquivos JSON, simulando um banco de dados local.
*   **CLI UX Moderno**: Uso da biblioteca [`@clack/prompts`](https://www.npmjs.com/package/@clack/prompts) para criar menus, inputs e feedbacks visuais intuitivos (spinners, seletores, etc.).
*   **Estilização**: Uso do [`chalk`](https://www.npmjs.com/package/chalk) para adicionar cores e estilos ao terminal, melhorando a legibilidade e a experiência do usuário.

## 🚀 Como Executar

1.  **Clone o repositório** (ou baixe os arquivos).
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Execute a aplicação**:
    ```bash
    node src/index.js
    ```
    *(Ou use `npm start` se houver um script configurado no package.json)*

## 📂 Estrutura do Projeto

```
src/
├── manager/
│   └── tasks.js      # Gerenciador de estado e persistência (CRUD)
├── menus/
│   ├── create.js     # Menu de criação
│   ├── list.js       # Menu de listagem
│   ├── main.js       # Menu principal
│   └── update.js     # Menu de atualização/detalhes
└── index.js          # Ponto de entrada da aplicação
tasks.json            # Arquivo de armazenamento (gerado automaticamente)
```

---
Desenvolvido com 💜 e Node.js.