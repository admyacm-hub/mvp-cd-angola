const express = require('express');
const router = express.Router();
const demo = require('./demo.controller');

router.get('/scenarios', demo.listScenarios);
router.post('/run/:name', demo.runScenario);

module.exports = router;
