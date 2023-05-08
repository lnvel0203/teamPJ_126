import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Clock from './Clock';

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const dayOfWeek = daysOfWeek[today.getDay()];

export default function Plan() {
  return (
    <Box>
      <Stack alignItems="center">
        <Typography variant="subtitle1" color="CaptionText">
          {month}월 {day}일 ({dayOfWeek})
        </Typography>
      </Stack>
      <Clock />
    </Box>
  );
}
