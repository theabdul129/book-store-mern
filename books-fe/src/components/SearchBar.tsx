import React, { memo } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

export const SearchBar: React.FC<SearchBarProps> = memo(({ onSearch, searchTerm }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search books by title, author, or ISBN"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
});