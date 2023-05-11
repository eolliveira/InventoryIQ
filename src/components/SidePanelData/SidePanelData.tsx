import { theme } from '../../style/Theme';
import { BaseCard, Field, Input, Label } from '../../style/GlobalStyles';

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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';

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
  nome,
  email,
  dtUltimoSincronismo,
}: SidePanelDataProps) {
  const { setFormContextData } = useContext(FormContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Wapper>
      <HeaderContainer>
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

        <Box>
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
              <EditIcon color="action" fontSize="inherit" />
            </IconButton>
          </Status>
        </Box>
      </HeaderContainer>
      <Divider sx={{ marginTop: 2, marginBottom: 1 }} color="#d9d9d9" />
      <Typography marginTop={2} fontSize={13} variant="subtitle2">
        Usuário
      </Typography>
      <Card>
        <Box
          display={'flex'}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <AccountCircleIcon
            color="action"
            fontSize="medium"
            sx={{ marginRight: 1 }}
          />
          <Box
            display={'flex'}
            flex={1}
            flexDirection={'column'}
            justifyContent={'flex-start'}
          >
            <Typography color={'primary'} fontSize={14} variant="subtitle2">
              {toCamelCase(nome ? nome : '')}
            </Typography>
            <Typography color={'primary'} fontSize={13} variant="subtitle2">
              {email ? email : ''}
            </Typography>
          </Box>
          <EditIcon color="action" fontSize="small" />
        </Box>
      </Card>
      <Typography marginTop={2} fontSize={13} variant="subtitle2">
        Local da Industria
      </Typography>

      <Card>
        <Box
          display={'flex'}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <LocationOnIcon
            style={{ marginRight: 5 }}
            color="action"
            fontSize="medium"
          />
          <Typography
            color={'primary'}
            flex={1}
            fontSize={13}
            marginTop={0.5}
            variant="subtitle2"
          >
            124 - Comercial
          </Typography>
          <EditIcon color="action" fontSize="small" />
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={13} variant="subtitle2">
            Centro de custo
          </Typography>
          <Typography color={'primary'} fontSize={12} variant="subtitle2">
            70 - Tecnologia da informação
          </Typography>
        </Box>
      </Card>

      <Typography marginTop={2} fontSize={13} variant="subtitle2">
        Nota Fiscal
      </Typography>

      <Card>
        <Box display={'flex'} flexDirection={'column'}>
        <Typography fontSize={13} variant="subtitle2">
            Centro de custo
          </Typography>


          <Typography  fontSize={13} variant="subtitle2">
        Nota Fiscal
      </Typography>

              


        </Box>
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Card = styled(Box)`
  border-radius: 8px;
  border: 1px solid ${theme.colors.primary};
  padding: 12px;
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
