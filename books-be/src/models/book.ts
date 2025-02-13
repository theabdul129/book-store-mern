// src/models/book.ts
import db from './database';

export interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
}

export const getBooks = (): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM books', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Book[]);
      }
    });
  });
};

export const addBook = (book: Book): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO books (title, author, year) VALUES (?, ?, ?)',
      [book.title, book.author, book.year],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

export const filterBooks = (filter: Partial<Book>): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM books WHERE ' + Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
    const values = Object.values(filter);
    db.all(query, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Book[]);
      }
    });
  });
};