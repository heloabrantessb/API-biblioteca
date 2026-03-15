const request = require('supertest');
const app = require('../src/app');

test('POST /livros - cria um livro', async () => {
    const res = await request(app).post('/livros').send({titulo: "Clean Code", autor: "Robert C. Martin"});
    expect(res.status).toEqual(201);
    expect(res.body.titulo).toBe("Clean Code");
    expect(res.body.autor).toBe("Robert C. Martin");
});