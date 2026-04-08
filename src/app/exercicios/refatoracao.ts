/**
 * DESAFIO 1: Refatoração e Qualidade de Código*/

interface Produto {
  id: number;
  descricao: string;
  quantidadeEstoque: number;
}

export class Verdureira {
  private readonly produtos: Produto[];

  constructor() {
    this.produtos = [
      { id: 1, descricao: 'Maçã', quantidadeEstoque: 20 },
      { id: 2, descricao: 'Laranja', quantidadeEstoque: 0 },
      { id: 3, descricao: 'Limão', quantidadeEstoque: 20 }
    ];
  }

  private localizarProduto(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.localizarProduto(produtoId);

    if (!produto) {
      return 'Produto não encontrado.';
    }

    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    const produto = this.localizarProduto(produtoId);

    return !!produto && produto.quantidadeEstoque > 0;
  }
}