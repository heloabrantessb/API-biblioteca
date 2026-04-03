const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

describe('Funcionalidades de Usuarios', () => {
    test('POST /usuarios - cria um usuario', async () => {
        const res = await axios.post(`${api}/usuarios`, {
            nome: "João da Silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "aluno"
        });
        expect(res.status).toEqual(201);
        expect(res.data.nome).toBe("João da Silva");
        expect(res.data.email).toBe("joao@example.com");
        expect(res.data.senha).toBe("123456");
        expect(res.data.tipo).toBe("aluno");

        await axios.delete(`${api}/usuarios/${res.data.id}`);
    });

    test('GET /usuarios - retorna todos os usuarios', async () => {
        const res = await axios.get(`${api}/usuarios`);
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('GET /usuarios/:id - retorna usuario por id', async () => {
        const usuario = await axios.post(`${api}/usuarios`, {
            nome: "João da Silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "aluno"
        });
        const id = usuario.data.id;

        const res = await axios.get(`${api}/usuarios/${id}`);
        expect(res.status).toEqual(200);

        await axios.delete(`${api}/usuarios/${id}`);
    });

    test('PATCH /usuarios/:id - atualiza um usuario', async () => {
        const usuario = await axios.post(`${api}/usuarios`, {
            nome: "João da Silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "aluno"
        });
        const id = usuario.data.id;
        
        const res = await axios.patch(`${api}/usuarios/${id}`, {
            nome: "João da Silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "aluno"
        });
        expect(res.status).toEqual(200);
        expect(res.data.nome).toBe("João da Silva");
        expect(res.data.email).toBe("joao@example.com");
    });

    test('DELETE /usuarios/:id - deleta um usuario', async () => {
        const usuario = await axios.post(`${api}/usuarios`, {
            nome: "João da Silva",
            email: "joao@example.com",
            senha: "123456",
            tipo: "aluno"
        });
        const id = usuario.data.id;

        const res = await axios.delete(`${api}/usuarios/${id}`);
        expect(res.status).toEqual(204);
    });
});