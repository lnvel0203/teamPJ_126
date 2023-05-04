import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Attendance() {
  const [tardy, setTardy] = useState(null);
  const [absenteeism, setAbsenteeism] = useState(null);
  const [earlyDeparture, EarlyDeparture] = useState(null);
  const [unchecked, setUnchecked] = useState(null);

  // 세션 아이디
  const id = localStorage.getItem('id');

  useEffect(() => {
    axios
      .get(`http://localhost:8081/members/attendance?id=${id}`)
      .then((response) => {
        setTardy(response.data.tardy);
        setAbsenteeism(response.data.absenteeism);
        EarlyDeparture(response.data.earlyDeparture);
        setUnchecked(response.data.unchecked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = [
    { text: '지각', number: tardy },
    { text: '결근', number: absenteeism },
    { text: '조기퇴근', number: earlyDeparture },
    { text: '미체크', number: unchecked }
  ];

  return (
    <Box>
      <Box height="55px">
        <Grid container spacing={1} textAlign="center">
          {items.map((item) => (
            <Grid item xs={3} key={item.text}>
              <Typography>{item.text}</Typography>
              <Typography variant="h5">{item.number}회</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
