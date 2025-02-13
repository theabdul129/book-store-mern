// src/models/database.ts
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER
    )
  `);
});

export default db;