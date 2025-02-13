import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { BookPlus } from 'lucide-react';
import { Book } from './types/Book';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { SearchBar } from './components/SearchBar';
import { mockBooks } from './data/mockBooks';

const theme = createTheme();

// Note: I have listed down all components in App component, 
// because there are no routes defined for this task.
function App() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleAddBook = useCallback((bookData: Omit<Book, 'id'>): void => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  }, []);

  const handleEditBook = useCallback((bookData: Omit<Book, 'id'>): void => {
    if (!editingBook) return;
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === editingBook.id ? { ...book, ...bookData } : book
      )
    );
    setEditingBook(undefined);
  }, [editingBook]);

  const handleDeleteBook = useCallback((id: string): void => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setPage(0);
  }, [searchTerm, rowsPerPage]);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(filteredBooks.length / rowsPerPage) - 1);
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [filteredBooks.length, page, rowsPerPage]);

  const paginatedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenEdit = useCallback((book: Book): void => {
    setEditingBook(book);
    setOpenForm(true);
  }, []);

  const handlePageChange = useCallback((_: unknown, newPage: number): void => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (!isNaN(newRowsPerPage) && newRowsPerPage > 0) {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  }, []);

  const handleCloseForm = useCallback((): void => {
    setOpenForm(false);
    setEditingBook(undefined);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book Management System
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<BookPlus />}
            onClick={() => setOpenForm(true)}
          >
            Add New Book
          </Button>
        </Box>

        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

        <BookList
          books={paginatedBooks}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteBook}
          page={page}
          rowsPerPage={rowsPerPage}
          totalBooks={filteredBooks.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <BookForm
          open={openForm}
          onClose={handleCloseForm}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          initialData={editingBook}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App