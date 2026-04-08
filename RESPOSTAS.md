# Respostas do Teste Técnico - Desenvolvedor Front End Angular

Este documento detalha as decisões técnicas e justificativas para as soluções implementadas neste teste. O foco principal foi aplicar os recursos modernos do Angular 17+ e manter a qualidade de código (Clean Code).

---

## 1. TypeScript e Qualidade de Código

### 1.1. Refatoração
No exercício de refatoração da classe `Verdureira`, apliquei as seguintes melhorias:
* **Tipagem Forte:** Substituí o uso de `any` por uma interface `IProduto`, garantindo segurança de tipos e melhor autocomplete.
* **Substituição de Loops Imperativos:** Troquei o `for` manual pelo método `.find()` do Array, que é mais legível e semântico.
* **Princípio DRY (Don't Repeat Yourself):** Criei o método privado `obterPorId` para centralizar a lógica de busca, evitando repetição de código nos métodos de descrição e estoque.
* **Template Literals:** Utilizei interpolação de strings (crases) para tornar a concatenação de dados mais limpa.

### 1.2. Generics e Tipos Utilitários
Implementei a função `filtrarEPaginar<T>` utilizando Generics para que ela seja totalmente reutilizável, independente do modelo de dados (Usuários, Produtos, etc).
* A lógica separa a filtragem da extração do "pedaço" da página (`slice`), garantindo que o total de registros retornado seja referente à lista filtrada e não à lista original.

---

## 2. Angular — Fundamentos e Reatividade

### 2.1. Change Detection e OnPush
**Problema identificado:** O Angular não atualizava a tela porque, no modo `OnPush`, ele ignora mudanças ocorridas dentro de processos assíncronos (como `subscribe` e `setInterval`) que não foram disparados por eventos diretos de UI.

**Solução:** Injetamos o `ChangeDetectorRef` e utilizamos o método `markForCheck()`. Isso avisa ao Angular que, embora a estratégia seja de alta performance, aquele componente específico precisa ser verificado na próxima rodada de renderização.

### 2.2. RxJS — Eliminando subscriptions aninhadas
**Escolha do operador:** Optei pelo `switchMap`. 
* **Motivo:** Ele resolve o problema de dependência (precisar do ID da pessoa para buscar os familiares) de forma linear, eliminando o "callback hell" de vários `.subscribe()`. 
* Além disso, o `switchMap` cancela automaticamente a requisição anterior caso uma nova seja disparada, o que previne *memory leaks* e problemas de concorrência (*race conditions*).

### 2.3. RxJS — Busca com debounce
Para o campo de busca, implementei um fluxo reativo com os seguintes operadores:
* `debounceTime(500)`: Aguarda o usuário parar de digitar por meio segundo antes de enviar a requisição, economizando recursos do servidor.
* `distinctUntilChanged()`: Impede que buscas idênticas sejam feitas seguidamente (ex: se o usuário apagar uma letra e digitar a mesma logo em seguida).
* `tap()`: Utilizado para gerenciar o estado de `loading` de forma transparente durante o fluxo.

### 2.4. Performance — OnPush e trackBy
* **trackBy:** Em listas grandes, o `trackBy` é essencial pois permite que o Angular identifique cada item de forma única (pelo ID). Sem isso, qualquer mudança na lista faria o DOM recriar todos os elementos; com o `trackBy`, apenas o item alterado é renderizado novamente.
* **OnPush:** Reduz drasticamente a carga de processamento, pois o Angular deixa de realizar a "verificação suja" (*dirty checking*) em toda a árvore de componentes a cada ciclo de vida, focando apenas onde os dados realmente mudaram via `@Input` ou eventos manuais.
* **Estratégia Default:** O impacto de usar a estratégia padrão em listas imensas é a perda de fluidez na interface (quedas de FPS), já que o navegador ficaria sobrecarregado tentando validar centenas de itens desnecessariamente.

---