import { Grid, InputLabel, FormHelperText, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Info from './Info';

// 돈 포맷
const formatter = new Intl.NumberFormat('ko-KR');

const InvoiceDetail = ({ list }) => {
  return (
    <MainCard title="급여 상세 내역">
      <Grid container spacing={2} alignItems="center">
        {/* 월급 시작 */}
        <Grid item xs={12}>
          <MainCard>
            <Stack spacing={0.5}>
              <InputLabel>월급</InputLabel>
              <TextField fullWidth value={formatter.format(list?.salaryInfo?.baseSalary)} />
            </Stack>
          </MainCard>
        </Grid>

        {/* 월급 끝 */}
        {/* 급여 계산 시작 */}
        <Grid item xs={12}>
          <MainCard title="추가급 계산">
            <Grid container spacing={2} alignItems="center">
              {/* 연장 근로 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>연장 근로 수당</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.additionalPayment?.overtimePay))} />
                </Stack>
              </Grid>
              {/* 연장 근로 수당 끝 */}

              {/* 주말 근로 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주말 근로 수당</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.additionalPayment?.holidayPay))} />
                  <FormHelperText></FormHelperText>
                </Stack>
              </Grid>
              {/* 주말 근로 수당 끝 */}

              {/* 주휴 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주휴 수당</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.additionalPayment?.restDayPay))} />
                  <FormHelperText></FormHelperText>
                </Stack>
              </Grid>
              {/* 주휴 수당 끝 */}

              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>상여금 </InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.additionalPayment?.bonus))} />
                </Stack>
              </Grid>

              {/* 여백 시작 */}
              <Grid item xs={12} lg={12} mb={3}>
                <Stack spacing={0.5}></Stack>
              </Grid>
              {/* 여백 끝 */}

              <Grid item xs={12} lg={8}>
                <Stack spacing={0.5}></Stack>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Stack spacing={0.5}>
                  <InputLabel>총액</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.additionalPayment?.totalAdditional))} />
                  <FormHelperText>추가급 총액</FormHelperText>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        {/* 급여 계산 끝 */}

        {/* 4대 보험료 시작 */}
        <Grid item xs={12}>
          <MainCard title="보험료 계산">
            <Grid container spacing={2} alignItems="center">
              {/* 연금보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>연금보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.deduction?.pensionInsurance))} />
                </Stack>
              </Grid>
              {/* 연금보험료 끝 */}

              {/* 고용보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>고용보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.deduction?.employmentInsurance))} />
                </Stack>
              </Grid>
              {/* 고용보험료 끝 */}

              {/* 국민건강보험 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>국민건강보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.deduction?.healthInsurance))} />
                </Stack>
              </Grid>
              {/* 국민건강보험 끝 */}

              {/* 산재보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>산재보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.deduction?.compensationInsurance))} />
                </Stack>
              </Grid>
              {/* 산재보험료 끝 */}

              {/* 여백 시작 */}
              <Grid item xs={12} lg={12} mb={3}>
                <Stack spacing={0.5}></Stack>
              </Grid>
              {/* 여백 끝 */}

              <Grid item xs={12} lg={8}>
                <Stack pr={3}>
                  <Info />
                </Stack>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Stack spacing={0.5}>
                  <InputLabel>총액</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(list?.deduction?.totalDeductions))} />
                  <FormHelperText>보험료 총액</FormHelperText>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        {/* 4대 보험료 끝 */}
      </Grid>
    </MainCard>
  );
};

export default InvoiceDetail;
