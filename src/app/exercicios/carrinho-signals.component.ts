import { Component, signal, computed, effect, output } from '@angular/core';

interface ItemCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

@Component({
  selector: 'app-carrinho-signals',
  standalone: true,
  template: `
    <h3>Carrinho de Compras (Signals)</h3>
    <ul>
      @for (item of itens(); track item.id) {
        <li>
          {{ item.nome }} - {{ item.preco | currency:'BRL' }} 
          <button (click)="remover(item.id)">Remover</button>
        </li>
      }
    </ul>
    <strong>Total: {{ total() | currency:'BRL' }}</strong>
    <br>
    <button (click)="adicionar('Novo Item', 50)">Adicionar Item (R$ 50)</button>
  `
})
export class CarrinhoSignalsComponent {
  // 1. Signal para a lista de itens
  itens = signal<ItemCarrinho[]>([]);

  // 2. Computed para o total (calculado automaticamente)
  total = computed(() => 
    this.itens().reduce((acc, item) => acc + (item.quantidade * item.preco), 0)
  );

  // 3. Novo output() do Angular 17+
  totalAlterado = output<number>();

  constructor() {
    // 4. Effect que avisa quando o total mudar
    effect(() => {
      this.totalAlterado.emit(this.total());
    });
  }

  adicionar(nome: string, preco: number) {
    this.itens.update(lista => [
      ...lista, 
      { id: Date.now(), nome, quantidade: 1, preco }
    ]);
  }

  remover(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));
  }
}