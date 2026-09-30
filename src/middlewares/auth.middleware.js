const jwt = require('jsonwebtoken');
const env = require('../config/env');

function extractToken(req) {
  const h = req.headers.authorization || '';
  return h.startsWith('Bearer ') ? h.slice(7) : null;
}

// Aceita qualquer token em modo demo
function required(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Token ausente' });
  if (env.DEMO_MODE && token === 'DEMO_TOKEN') {
    req.user = { id: 'demo-user-001', role: 'RETAIL' };
    return next();
  }
  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

function optional(req, res, next) {
  const token = extractToken(req);
  if (token && token !== 'DEMO_TOKEN') {
    try { req.user = jwt.verify(token, env.JWT_SECRET); } catch (_) {}
  } else if (token === 'DEMO_TOKEN' && env.DEMO_MODE) {
    req.user = { id: 'demo-user-001', role: 'RETAIL' };
  }
  next();
}

module.exports = { required, optional };
