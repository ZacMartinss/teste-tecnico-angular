import { Component, signal, computed, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

@Component({
  selector: 'app-carrinho-signals',
  standalone: true,

  imports: [CommonModule], 
  template: `
    <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
      <h3>🛒 Carrinho de Compras (Signals)</h3>
      
      <ul>
        @for (item of itens(); track item.id) {
          <li style="margin-bottom: 8px;">
            {{ item.nome }} - {{ item.preco | currency:'BRL' }} 
            <button (click)="remover(item.id)" style="margin-left: 10px;">Remover</button>
          </li>
        } @empty {
          <li>O carrinho está vazio.</li>
        }
      </ul>

      <hr>
      <strong>Total do Carrinho: {{ total() | currency:'BRL' }}</strong>
      <br><br>
      <button (click)="adicionar('Produto Exemplo', 49.90)">
        Adicionar Item Teste (R$ 49,90)
      </button>
    </div>
  `
})
export class CarrinhoSignalsComponent {

  itens = signal<ItemCarrinho[]>([]);

  total = computed(() => 
    this.itens().reduce((acc, item) => acc + (item.quantidade * item.preco), 0)
  );
  totalAlterado = output<number>();
  
  constructor() {
    effect(() => {
      this.totalAlterado.emit(this.total());
    });
  }

  adicionar(nome: string, preco: number) {
    const novoItem: ItemCarrinho = {
      id: Date.now(),
      nome,
      quantidade: 1,
      preco
    };
    this.itens.update(lista => [...lista, novoItem]);
  }

  remover(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));
  }
}