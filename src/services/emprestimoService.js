const { Emprestimo } = require("../models")

const criarEmprestimo = async(livro_id, usuario_id, data_prevista_devolucao) => {
    const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_prevista_devolucao });
    return {
        id: emprestimo.id,
        livro_id: emprestimo.livro_id,
        usuario_id: emprestimo.usuario_id,
        data_prevista_devolucao: emprestimo.data_prevista_devolucao,
        data_prevista_devolucao_prevista: emprestimo.data_prevista_devolucao
    };
}

const listarEmprestimo = async() => {
    return await Emprestimo.findAll();
}

const buscarEmprestimoPorId = async(id) => {
    return await Emprestimo.findByPk(id);
}

const deletarLivro = async (id) => {
    return await Emprestimo.destroy({where: { id }})
}

module.exports = {criarEmprestimo, listarEmprestimo, buscarEmprestimoPorId, deletarLivro}