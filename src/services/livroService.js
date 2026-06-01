const { Livro } = require('../models');

const criarLivro = async (titulo, autor, disponivel = true) => {
    const livro = await Livro.create({ titulo, autor, disponivel });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        disponivel: livro.disponivel
    }
}

const buscarLivroPorId = async (id) => {
    return Livro.findByPk(id);
}

const listarLivros = async () => {
    return Livro.findAll();
}

const atualizarLivro = async (id, titulo, autor, disponivel) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;

    if (titulo !== undefined) livro.titulo = titulo;
    if (autor !== undefined) livro.autor = autor;
    if (disponivel !== undefined) livro.disponivel = disponivel;

    await livro.save();
    return livro;
}

const deletarLivro = async (id) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;
    await livro.destroy();
    return true;
}

const atualizarDisponibilidade = async (id, disponivel) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;
    livro.disponivel = disponivel;
    await livro.save();
    return livro;
}

module.exports = { criarLivro, listarLivros, buscarLivroPorId, atualizarLivro, deletarLivro, atualizarDisponibilidade }; 