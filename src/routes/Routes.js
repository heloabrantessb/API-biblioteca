const { Router } = require('express');

const livroRoutes = require("./livroRoutes.js")

const router = Router();
router.use('/livros', livroRoutes);

module.exports = router;