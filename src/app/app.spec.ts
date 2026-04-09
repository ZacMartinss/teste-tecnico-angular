import { describe, it, expect } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('deve existir o componente raiz', () => {
    const app = new AppComponent();
    expect(app).toBeTruthy();
  });
});