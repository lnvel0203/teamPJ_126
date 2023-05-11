// material-ui
import { Grid, Typography, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

//asset
import { RocketFilled, CarFilled, DollarCircleFilled } from '@ant-design/icons';

// ==============================|| INVOICE - ICONS ||============================== //

const items = [
  { text: '휴가 신청', icon: <RocketFilled /> },
  { text: '근무 신청', icon: <DollarCircleFilled />, color: 'success' },
  { text: '출장/외근', icon: <CarFilled />, color: 'warning' }
];

const handleClick = () => {
  const features = 'width=900,height=900,top=100,left=100';
  window.open('/apps/document/Documentwrite', '_blank', features);
};

const Application = () => {
  return (
    <Grid container spacing={1}>
      {/* 버튼 반복 시작 */}
      {items.map((item) => (
        <Grid key={item.text} item xs={4}>
          <MainCard content={false} boxShadow sx={{ py: 2.5 }} onClick={() => handleClick()}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled" color={item.color}>
                {item.icon}
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                {item.text}
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Application;
