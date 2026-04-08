const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe('Funcionalidades de Livros', () => {
    test('POST /livros - cria um livro', async () => {
        const res = await axios.post(`${api}/livros`, {
            titulo: "Clean Code",
            autor: "Robert C. Martin"
        });
        
        expect(res.status).toEqual(201);
        expect(res.data.titulo).toBe("Clean Code");
        expect(res.data.autor).toBe("Robert C. Martin");

        await axios.delete(`${api}/livros/${res.data.id}`);
    });

    test('GET /livros - retorna todos os livros', async () => {
        const res = await axios.get(`${api}/livros`);

        expect(res.status).toEqual(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('GET /livros/:id - retorna livro por id', async () => {
        const livro = await axios.post(`${api}/livros`, {
            titulo: "Algoritmos",
            autor: "Ratinho da Silva"
        });
        const id = livro.data.id;

        const res = await axios.get(`${api}/livros/${id}`);
        
        expect(res.status).toEqual(200);
        expect(res.data.titulo).toBe("Algoritmos");
        expect(res.data.autor).toBe("Ratinho da Silva");

        await axios.delete(`${api}/livros/${id}`);
    });

    test('PATCH /livros/:id - atualiza um livro', async () => {
        const criado = await axios.post(`${api}/livros`, {
            titulo: "Clean Code",
            autor: "Robert C. Martin"
        });
        const id = criado.data.id;

        const res = await axios.patch(`${api}/livros/${id}`, {
            titulo: "Clean Code 2",
            autor: "Robert C. Martin"
        });
        expect(res.status).toEqual(200);
        expect(res.data.titulo).toBe("Clean Code 2");

        await axios.delete(`${api}/livros/${id}`);
    });

    test('DELETE /livros/:id - deleta um livro', async () => {
        const criado = await axios.post(`${api}/livros`, {
            titulo: "Para deletar",
            autor: "Autor"
        });
        const id = criado.data.id;

        const res = await axios.delete(`${api}/livros/${id}`);
        expect(res.status).toEqual(204);
    });
});

