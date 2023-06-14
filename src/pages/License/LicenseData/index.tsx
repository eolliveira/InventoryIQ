import React, { useCallback, useContext, useEffect, useState } from 'react';

import TabContext from '@material-ui/lab/TabContext';
import { theme } from '../../../style/Theme';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import StockButton from '../../../components/buttons/StockButton';
import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import TabPanel from '@material-ui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { Licenca } from '../../../types/Licenca/Licenca';
import LicenseForm from './LicenseForm';
import LicenseDetails from './LicenseDetails';
import LicenseAsset from './LicenseAsset';
import LicenseSidePanel from '../../../components/LicenseSidePanel';

export default function LicenseData() {
  const [openLicenseForm, setOpenLicenseForm] = useState(false);

  type urlParams = {
    licenseId: string;
  };

  const { licenseId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [license, setLicense] = useState<Licenca>();
  const [tabValue, setTabValue] = useState('1');
  const navigate = useNavigate();

  const getLicenseData = useCallback(() => {
    requestBackend({ url: `/licenses/${licenseId}` })
      .then((response) => {
        setLicense(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [licenseId, formContextData]);

  useEffect(() => {
    getLicenseData();
  }, [getLicenseData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenLicenseForm(true);
  };

  const handleEdit = () => {
    setFormContextData({ isEditing: true });
    setOpenLicenseForm(true);
  };

  const handleRemove = () => {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover o ativo?`,
      text: 'Todas as informações e histórico de movimentos serão perdidas! ',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: `#dc3545`,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#999999',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/active/${license?.id}`,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire('Removido!', 'ativo removido com sucesso!', 'success');
            navigate('/workstation');
          })
          .catch(() =>
            Swal.fire('Falha!', 'Não foi possivel remover o ativo!', 'error')
          );
      }
    });
  };

  const handleDuplicate = () => {};

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <LicenseSidePanel license={license ?? ({} as Licenca)} />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
          margin={'20px 0'}
        >
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => navigate('/license')}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>

          <Typography
            fontSize={16}
            fontWeight={'bold'}
            letterSpacing={0.7}
            color={'primary'}
            marginLeft={2}
            flex={1}
          >
            {(license ? license?.id : '') +
              ' - ' +
              (license ? license?.nome : '')}
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              fontSize={14}
              onClickAdd={handleAdd}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
              isDisabled={formContextData.isAdding || formContextData.isEditing}
            />
          </Stack>
        </Box>
        <TabContext value={tabValue}>
          <AppBar
            position="static"
            style={{
              boxShadow: 'none',
              backgroundColor: `${theme.colors.white}`,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <CustomTab value="1" label="Detalhes" />
                <CustomTab value="2" label="Alocado a" />
              </Tabs>
            </Box>
          </AppBar>
          <TabPanel style={{ padding: 0 }} value="1">
            <LicenseDetails data={license} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <LicenseAsset licenseId={license?.id} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      {openLicenseForm && (
        <LicenseForm
          licenseData={license}
          openForm={openLicenseForm}
          closeForm={() => setOpenLicenseForm(false)}
        />
      )}
    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  height: calc(100vh - 110px);

  @media (min-width: 991px) {
    flex-direction: row-reverse;
  }
`;

const CustomTab = styled(Tab)`
  font-size: small !important;
  text-transform: none !important;
`;

const ContainerSidePanel = styled.div`
  padding: 0px;
  margin-bottom: 4px;

  @media (min-width: 1100px) {
    margin-bottom: 0px;
  }

  @media (min-width: 991px) {
    margin-bottom: 0px;
    padding: 0px 0px 0px 4px;
  }
`;
