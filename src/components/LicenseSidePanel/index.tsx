import { useCallback, useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/FormContext';
import { BaseCard } from '../../style/GlobalStyles';

import Box from '@mui/material/Box';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChangeNfEntradaModal from '../ChangeNfEntradaModal';
import ChangeStateModal from '../Asset/ChangeAssetStateModal';
import LicenseStatusStyle from '../../components/LicenseStatusStyle';
import { requestBackend } from '../../http/requests';
import { NotaFiscalEntrada } from 'types/NotaFiscalEntrada/NotaFiscalEntrada';
import { formatCurrency } from '../../utils/CurrencyConverter';
import { Licenca } from '../../types/Licenca/Licenca';

type LicenseSidePanelProps = {
  license: Licenca;
};

export default function LicenseSidePanel({ license }: LicenseSidePanelProps) {
  const { setFormContextData } = useContext(FormContext);
  const [nfEntrada, setNfEntrada] = useState<NotaFiscalEntrada>();
  const [openChangeStateModal, setOpenChangeStateModal] = useState(false);
  const [openChangeNfEntradaModal, setOpenChangeNfEntradaModal] =
    useState(false);

  const getNfEntrada = useCallback(() => {
    requestBackend({ url: `/nfEntrada/${license.idNfEntrada}` })
      .then((response) => {
        setNfEntrada(response.data);
      })
      .catch((error) => window.alert(error.response.data.message));
  }, [license]);

  useEffect(() => {
    if (license.idNfEntrada) getNfEntrada();
  }, [getNfEntrada]);

  return (
    <Wapper>
      <HeaderContainer>
        <Box>
          <Typography
            marginBottom={0.5}
            color={'primary'}
            fontWeight={'bold'}
            fontSize={14}
          >
            Status
          </Typography>
          <LicenseStatusStyle
            key={license.id}
            size="medium"
            status={license.status}
          />
        </Box>
      </HeaderContainer>
      <Divider sx={{ marginTop: 2, marginBottom: 1 }} color="#d9d9d9" />
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
            onClick={(e) => {
              setOpenChangeNfEntradaModal(true);
              setFormContextData({
                isEditing: true,
              });
            }}
            size="small"
          >
            <EditIcon color="primary" fontSize="small" />
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
          assetId={license.id}
          openModal={openChangeStateModal}
          closeModal={() => setOpenChangeStateModal(false)}
        />
      )}

      {openChangeNfEntradaModal && (
        <ChangeNfEntradaModal
          license
          assetId={license.id}
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
