import React, { useCallback, useContext, useEffect, useState } from 'react';

import TabContext from '@material-ui/lab/TabContext';
import { theme } from '../../../style/Theme';

import styled from 'styled-components';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import WorkstationDetails from './WorkstationDetails/WorkstationDetails';
import WorkstationMovements from './WorkstationMovements/WorkstationMovements';
import WorkstationLicenses from './WorkstationLicenses/WorkstationLicenses';
import WorkstationMaintenance from './WorkstationMaintenance/WorkstationMaintenance';
import WorkstationHardware from './WorkstationHardware/WorkstationHardware';
import WorkstationInterfaces from './WorkstationInterfaces/WorkstationInterfaces';
import StockButton from '../../../components/StockButton/StockButon';

import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { Workstation } from '../../../types/Workstation';

import TabPanel from '@material-ui/lab/TabPanel';

import Stack from '@mui/material/Stack';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SidePanelData from '../../../components/SidePanelData/SidePanelData';
import localeData from '../../../mocks/wokstation.json';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { log } from 'console';
import { AxiosRequestConfig } from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WorkstationData() {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  ////


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
    //setActive(localeData);

    if(workstationId == 'create' && !formContextData.isAdding) {
      navigate('/workstation')
    }


    if(!formContextData.isAdding && workstationId !== undefined && workstationId !== 'create'){
      getWorkstationData();
    }
   
  }, [getWorkstationData]);



  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) =>
    setTabValue(newValue);

  const handleAdd = () => {
    // setFormContextData({
    //   isAdding: true,
    //   isChangingForm: true
    // });

    // navigate('/workstation/create')
  };

  const handleEdit = () => {
    setFormContextData({
      isEditing: true,
      isChangingForm: true
    });
    console.log('evento StockButton para editar');
  };

  const handleRemove = () => {
    if (!window.confirm('Deseja remover o ativo?')) {
      return;
    }

    const params: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/active/${active?.id}`,
    };

    requestBackend(params)
      .then(() => {
        console.log('ativo removido com sucesso!');
        window.alert('ativo removido com sucesso!');
        navigate('/workstation');
      })
      .catch((error) => {
        console.log('erro a remover ativo' + error);
      });
  };

  const handleDuplicate = () => {
    console.log('evento StockButton para duplicar');
  };

  const handleSync = () => {
    setSynchronizing(true);
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/workstation/${active?.id}/synchronize`,
    };

    requestBackend(params)
      .then(() => {
        console.log('sucesso no sincronismo');
        window.alert('Sucesso ao sincronizar dados do ativo!');
      })
      .catch((error) => {
        console.log('sucesso no sincronismo' + error);
      })
      .finally(() => {
        setSynchronizing(false);
      });
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <SidePanelData
          nome={active?.usuario.nome}
          email={active?.usuario.email}
          status={active?.status}
          dtUltimoSincronismo={active?.dtUltimoSincronismo}
        />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <HeaderWorkstation>
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => navigate('/workstation')}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            fontWeight={'bold'}
            fontSize={16}
            marginLeft={2}
            variant="h5"
            flex={1}
          >
            <Text>{(active ? active?.id : '')  + ' - ' + (active ? active?.nome : '')}</Text>
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              isDisabled={formContextData.isAdding || formContextData.isEditing}
              onClickAdd={handleOpen}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
            />
            <LoadButton
              disabled={formContextData.isAdding || formContextData.isEditing}
              color="secondary"
              onClick={handleSync}
              loading={isSincronized}
              loadingPosition="start"
              startIcon={<SyncIcon />}
              variant="contained"
            >
              <span>Sincronizar</span>
            </LoadButton>
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
                textColor="inherit"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                style={{ color: `${theme.colors.black}` }}
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
                  label="Interfaces"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="4"
                  label="Movimentos"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="5"
                  label="Licenças"
                  style={{
                    fontSize: `${theme.size.sm}`,
                    textTransform: 'none',
                  }}
                />
                <Tab
                  value="6"
                  label="Manutenção"
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
            <WorkstationInterfaces workstationId={active?.id} />
          </Panel>
          <Panel value="4">
            <WorkstationMovements teste={10} />
          </Panel>
          <Panel value="5">
            <WorkstationLicenses teste={10} />
          </Panel>
          <Panel value="6">
            <WorkstationMaintenance teste={10} />
          </Panel>
        </TabContext>
      </BaseCard>
      {/* --------- */}


      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>


    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  //border: 1px solid green;
  height: calc(100vh - 110px);

  @media (min-width: 991px) {
    flex-direction: row-reverse;
  }
`;

const HeaderWorkstation = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const Card = styled(BaseCard)`
  @media (min-width: 1474px) {
    margin-left: 4px;
  }
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

const Text = styled.p`
  font-size: ${theme.size.lg};
  color: ${theme.colors.secondary};
  font-weight: bold;
  margin: 0;
`;

const Panel = styled(TabPanel)`
  margin: 0;
  padding: 0;
`;

const CustomTabs = styled(Tabs)`
  .Mui-selected {
    color: ${theme.colors.secondary};
  }

  .MuiTabs-indicator {
    background-color: ${theme.colors.secondary};
  }
`;

const LoadButton = styled(LoadingButton)`
  color: white !important;
  background-color: ${theme.colors.secondary} !important;
  text-transform: none !important;
`;
