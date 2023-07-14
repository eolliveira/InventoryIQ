import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
type CustomModal<T extends ReactNode> = {
  openModal: boolean;
  children?: T;
};

export default function CustomModal({ openModal, children }: CustomModal<any>) {
  return (
    <Modal open={openModal}>
      {/* <Box
        sx={{
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          '@media screen and (min-width: 768px)': {
            height: 'auto',
          },
        }}
      > */}
      <Box
        height={'100vh'}
        overflow={'auto'}
        display={'flex'}
        padding={'0 15px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {children}
      </Box>
      {/* </Box> */}
    </Modal>
  );
}
