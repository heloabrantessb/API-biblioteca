const usuarioService = require('../services/usuarioService');

const criar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) return res.status(400).json({ error: 'Nome, email, senha e tipo são obrigatórios' });

    try {
        const usuario = await usuarioService.criarUsuario(nome, email, senha, tipo);
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar usuário', detalhe: error.message });
    }
}

const listar = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar usuários', detalhe: error.message });
    }
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.buscarUsuarioPorId(id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
            return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuário', detalhe: error.message });
    }
}

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;
        const usuario = await usuarioService.atualizarUsuario(id, nome, email, senha, tipo);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário', detalhe: error.message });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await usuarioService.deletarUsuario(id);
        if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar usuário', detalhe: error.message });
    }
}

module.exports = { criar, listar, buscarPorId, atualizar, deletar };