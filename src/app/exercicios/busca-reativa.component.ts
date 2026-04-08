import { Component, Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, tap, startWith } from 'rxjs/operators';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
class BuscaService {
  buscar(termo: string): Observable<string[]> {
    const resultados = ['Angular', 'RxJS', 'Signals', 'TypeScript'].filter(item => 
      item.toLowerCase().includes(termo.toLowerCase())
    );
    return of(resultados).pipe(delay(500));
  }
}

@Component({
  selector: 'app-busca-reativa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div style="padding: 20px;">
      <input [formControl]="searchControl" placeholder="Digite para buscar..." 
             style="padding: 8px; width: 250px;">
      
      <div *ngIf="loading" style="margin-top: 10px; color: blue;">Buscando resultados...</div>

      <ul *ngIf="!loading">
        <li *ngFor="let item of resultados$ | async">{{ item }}</li>
      </ul>
    </div>
  `
})
export class BuscaReativaComponent {
  searchControl = new FormControl('', { nonNullable: true });
  resultados$: Observable<string[]>;
  loading = false;

  constructor(private readonly buscaService: BuscaService) {
    this.resultados$ = this.searchControl.valueChanges.pipe(
      startWith(''), 
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loading = true), 
      switchMap(termo => {
    
        if (!termo.trim()) {
          this.loading = false;
          return of([]);
        }
        return this.buscaService.buscar(termo).pipe(
          tap(() => this.loading = false)
        );
      })
    );
  }
}