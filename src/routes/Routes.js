const { Router } = require('express');

const livroRoutes = require("./livro.routes.js")
const usuarioRoutes = require("./usuario.routes.js")

const router = Router();
router.use('/livros', livroRoutes);
router.use('/usuarios', usuarioRoutes);
module.exports = router;