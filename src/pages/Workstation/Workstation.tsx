import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { theme } from '../../style/Theme';
import { IconButton, Stack, Typography } from '@mui/material';
import WorkstationDetails from './WorkstationDetails/WorkstationDetails';
import WorkstationMovements from './WorkstationMovements/WorkstationMovements';
import WorkstationLicenses from './WorkstationLicenses/WorkstationLicenses';
import WorkstationMaintenance from './WorkstationMaintenance/WorkstationMaintenance';
import WorkstationHardware from './WorkstationHardware/WorkstationHardware';
import WorkstationInterfaces from './WorkstationInterfaces/WorkstationInterfaces';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SyncIcon from '@mui/icons-material/Sync';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../components/CustomButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Workstation() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Wapper className="row">
      <Container className="col-lg-10">
        <HeaderWorkstation>
          <IconButton aria-label="delete">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            fontWeight={'bold'}
            fontSize={20}
            marginLeft={2}
            variant="h5"
            flex={1}
          >
            15564 - Computador Erick
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              style={{
                color: 'white',
                backgroundColor: `${theme.colors.secondary}`,
              }}
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
            >
              Ações
            </Button>
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
        <TabContext value={value}>
          <AppBar
            position="static"
            style={{
              boxShadow: 'none',
              backgroundColor: `${theme.colors.white}`,
              color: 'black',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab value="1" label="Detalhes" />
              <Tab value="2" label="Hardware" />
              <Tab value="3" label="Interfaces" />
              <Tab value="4" label="Movimentos" />
              <Tab value="5" label="Licenças" />
              <Tab value="6" label="Manutenção" />
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
