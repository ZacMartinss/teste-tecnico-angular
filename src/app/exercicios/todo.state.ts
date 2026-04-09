import { inject, Injectable } from '@angular/core';
import { createAction, props, createReducer, on } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: any[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());

export interface TodoState {
  todos: any[];
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(loadTodosFailure, (state, { error }) => ({ ...state, error }))
);

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() => of([{ id: 1, title: 'NgRx configurado com sucesso' }]).pipe(
        map(todos => loadTodosSuccess({ todos })),
        catchError(error => of(loadTodosFailure({ error: error.message })))
      ))
    )
  );
}