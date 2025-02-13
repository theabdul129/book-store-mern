// src/tests/bookController.test.ts
import { Request, Response } from 'express';
import { listBooks, createBook, searchBooks } from '../controllers/bookController';
import { Book, getBooks, addBook, filterBooks } from '../models/book';

jest.mock('../models/book');

describe('Book Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should list all books', async () => {
    const mockBooks: Book[] = [{ id: 1, title: 'Book 1', author: 'Author 1', year: 2021 }];
    (getBooks as jest.Mock).mockResolvedValue(mockBooks);

    await listBooks(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('should add a new book', async () => {
    const newBook: Book = { title: 'New Book', author: 'New Author', year: 2022 };
    req.body = newBook;
    (addBook as jest.Mock).mockResolvedValue(1);

    await createBook(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...newBook });
  });

  it('should filter books', async () => {
    const mockBooks: Book[] = [{ id: 1, title: 'Book 1', author: 'Author 1', year: 2021 }];
    req.query = { author: 'Author 1' };
    (filterBooks as jest.Mock).mockResolvedValue(mockBooks);

    await searchBooks(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });
});