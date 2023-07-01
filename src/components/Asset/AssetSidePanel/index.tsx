import { useCallback, useContext, useEffect, useState } from 'react';
import { toDateTime } from '../../../utils/DateConverter';
import { toCamelCase } from '../../../utils/StringConverter';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChangeStateModal from '../ChangeAssetStateModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeUserModal from '../ChangeUserModal';
import ChangeLocationModal from '../ChangeLocationModal';
import ChangeNfEntradaModal from '../../ChangeNfEntradaModal';
import { Workstation } from 'types/Workstation/Workstation';
import { requestBackend } from '../../../http/requests';
import { NotaFiscalEntrada } from 'types/NotaFiscalEntrada/NotaFiscalEntrada';
import { formatCurrency } from '../../../utils/CurrencyConverter';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Stack from '@mui/material/Stack';
import AssetStatusStyle from '../AssetStatusStyle';
import Card from '@mui/material/Card';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Printer } from '../../../types/Printer/Printer';
import { Nobreak } from '../../../types/Nobreak';
import { Mobile } from 'types/Mobile';

type AssetSidePanelProps = {
  data: Printer | Workstation | Nobreak | Mobile;
};

export default function AssetSidePanel({ data }: AssetSidePanelProps) {
  const { setFormContextData } = useContext(FormContext);
  const [nfEntrada, setNfEntrada] = useState<NotaFiscalEntrada>();
  const [openChangeStateModal, setOpenChangeStateModal] = useState(false);
  const [openChangeUserModal, setOpenChangeUserModal] = useState(false);
  const [openChangeLocationModal, setOpenChangeLocationModal] = useState(false);
  const [openChangeNfEntradaModal, setOpenChangeNfEntradaModal] =
    useState(false);

  const getNfEntrada = useCallback(() => {
    requestBackend({ url: `/nfEntrada/${data.idNfEntrada}` })
      .then((response) => setNfEntrada(response.data))
      .catch((error) => window.alert(error.response.data.message));
  }, [data]);

  useEffect(() => {
    if (data.idNfEntrada) getNfEntrada();
  }, [getNfEntrada]);

  return (
    <Wapper>
      <HeaderContainer>
        {'dhUltimaVarredura' in data && (
          <Box>
            <Typography color={'primary'} fontWeight={'bold'} fontSize={14}>
              Ultimo Sincronismo
            </Typography>
            <Stack
              marginBottom={1.5}
              marginTop={0.2}
              direction={'row'}
              spacing={1}
            >
              <EventRepeatIcon fontSize="small" color="secondary" />
              <Typography style={{ marginTop: 2 }} fontSize={13}>
                {data.dhUltimaVarredura
                  ? toDateTime(data.dhUltimaVarredura)
                  : ' - '}
              </Typography>
            </Stack>
          </Box>
        )}
        <Box>
          <Typography
            marginBottom={0.5}
            color={'primary'}
            fontWeight={'bold'}
            fontSize={14}
          >
            Status
          </Typography>
          <AssetStatusStyle
            key={data.id}
            clickable
            handleClick={() => setOpenChangeStateModal(true)}
            size="medium"
            status={data.status}
          />
        </Box>
      </HeaderContainer>
      <Divider sx={{ marginTop: 2, marginBottom: 1 }} color="#d9d9d9" />
      {!('potencialNominal' in data) && !('totalImpressoes' in data) && (
        <>
          <Typography color={'primary'} fontWeight={'bold'} fontSize={14}>
            Atribuido a
          </Typography>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
            }}
          >
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-around'}
              alignItems={'center'}
            >
              <AccountCircleIcon
                color="secondary"
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
                <Typography
                  color={'secondary'}
                  fontSize={12}
                  variant="subtitle2"
                >
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
                <EditTwoToneIcon color="primary" fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        </>
      )}
      <Typography
        marginTop={1}
        color={'primary'}
        fontWeight={'bold'}
        fontSize={14}
      >
        Local da Industria
      </Typography>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #e9e9e9',
          borderRadius: 2,
          padding: 1.5,
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-around'}
          flexWrap={'wrap'}
          alignItems={'center'}
        >
          <LocationOnIcon
            style={{ marginRight: 5 }}
            color="secondary"
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
            <EditTwoToneIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} fontSize={13} variant="subtitle2">
            Centro de custo
          </Typography>
          <Typography color={'secondary'} fontSize={12} variant="subtitle2">
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
      <Typography
        marginTop={1}
        color={'primary'}
        fontWeight={'bold'}
        fontSize={14}
      >
        Nota Fiscal
      </Typography>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #e9e9e9',
          borderRadius: 2,
          padding: 1.5,
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={'bold'} fontSize={13} variant="subtitle2">
              Numero nota fiscal
            </Typography>
            <Typography color={'secondary'} fontSize={12} variant="subtitle2">
              {nfEntrada?.nrNotaFiscal ? nfEntrada.nrNotaFiscal : ' - '}
            </Typography>
          </Box>

          <IconButton
            onClick={() => {
              setOpenChangeNfEntradaModal(true);
              setFormContextData({
                isEditing: true,
              });
            }}
            size="small"
          >
            <EditTwoToneIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} fontSize={13} variant="subtitle2">
            Fornecedor
          </Typography>
          <Typography color={'secondary'} fontSize={12} variant="subtitle2">
            {nfEntrada?.pessoa
              ? nfEntrada?.pessoa.id + ' - ' + nfEntrada?.pessoa.razaoSocial
              : ' - '}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} color="#d9d9d9" />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} fontSize={13} variant="subtitle2">
            Valor da nota
          </Typography>
          <Typography color={'secondary'} fontSize={12} variant="subtitle2">
            {nfEntrada?.valorNotaFiscal
              ? formatCurrency(nfEntrada.valorNotaFiscal)
              : ' - '}
          </Typography>
        </Box>
      </Card>
      {openChangeStateModal && (
        <ChangeStateModal
          assetId={data.id}
          openModal={openChangeStateModal}
          closeModal={() => setOpenChangeStateModal(false)}
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
          openModal={openChangeLocationModal}
          closeModal={() => setOpenChangeLocationModal(false)}
        />
      )}

      {openChangeNfEntradaModal && (
        <ChangeNfEntradaModal
          license={false}
          assetId={data.id}
          openModal={openChangeNfEntradaModal}
          closeModal={() => setOpenChangeNfEntradaModal(false)}
        />
      )}
    </Wapper>
  );
}

const Wapper = styled(BaseCard)`
  height: 100%;
  padding: 12px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
