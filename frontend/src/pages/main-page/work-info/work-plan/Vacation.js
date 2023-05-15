import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Grid, Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { request } from '../../../../utils/axios';
export default function Vacation() {
  const [annualCount, setAnnualCount] = useState(0);

  // 세션 아이디
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await request('GET', `/members/getAnnualCount/${id}`);
        console.log('response', response);
        setAnnualCount(response.data.annualCount);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  // const items = [{ text: '휴가', number: vacation }];

  return (
    <MainCard sx={{ height: '100%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle1">잔여휴가</Typography>
            <Typography variant="h5">{annualCount}일</Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}