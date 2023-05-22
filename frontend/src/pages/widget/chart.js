import { useState, useEffect } from 'react';
import { request } from '../../utils/axios';
import {useLocation } from 'react-router-dom';
import ApexRadialChart from '../../sections/dashboard/analytics/ApexRadialChart';
// material-ui

import {
  Box,
  Grid,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import UsersCardChart from 'sections/dashboard/analytics/UsersCardChart';
import OrdersCardChart from 'sections/dashboard/analytics/OrdersCardChart';
// import SalesCardChart from 'sections/dashboard/analytics/SalesCardChart';
// import MarketingCardChart from 'sections/dashboard/analytics/MarketingCardChart';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';

//import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';
//import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';

// sales report status



// ==============================|| WIDGET - CHARTS ||============================== //

const WidgetChart = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

    const query = useQuery();
    const ids =  query.get('userId');


  const [earlyLeave, setEarlyLeave] = useState(0);
  const [absence, setAbsence] = useState(0);
  const [unchecked, setUnchecked] = useState(0);
  const [tardy, setTardy] = useState(0);
  const [totalHours, setTotalHours] = useState(null);
  
  const fetchData = async () => {
  
    try {
          request(
            'GET',
            `members/attendanceList?id=${ids}`
          ).then((response) => {
   
            setEarlyLeave(response.data.earlyLeave);
            setAbsence(response.data.absence);
            setUnchecked(response.data.unchecked);
            setTardy(response.data.tardy);
       
            
          });
         
        } catch (error) {
           console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        request(
          'GET',
          `members/getHour?id=${ids}`
        ).then((response) => {
          let hours = Math.round(response.data.totalHours / 60);
          setTotalHours(hours);

        })
        .catch((error) => {
          console.log(error);
        });
    
    }, []);

    
      useEffect(() => {
        fetchData();
      }, []);
    

  



  

  const count  = earlyLeave + absence + unchecked + tardy;


 
  const [slot] = useState('week');
  const style={
    fontSize:23,
    bold:5,
  }
  const style1={
    fontSize:23,
    bold:5,
    color:'green'
  }
  const style2={
    fontSize:23,
    bold:5,
    color:'yellow'
  }
  const style3={
    fontSize:23,
    bold:5,
    color:'red'
  }
  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticsDataCard title="근태 미흡 총합" count={count} >
          <UsersCardChart />
        </AnalyticsDataCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticsDataCard title="총 근무일, 근무시간" count={totalHours}>
          <OrdersCardChart />
        </AnalyticsDataCard>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">근태현황</Typography>
          </Grid>
        
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>


          <Box sx={{ pt: 1, pr: 2 }}>
            <ApexRadialChart  slot={slot}/>
          </Box>


        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">근무평가 메뉴얼</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                근무 평가 공지
              </Typography>
          
            </Stack>
          </Box>
          <p style={style}>
          2023년 근무성실도에 의해<br/>
          인사 평가가 이루어지며<br/>
          아래의 메뉴얼에 따라 평가<br/>
          </p>
          ----------------------------------
          <br/>
          지각 10회 <br/>
          결근 3회 <br/>
          미체크 5회 <br/>
          <p style={style1}>
          경고
          </p>
       
          ----------------------------------
          <br/>
          지각 50회 <br/>
          결근 5회 <br/>
          미체크 10회 <br/>
          <p style={style2}>
          감봉
          </p>
          
          ----------------------------------
          <br/>
          지각 100회 <br/>
          결근 10회 <br/>
          미체크 30회 <br/>
          <p style={style3}>
          해고
          </p>
         
          ----------------------------------
          {/* <MonthlyBarChart /> */}
        </MainCard>
      </Grid>

    

   
    </Grid>
  );
};

export default WidgetChart;
