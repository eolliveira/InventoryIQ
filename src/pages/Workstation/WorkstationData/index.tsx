import React, { useCallback, useContext, useEffect, useState } from 'react';

import TabContext from '@material-ui/lab/TabContext';
import styled from 'styled-components';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import WorkstationDetails from './WorkstationDetails';
import AssetMovements from '../../../components/Asset/AssetMovements';
import AssetLicense from '../../../components/Asset/AssetLicense';
import AssetService from '../../../components/Asset/AssetService';
import ProgressBarDisc from './WorkstationHardware';
import StockButton from '../../../components/buttons/StockButton';
import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { Workstation } from '../../../types/Ativo/Workstation/Workstation';
import TabPanel from '@material-ui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import AssetSidePanel from '../../../components/Asset/AssetSidePanel';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkstationForm from './WorkstationForm';
import Swal from 'sweetalert2';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';
import { ContainerSidePanel, CustomTab, Wapper } from './style';

type urlParams = { workstationId: string };

export default function WorkstationData() {
  const navigate = useNavigate();
  const [openWorkstationForm, setOpenWorkstationForm] = useState(false);
  const { workstationId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [workstation, setWorkstation] = useState<Workstation>();
  const [sweeping, setSweeping] = useState(false);
  const [tabValue, setTabValue] = useState('1');

  const getWorkstationData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/workstation/${workstationId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setWorkstation(response.data))
      .catch((error) => console.log(error));
  }, [workstationId, sweeping, formContextData]);

  useEffect(() => getWorkstationData(), [getWorkstationData]);

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenWorkstationForm(true);
  };

  const handleEdit = () => {
    setFormContextData({ isEditing: true });
    setOpenWorkstationForm(true);
  };

  const handleDuplicate = () => {
    setFormContextData({ isAdding: true, isDuplicated: true });
    setOpenWorkstationForm(true);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => setTabValue(newValue);

  const handleRemove = () => {
    Swal.fire({
      icon: 'question',
      title: `Deseja remover o ativo?`,
      text: 'Todas as informações e histórico de movimentos serão perdidas! ',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: `#dc3545`,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#4d4d4d',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/asset/${workstation?.id}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido',
              text: 'ativo removido com sucesso!',
              icon: 'success',
            });

            navigate('/workstation');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'warning',
            });
          });
      }
    });
  };

  const handleToSweep = () => {
    setSweeping(true);
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/workstation/${workstation?.id}/sweep`,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => Swal.fire('Sucesso', 'Dados do ativo foram sincronizados!', 'success'))
      .catch(() => {
        Swal.fire({
          title: 'Falha!',
          text: 'Não foi possivel sincronizar os dados do ativo!',
          icon: 'error',
        });
      })
      .finally(() => {
        setSweeping(false);
        setFormContextData({ isEditing: false });
      });
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <AssetSidePanel data={workstation ?? ({} as Workstation)} />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
          margin={'20px 0'}
        >
          <IconButton aria-label="back" size="medium" onClick={() => navigate('/workstation')}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography fontSize={16} fontWeight={'bold'} letterSpacing={0.7} color={'primary'} marginLeft={2} flex={1}>
            {(workstation ? workstation?.id : '') + ' - ' + (workstation ? workstation?.nome : '')}
          </Typography>
          <Stack spacing={2} flexWrap={`wrap`} direction="row">
            <StockButton
              fontSize={14}
              onClickAdd={handleAdd}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
              isDisabled={formContextData.isAdding || formContextData.isEditing}
            />
            <LoadingButton
              disabled={formContextData.isAdding || formContextData.isEditing}
              color="primary"
              onClick={handleToSweep}
              loading={sweeping}
              loadingPosition="start"
              startIcon={<SyncIcon />}
              variant="contained"
              size="small"
            >
              <Typography fontSize={14} textTransform={'none'}>
                Sincronizar
              </Typography>
            </LoadingButton>
          </Stack>
        </Box>
        <TabContext value={tabValue}>
          <AppBar position="static" style={{ boxShadow: 'none', backgroundColor: `white` }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <CustomTab value="1" label="Detalhes" iconPosition="start" icon={<TextSnippetTwoToneIcon />} />
                <CustomTab value="2" label="Hardware" iconPosition="start" icon={<MemoryTwoToneIcon />} />
                <CustomTab value="3" label="Movimentos" iconPosition="start" icon={<ChangeCircleTwoToneIcon />} />
                <CustomTab value="4" label="Licenças" iconPosition="start" icon={<WorkspacePremiumTwoToneIcon />} />
                <CustomTab value="5" label="Serviços" iconPosition="start" icon={<HandymanTwoToneIcon />} />
              </Tabs>
            </Box>
          </AppBar>
          <TabPanel style={{ padding: 0 }} value="1">
            <WorkstationDetails data={workstation} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <ProgressBarDisc assetId={workstation?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="3">
            <AssetMovements assetId={workstation?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="4">
            <AssetLicense assetId={workstation?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="5">
            <AssetService assetId={workstation?.id} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      {openWorkstationForm && (
        <WorkstationForm
          data={workstation}
          openForm={openWorkstationForm}
          closeForm={() => setOpenWorkstationForm(false)}
        />
      )}
    </Wapper>
  );
}
