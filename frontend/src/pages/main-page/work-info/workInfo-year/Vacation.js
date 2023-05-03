import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const handleClick = () => {
  const features = 'width=900,height=900,top=100,left=100';
  window.open('/apps/main-page', '_blank', features);
};

export default function Vacation() {
  return (
    <div>
      <Box height="55px">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
              <Typography>잔여휴가</Typography>
              <Typography variant="h5">{1000}일</Typography>
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
                휴가 신청
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
