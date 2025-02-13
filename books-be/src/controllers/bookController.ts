// src/controllers/bookController.ts
import { Request, Response } from 'express';
import { Book, getBooks, addBook, filterBooks } from '../models/book';

export const listBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook: Book = req.body;
    const bookId = await addBook(newBook);
    res.status(201).json({ id: bookId, ...newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book' });
  }
};

export const searchBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = req.query;
    const books = await filterBooks(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering books' });
  }
};