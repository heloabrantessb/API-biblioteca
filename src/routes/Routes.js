const { Router } = require('express');

const livroRoutes = require("./livro.routes.js")
const usuarioRoutes = require("./usuario.routes.js")
const emprestimoRoutes = require("./emprestimo.routes.js")
const multaRoutes = require("./multa.routes.js")

const router = Router();
router.use('/livros', livroRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/emprestimos', emprestimoRoutes)
router.use('/multas', multaRoutes)

module.exports = router;