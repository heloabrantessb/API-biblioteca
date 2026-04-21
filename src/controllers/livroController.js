const { criarLivro, listarLivros, buscarLivroPorId, atualizarLivro, deletarLivro } = require('../services/livroService');
const BaseController = require('./BaseController');

class LivroController extends BaseController {

    criar = async (req, res) => {
        const { titulo, autor, disponivel } = req.body;

        if (!titulo || !autor) return this.badRequest(res, 'Título e autor são obrigatórios');

        try {
            const livro = await criarLivro(titulo, autor, disponivel);
            return this.created(res, livro);
        } catch (error) {
            return this.internalError(res, error.message);
        }
    };

    listar = async (req, res) => {
        try {
            const livros = await listarLivros();
            return this.ok(res, livros);    
        } catch (error) {
            return this.internalError(res);
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const livro = await buscarLivroPorId(id);

            if (!livro)
                return this.notFound(res, 'Livro não encontrado');
            return this.ok(res, livro);
        } catch (error) {
            return this.internalError(res);
        }
    };

    atualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, autor } = req.body;
            const livro = await atualizarLivro(id, titulo, autor);
            if (!livro) return this.notFound(res, 'Livro não encontrado');
            return this.ok(res, livro);
        } catch (error) {
            return this.internalError(res);
        }
    };

    deletar = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await deletarLivro(id);
            if (!deleted) return this.notFound(res, 'Livro não encontrado');
            return this.ok(res, null, 'Livro deletado com sucesso');
        } catch (error) {
            return this.internalError(res);
        }
    };
}

module.exports = LivroController;