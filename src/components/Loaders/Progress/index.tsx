import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading() {
  return (
    <Box
      margin={2}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      textAlign={'center'}
    >
      <CircularProgress />
    </Box>
  );
}
