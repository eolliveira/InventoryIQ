import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import { Licenca } from '../../../types/Licenca/Licenca';
import { ContainerSidePanel, CustomTab, Wapper } from './style';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import StockButton from '../../../components/buttons/StockButton';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import LicenseForm from './LicenseForm';
import LicenseDetails from './LicenseDetails';
import LicenseAsset from './LicenseAsset';
import LicenseSidePanel from '../../../components/LicenseSidePanel';
import AssignmentReturnedTwoToneIcon from '@mui/icons-material/AssignmentReturnedTwoTone';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel/TabPanel';

type urlParams = { licenseId: string };

export default function LicenseData() {
  const [openLicenseForm, setOpenLicenseForm] = useState(false);
  const { licenseId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [license, setLicense] = useState<Licenca>();
  const [tabValue, setTabValue] = useState('1');
  const navigate = useNavigate();

  const getLicenseData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/licenses/${licenseId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setLicense(response.data))
      .catch((error) => {
        Swal.fire({ title: 'Falha', text: 'Falha ao obter dados da Licença!', icon: 'warning' });
        console.log(error.response.data.message);
      });
  }, [licenseId, formContextData]);

  useEffect(() => getLicenseData(), [getLicenseData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => setTabValue(newValue);

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
      icon: 'question',
      title: `Deseja remover esta Licença?`,
      text: 'Todas as informações serão perdidas!',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
      denyButtonColor: '#4d4d4d',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/licenses/${license?.id}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({ title: 'Removido', text: 'Licença foi removida com sucesso!', icon: 'success' });
            navigate('/license');
          })
          .catch((error) => {
            Swal.fire({ title: 'Atenção', text: `${error.response.data.message}`, icon: 'warning' });
          });
      }
    });
  };

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
          <IconButton aria-label="back" size="medium" onClick={() => navigate('/license')}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography fontSize={16} fontWeight={'bold'} letterSpacing={0.7} color={'primary'} marginLeft={2} flex={1}>
            {(license ? license?.id : '') + ' - ' + (license ? license?.nome : '')}
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              fontSize={14}
              onClickAdd={handleAdd}
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
              backgroundColor: `white`,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <CustomTab value="1" label="Detalhes" iconPosition="start" icon={<TextSnippetTwoToneIcon />} />
                <CustomTab value="2" label="Alocado a" iconPosition="start" icon={<AssignmentReturnedTwoToneIcon />} />
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
        <LicenseForm licenseData={license} openForm={openLicenseForm} closeForm={() => setOpenLicenseForm(false)} />
      )}
    </Wapper>
  );
}
