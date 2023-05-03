import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const dayOfWeek = daysOfWeek[today.getDay()];

const handleClick = () => {
  const features = 'width=900,height=900,top=100,left=100';
  window.open('/document', '_blank', features);
};

export default function Plan() {
  return (
    <div>
      <Box display="flex" justifyContent="space-evenly" alignItems="center" height="110px">
        <Box
          sx={{
            width: 100,
            height: 110,
            borderRadius: '10px',
            border: '1px solid #263238',
            textAlign: 'center'
          }}
        >
          <Typography className="content" m={1}>
            {month}월
          </Typography>
          <Divider />
          <Typography className="content" mt={1}>
            {day}일
          </Typography>

          <Typography className="content">({dayOfWeek})</Typography>
        </Box>
        <Box ml={2}>
          <Typography variant="subtitle1" mt={1.7}>
            9시 출근
          </Typography>
          <Typography variant="caption">여긴 뭐 쓰는곳 일까</Typography>
          <Box mt={1}>
            <Button
              onClick={handleClick}
              variant="outlined"
              size="small"
              style={{
                border: '1px solid #263238',
                color: '#263238',
                boxShadow: 'none',
                marginRight: '9px'
              }}
            >
              연장근무신청
            </Button>

            <Button
              onClick={handleClick}
              variant="outlined"
              size="small"
              style={{
                border: '1px solid #263238',
                color: '#263238',
                boxShadow: 'none'
              }}
            >
              휴일근무신청
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
