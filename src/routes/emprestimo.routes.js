const { Router } = require('express');
const { listar, criar, buscarPorId, deletar, devolver} = require('../controllers/emprestimoController.js');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.delete("/:id", deletar);
router.post('/:id/devolver', devolver);

module.exports = router; 