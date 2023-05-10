import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, InputLabel, FormHelperText, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Info from './Info';

const CreateDetail = ({ addId, onValuesChanged }) => {
  // props 검증
  CreateDetail.propTypes = {
    addId: PropTypes.string
  };

  // 돈 포맷
  const formatter = new Intl.NumberFormat('ko-KR');

  // 정보
  const [infoId, setInfoId] = useState(0);
  const [id, setId] = useState('');
  const [baseSalary, setBaseSalary] = useState(0);
  const [regularWeeklyHours, setRegularWeeklyHours] = useState(0);

  // 주말 제외 총 근무 시간
  const [weeklyWorkingHours, setWeeklyWorkingHours] = useState(0);

  // 주말 총 근무 시간
  const [weekendWorkingHours, setWeekendWorkingHours] = useState(0);

  // 연장 근무 Form value
  const [overtimePayForm, setOvertimePayForm] = useState(0);
  // 주말 근무 Form value
  const [weekendWorkPayForm, setWeekendWorkPayForm] = useState(0);
  // 주휴수당 Form value
  const [restDayPayForm, setRestDayPayForm] = useState(0);
  // 상여금 Form value
  const [bonusForm, setBonusForm] = useState(0);
  // 추가급 총액
  const [totalAdditionalPay, setTotalAdditionalPay] = useState(0);
  // 보험료 총액
  const [totalInsurancePay, setTotalInsurancePay] = useState(0);

  // 연장근무 & 주말 근무 계산
  // ============================================================================
  // 연장근무 시간
  const overtimeHours = weeklyWorkingHours <= regularWeeklyHours ? 0 : Math.round(weeklyWorkingHours - regularWeeklyHours);
  // 월 근무 시간
  const monthlyWorkingHours = weeklyWorkingHours * 4;
  // 시급
  const hourlyWage = Math.round(baseSalary / monthlyWorkingHours);
  // 연장 근무 수당 %
  const overtimeRate = 1.5; // 150%의 시급으로 연장근로수당을 지급
  // 연장 근무 수당
  const overtimePay = weeklyWorkingHours <= regularWeeklyHours ? 0 : hourlyWage * overtimeHours * overtimeRate;
  // 주말 근무 수당
  const weekendWorkPay = weekendWorkingHours <= 0 ? 0 : hourlyWage * weekendWorkingHours * overtimeRate;
  // 주휴 수당
  const calculateRestDayPay = 4 * (weeklyWorkingHours / 40) * 8 * hourlyWage;
  // 추가급을 더한 총액
  const subTotal = baseSalary + totalAdditionalPay;
  // 연금 보험료
  const pensionInsurance = subTotal * 0.045;
  // 고용 보험료
  const employeeInsurance = subTotal * 0.009;
  // 건강 보험료
  const healthInsurance = (subTotal * 0.0709) / 2;
  // 산재 보험료
  const compensationInsurance = subTotal * 0.01;
  // 보험료 총액
  const subTotal2 = subTotal - totalInsurancePay;

  // ============================================================================
  // 총 추가금 더함
  useEffect(() => {
    const calculateTotalAdditionalPay = () => {
      const total = overtimePay + weekendWorkPay + restDayPayForm + bonusForm;
      setTotalAdditionalPay(total);
    };

    calculateTotalAdditionalPay();
  }, [overtimePay, weekendWorkPay, restDayPayForm, bonusForm]);

  // 총 보험료 더함
  useEffect(() => {
    const updatedTotal = pensionInsurance + employeeInsurance + healthInsurance + compensationInsurance;
    setTotalInsurancePay(updatedTotal);
  }, [pensionInsurance, employeeInsurance, healthInsurance, compensationInsurance]);

  // ============================================================================

  // 과세표준, 세율, 누진공제액
  const taxBrackets = [
    { limit: 12000000, rate: 0.06, deduction: 0 },
    { limit: 46000000, rate: 0.15, deduction: 1080000 },
    { limit: 88000000, rate: 0.24, deduction: 5220000 },
    { limit: 150000000, rate: 0.35, deduction: 14900000 },
    { limit: 300000000, rate: 0.38, deduction: 19400000 },
    { limit: 500000000, rate: 0.4, deduction: 25400000 },
    { limit: 1000000000, rate: 0.42, deduction: 35400000 },
    { limit: Infinity, rate: 0.45, deduction: 65400000 }
  ];

  // 과세표준 속하는 구간 찾음
  function findBracket() {
    return taxBrackets.find((bracket) => subTotal2 <= bracket.limit);
  }

  // 소득세 계산
  function calculateTax() {
    const bracket = findBracket(subTotal2);
    const tax = subTotal2 * bracket.rate - bracket.deduction;
    return tax;
  }

  const incomeTax = calculateTax(subTotal2);

  // 실 수령액
  const netSalary = baseSalary + totalAdditionalPay - totalInsurancePay - incomeTax;

  // ============================================================================

  useEffect(() => {
    async function fetchData() {
      try {
        if (!addId) {
          // id 값이 없으면 함수를 실행하지 않음
          return;
        }
        const response = await axios.get(`http://localhost:8081/members/salaryCreateDetail?id=${addId}`);
        setInfoId(response.data.infoId);
        setId(response.data.id);
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

  // ============================================================================
  // creat.js로 totalAdditionalPay, totalInsurancePay, incomeTax 보내는 함수
  useEffect(() => {
    // 값이 변경될 때마다 콜백 함수 호출
    onValuesChanged({
      overtimePay,
      weekendWorkPay,
      calculateRestDayPay,
      bonusForm,
      totalAdditionalPay,
      pensionInsurance,
      employeeInsurance,
      healthInsurance,
      compensationInsurance,
      totalInsurancePay,
      incomeTax,
      netSalary
    });
  }, [
    overtimePay,
    weekendWorkPay,
    calculateRestDayPay,
    bonusForm,
    totalAdditionalPay,
    pensionInsurance,
    employeeInsurance,
    healthInsurance,
    compensationInsurance,
    totalInsurancePay,
    incomeTax,
    netSalary,
    onValuesChanged
  ]);

  return (
    <MainCard title="급여 상세 내역">
      <Grid container spacing={2} alignItems="center">
        {console.log(infoId + id + baseSalary + regularWeeklyHours + subTotal)}
        {console.log(overtimePayForm + weekendWorkPayForm + restDayPayForm + bonusForm)}

        {/* 월급 시작 */}
        <Grid item xs={12}>
          <MainCard>
            <Stack spacing={0.5}>
              <InputLabel>월급</InputLabel>
              <TextField fullWidth value={formatter.format(baseSalary)} />
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
                  <TextField
                    fullWidth
                    value={formatter.format(Math.round(overtimePay))}
                    onChange={(e) => setOvertimePayForm(Number(e.target.value) || 0)}
                  />
                  <FormHelperText>
                    {hourlyWage + ' * ' + overtimeHours + ' * ' + overtimeRate + ' = ' + Math.round(overtimePay)}
                  </FormHelperText>
                </Stack>
              </Grid>
              {/* 연장 근로 수당 끝 */}

              {/* 주말 근로 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주말 근로 수당</InputLabel>
                  <TextField
                    fullWidth
                    value={formatter.format(Math.round(weekendWorkPay))}
                    onChange={(e) => setWeekendWorkPayForm(Number(e.target.value) || 0)}
                  />
                  <FormHelperText>
                    {hourlyWage + ' * ' + weekendWorkingHours + ' * ' + overtimeRate + ' = ' + Math.round(weekendWorkPay)}
                  </FormHelperText>
                </Stack>
              </Grid>
              {/* 주말 근로 수당 끝 */}

              {/* 주휴 수당 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>주휴 수당</InputLabel>
                  <TextField
                    fullWidth
                    value={formatter.format(Math.round(calculateRestDayPay))}
                    onChange={(e) => setRestDayPayForm(Number(e.target.value) || 0)}
                  />
                  <FormHelperText>
                    {'4' + ' * (' + weekendWorkingHours + ' / 40) * 8 * ' + hourlyWage + ' = ' + Math.round(calculateRestDayPay)}
                  </FormHelperText>
                </Stack>
              </Grid>
              {/* 주휴 수당 끝 */}

              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>상여금 </InputLabel>
                  <TextField
                    fullWidth
                    value={formatter.format(Math.round(bonusForm))}
                    onChange={(e) => setBonusForm(Number(e.target.value) || 0)}
                  />
                  <FormHelperText>상여금을 입력하세요.</FormHelperText>
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
                  <TextField fullWidth value={formatter.format(Math.round(totalAdditionalPay))} />
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
                  <TextField fullWidth value={formatter.format(Math.round(pensionInsurance))} />
                  <FormHelperText>{subTotal + ' * ' + 0.045 + ' = ' + Math.round(pensionInsurance)}</FormHelperText>
                </Stack>
              </Grid>
              {/* 연금보험료 끝 */}

              {/* 고용보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>고용보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(employeeInsurance))} />
                  <FormHelperText>{subTotal + ' * ' + '0.009' + ' = ' + Math.round(employeeInsurance)}</FormHelperText>
                </Stack>
              </Grid>
              {/* 고용보험료 끝 */}

              {/* 국민건강보험 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>국민건강보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(healthInsurance))} />
                  <FormHelperText>{subTotal + ' * 0.0709 / 2 = ' + Math.round(healthInsurance)}</FormHelperText>
                </Stack>
              </Grid>
              {/* 국민건강보험 끝 */}

              {/* 산재보험료 시작 */}
              <Grid item xs={12} lg={3}>
                <Stack spacing={0.5}>
                  <InputLabel>산재보험료</InputLabel>
                  <TextField fullWidth value={formatter.format(Math.round(compensationInsurance))} />
                  <FormHelperText>{subTotal + ' * 0.01 = ' + Math.round(compensationInsurance)} </FormHelperText>
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
                  <TextField fullWidth value={formatter.format(Math.round(totalInsurancePay))} />
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

export default CreateDetail;
