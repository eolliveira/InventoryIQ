import { theme } from '../../style/Theme';
import { BaseCard, Field, Input, Label } from '../../style/GlobalStyles';

import Box from '@mui/material/Box';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { toDateTime } from '../../utils/Date';
import ChangeStateModal from '../ChangeStateModal/ChangeStateModal';
import { useContext, useState } from 'react';
import { FormContext } from '../../contexts/FormContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { toCamelCase } from '../../utils/Converter';
import Divider from '@mui/material/Divider';

type SidePanelDataProps = {
  nome?: string;
  email?: string;
  status?: string;
  assetId?: string;
  dtUltimoSincronismo: string;
};

export default function SidePanelData({
  status,
  assetId,
  dtUltimoSincronismo,
  nome,
  email,
}: SidePanelDataProps) {
  const { setFormContextData } = useContext(FormContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Wapper>
      <Container>
        <DateContainer>
          <Field className="mb-2">
            <Label htmlFor="ultmSinc">Ultimo Sincronismo</Label>
            <Input
              id="ultmSinc"
              onChange={(e) => {}}
              value={dtUltimoSincronismo ? toDateTime(dtUltimoSincronismo) : ''}
            />
          </Field>
        </DateContainer>
        <div>
          <Typography fontSize={13} variant="subtitle2">
            Status
          </Typography>
          <Status>
            <Text>{status}</Text>
            <IconButton
              onClick={(e) => {
                setOpenModal(true);
                setFormContextData({
                  isEditing: true,
                });
              }}
              aria-label="delete"
              size="small"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Status>
        </div>
      </Container>
      <Divider sx={{ marginTop: 2, marginBottom: 1 }} color="#d9d9d9" />
      <Typography fontSize={13} variant="subtitle2">
        Usuário
      </Typography>
      <Card>
        <AccountCircleIcon
          color="primary"
          fontSize="large"
          sx={{ marginRight: 1 }}
        />
        <Content>
          <Typography fontSize={14} variant="subtitle2">
            {toCamelCase(nome ? nome : '')}
          </Typography>
          <Typography fontSize={13} variant="subtitle2">
            {email ? email : ''}
          </Typography>
        </Content>
        <EditIcon color="primary" fontSize="small" />
      </Card>
      {openModal && (
        <ChangeStateModal
          assetId={assetId}
          openForm={openModal}
          closeForm={() => setOpenModal(false)}
        />
      )}
    </Wapper>
  );
}

const Wapper = styled(BaseCard)`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DateContainer = styled.div`
  max-width: 150px;
`;

const Status = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  border-radius: 3px;
  background: #65d59f;
  padding: 1.5px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0px 5px;
  text-align: center;
  margin-top: 5px;
  font-size: 13px;
  font-weight: bold;
  color: ${theme.colors.secondary};
`;

///////

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid ${theme.colors.primary};
  padding: 7px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;
