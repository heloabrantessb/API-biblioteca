const { Router } = require('express');
const { listar, criar, buscarPorId, deletar } = require('../controllers/emprestimoController.js');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.delete("/:id", deletar);

module.exports = router; 