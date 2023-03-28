import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import SpeedIcon from '@mui/icons-material/Speed';
import { theme } from '../../style/Theme';

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
        <AppBar
          position="static"
          style={{
            boxShadow: 'none',
            //borderBottomStyle: 'outset',
            //borderBottomColor: 'black',
            backgroundColor: `${theme.colors.white}`,
            color: 'black',
          }}
        >
          <TabList
            indicatorColor={'primary'}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab icon={<SpeedIcon />} label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">Item Oneeeeeeeee</TabPanel>
        <TabPanel value="2">Item Twooooooooooooooo</TabPanel>
        <TabPanel value="3">Item Threeeeeeeeeeeee</TabPanel>
      </TabContext>
    </div>
  );
}
