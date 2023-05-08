import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, InputLabel, FormHelperText, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Info from './Info';

const CreateDetail = ({ addId }) => {
  // props 검증
  CreateDetail.propTypes = {
    addId: PropTypes.string
  };

  // 정보
  const [infoId, setInfoId] = useState(0);
  const [empId, setEmpId] = useState('');
  const [baseSalary, setBaseSalary] = useState(0);
  const [regularWeeklyHours, setRegularWeeklyHours] = useState(0);

  // 주말 제외 총 근무 시간
  const [weeklyWorkingHours, setWeeklyWorkingHours] = useState(0);

  // 주말 총 근무 시간
  const [weekendWorkingHours, setWeekendWorkingHours] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!addId) {
          // id 값이 없으면 함수를 실행하지 않음
          return;
        }
        const response = await axios.get(`http://localhost:8081/members/salaryCreateDetail?id=${addId}`);
        setInfoId(response.data.infoId);
        setEmpId(response.data.empId);
        setBaseSalary(response.data.baseSalary);
        setRegularWeeklyHours(response.data.regularWeeklyHours);
      } catch (error) {
        console.error(error);
      }

      // 계산에 필요한 것들 가져오는 요청
      try {
        if (!addId) {
          // id 값이 없으면 함수를 실행하지 않음
          return;
        }
        const response = await axios.get(`http://localhost:8081/members/salaryCreateInfo?id=${addId}`);
        // 총 분에서 주 당 시간으로 변경
        setWeeklyWorkingHours(response.data.weeklyWorkingHours / 60 / 4);
        setWeekendWorkingHours(response.data.weekendWorkingHours / 60);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [addId]);

  // 연장근무 & 주말 근무 계산
  // ============================================================================
  // 연장근무 시간
  const overtimeHours = weeklyWorkingHours - regularWeeklyHours;
  // 월 근무 시간
  const monthlyWorkingHours = weeklyWorkingHours * 4;
  // 시급
  const hourlyWage = Math.round(baseSalary / monthlyWorkingHours);
  // 연장 근무 수당 %
  const overtimeRate = 1.5; // 150%의 시급으로 연장근로수당을 지급
  // 연장 근무 수당
  const overtimePay = weeklyWorkingHours <= regularWeeklyHours ? 0 : hourlyWage * overtimeHours * overtimeRate;

  // 주말근무 시간
  const weekendWorkPay = weekendWorkingHours <= 0 ? 0 : hourlyWage * weekendWorkingHours * overtimeRate;
  // ============================================================================

  // function calculateRestDayPay(monthlySalary, workDaysPerWeek) {
  //   const daysPerMonth = 365 / 12; // 월 평균 일 수
  //   const averageWorkingDaysPerMonth = daysPerMonth * (workDaysPerWeek / 7); // 월 평균 근무 일 수 (주휴일 포함)
  //   const restDaysPerMonth = daysPerMonth - averageWorkingDaysPerMonth; // 월 평균 주휴일 수
  //   const dailyWage = monthlySalary / averageWorkingDaysPerMonth; // 일급
  //   const restDayPay = dailyWage * restDaysPerMonth; // 주휴수당
  //   return restDayPay;
  // }

  return (
    <MainCard title="급여 상세 내역">
      <Grid container spacing={2} alignItems="center">
        {console.log(infoId + empId + baseSalary + regularWeeklyHours)}
        {/* 월급 시작 */}
        <Grid item xs={12}>
          <MainCard>
            <Stack spacing={0.5}>
              <InputLabel>월급</InputLabel>
              <TextField fullWidth value={baseSalary} />
            </Stack>
          </MainCard>
        </Grid>
        {/* 월급 끝 */}
        {/* 급여 계산 시작 */}
        <Grid item xs={12}>
          <MainCard title="급여 계산">
            <Grid container spacing={2} alignItems="center">
              {/* 연장 근로 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>연장 근로 수당</InputLabel>
                  <TextField fullWidth value={overtimePay} />
                  {/* <FormHelperText>{'시급: ' + hourlyWage + '원 | 연장 근무 시간: ' + overtimeHours + '시간'}</FormHelperText> */}
                  <FormHelperText>{hourlyWage + ' * ' + overtimeHours + ' * ' + overtimeRate + ' = ' + overtimePay}</FormHelperText>
                </Stack>
              </Grid>
              {/* 연장 근로 수당 끝 */}

              {/* 주말 근로 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주말 근로 수당</InputLabel>
                  <TextField fullWidth value={weekendWorkPay} />
                  <FormHelperText>
                    {hourlyWage + ' * ' + weekendWorkingHours + ' * ' + overtimeRate + ' = ' + weekendWorkPay}
                  </FormHelperText>
                </Stack>
              </Grid>
              {/* 주말 근로 수당 끝 */}

              {/* 주휴 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주휴 수당</InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter your contact</FormHelperText>
                </Stack>
              </Grid>
              {/* 주휴 수당 끝 */}

              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  {/* TODO - 상여금 유효성 검사 하기(숫자만 입력 가능하게) */}
                  <InputLabel>상여금</InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter your contact</FormHelperText>
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
                  <TextField fullWidth />
                  <FormHelperText>Please enter your contact</FormHelperText>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        {/* 급여 계산 끝 */}
        {/* 4대 보험료 시작 */}
        <Grid item xs={12}>
          <MainCard title="공제">
            <Grid container spacing={2} alignItems="center">
              {/* 연금보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>연금보험료</InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter Password</FormHelperText>
                </Stack>
              </Grid>
              {/* 연금보험료 끝 */}

              {/* 고용보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>고용보험료 </InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter Password</FormHelperText>
                </Stack>
              </Grid>
              {/* 고용보험료 끝 */}

              {/* 국민건강보험 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>국민건강보험</InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter Password</FormHelperText>
                </Stack>
              </Grid>
              {/* 국민건강보험 끝 */}

              {/* 산재보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>산재보험료</InputLabel>
                  <TextField fullWidth />
                  <FormHelperText>Please enter Password</FormHelperText>
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
                  <TextField fullWidth />
                  <FormHelperText>Please enter your contact</FormHelperText>
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

export default CreateDetail;
