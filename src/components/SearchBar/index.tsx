import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { HTMLInputTypeAttribute } from 'react';

type SearchBarProps = {
  inputFilter: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  setInputFilter: (value: string) => void;
  setNumberPage?: (value: number) => void;
  onClearFilters?: () => void;
  setOpenCustomFilters?: (value: HTMLElement | null) => void;
};

export default function SearchBar({
  inputFilter,
  type,
  placeholder,
  setInputFilter,
  setNumberPage,
  onClearFilters,
  setOpenCustomFilters,
}: SearchBarProps) {
  return (
    <Box
      minWidth={100}
      height={35}
      borderRadius={2}
      border={'1px solid silver'}
      alignItems={'center'}
      display={'flex'}
      marginBottom={1}
      marginRight={0.5}
      bgcolor={'rgb(248, 250, 252);'}
    >
      <SearchIcon color="primary" sx={{ margin: 1 }} fontSize="small" />

      <input
        onChange={(e) => {
          setInputFilter(e.target.value);
          if (setNumberPage) setNumberPage(0);
        }}
        value={inputFilter}
        placeholder={placeholder ? placeholder : 'Pesquisar...'}
        type={type ? type : 'text'}
        style={{
          backgroundColor: 'unset',
          fontSize: '14px',
          width: '100%',
          height: '100%',
          border: 'none',
          textDecoration: 'none',
          boxShadow: 'none',
          outline: 0,
        }}
      />
      {onClearFilters && (
        <IconButton size="small" onClick={onClearFilters}>
          <CloseIcon
            sx={{
              color: 'primary',
            }}
            fontSize="small"
            color="primary"
          />
        </IconButton>
      )}
      {setOpenCustomFilters && (
        <IconButton size="small" onClick={(event) => setOpenCustomFilters(event.currentTarget)}>
          <TuneIcon fontSize="small" color="primary" />
        </IconButton>
      )}
    </Box>
  );
}
