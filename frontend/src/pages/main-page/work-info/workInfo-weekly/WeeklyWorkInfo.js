import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// css
import "../../global/global.css";

import CalenderTest from "../../Calender/Calender";

export default function WeeklyWorkInfo() {
  return (
    <div>
      <Box className="workInfoBox" height="auto">
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Box mb={2.5}></Box>
            <CalenderTest />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
