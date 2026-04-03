const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
    const livro = await Livro.create({ titulo, autor });
    return {id: livro.id, titulo: livro.titulo, autor: livro.autor };
}

const buscarLivroPorId = async (id) => {
    return Livro.findByPk(id);
}

const listarLivros = async () => {
    return Livro.findAll();
}

const atualizarLivro = async (id, titulo, autor) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;
    livro.titulo = titulo;
    livro.autor = autor;
    await livro.save();
    return livro;
}

const deletarLivro = async (id) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return false;
    await livro.destroy();
    return true;
}

module.exports = { criarLivro, listarLivros, buscarLivroPorId, atualizarLivro, deletarLivro };