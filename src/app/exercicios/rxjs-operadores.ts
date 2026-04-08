import { Component, OnInit, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, switchMap, map } from 'rxjs/operators';

interface Pessoa {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
class PessoaService {
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }

  buscarQuantidadeFamiliares(id: number) {
    return of(3).pipe(delay(300));
  }
}

@Component({
  selector: 'app-rxjs-operadores',
  standalone: true,
  template: `<div>{{ texto }}</div>`
})
export class RxjsExercicioComponent implements OnInit {
  texto = '';

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    const pessoaId = 1;

    this.pessoaService.buscarPorId(pessoaId).pipe(
    
      switchMap((pessoa: Pessoa) => 
        this.pessoaService.buscarQuantidadeFamiliares(pessoa.id).pipe(
        
          map(qtd => ({ nome: pessoa.nome, qtd }))
        )
      )
    ).subscribe({
    
      next: (dados) => {
        this.texto = `Nome: ${dados.nome} | familiares: ${dados.qtd}`;
      },
      error: (err: unknown) => {
        console.error('Erro na busca:', err);
      }
    });
  }
}