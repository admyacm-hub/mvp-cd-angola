/**
 * SDVM Angola - Servidor Principal (versão CI-friendly)
 * Arranca mesmo sem PostgreSQL/Redis disponíveis — em modo demo degradado.
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./config/logger');
const eventBus = require('./events/eventBus');
const demoRoutes = require('./modules/demo/demo.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined', { stream: logger.stream }));

// ============ Health ============
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'sdvm-angola-mvp',
    env: process.env.NODE_ENV || 'development',
    demo_mode: process.env.DEMO_MODE === 'true',
    timestamp: new Date().toISOString()
  });
});

// ============ Demo scenarios ============
app.use('/api/demo', demoRoutes);

// ============ Placeholder endpoints (para o frontend não dar 404) ============
app.get('/api/trading/quotes', (req, res) => {
  res.json({
    quotes: [
      { ticker: 'BAI',  bid: 18495, ask: 18505, last: 18500, change: 120, changePct: 0.65, high: 18600, low: 18300, volume: 12500 },
      { ticker: 'BFA',  bid: 12295, ask: 12305, last: 12300, change: -50, changePct: -0.40, high: 12400, low: 12200, volume: 8300 },
      { ticker: 'BCGA', bid: 9695,  ask: 9705,  last: 9700,  change: 200, changePct: 2.10, high: 9750, low: 9500, volume: 4200 },
      { ticker: 'ENSA', bid: 7195,  ask: 7205,  last: 7200,  change: 60, changePct: 0.84, high: 7250, low: 7100, volume: 2100 }
    ]
  });
});

app.get('/api/trading/candles/:ticker', (req, res) => {
  const now = Date.now();
  const candles = Array.from({ length: 100 }, (_, i) => {
    const base = 18500 + Math.sin(i / 5) * 200 + (Math.random() - 0.5) * 100;
    return {
      time: now - (100 - i) * 60_000,
      open: base, high: base + 50, low: base - 50,
      close: base + (Math.random() - 0.5) * 30,
      volume: Math.floor(Math.random() * 5000)
    };
  });
  res.json({ ticker: req.params.ticker, tf: req.query.tf || '1m', candles });
});

// ============ Error handler ============
app.use(require('./middlewares/errorHandler'));

// ============ Bootstrap ============
const server = app.listen(PORT, () => {
  logger.info(`🚀 SDVM Angola API a correr em http://localhost:${PORT}`);
  logger.info(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🎬 Demo mode: ${process.env.DEMO_MODE === 'true' ? 'ON' : 'OFF'}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM — a encerrar...');
  server.close(() => process.exit(0));
});

module.exports = app;
