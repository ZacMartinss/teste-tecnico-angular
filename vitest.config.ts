import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'], // Aqui a gente avisa o Vitest para ler seu arquivo de setup!
  },
});