import { theme } from '../../style/Theme';

import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';

type StatusControlProps = {
  handleEdit: Function;
  status?: string;
};

export default function StatusControl({
  handleEdit,
  status,
}: StatusControlProps) {
  return (
    <>
      <Title>Status</Title>
      <Status>
        <Text>{status}</Text>
        <IconButton aria-label="delete" size="small">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Status>
    </>
  );
}

const Status = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  max-width: 200px;
  border-radius: 3px;
  background: #65d59f;
  padding: 5px;
`;

const Title = styled.h6`
  font-size: ${theme.size.md};
  color: ${theme.colors.secondary};
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 3px;
  font-size: 14px;
  letter-spacing: 0.05em;
  font-weight: bold;
  color: ${theme.colors.secondary};
`;
