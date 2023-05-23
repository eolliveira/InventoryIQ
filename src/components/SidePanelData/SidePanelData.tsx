import { theme } from '../../style/Theme';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toDateTime } from '../../utils/Date';
import { toCamelCase } from '../../utils/Converter';
import { FormContext } from '../../contexts/FormContext';
import { BaseCard, Field, Input, Label } from '../../style/GlobalStyles';

import Box from '@mui/material/Box';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChangeStateModal from '../ChangeStateModal/ChangeStateModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeUserModal from '../../components/ChangeUserModal/ChangeUserModal';
import ChangeLocationModal from '../../components/ChangeLocationModal/ChangeLocationModal';
import { Workstation } from 'types/Workstation/Workstation';
import ChangeNfEntradaModal from '../../components/ChangeNfEntradaModal/ChangeNfEntradaModal';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../http/requests';
import { NotaFiscalEntrada } from 'types/NotaFiscalEntrada/NotaFiscalEntrada';
import { formatarMoeda } from '../../utils/CurrencyConverter';

type SidePanelDataProps = {
  data: Workstation;
};

export default function SidePanelData({ data }: SidePanelDataProps) {
  const { setFormContextData } = useContext(FormContext);
  const [nfEntrada, setNfEntrada] = useState<NotaFiscalEntrada>();
  const [openChangeStateModal, setOpenChangeStateModal] = useState(false);
  const [openChangeUserModal, setOpenChangeUserModal] = useState(false);
  const [openChangeLocationModal, setOpenChangeLocationModal] = useState(false);
  const [openChangeNfEntradaModal, setOpenChangeNfEntradaModal] =
    useState(false);

  const getNfEntrada = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/nfEntrada/${data.idNfEntrada}`,
    };

    requestBackend(params)
      .then((response) => {
        setNfEntrada(response.data);
      })
      .catch((error) => {
        window.alert('TESTE' + error.response.data.message);
      });
  }, [data]);

  useEffect(() => {
    if (data.idNfEntrada) getNfEntrada();
  }, [getNfEntrada]);

  return (
    <Wapper>
      <HeaderContainer>
        <DateContainer>
          <Field className="mb-2">
            <Label htmlFor="ultmSinc">Ultimo Sincronismo</Label>
            <Input
              id="ultmSinc"
              onChange={(e) => {}}
              value={
                data.dtUltimoSincronismo
                  ? toDateTime(data.dtUltimoSincronismo)
                  : ''
              }
            />
          </Field>
        </DateContainer>
        <Box>
          <Typography fontSize={13} variant="subtitle2">
            Status
          </Typography>
          <Status>
            <Text>{data.status}</Text>
            <IconButton
              onClick={(e) => {
                setOpenChangeStateModal(true);
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
      <Typography marginTop={1} fontSize={13} variant="subtitle2">
        Atribuido a
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
              {(data.usuario &&
                data.usuario.nome &&
                toCamelCase(data.usuario.nome)) ||
                ' - '}
            </Typography>
            <Typography color={'primary'} fontSize={12} variant="subtitle2">
              {data.usuario ? data.usuario.email : ' - '}
            </Typography>
          </Box>

          <IconButton
            onClick={(e) => {
              setOpenChangeUserModal(true);
              setFormContextData({
                isEditing: true,
              });
            }}
            aria-label="delete"
            size="small"
          >
            <EditIcon color="action" fontSize="small" />
          </IconButton>
        </Box>
      </Card>
      <Typography marginTop={1} fontSize={13} variant="subtitle2">
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
            {data.localIndustria
              ? (data.localIndustria.id ? data.localIndustria.id : '') +
                ' - ' +
                (data.localIndustria.dsLocalIndustria
                  ? toCamelCase(data.localIndustria.dsLocalIndustria)
                  : '')
              : ' - '}
          </Typography>

          <IconButton
            onClick={(e) => {
              setOpenChangeLocationModal(true);
              setFormContextData({
                isEditing: true,
              });
            }}
          >
            <EditIcon color="action" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={13} variant="subtitle2">
            Centro de custo
          </Typography>
          <Typography color={'primary'} fontSize={12} variant="subtitle2">
            {data.localIndustria &&
              data.localIndustria.centroCusto &&
              data.localIndustria.centroCusto.id +
                ' - ' +
                toCamelCase(
                  data.localIndustria.centroCusto.descricaoCentroCusto
                )}
          </Typography>
        </Box>
      </Card>
      <Typography marginTop={1} fontSize={13} variant="subtitle2">
        Nota Fiscal
      </Typography>
      <Card>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography fontSize={13} variant="subtitle2">
              Numero nota fiscal
            </Typography>
            <Typography color={'primary'} fontSize={12} variant="subtitle2">
              {nfEntrada?.nrNotaFiscal}
            </Typography>
          </Box>

          <IconButton
            onClick={(e) => {
              setOpenChangeNfEntradaModal(true);
              setFormContextData({
                isEditing: true,
              });
            }}
            aria-label="delete"
            size="small"
          >
            <EditIcon color="action" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={13} variant="subtitle2">
            Fornecedor
          </Typography>
          <Typography color={'primary'} fontSize={12} variant="subtitle2">
            {nfEntrada?.pessoa &&
              nfEntrada?.pessoa.id + ' - ' + nfEntrada?.pessoa.razaoSocial}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={13} variant="subtitle2">
            Valor da nota
          </Typography>
          <Typography color={'primary'} fontSize={12} variant="subtitle2">
            {nfEntrada?.valorNotaFiscal &&
              formatarMoeda(nfEntrada.valorNotaFiscal)}
          </Typography>
        </Box>
      </Card>
      {openChangeStateModal && (
        <ChangeStateModal
          assetId={data.id}
          openForm={openChangeStateModal}
          closeForm={() => setOpenChangeStateModal(false)}
        />
      )}

      {openChangeUserModal && (
        <ChangeUserModal
          assetId={data.id}
          openForm={openChangeUserModal}
          closeForm={() => setOpenChangeUserModal(false)}
        />
      )}

      {openChangeLocationModal && (
        <ChangeLocationModal
          assetId={data.id}
          openForm={openChangeLocationModal}
          closeForm={() => setOpenChangeLocationModal(false)}
        />
      )}

      {openChangeNfEntradaModal && (
        <ChangeNfEntradaModal
          assetId={data.id}
          openForm={openChangeNfEntradaModal}
          closeForm={() => setOpenChangeNfEntradaModal(false)}
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
