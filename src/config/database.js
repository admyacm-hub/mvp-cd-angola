const { Pool } = require('pg');
const logger = require('./logger');

// Em modo demo sem DATABASE_URL, usar pool "lazy" que não bloqueia o arranque
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/sdvm_angola',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

pool.on('error', (err) => {
  logger.error('Erro inesperado no PostgreSQL', err.message);
});

module.exports = { pool };
