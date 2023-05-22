import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import ApexRadialChart from './ApexRadialChart';
import Hours from './Hours';
import Vacation from './Vacation';
import Application from './Application';
//import Weather from './Weather';

const Chart = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} sx={{ '& .MuiTab-root': { minWidth: 0 } }}>
        <Tab label="근태현황" />
        <Tab label="근무시간" />
        <Tab label="신청" />
        {/* <Tab label="날씨" /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <ApexRadialChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Hours />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Vacation />
          </Grid>
          <Grid item xs={12}>
            <Application />
          </Grid>
        </Grid>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        
        <Weather />
      </TabPanel> */}
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box sx={{ pt: 3 }} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default Chart;
