# Respostas do Teste Técnico - Angular

## 2.1. Change Detection e OnPush

### Identificação do Problema
O componente não reflete as atualizações das variáveis `texto` e `contador` na interface do usuário, apesar de os valores estarem sendo alterados logicamente no código.

### Motivo
Ao utilizar a estratégia `ChangeDetectionStrategy.OnPush`, o Angular desativa a verificação automática de mudanças para economizar performance. Nesse modo, o componente só é atualizado quando:
1. Uma propriedade `@Input` é alterada.
2. Um evento disparado pelo próprio componente (ex: clique) ocorre.
3. A detecção de mudanças é solicitada manualmente.

No código original, tanto o `subscribe` do RxJS quanto o `setInterval` são operações assíncronas que ocorrem fora do fluxo que o `OnPush` monitora automaticamente. Por isso, o Angular não "percebe" que deve renderizar a tela novamente.

### Correção Proposta
A correção aplicada foi a injeção do serviço `ChangeDetectorRef`. Dentro do `subscribe` e do `setInterval`, utilizei o método `this.cdr.markForCheck()`. 

Esse método avisa explicitamente ao Angular que o componente e seus ancestrais precisam ser verificados na próxima rodada de detecção de mudanças, garantindo que o novo valor de `texto` e o incremento do `contador` apareçam na tela sem precisar abrir mão da performance do `OnPush`.