import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import { theme } from '../../../style/Theme';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TabPanel from '@material-ui/lab/TabPanel';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';
import WorkstationDetails from './WorkstationDetails/WorkstationDetails';
import WorkstationMovements from './WorkstationMovements/WorkstationMovements';
import WorkstationLicenses from './WorkstationLicenses/WorkstationLicenses';
import WorkstationMaintenance from './WorkstationMaintenance/WorkstationMaintenance';
import WorkstationHardware from './WorkstationHardware/WorkstationHardware';
import WorkstationInterfaces from './WorkstationInterfaces/WorkstationInterfaces';

import StockButton from '../../../components/StockButton';
import { Link, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { Workstation } from '../../../types/Workstation';

export default function WorkstationData() {
  type urlParams = {
    workstationId: string;
  };

  const { workstationId } = useParams<urlParams>();

  const [active, setActive] = useState<Workstation>();

  useEffect(() => {
    requestBackend({ url: `/workstation/${workstationId}` })
      .then((response) => {
        setActive(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workstationId]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) =>
    setTabValue(newValue);

  const [tabValue, setTabValue] = useState('1');

  const handleAdd = () => {
    console.log('evento para adicionar');
  };

  const handleEdit = () => {
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
      <Container className="col-lg-10">
        <HeaderWorkstation>
          <CustomLink to={'/workstation'}>
            <IconButton size="large" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
          </CustomLink>
          <Typography
            fontWeight={'bold'}
            fontSize={16}
            marginLeft={2}
            variant="h5"
            flex={1}
          >
            {active?.id + ' - ' + active?.nome}
          </Typography>
          <Stack spacing={2} direction="row">
            <StockButton
              onClickAdd={handleAdd}
              onClickDuplicate={handleDuplicate}
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
            />

            <Button
              style={{
                color: 'white',
                backgroundColor: `${theme.colors.secondary}`,
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
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              {/* refatorar */}
              <Tab
                value="1"
                label="Detalhes"
                style={{ fontSize: `${theme.size.sm}` }}
              />
              <Tab
                value="2"
                label="Hardware"
                style={{ fontSize: `${theme.size.sm}` }}
              />
              <Tab
                value="3"
                label="Interfaces"
                style={{ fontSize: `${theme.size.sm}` }}
              />
              <Tab
                value="4"
                label="Movimentos"
                style={{ fontSize: `${theme.size.sm}` }}
              />
              <Tab
                value="5"
                label="Licenças"
                style={{ fontSize: `${theme.size.sm}` }}
              />
              <Tab
                value="6"
                label="Manutenção"
                style={{ fontSize: `${theme.size.sm}` }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value="1">
            <WorkstationDetails teste={10} />
          </TabPanel>
          <TabPanel value="2">
            <WorkstationHardware teste={10} />
          </TabPanel>
          <TabPanel value="3">
            <WorkstationInterfaces teste={10} />
          </TabPanel>
          <TabPanel value="4">
            <WorkstationMovements teste={10} />
          </TabPanel>
          <TabPanel value="5">
            <WorkstationLicenses teste={10} />
          </TabPanel>
          <TabPanel value="6">
            <WorkstationMaintenance teste={10} />
          </TabPanel>
        </TabContext>
      </Container>
      <ContainerSidePanel className="col-lg-2">
        <h1>componente lateral</h1>
        <h1>componente lateral</h1>
        <h1>componente lateral</h1>
      </ContainerSidePanel>
    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 5px;
  border: 1px solid green;
  height: calc(100vh - 110px);
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
  /* display: flex;
  flex-direction: column; */

  border: 1px solid blue;
`;

//verificar
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: inherit;
`;
