const axios = require("axios");
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

const EMPRESTIMO_ID = 1;

describe("Multas", () => {
    test("deve registrar uma multa ao devolver livro com 1 dia de atraso", async () => {
        const res = await axios.post(`${api}/emprestimos/${EMPRESTIMO_ID}/devolucao `, {
            data_devolucao: "2025-06-02"
        });

        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        expect(res.data.valor_total).toBe(2.0);
        expect(res.data.status).toBe(false);

        await axios.delete(`${api}/multas/${res.data.id}`);
        
    });

    test("deve registrar uma multa ao devolver livro com 3 dias de atraso", async () => {
        const res = await axios.post(`${api}/emprestimos/${EMPRESTIMO_ID}/devolucao `, {
            data_devolucao: "2025-06-04"
        });

        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        expect(res.data.valor_total).toBe(6.0);
        expect(res.data.status).toBe(false);

        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("não deve registrar multa ao devolver livro no prazo", async () => {
        const res = await axios.post(`${api}/emprestimos/${EMPRESTIMO_ID}/devolucao `, {
            data_devolucao: "2025-06-01"
        });
        expect(res.status).toBe(200);
    });

    test("deve listar todas as multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve buscar multa por id", async () => {
        const criado = await axios.post(`${api}/emprestimos/${EMPRESTIMO_ID}/devolucao `, {
            data_devolucao: "2025-06-03"
        });
        const id = criado.data.id;

        const res = await axios.get(`${api}/multas/${id}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(id);
    });

    test("deve retornar 404 para multa inexistente", async () => {
        try {
            await axios.get(`${api}/multas/99999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve deletar uma multa", async () => {
        const criado = await axios.post(`${api}/emprestimos/${EMPRESTIMO_ID}/devolucao `, {
            data_devolucao: "2025-06-03"
        });
        const id = criado.data.id;

        const res = await axios.delete(`${api}/multas/${id}`);
        expect(res.status).toBe(204);
    });

    test("deve retornar multas por usuário", async () => {});
});
