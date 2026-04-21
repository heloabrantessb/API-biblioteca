const { Emprestimo } = require("../models")

const criarEmprestimo = async(livro_id, usuario_id, data_prevista_devolucao) => {
    const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_prevista_devolucao });
    return {
        id: emprestimo.id,
        livro_id: emprestimo.livro_id,
        usuario_id: emprestimo.usuario_id,
        data_prevista_devolucao: emprestimo.data_prevista_devolucao
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

const registrarDevolucao = async (id, data_devolucao) => {
    //quando devolver tem que:
    //ver se o emprestimo esta no prazo
        //achar o emprestimo
        //comparar a data de devolucao prevista com a data de devolucao real 
    // se não estiver é MULTA e ai gerar a multa
    //se estiver no prazo, só atualizar o livro como disponivel e o emprestimo como devolvido

        const emprestimo = await Emprestimo.findByPk(id);
        if (!emprestimo) return null;

        const dataPrevista = new Date(emprestimo.data_prevista_devolucao);
        const dataDevolucao = new Date(data_devolucao);

        if (dataDevolucao - dataPrevista > 0) {
            const multa = await multaService.criarMulta(id, emprestimo.data_prevista_devolucao, data_devolucao);
            return multa
        }
}

const atualizarStatus = async (id, status) => {
    const emprestimo = await buscarEmprestimoPorId(id);
    if (!emprestimo) return null;
    
    emprestimo.status = status;
    await emprestimo.save();
    return emprestimo;
}

module.exports = {criarEmprestimo, listarEmprestimo, buscarEmprestimoPorId, deletarLivro, registrarDevolucao, atualizarStatus}