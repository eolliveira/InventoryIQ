import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  inputValue: string;
  handleChangeInputFilter: Function;
  handleOpenFilters: Function;
  handleClearFilters: Function;
};

export default function SearchBar({
  inputValue,
  handleChangeInputFilter,
  handleOpenFilters,
  handleClearFilters,
}: SearchBarProps) {
  // TESTAR ESSE COMPONENTE
  return (
    <Box
      minWidth={300}
      borderRadius={2}
      border={' 1px solid silver'}
      alignItems={'center'}
      display={'flex'}
      marginBottom={1}
      bgcolor={'#ffff'}
    >
      <SearchIcon color="primary" sx={{ margin: 1 }} fontSize="medium" />
      <input
        onChange={() => handleChangeInputFilter}
        value={inputValue}
        style={{
          backgroundColor: 'unset',
          width: '100%',
          height: '100%',
          border: 'none',
          textDecoration: 'none',
          boxShadow: 'none',
          outline: 0,
        }}
      />

      <IconButton onClick={() => handleClearFilters}>
        <CloseIcon fontSize="small" color="primary" />
      </IconButton>

      <IconButton onClick={() => handleOpenFilters}>
        <TuneIcon fontSize="small" color="primary" />
      </IconButton>
    </Box>
  );
}
