// material-ui
import { Grid, Typography, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

//asset
import {
  CloseCircleFilled,
  DollarCircleFilled,
  FileTextFilled,
  HourglassFilled,
  ReconciliationFilled,
  ShoppingFilled
} from '@ant-design/icons';

// ==============================|| INVOICE - ICONS ||============================== //

const InvoiceCard = () => {
  const handleClick = (message) => {
    alert(message);
  };

  return (
    <MainCard sx={{ height: '100%' }} title="근무 체크">
      <Grid container spacing={2}>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard content={false} boxShadow sx={{ py: 2.5 }} onClick={() => handleClick('All Invoices')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled">
                <FileTextFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                All Invoices
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard boxShadow onClick={() => handleClick('Reports')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled" color="info">
                <ReconciliationFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                Reports
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard boxShadow onClick={() => handleClick('Paid')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled" color="success">
                <DollarCircleFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                Paid
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard boxShadow onClick={() => handleClick('Pending')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled" color="warning">
                <HourglassFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                Pending
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard boxShadow onClick={() => handleClick('Cancelled')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled" color="error">
                <CloseCircleFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                Cancelled
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard boxShadow onClick={() => handleClick('Draft')}>
            <Stack alignItems="center" spacing={1}>
              <Avatar size="md" type="filled">
                <ShoppingFilled />
              </Avatar>
              <Typography variant="subtitle1" color="secondary">
                Draft
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InvoiceCard;
