import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Book } from '../types/Book';
import { bookSchema, BookFormData } from '../schemas/bookSchema';

interface BookFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  initialData?: Book;
}

export const BookForm: React.FC<BookFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  console.log("initialDat: ", initialData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData || {
      title: '',
      author: '',
      isbn: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ title: "", author: "", isbn: "" });
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: BookFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Book' : 'Add New Book'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            {...register('author')}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            margin="dense"
            label="ISBN"
            fullWidth
            {...register('isbn')}
            error={!!errors.isbn}
            helperText={errors.isbn?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};