import { useEffect, useState } from 'react';
//import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { request } from '../../../../utils/axios';

export default function Hours() {
  const [totalHours, setTotalHours] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

  // 세션 아이디
  const id = localStorage.getItem('id');

  useEffect(() => {
      request(
        'GET',
        `members/getHour?id=${id}`
      ).then((response) => {
        setTotalHours(response.data.totalHours);
        setTotalDays(response.data.totalDays);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = [
    { text: '총 근무일', number: totalDays + ' 일' },
    { text: '총 시간', number: Math.round(totalHours / 60) + ' 시간' },
    { text: '평균 시간', number: totalDays === 0 ? '0' : Math.round(totalHours / 60 / totalDays) + ' 시간' }
  ];

  return (
    <div>
      <Box display="flex"></Box>
      <Box height="55px" textAlign="center">
        <Grid container spacing={1}>
          {items.map((item) => (
            <Grid item xs={6} md={4} key={item.text}>
              <Typography>{item.text}</Typography>
              <Typography variant="h5">{item.number}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}