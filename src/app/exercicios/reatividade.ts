import { ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
class PessoaService {
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>{{ texto }}</h1> <h2>Contador: {{ contador }}</h2>`,
})
export class AppComponent implements OnInit, OnDestroy {
  texto: string = '';
  contador = 0;
  private subscription: Subscription | undefined;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.subscription = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto = `Nome: ${pessoa.nome}`;
      
      this.cdr.markForCheck();
    });

    setInterval(() => {
      this.contador++;
      this.cdr.markForCheck();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}