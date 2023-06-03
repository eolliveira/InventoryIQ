import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

type SerchBarProps = {
  inputFilter: string;
  setInputFilter: (value: string) => void;
  setNumberPage: (value: number) => void;
  onClearFilters: () => void;
  setOpenCustomFilters: (value: HTMLElement | null) => void;
};

export default function SerchBar({
  inputFilter,
  setInputFilter,
  setNumberPage,
  onClearFilters: handleClearFilters,
  setOpenCustomFilters: setAnchorEl,
}: SerchBarProps) {
  return (
    <Box
      minWidth={300}
      borderRadius={2}
      border={'1px solid silver'}
      alignItems={'center'}
      display={'flex'}
      marginBottom={1}
      bgcolor={'#ffff'}
    >
      <SearchIcon color="primary" sx={{ margin: 1 }} fontSize="medium" />
      <input
        onChange={(e) => {
          setInputFilter(e.target.value);
          setNumberPage(0);
        }}
        value={inputFilter}
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

      <IconButton onClick={handleClearFilters}>
        <CloseIcon fontSize="small" color="primary" />
      </IconButton>

      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <TuneIcon fontSize="small" color="primary" />
      </IconButton>
    </Box>
  );
}
