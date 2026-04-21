const { Router } = require('express');
const { listar, buscarPorId, deletar, buscarPorUsuario } = require('../controllers/multaController.js');

const router = Router();

router.get("/", listar);
router.get("/:id", buscarPorId);
router.delete("/:id", deletar);
router.get("/usuario/:usuario_id", buscarPorUsuario);

module.exports = router;