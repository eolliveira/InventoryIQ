import Panel from '../../components/Panel';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import SoftwareRegistration from './SoftwareRegistration';
import LicenseTypeRegistration from './LicenseTypeRegistration';
import LicenseDetails from 'pages/License/LicenseData/LicenseDetails';
import SyncIcon from '@mui/icons-material/Sync';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';

export default function Register() {
  const [tabValue, setTabValue] = useState('1');
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <Panel title="Cadastro">
      <TabContext value={tabValue}>
        <AppBar
          position="static"
          style={{
            boxShadow: 'none',
            backgroundColor: `#ffffff`,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <CustomTab value="1" label="Software" />
              <CustomTab value="2" label="Tipo Licença" />
            </Tabs>
          </Box>
        </AppBar>
        <TabPanel style={{ padding: 0 }} value="1">
          <SoftwareRegistration />
        </TabPanel>
        <TabPanel style={{ padding: 0 }} value="2">
          <LicenseTypeRegistration />
        </TabPanel>
      </TabContext>
    </Panel>
  );
}

const CustomTab = styled(Tab)`
  font-size: small !important;
  text-transform: none !important;
`;
