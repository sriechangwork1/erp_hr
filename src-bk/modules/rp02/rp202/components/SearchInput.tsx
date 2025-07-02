import React from 'react';
import { TextField } from '@mui/material';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = 'ค้นหา...' }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={placeholder}
      value={value}
      onChange={onChange}
      size="small"
      sx={{ mb: 2 }} // เพิ่ม margin-bottom เล็กน้อย
    />
  );
};

export default SearchInput;