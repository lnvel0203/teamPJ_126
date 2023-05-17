//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

//asset
import { CheckSquareFilled, HomeFilled, InteractionFilled, RestFilled, HourglassFilled, ReadFilled } from '@ant-design/icons';
import { request } from '../../../../utils/axios';
const WorkStatus = ({ refresh }) => {
  const [attendanceList, setAttendanceList] = useState([]);

  // localStorage의 id
  const id = localStorage.getItem('id');

  const statusColor = (status) => {
    switch (status) {
      case 'start-work':
        return '';
      case 'meeting':
        return 'success';
      case 'go-out':
        return 'warning';
      case 'return-work':
        return 'info';
      case 'end-work':
        return 'info';
      case 'rest':
        return 'error';
      case 'education':
        return '';
      default:
        return '';
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'start-work':
        return <CheckSquareFilled />;
      case 'meeting':
        return <RestFilled />;
      case 'go-out':
        return <HourglassFilled />;
      case 'return-work':
        return <HomeFilled />;
      case 'end-work':
        return <HomeFilled />;
      case 'rest':
        return <InteractionFilled />;
      case 'education':
        return <ReadFilled />;
      default:
        return '';
    }
  };

  const statusString = (status) => {
    switch (status) {
      case 'start-work':
        return '출근';
      case 'meeting':
        return '회의';
      case 'go-out':
        return '외출';
      case 'return-work':
        return '복귀';
      case 'end-work':
        return '퇴근';
      case 'rest':
        return '휴식';
      case 'education':
        return '교육';
      case 'en':
      default:
        return '';
    }
  };

  useEffect(() => {
    request('GET', `/members/statusList?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setAttendanceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <MainCard sx={{ height: '100%' }} title="근무 현황" content={false}>
      <CardContent sx={{ overflow: 'auto', maxHeight: '100%' }}>
        <Grid
          container
          spacing={2.75}
          alignItems="center"
          sx={{
            position: 'relative',
            '&>*': {
              position: 'relative',
              zIndex: '5'
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 10,
              left: 38,
              width: 2,
              height: '100%',
              background: '#ebebeb',
              zIndex: '1'
            }
          }}
        >
          {attendanceList.map((attendance, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar type="filled" size="sm" sx={{ top: 10 }} color={statusColor(attendance.STATUSNAME)}>
                    {statusIcon(attendance.STATUSNAME)}
                  </Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography align="left" variant="caption" color="secondary">
                        {new Date(attendance.STARTTIME).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="left" variant="body2">
                        {statusString(attendance.STATUSNAME)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MainCard>
  );
};


export default WorkStatus;
