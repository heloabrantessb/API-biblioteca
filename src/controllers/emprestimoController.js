const emprestimoService = require('../services/emprestimoService')

const criar = async (req, res) => {
    const { usuario_id, livro_id, data_prevista_devolucao } = req.body;

    if(!usuario_id || !livro_id || data_prevista_devolucao) return res.status(400).json({error: "Todos os campos são obrigatórios"})

    try {
        const emprestimo = await emprestimoService.criarEmprestimo(livro_id, usuario_id, data_prevista_devolucao)
        return res.status(201).json(emprestimo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar empréstimo', detalhe: error.message });
    }
}

const listar = async (req, res) => {
    try {
        const emprestimos = await emprestimoService.listarEmprestimo();
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar emprestimos", detalhe: error.message})
    }
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await emprestimoService.buscarEmprestimoPorId(id);
        if(!emprestimo) return res.status(404).json({error: "Empréstimo não encontrado"})
        
        return res.status(200).json(emprestimo)

    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar empréstimo", detalhe: error.message})
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await emprestimoService.deletarLivro(id);
        if(!deleted) return res.status(404).json({error :'Empréstimo não encontrado'})
        
        return res.status(204).send()
    }catch (error) {
        return res.status(500).json({error: "Erro ao deletar empréstimo", detalhe: error.message})
    }
}

module.exports = { criar, listar, buscarPorId, deletar}