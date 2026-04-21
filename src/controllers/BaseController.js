class BaseController {
    ok(res, data = null, message) {
        return res.status(200).json({ 
            sucess: true,
            data, 
            message: message || 'Sucesso!'
        });
    }
    created(res, data = null, message) {
        return res.status(201).json({ 
            sucess: true,
            data, 
            message: message || 'Criado com sucesso!'
        });
    }
    badRequest(res, message) {
        return res.status(400).json({ 
            sucess: false,
            message: message || 'Requisição inválida!'
        });
    }
    notFound(res, message) {
        return res.status(404).json({ 
            sucess: false,
            message: message || 'Não encontrado!'
        });
    }
    internalError(res, message) {
        return res.status(500).json({ 
            sucess: false,
            message: message || 'Erro interno do servidor!'
        });
    }
    forbidden(res, message) {
        return res.status(403).json({ 
            sucess: false,
            message: message || 'Acesso negado!'
        });
    }
    unauthorized(res, message) {
        return res.status(401).json({ 
            sucess: false,
            message: message || 'Não autorizado!'
        });
    }
}

module.exports = BaseController;