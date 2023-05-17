import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';

// chart options
const pieChartOptions = {
  chart: {
    type: 'pie',
    width: 450,
    height: 450
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4
    }
  },
  responsive: [
    {
      breakpoint: 450,
      options: {
        legend: {
          show: false,
          position: 'bottom'
        }
      }
    }
  ]
};

const ApexPieChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.grey[200];
  const backColor = theme.palette.background.paper;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(pieChartOptions);

  const secondary = theme.palette.primary[700];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;
  const error = theme.palette.error.main;
  const orangeDark = theme.palette.warning.main;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/deptList', {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        const data = response.data;
        console.log(data);

        const newSeries = data.map((item) => item.value);
        const newLabels = data.map((item) => item.label);

        setSeries(newSeries);

        setOptions((prevState) => ({
          ...prevState,
          labels: newLabels,
          colors: [secondary, primaryMain, successDark, error, orangeDark],
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
          legend: {
            labels: {
              colors: 'grey.500'
            }
          },
          stroke: {
            colors: [backColor]
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return '₩' + val.toLocaleString();
              }
            }
          }
        }));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [mode, primary, line, grey200, backColor, secondary, primaryMain, successDark, error, orangeDark]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" />
    </div>
  );
};

export default ApexPieChart;
