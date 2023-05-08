import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

export default function Vacation() {
  const [vacation, setVacation] = useState(null);

  // 세션 아이디
  const id = localStorage.getItem('id');

  useEffect(() => {
    axios
      .get(`http://localhost:8081/members/getVacation?id=${id}`)
      .then((response) => {
        setVacation(response.data.vacation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const items = [{ text: '휴가', number: vacation }];

  return (
    <MainCard sx={{ height: '100%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle1">잔여휴가</Typography>
            <Typography variant="h5">{vacation}일</Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
