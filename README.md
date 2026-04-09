# 🚀 Teste Técnico - Gestão de Usuários com Angular

Este projeto é um sistema de gerenciamento de usuários desenvolvido como parte de um desafio técnico. O foco principal foi a criação de uma interface funcional utilizando **Angular 17** e a garantia de qualidade através de testes unitários com **Vitest**.

## 🛠️ Tecnologias Utilizadas

* **Angular 17** (Standalone Components)
* **Angular Material** (UI Components)
* **Vitest** (Framework de Testes)
* **v8** (Ferramenta de Cobertura de Código)
* **SASS** (Estilização)

## 📦 Como Rodar o Projeto

1.  **Clonar o repositório:**
    ```
    git clone [https://github.com/ZacMartinss/teste-tecnico-angular.git]
    ```
2.  **Instalar as dependências:**
    ```
    npm install
    ```
3.  **Executar a aplicação:**
    ```
    ng serve
    ```
    Acesse: `http://localhost:4200/`

## 🧪 Testes e Cobertura

Para este desafio, foi implementada uma suíte de testes unitários focada na lógica de serviços e componentes principais, garantindo a estabilidade das funcionalidades de listagem, adição e remoção de usuários.

Para rodar os testes e visualizar o relatório de cobertura:

npx vitest run --coverage
```

Nota: O projeto atingiu a meta de cobertura de código acima de 60%, conforme solicitado nos requisitos do desafio.

Decisões Técnicas
Vitest: Optado em substituição ao Karma/Jasmine por oferecer uma execução mais performática e uma configuração mais moderna para ambientes de CI/CD.

Serviços (Core): A lógica de estado dos usuários foi centralizada no UserService, utilizando BehaviorSubject para garantir a reatividade dos dados entre os componentes.

Componentes Standalone: Utilizada a arquitetura moderna do Angular para reduzir o boilerplate e melhorar a árvore de dependências do projeto.

Desenvolvido por Isaac Martins - 2026