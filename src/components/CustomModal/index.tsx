import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  borderRadius: 3,
};

type CustomModal<T extends ReactNode> = {
  openModal: boolean;
  children?: T;
};

export default function CustomModal({ openModal, children }: CustomModal<any>) {
  return (
    <Modal open={openModal} onClose={() => {}}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
