const { Router } = require('express');
const { criar, listar, buscarPorId, atualizar, deletar } = require('../controllers/usuarioController.js');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.patch("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;