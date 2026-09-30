describe('SDVM Angola - Smoke Test', () => {
  test('Node.js >= 20', () => {
    const major = parseInt(process.version.slice(1).split('.')[0], 10);
    expect(major).toBeGreaterThanOrEqual(20);
  });

  test('Dependências principais carregam', () => {
    expect(() => require('express')).not.toThrow();
    expect(() => require('pg')).not.toThrow();
    expect(() => require('jsonwebtoken')).not.toThrow();
  });

  test('server.js é sintaticamente válido', () => {
    expect(() => require('../src/server')).not.toThrow();
  });
});
