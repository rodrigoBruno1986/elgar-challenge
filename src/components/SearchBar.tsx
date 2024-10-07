import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import styles from './styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Box className={styles.searchBox}>
      <TextField
        label={placeholder}
        variant='outlined'
        fullWidth
        value={query}
        onChange={handleInputChange}
        InputProps={{
          className: styles.searchInput,
        }}
      />
    </Box>
  );
};

export default SearchBar;
