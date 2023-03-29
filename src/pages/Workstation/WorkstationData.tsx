import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { theme } from '../../style/Theme';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WorkstationData() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
      <Typography variant="h5" gutterBottom> Teste </Typography>
        <AppBar
          position="static"
          style={{
            boxShadow: 'none',
            backgroundColor: `${theme.colors.white}`,
            color: 'black',
          }}
        >
          <TabList
            indicatorColor={'primary'}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Detalhes" value="1" />
            <Tab label="Harware" value="2" />
            <Tab label="Interfaces" value="3" />
            <Tab label="Movimentos" value="4" />
            <Tab label="Licenças" value="5" />
            <Tab label="Financeiro" value="6" />
          </TabList>
        </AppBar>
        <TabPanel value="1">Item Oneeeeeeeee</TabPanel>
        <TabPanel value="2">Item Twooooooooooooooo</TabPanel>
        <TabPanel value="3">Item Threeeeeeeeeeeee</TabPanel>
        <TabPanel value="4">Item Threeeeeeeeeeeee</TabPanel>
        <TabPanel value="5">Item Threeeeeeeeeeeee</TabPanel>
        <TabPanel value="6">Item Threeeeeeeeeeeee</TabPanel>
      </TabContext>
    </div>
  );
}
