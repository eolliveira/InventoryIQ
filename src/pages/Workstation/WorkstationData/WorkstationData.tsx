import React, { useContext, useEffect, useState } from 'react';

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
import { Workstation } from '../../../types/workstation';

import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SidePanelData from '../../../components/SidePanelData/SidePanelData';
import localeData from '../../../mocks/wokstation.json';
import { FormContext } from '../../../contexts/FormContext';

export default function WorkstationData() {
  const navigate = useNavigate();

  type urlParams = {
    workstationId: string;
  };

  const { workstationId } = useParams<urlParams>();
  const [active, setActive] = useState<Workstation>();

  const { formContextData, setFormContextData } = useContext(FormContext);

  useEffect(() => {
    console.log('evento useEffect WorkstationData');

    if (workstationId == 'create') {
      setFormContextData({
        isAdding: true,
      });
    }

    if (!(formContextData.isAdding || formContextData.isEditing)) {
      requestBackend({ url: `/workstation/${workstationId}` })
        .then((response) => {
          setActive(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if(formContextData.isAdding) {
      window.alert("esta adicionando")
      console.log('esta adicionando');
      
    }



    //setActive(localeData);
  }, [workstationId]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) =>
    setTabValue(newValue);

  const [tabValue, setTabValue] = useState('1');

  const handleAdd = () => {
    navigate('/workstation/create', { replace: true });
    setFormContextData({
      isAdding: true
    });
    console.log('evento para adicionar');
  };

  const handleEdit = () => {
    setFormContextData({
      isEditing: true,
    });
    //setIsEditing(true)
    console.log('evento para editar');
  };

  const handleRemove = () => {
    console.log('evento para remover');
  };

  const handleDuplicate = () => {
    console.log('evento para duplicar');
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-2">
        <SidePanelData
          nome={active?.usuario.nome}
          email={active?.usuario.email}
          status={active?.status}
          dtUltimoSincronismo={active?.dtUltimoSincronismo}
        />
      </ContainerSidePanel>
      <Container className="col-lg-10">
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
            <Text>{active?.id + ' - ' + active?.nome}</Text>
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              isDisabled={formContextData.isAdding || formContextData.isEditing}
              onClickAdd={handleAdd}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
            />

            <Button
              disabled={formContextData.isAdding || formContextData.isEditing}
              style={{
                color: 'white',
                backgroundColor: `${theme.colors.secondary}`,
                textTransform: 'none',
              }}
              variant="contained"
              startIcon={<SyncIcon />}
            >
              Sincronizar
            </Button>
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
            <WorkstationInterfaces teste={10} />
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
      </Container>
    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  border: 1px solid green;
  height: calc(100vh - 110px);

  @media (min-width: 992px) {
    flex-direction: row-reverse;
  }
`;

const HeaderWorkstation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const Container = styled.div`
  border: 1px solid red;
`;

const ContainerSidePanel = styled.div`
  border: 1px solid blue;
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
