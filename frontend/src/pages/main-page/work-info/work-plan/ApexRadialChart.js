import { useEffect, useState } from 'react';
//import axios from 'axios';
import { request } from '../../../../utils/axios';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';

// 세션 아이디
const id = localStorage.getItem('id');

// chart options
const redialBarChartOptions = {
  chart: {
    type: 'radialBar',
    width: 450,
    height: 450
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '10%',
        background: 'transparent',
        image: undefined
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: true,
          fontSize: '16px',
          color: '#888'
        }
      }
    }
  },
  labels: ['지각', '조기퇴근', '결근', '미체크'],
  legend: {
    show: true,
    floating: true,
    fontSize: '13px',
    position: 'left',
    offsetX: 5,
    offsetY: -14,
    labels: {
      useSeriesColors: true
    },
    markers: {
      size: 0
    },
    formatter(seriesName, opts) {
      return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`;
    },
    itemMargin: {
      vertical: 3
    }
  },
  responsive: [
    {
      breakpoint: 450,
      chart: {
        width: 280,
        height: 280
      },
      options: {
        legend: {
          show: false,
          position: 'bottom'
        }
      }
    }
  ]
};

// ==============================|| APEXCHART - RADIAL ||============================== //

const ApexRedialBarChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.grey[200];

  const [series, setSeries] = useState([0, 0, 0, 0]);

  const [options, setOptions] = useState(redialBarChartOptions);

  const secondary = theme.palette.primary[700];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;
  const error = theme.palette.error.main;

  const fetchData = async () => {
    



    // try {
    //   const response = await axios.get(`http://localhost:8081/members/attendanceList?id=${id}`);
    //   const { earlyLeave, absence, unchecked, tardy } = response.data;
    //   setSeries([tardy, earlyLeave, absence, unchecked]);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }

try {
      request(
        'GET',
        `members/attendanceList?id=${id}`
      ).then((response) => {
        const { earlyLeave, absence, unchecked, tardy } = response.data;
        setSeries([tardy, earlyLeave, absence, unchecked]);
      });
     
    } catch (error) {
       console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondary, primaryMain, successDark, error],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      plotOptions: {
        radialBar: {
          track: {
            background: line
          }
        }
      }
    }));
  }, [mode, primary, line, grey200, secondary, primaryMain, successDark, error]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" />
    </div>
  );
};

export default ApexRedialBarChart;
