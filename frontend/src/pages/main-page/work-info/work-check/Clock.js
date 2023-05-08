import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <Typography variant="h2" color="CaptionText">
      {hours} : {minutes} : {seconds}
    </Typography>
  );
}

export default Clock;
