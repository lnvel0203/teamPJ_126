// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// charts
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';
import AcquisitionChart from 'sections/charts/apexchart/AcquisitionChart';

// ==============================|| APEX CHARTS ||============================== //

const SalaryChart = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} xl={4}>
      <MainCard title="부서별 급여 비율">
        <ApexPieChart />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6} xl={4}>
      <MainCard title="부서별 급여 평균, 최고, 최저">
        <AcquisitionChart />
      </MainCard>
    </Grid>
  </Grid>
);

export default SalaryChart;
