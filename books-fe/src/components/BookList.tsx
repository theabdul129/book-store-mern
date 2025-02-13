import React, { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  page: number;
  rowsPerPage: number;
  totalBooks: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BookList: React.FC<BookListProps> = memo(({
  books,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  totalBooks,
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (totalBooks === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography align="center" color="text.secondary">
          No books found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onEdit(book)}
                    size="small"
                  >
                    <Edit size={20} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(book.id)}
                    size="small"
                  >
                    <Trash2 size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalBooks}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
});