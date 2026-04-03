const { Router } = require('express');
const { listar, criar, buscarPorId, atualizar, deletar } = require('../controllers/livroController.js');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.patch("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router; 