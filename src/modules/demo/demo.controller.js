/**
 * Demo Controller — Cenários guiados para apresentações a investidores
 * Endpoint protegido por chave de demonstração
 */

const eventBus = require('../../events/eventBus');
const matchingEngine = require('../trading/matching.engine');
const marketData = require('../trading/marketData.service');
const logger = require('../../config/logger');

const SCENARIOS = {
    // Cenário 1: Investidor compra 10 acções BAI via app
    'retail-buy-bai': async () => {
        logger.info('🎬 DEMO: Compra de retalho BAI');
        const order = {
            id: `DEMO-${Date.now()}`,
            user_id: 'demo-user-001',
            side: 'BUY',
            type: 'MARKET',
            quantity: 10,
            price: null
        };
        await matchingEngine.process(order, 'BAI');
        return { scenario: 'retail-buy-bai', status: 'executed', qty: 10, ticker: 'BAI' };
    },

    // Cenário 2: Depósito Multicaixa Express confirmado
    'deposit-multicaixa': async () => {
        logger.info('🎬 DEMO: Depósito Multicaixa confirmado');
        eventBus.emit('deposit.confirmed', {
            paymentRef: `MCX-DEMO-${Date.now()}`,
            amount: 50000,
            userId: 'demo-user-001'
        });
        return { scenario: 'deposit-multicaixa', status: 'confirmed', amount: 50000 };
    },

    // Cenário 3: Abertura de conta custódia CEVAMA (NRC emitido)
    'open-custody': async () => {
        logger.info('🎬 DEMO: Abertura de conta CEVAMA');
        const nrc = `AO-SDVM-2025-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`;
        eventBus.emit('custody.opened', { userId: 'demo-user-002', nrc });
        return { scenario: 'open-custody', status: 'opened', nrc };
    },

    // Cenário 4: Spike de mercado (para mostrar gráficos a mexer)
    'market-spike': async () => {
        logger.info('🎬 DEMO: Spike de mercado');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => marketData.tick(), i * 100);
        }
        return { scenario: 'market-spike', status: 'triggered' };
    },

    // Cenário 5: Execução cruzada (buyer + seller)
    'cross-trade': async () => {
        logger.info('🎬 DEMO: Cross-trade');
        await matchingEngine.process({
            id: `DEMO-B-${Date.now()}`, user_id: 'demo-buyer',
            side: 'BUY', type: 'LIMIT', quantity: 50, price: 18500
        }, 'BAI');
        await matchingEngine.process({
            id: `DEMO-S-${Date.now()}`, user_id: 'demo-seller',
            side: 'SELL', type: 'LIMIT', quantity: 50, price: 18500
        }, 'BAI');
        return { scenario: 'cross-trade', status: 'matched', qty: 50, price: 18500 };
    }
};

async function runScenario(req, res) {
    const { name } = req.params;
    const scenario = SCENARIOS[name];

    if (!scenario) {
        return res.status(404).json({
            error: 'Cenário não encontrado',
            available: Object.keys(SCENARIOS)
        });
    }

    try {
        const result = await scenario();
        res.json({ ok: true, ...result });
    } catch (err) {
        logger.error(`Erro no cenário ${name}`, err);
        res.status(500).json({ error: err.message });
    }
}

function listScenarios(req, res) {
    res.json({ scenarios: Object.keys(SCENARIOS) });
}

module.exports = { runScenario, listScenarios };
