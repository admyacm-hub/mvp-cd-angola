require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('combined'));

// Health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'sdvm-angola-mvp',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Demo scenarios
const SCENARIOS = {
  'retail-buy-bai':      () => ({ scenario: 'retail-buy-bai',      status: 'executed',  ticker: 'BAI', qty: 10 }),
  'deposit-multicaixa':  () => ({ scenario: 'deposit-multicaixa',  status: 'confirmed', amount: 50000 }),
  'open-custody':        () => ({ scenario: 'open-custody',        status: 'opened',    nrc: `AO-SDVM-2025-${Math.floor(Math.random()*99999).toString().padStart(5,'0')}` }),
  'market-spike':        () => ({ scenario: 'market-spike',        status: 'triggered' }),
  'cross-trade':         () => ({ scenario: 'cross-trade',         status: 'matched',   qty: 50, price: 18500 })
};

app.get('/api/demo/scenarios', (req, res) => res.json({ scenarios: Object.keys(SCENARIOS) }));
app.post('/api/demo/run/:name', (req, res) => {
  const fn = SCENARIOS[req.params.name];
  if (!fn) return res.status(404).json({ error: 'Cenário não encontrado', available: Object.keys(SCENARIOS) });
  res.json({ ok: true, ...fn() });
});

// Quotes (mock estático — suficiente para o frontend não dar 404)
app.get('/api/trading/quotes', (req, res) => {
  res.json({ quotes: [
    { ticker: 'BAI',  bid: 18495, ask: 18505, last: 18500, change: 120,  changePct: 0.65,  high: 18600, low: 18300, volume: 12500 },
    { ticker: 'BFA',  bid: 12295, ask: 12305, last: 12300, change: -50,  changePct: -0.40, high: 12400, low: 12200, volume: 8300  },
    { ticker: 'BCGA', bid: 9695,  ask: 9705,  last: 9700,  change: 200,  changePct: 2.10,  high: 9750,  low: 9500,  volume: 4200  },
    { ticker: 'ENSA', bid: 7195,  ask: 7205,  last: 7200,  change: 60,   changePct: 0.84,  high: 7250,  low: 7100,  volume: 2100  }
  ]});
});

// Candles (mock estático)
app.get('/api/trading/candles/:ticker', (req, res) => {
  const now = Date.now();
  const candles = Array.from({ length: 100 }, (_, i) => {
    const base = 18500 + Math.sin(i / 5) * 200 + (Math.random() - 0.5) * 100;
    return {
      time: now - (100 - i) * 60000,
      open: base, high: base + 50, low: base - 50,
      close: base + (Math.random() - 0.5) * 30,
      volume: Math.floor(Math.random() * 5000)
    };
  });
  res.json({ ticker: req.params.ticker, tf: req.query.tf || '1m', candles });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Erro interno' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 SDVM Angola API em http://localhost:${PORT}`);
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));

module.exports = app;
