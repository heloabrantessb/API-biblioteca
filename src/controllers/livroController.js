const { criarLivro, listarLivros, buscarLivroPorId, atualizarLivro, deletarLivro } = require('../services/livroService');

const listar = async (req, res) => {
    try {
        const livros = await listarLivros();
        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
};

const criar = async (req, res) => {
    const { titulo, autor, disponivel } = req.body;

    if (!titulo || !autor) return res.status(400).json({ error: 'Título e autor são obrigatórios' });
    
    try {
        const livro = await criarLivro(titulo, autor, disponivel);
        return res.status(201).json(livro);
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno", detalhe: error.message });
    }
};

const buscarPorId = async(req, res) =>{
    try{
        const { id } = req.params;
        const livro = await buscarLivroPorId(id);

        if(!livro)
            return res.status(404).json({erro: "Livro não encontrado"})
        return res.status(200).json(livro);
    } catch (error){
        return res.status(500).json({erro: "Erro interno", detalhe: error.message })
    };
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor } = req.body;
        const livro = await atualizarLivro(id, titulo, autor);
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno", detalhe: error.message });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deletarLivro(id);
        if (!deleted) return res.status(404).json({ erro: "Livro não encontrado" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno", detalhe: error.message });
    }
};

module.exports = { listar, criar, buscarPorId, atualizar, deletar };