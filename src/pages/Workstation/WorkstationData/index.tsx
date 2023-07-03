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
import { Workstation } from '../../../types/Workstation/Workstation';
import TabPanel from '@material-ui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';

export default function WorkstationData() {
  const [openWorkstationForm, setOpenWorkstationForm] = useState(false);

  type urlParams = {
    workstationId: string;
  };

  const { workstationId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [active, setActive] = useState<Workstation>();
  const [sweeping, setSweeping] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const navigate = useNavigate();

  const getWorkstationData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/workstation/${workstationId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setActive(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workstationId, sweeping, formContextData]);

  useEffect(() => {
    getWorkstationData();
  }, [getWorkstationData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenWorkstationForm(true);
  };

  const handleEdit = () => {
    setFormContextData({ isEditing: true });
    setOpenWorkstationForm(true);
  };

  const handleRemove = () => {
    Swal.fire({
      icon: 'question',
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
          url: `/active/${active?.id}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido',
              text: 'ativo removido com sucesso!',
              icon: 'success',
              confirmButtonColor: '#999999',
            });

            navigate('/workstation');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'warning',
              confirmButtonColor: '#999999',
            });
          });
      }
    });
  };

  const handleDuplicate = () => {};

  const handleToSweep = () => {
    setSweeping(true);
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/workstation/${active?.id}/sweep`,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() =>
        Swal.fire('Sucesso', 'Dados do ativo foram sincronizados!', 'success')
      )
      .catch(() => {
        Swal.fire({
          title: 'Falha!',
          text: 'Não foi possivel sincronizar os dados do ativo!',
          icon: 'error',
          confirmButtonColor: '#999999',
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
        <AssetSidePanel data={active ?? ({} as Workstation)} />
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
            onClick={() => navigate('/workstation')}
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
            {(active ? active?.id : '') + ' - ' + (active ? active?.nome : '')}
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
          <AppBar
            position="static"
            style={{
              boxShadow: 'none',
              backgroundColor: `white`,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <CustomTab
                  value="1"
                  label="Detalhes"
                  iconPosition="start"
                  icon={<TextSnippetTwoToneIcon />}
                />
                <CustomTab
                  value="2"
                  label="Hardware"
                  iconPosition="start"
                  icon={<MemoryTwoToneIcon />}
                />
                <CustomTab
                  value="3"
                  label="Movimentos"
                  iconPosition="start"
                  icon={<ChangeCircleTwoToneIcon />}
                />
                <CustomTab
                  value="4"
                  label="Licenças"
                  iconPosition="start"
                  icon={<WorkspacePremiumTwoToneIcon />}
                />
                <CustomTab
                  value="5"
                  label="Serviços"
                  iconPosition="start"
                  icon={<HandymanTwoToneIcon />}
                />
              </Tabs>
            </Box>
          </AppBar>
          <TabPanel style={{ padding: 0 }} value="1">
            <WorkstationDetails data={active} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <ProgressBarDisc assetId={active?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="3">
            <AssetMovements assetId={active?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="4">
            <AssetLicense assetId={active?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="5">
            <AssetService assetId={active?.id} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      {openWorkstationForm && (
        <WorkstationForm
          data={active}
          openForm={openWorkstationForm}
          closeForm={() => setOpenWorkstationForm(false)}
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
