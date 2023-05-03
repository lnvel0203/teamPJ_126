import React, { useState } from 'react';
// material-ui
import { Box, Grid, Typography } from '@mui/material';
// import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

// icons
import {
  CalendarOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  OrderedListOutlined,
  CheckOutlined,
  DesktopOutlined
} from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';

// Components
import Attendance from './work-info/workInfo-year/Attendance';
import Vacation from './work-info/workInfo-year/Vacation';
import Hours from './work-info/workInfo-year/Hours';

import Plan from './work-info/workInfo-today/Plan';
import Check from './work-info/workInfo-today/Check';
import WorkStatus from './work-info/workInfo-today/WorkStatus';

// 캘린더 변경
import AppCalendar from 'pages/calendar/Calender1';

const Main = () => {
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Box>
      <Typography variant="h5" mb={1}>
        올해 근무 정보
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <BarChartOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              근태 현황
            </Typography>
          </Box>
          <MainCard>
            <Attendance />
          </MainCard>
        </Grid>

        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <CalendarOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              휴가 현황
            </Typography>
          </Box>
          <MainCard>
            <Vacation />
          </MainCard>
        </Grid>

        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <ClockCircleOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              근무 시간
            </Typography>
          </Box>
          <MainCard>
            <Hours />
          </MainCard>
        </Grid>
      </Grid>

      <Typography variant="h5" mt={3} mb={1}>
        오늘 근무 현황
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <OrderedListOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              근무 계획
            </Typography>
          </Box>
          <MainCard>
            <Plan />
          </MainCard>
        </Grid>

        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <CheckOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              근무 체크
            </Typography>
          </Box>
          <MainCard>
            <Check onUpdate={handleUpdate} />
          </MainCard>
        </Grid>

        <Grid item xs={4}>
          <Box display={'flex'}>
            <Typography variant="subtitle1" ml={0.5}>
              <DesktopOutlined />
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              근무 현황
            </Typography>
          </Box>
          <MainCard>
            <WorkStatus update={update} />
          </MainCard>
        </Grid>
      </Grid>

      <Typography variant="h5" mt={3} mb={1}>
        주간 근무 현황
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard>
            <AppCalendar />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
