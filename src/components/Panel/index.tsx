import Box from '@mui/material/Box/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { BaseCard } from '../../style/GlobalStyles';
import Stack from '@mui/material/Stack';

type PanelProps<T extends ReactNode> = {
  title: string;
  children?: T;
};

export default function Panel({ title, children }: PanelProps<ReactNode>) {
  return (
    <BaseCard>
      <Stack sx={{ bgcolor: '#F8FAFC', borderRadius: '8px 8px 0px 0px' }}>
        <Typography margin={2} fontSize={16} fontWeight={'bold'} letterSpacing={1} color={'primary'} variant="h2">
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ marginBottom: 1 }} flexItem color="silver" />
      <Box p={1}>{children}</Box>
    </BaseCard>
  );
}
