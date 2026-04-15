const { Emprestimo } = require("../models")
const multaService = require("./multaService");

const criarEmprestimo = async(livro_id, usuario_id, data_prevista_devolucao, status) => {
    const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_prevista_devolucao, status });
    return {
        id: emprestimo.id,
        livro_id: emprestimo.livro_id,
        usuario_id: emprestimo.usuario_id,
        data_prevista_devolucao: emprestimo.data_prevista_devolucao,
        status: emprestimo.status
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

const atualizarStatus = async (id, status) => {
    const emprestimo = await this.buscarEmprestimoPorId(id);
    if (!emprestimo) return null;
    
    emprestimo.status = !status;
    await emprestimo.save();
    return emprestimo;
}

const registrarDevolucao = async (emprestimo_id, data_devolucao) => {
    const emprestimo = await this.buscarEmprestimoPorId(emprestimo_id);
    if (!emprestimo) return null;

    const dataPrevista = new Date(emprestimo.data_prevista_devolucao);
    const dataDevolucao = new Date(data_devolucao);

        if (dataDevolucao - dataPrevista > 0) {
            //gerar multa (fora do prazo)
            const multa = await multaService.criarMulta(emprestimo_id, emprestimo.data_prevista_devolucao, data_devolucao);
            
            //torna o livro disponivel novamente
            await livroService.atualizarDisponibilidade(emprestimo.livro_id);
            
            return multa
        }else {
            //não gerar multa (dentro do prazo)
            await livroService.atualizarDisponibilidade(emprestimo.livro_id);
            await this.atualizarStatus(emprestimo_id, emprestimo.status);

            return emprestimo
        }
}

module.exports = {criarEmprestimo, listarEmprestimo, buscarEmprestimoPorId, deletarLivro, registrarDevolucao, atualizarStatus}