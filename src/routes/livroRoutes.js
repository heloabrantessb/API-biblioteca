const { Router } = require('express');
const { criar } = require('../controllers/livroController.js');

const router = Router();
// const livroController = require('../controllers/livroController');

router.post("/", criar);

module.exports = router; 