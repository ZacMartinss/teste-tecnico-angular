import { Injectable } from '@angular/core';
import { createAction, createReducer, on, props, createSelector, createFeatureSelector } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';

// --- INTERFACE ---
export interface Todo {
  id: number;
  tarefa: string;
  concluida: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// --- ACTIONS ---
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Success', props<{ todos: Todo[] }>());
export const loadTodosError = createAction('[Todo] Load Error', props<{ error: string }>());
export const toggleTodoComplete = createAction('[Todo] Toggle Complete', props<{ id: number }>());

// --- REDUCER ---
const initialState: TodoState = { todos: [], loading: false, error: null };

export const todoReducer = createReducer(
  initialState,
  on(loadTodos, state => ({ ...state, loading: true })),
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
  on(loadTodosError, (state, { error }) => ({ ...state, error, loading: false })),
  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
  }))
);

// --- SELECTORS ---
const selectTodoFeature = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(selectTodoFeature, state => state.todos);
export const selectPendingTodos = createSelector(selectAllTodos, todos => 
  todos.filter(t => !t.concluida)
);

// --- EFFECTS ---
@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodos),
    switchMap(() => {
      // Simulando chamada HTTP
      return of([
        { id: 1, tarefa: 'Estudar Angular', concluida: false },
        { id: 2, tarefa: 'Fazer o teste técnico', concluida: true }
      ]).pipe(
        delay(1000),
        map(todos => loadTodosSuccess({ todos })),
        catchError(err => of(loadTodosError({ error: err.message })))
      );
    })
  ));

  constructor(private actions$: Actions) {}
}