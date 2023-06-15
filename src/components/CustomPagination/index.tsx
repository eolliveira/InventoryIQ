import { ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type CustomPaginationProps = {
  rowsPerPage: number;
  setRowsPerPage: (value: any) => void;
  setNumberPage: (value: any) => void;
  page?: {
    totalPages: number;
  };
};

//////VERIFICAR SE ESTA SENDO USADO
export default function CustomPagination({
  rowsPerPage,
  setRowsPerPage,
  setNumberPage,
  page,
}: CustomPaginationProps) {
  return (
    <Stack
      display={'flex'}
      alignItems={'center'}
      direction={'row'}
      justifyContent={'end'}
      flexWrap={'wrap'}
      marginY={2}
      spacing={3}
    >
      <Typography fontSize={14} textTransform={'none'}>
        Linhas por página:
      </Typography>

      <Select
        variant="standard"
        id="demo-simple-select"
        sx={{ fontSize: 14 }}
        size="small"
        value={String(rowsPerPage)}
        onChange={(event: SelectChangeEvent) => {
          setRowsPerPage(event.target.value);
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      <Pagination
        onChange={(event: ChangeEvent<unknown>, numberPage: number) =>
          setNumberPage(numberPage - 1)
        }
        defaultPage={1}
        count={page?.totalPages}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Stack>
  );
}
