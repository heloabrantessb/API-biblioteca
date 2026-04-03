const { Router } = require('express');

const livroRoutes = require("./livro.routes.js")

const router = Router();
router.use('/livros', livroRoutes);

module.exports = router;