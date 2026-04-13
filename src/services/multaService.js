const Multa = require("../models/Multa");

const criarMulta = async (emprestimo_id, data_prevista_devolucao, data_devolucao) => {
    const valorTotal = calcularValorMulta(data_prevista_devolucao, data_devolucao);

    const multa = await Multa.create({emprestimo_id, valorTotal, data_devolucao})
    return {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        valor_total: multa.valor_total,
        data_devolucao: multa.data_devolucao,
        status: multa.status
    }
    
}

const listarMultas = async () => {
    return await Multa.findAll();
}

const buscarMultaPorId = async (id) => {
    return await Multa.findByPk(id);
}

const atualizarStatusMulta = async (id, status) => {
    const multa = await Multa.findByPk(id);
    if (!multa) return null;
    multa.status = status;
    await multa.save();
    return multa;
}

const deletarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) return false;
    await multa.destroy();
    return true;
}

// função auxiliar pra calculo de multa
const calcularValorMulta = (data_prevista_devolucao, data_devolucao) => {
    const VALOR_POR_DIA = 2.0;

    const dataPrevista = new Date(data_prevista_devolucao);
    const dataDevolucao = new Date(data_devolucao);

    const diasAtraso = dataDevolucao - dataPrevista;

    return diasAtraso * VALOR_POR_DIA;
}

module.exports = { criarMulta, listarMultas, buscarMultaPorId, atualizarStatusMulta, deletarMulta}