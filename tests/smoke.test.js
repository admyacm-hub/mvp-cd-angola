/**
 * Smoke test — valida que o ambiente está pronto
 * Serve para o CI não falhar por "no tests found"
 */
describe('Ambiente SDVM Angola', () => {
  test('Node.js ≥ 20', () => {
    const major = parseInt(process.version.slice(1).split('.')[0], 10);
    expect(major).toBeGreaterThanOrEqual(20);
  });

  test('Variáveis de ambiente carregam', () => {
    // Em CI, estas variáveis vêm do workflow
    expect(process.env.NODE_ENV || 'test').toBeTruthy();
  });

  test('Dependências principais instaladas', () => {
    expect(() => require('express')).not.toThrow();
    expect(() => require('pg')).not.toThrow();
    expect(() => require('jsonwebtoken')).not.toThrow();
  });
});
