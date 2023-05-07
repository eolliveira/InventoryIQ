import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';
import styled from 'styled-components';

type CustomModal<T extends ReactNode> = {
  openModal: boolean;
  children?: T;
};

export default function CustomModal({ openModal, children }: CustomModal<any>) {
  return (
    <Modal
      open={openModal}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wapper>
      {children}
      </Wapper>
    </Modal>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  overflow-y: scroll;

  /* @media (min-width: 992px) {
    overflow-y: unset;
  } */
`;
