import React, { useCallback, useContext, useEffect, useState } from 'react';

import TabContext from '@material-ui/lab/TabContext';
import { theme } from '../../../style/Theme';

import styled from 'styled-components';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import WorkstationDetails from './WorkstationDetails';
import WorkstationMovements from './WorkstationMovements';
import WorkstationLicenses from './WorkstationLicenses';
import WorkstationService from './WorkstationServices';
import WorkstationHardware from './WorkstationHardware';
import StockButton from '../../../components/buttons/StockButton';

import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { Workstation } from '../../../types/Workstation/Workstation';
import TabPanel from '@material-ui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SidePanelData from '../../../components/SidePanelData';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkstationForm from './WorkstationForm';
import Swal from 'sweetalert2';

export default function WorkstationData() {
  const [openWorkstationForm, setOpenWorkstationForm] = useState(false);

  type urlParams = {
    workstationId: string;
  };

  const { workstationId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [active, setActive] = useState<Workstation>();
  const [isSincronized, setSynchronizing] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const navigate = useNavigate();

  const getWorkstationData = useCallback(() => {
    requestBackend({ url: `/workstation/${workstationId}` })
      .then((response) => {
        setActive(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workstationId, isSincronized, formContextData]);

  useEffect(() => {
    getWorkstationData();
  }, [getWorkstationData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const handleAdd = () => {
    setFormContextData({
      isAdding: true,
    });
    setOpenWorkstationForm(true);
  };

  const handleEdit = () => {
    setFormContextData({
      isEditing: true,
    });
    setOpenWorkstationForm(true);
  };

  const handleRemove = () => {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover o ativo?`,
      text: 'Todas as informações e histórico de movimentos serão perdidas! ',
      showDenyButton: true,
      confirmButtonText: 'Salvar',
      confirmButtonColor: 'primary',
      denyButtonText: `Cancelar`,
      denyButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/active/${active?.id}`,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire('Salvou!', 'ativo removido com sucesso!', 'success');
            navigate('/workstation');
          })
          .catch((error) => {
            console.log('erro a remover ativo' + error);
          });
      }
    });
  };

  const handleDuplicate = () => {};

  const handleSync = () => {
    setSynchronizing(true);
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/workstation/${active?.id}/synchronize`,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire('Sucesso', 'Dados do ativo foram sincronizados!', 'success');
      })
      .catch((error) => {
        Swal.fire(
          'Falha!',
          'Não foi possivel sincronizar os dados do ativo!',
          'error'
        );
      })
      .finally(() => {
        setSynchronizing(false);
      });
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <SidePanelData data={active ?? ({} as Workstation)} />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <HeaderWorkstation>
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => navigate('/workstation')}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography
            fontWeight={'bold'}
            fontSize={16}
            marginLeft={2}
            variant="h5"
            flex={1}
          >
            <Typography
              fontSize={16}
              fontWeight={'bold'}
              letterSpacing={0.7}
              color={'primary'}
              variant="h2"
            >
              {(active ? active?.id : '') +
                ' - ' +
                (active ? active?.nome : '')}
            </Typography>
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              isDisabled={formContextData.isAdding || formContextData.isEditing}
              onClickAdd={handleAdd}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
            />
            <LoadingButton
              disabled={formContextData.isAdding || formContextData.isEditing}
              color="primary"
              onClick={handleSync}
              loading={isSincronized}
              loadingPosition="start"
              startIcon={<SyncIcon />}
              variant="contained"
            >
              <span style={{ textTransform: 'none' }}>Sincronizar</span>
            </LoadingButton>
          </Stack>
        </HeaderWorkstation>
        <TabContext value={tabValue}>
          <AppBar
            position="static"
            style={{
              boxShadow: 'none',
              backgroundColor: `${theme.colors.white}`,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <CustomTabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab
                  value="1"
                  label="Detalhes"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="2"
                  label="Hardware"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="3"
                  label="Movimentos"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="4"
                  label="Licenças"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="5"
                  label="Serviços"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
              </CustomTabs>
            </Box>
          </AppBar>
          <Panel value="1">
            <WorkstationDetails data={active} />
          </Panel>
          <Panel value="2">
            <WorkstationHardware teste={10} />
          </Panel>
          <Panel value="3">
            <WorkstationMovements workstationId={active?.id} />
          </Panel>
          <Panel value="4">
            <WorkstationLicenses teste={10} />
          </Panel>
          <Panel value="5">
            <WorkstationService workstationId={active?.id} />
          </Panel>
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

const HeaderWorkstation = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const ContainerSidePanel = styled.div`
  //border: 1px solid blue;

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

const Panel = styled(TabPanel)`
  padding: 0 !important;
`;

const CustomTabs = styled(Tabs)`
  .Mui-selected {
    color: ${theme.colors.secondary};
  }

  .MuiTabs-indicator {
    background-color: ${theme.colors.secondary};
  }
`;
