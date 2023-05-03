import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import WorkTimeline from './TimeLine';

const WorkStatus = ({ update }) => {
  return (
    <div>
      <Box style={{ height: '118px', overflow: 'auto' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <WorkTimeline update={update} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default WorkStatus;
