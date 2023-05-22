import { useState, useEffect } from 'react';
import { request } from '../../../utils/axios';
import {useLocation } from 'react-router-dom';
// material-ui

import { useTheme } from '@mui/material/styles';

// project import
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| USER CARD CHART ||============================== //

const UsersCardChart = () => {

  const [earlyLeave, setEarlyLeave] = useState(0);
  const [absence, setAbsence] = useState(0);
  const [unchecked, setUnchecked] = useState(0);
  const [tardy, setTardy] = useState(0);
  const theme = useTheme();
  const { mode } = useConfig();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

    const query = useQuery();
    const ids =  query.get('userId');


  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      sparkline: {
        enabled: true
      },
      height: 100,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      marker: {
        show: false
      }
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

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
        fetchData();
      }, []);
     // const [series, setSeries] = useState([0, 0, 0, 0]);

      const series = ([
        {
          name: '근태체크',
          data: [
            earlyLeave , absence,  unchecked ,tardy,
          ]
        }
   
      ]);

  return <ReactApexChart options={options} series={series} type="bar" height={100} />;
};

export default UsersCardChart;
