const multaService = require('../services/multaService');

const listar = async (req, res) => {
    try {
        const multas = await multaService.listarMultas();
        return res.status(200).json(multas);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar multas", detalhe: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await multaService.buscarMultaPorId(id);
        if (!multa) return res.status(404).json({ error: "Multa não encontrada" });

        return res.status(200).json(multa);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar multa", detalhe: error.message });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await multaService.deletarMulta(id);
        if (!deleted) return res.status(404).json({ error: 'Multa não encontrada' });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar multa", detalhe: error.message });
    }
};

const buscarPorUsuario = async (req, res) => {
    return res.status(200).json([]);
};

module.exports = { listar, buscarPorId, deletar, buscarPorUsuario };