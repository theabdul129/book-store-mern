// src/routes/bookRoutes.ts
import express from 'express';
import { listBooks, createBook, searchBooks } from '../controllers/bookController';

const router = express.Router();

router.get('/books', listBooks);
router.post('/books', createBook);
router.get('/books/filter', searchBooks);

export default router;