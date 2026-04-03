const { Usuario } = require('../models');

const criarUsuario = async (nome, email, senha, tipo) => {
    const usuario = await Usuario.create({ nome, email, senha, tipo });
    return {
        id: usuario.id, 
        nome: usuario.nome, 
        email: usuario.email, 
        senha: usuario.senha, 
        tipo: usuario.tipo 
    };
}

const listarUsuarios = async () => {
    return Usuario.findAll();
}

const buscarUsuarioPorId = async (id) => {
    return Usuario.findByPk(id);
}

const atualizarUsuario = async (id, body) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return null;

    if (Object.prototype.hasOwnProperty.call(body, 'nome')) usuario.nome = body.nome;
    if (Object.prototype.hasOwnProperty.call(body, 'email')) usuario.email = body.email;
    if (Object.prototype.hasOwnProperty.call(body, 'senha')) usuario.senha = body.senha;
    if (Object.prototype.hasOwnProperty.call(body, 'tipo')) usuario.tipo = body.tipo;

    await usuario.save();
    return usuario;
}

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return false;

    await usuario.destroy();
    return true;
}

module.exports = { criarUsuario, listarUsuarios, buscarUsuarioPorId, atualizarUsuario, deletarUsuario };