const { Router } = require('express');
const LivroController = require('../controllers/livroController');

const livroController = new LivroController();

const router = Router();

router.post("/", livroController.criar);
router.get("/", livroController.listar);
router.get("/:id", livroController.buscarPorId);
router.patch("/:id", livroController.atualizar);
router.delete("/:id", livroController.deletar);

module.exports = router; 