const eventBus = require('../../events/eventBus');
const logger = require('../../config/logger');

const SCENARIOS = {
  'retail-buy-bai': async () => {
    logger.info('🎬 DEMO: Compra retalho BAI');
    eventBus.emit('order.executed', {
      orderId: `DEMO-${Date.now()}`, ticker: 'BAI',
      fillPrice: 18500, fillQty: 10, ts: Date.now()
    });
    return { scenario: 'retail-buy-bai', status: 'executed', qty: 10, ticker: 'BAI' };
  },
  'deposit-multicaixa': async () => {
    logger.info('🎬 DEMO: Depósito Multicaixa');
    eventBus.emit('deposit.confirmed', {
      paymentRef: `MCX-DEMO-${Date.now()}`, amount: 50000, userId: 'demo-user-001'
    });
    return { scenario: 'deposit-multicaixa', status: 'confirmed', amount: 50000 };
  },
  'open-custody': async () => {
    const nrc = `AO-SDVM-2025-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`;
    logger.info(`🎬 DEMO: NRC ${nrc}`);
    return { scenario: 'open-custody', status: 'opened', nrc };
  },
  'market-spike': async () => {
    logger.info('🎬 DEMO: Spike de mercado');
    return { scenario: 'market-spike', status: 'triggered' };
  },
  'cross-trade': async () => {
    logger.info('🎬 DEMO: Cross-trade');
    return { scenario: 'cross-trade', status: 'matched', qty: 50, price: 18500 };
  }
};

async function runScenario(req, res) {
  const scenario = SCENARIOS[req.params.name];
  if (!scenario) {
    return res.status(404).json({
      error: 'Cenário não encontrado',
      available: Object.keys(SCENARIOS)
    });
  }
  try {
    res.json({ ok: true, ...(await scenario()) });
  } catch (err) {
    logger.error(`Erro no cenário ${req.params.name}`, err);
    res.status(500).json({ error: err.message });
  }
}

function listScenarios(req, res) {
  res.json({ scenarios: Object.keys(SCENARIOS) });
}

module.exports = { runScenario, listScenarios };
