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

const OrdersCardChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();
  const [totalHours, setTotalHours] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

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
      colors: [theme.palette.secondary.main, theme.palette.secondary[700]],
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  useEffect(() => {
    request(
      'GET',
      `members/getHour?id=${ids}`
    ).then((response) => {
      let hours = Math.round(response.data.totalHours / 60);
      setTotalHours(hours);
      setTotalDays(response.data.totalDays);
    })
    .catch((error) => {
      console.log(error);
    });

}, []);


     // const [series, setSeries] = useState([0, 0, 0, 0]);

      const series = ([
        {
          name: '총일수 | 총 근무시간',
          data: [
          totalDays, totalHours
          ]
        }
   
      ]);

  return <ReactApexChart options={options} series={series} type="bar" height={100} />;
};

export default OrdersCardChart;

