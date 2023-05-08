import React, { useState } from 'react';
// material-ui
import { Box, Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import WorkStatus from './work-info/work-status/WorkStatus';

import CheckCard from './work-info/work-check/CheckCard';

// 캘린더 변경
import AppCalendar from 'pages/calendar/Calender1';
import Chart from './work-info/work-plan/Chart';
import Dictaphone from '../../sections/charts/madechat/Dictaphone';

const Main = () => {
  const [refreshStatus, setRefreshStatus] = useState(false);

  const handleRefreshStatus = () => {
    setRefreshStatus(!refreshStatus);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MainCard sx={{ height: '100%' }} title="근무 계획">
            <MainCard>
              <Chart />
            </MainCard>
          </MainCard>
        </Grid>

        {/* 근무 체크 카드 */}
        <Grid item xs={4}>
          <CheckCard onStatusChange={handleRefreshStatus} />
        </Grid>

        {/* 근무 현황 */}
        {/* <Grid item xs={4} sx={{ height: '467px' }}> */}
        <Grid item xs={4}>
          <WorkStatus refresh={refreshStatus} />
        </Grid>
      </Grid>

      {/* 캘린더 */}
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12}>
          <MainCard>
            <AppCalendar />

            <Dictaphone/>


          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
