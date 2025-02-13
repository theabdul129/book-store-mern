// src/tests/app.test.ts
import request from 'supertest';
import app from '../app';

describe('Book API', () => {
  it('should list all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should add a new book', async () => {
    const newBook = { title: 'New Book', author: 'New Author', year: 2022 };
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newBook.title);
  });

  it('should filter books by author', async () => {
    const newBook = { title: 'New Book', author: 'New Author', year: 2022 };
    await request(app).post('/api/books').send(newBook);

    const res = await request(app).get('/api/books/filter?author=New Author');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].author).toBe('New Author');
  });
});