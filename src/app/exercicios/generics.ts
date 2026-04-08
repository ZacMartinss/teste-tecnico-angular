export interface PaginaParams {
  pagina: number;
  tamanho: number;
}

export interface Pagina<T> {
  itens: T[];
  total: number;
}

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {
  
  const filtrados = data.filter(filterFn);
  
  const p = params.pagina > 0 ? params.pagina - 1 : 0;
  const inicio = p * params.tamanho;
  const fim = inicio + params.tamanho;
  
  return {
    itens: filtrados.slice(inicio, fim),
    total: filtrados.length
  };
}

interface Usuario {
  id: number;
  nome: string;
}

const listaUsuarios: Usuario[] = [
  { id: 1, nome: 'Isaac' },
  { id: 2, nome: 'Ana' },
  { id: 3, nome: 'Bia' },
  { id: 4, nome: 'Caio' },
  { id: 5, nome: 'Amanda' }
];

const resultado = filtrarEPaginar<Usuario>(
  listaUsuarios,
  (u) => u.nome.toLowerCase().includes('a'),
  { pagina: 1, tamanho: 2 }
);