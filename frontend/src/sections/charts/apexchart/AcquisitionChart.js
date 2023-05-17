import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

const AcquisitionChart = () => {
  const theme = useTheme();
  const line = theme.palette.divider;
  const { primary, secondary } = theme.palette.text;
  const { mode } = useConfig();

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 250,
      width: '100%',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false
      },
      y: {
        formatter: function (val) {
          return '₩' + val.toLocaleString();
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 10,
      markers: {
        width: 8,
        height: 8,
        radius: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      colors: ['transparent'],
      width: 1
    }
  };

  const [options, setOptions] = useState(barChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/deptList2', {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        const data = response.data;

        const averageSalaryData = data.map((item) => item.average);
        const maxSalaryData = data.map((item) => item.max);
        const minSalaryData = data.map((item) => item.min);
        const labelsData = data.map((item) => item.label);

        setSeries([
          { name: '최저급여', data: minSalaryData },
          { name: '평균급여', data: averageSalaryData },
          { name: '최고급여', data: maxSalaryData }
        ]);

        setOptions((prevState) => ({
          ...prevState,
          xaxis: {
            ...prevState.xaxis,
            categories: labelsData,
            labels: {
              show: true
            }
          },
          colors: [theme.palette.grey[900], theme.palette.primary.main, theme.palette.primary[200]],
          tooltip: {
            theme: mode === 'dark' ? 'dark' : 'light'
          },
          legend: {
            labels: {
              colors: 'grey.500'
            }
          }
        }));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [mode, primary, secondary, line, theme]);

  return <ReactApexChart options={options} series={series} type="bar" height={250} />;
};

export default AcquisitionChart;
