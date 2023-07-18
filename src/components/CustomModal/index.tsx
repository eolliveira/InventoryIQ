import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';

type CustomModal<T extends ReactNode> = {
  openModal: boolean;
  children?: T;
};

export default function CustomModal({ openModal, children }: CustomModal<ReactNode>) {
  return (
    <Modal open={openModal}>
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
    </Modal>
  );
}
