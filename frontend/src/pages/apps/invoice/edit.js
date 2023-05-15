import { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
// import { useNavigate, useParams } from 'react-router';
import React, { useCallback } from 'react';

// project imports
import MainCard from 'components/MainCard';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Divider,
  Grid,
  InputLabel,
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
// import { format } from 'date-fns';
import { Form, Formik } from 'formik';

// project import
import AddressModal from 'sections/apps/invoice/AddressModal';

// import { reviewInvoicePopup, customerPopup, toggleCustomerPopup, getInvoiceSingleList, getInvoiceUpdate } from 'store/reducers/invoice';
import { reviewInvoicePopup, customerPopup, toggleCustomerPopup } from 'store/reducers/invoice';
import { useDispatch, useSelector } from 'store';
// import { openSnackbar } from 'store/reducers/snackbar';
import { openSnackbar } from '../../../store/reducers/snackbar';

//asset
import { PlusOutlined } from '@ant-design/icons';

import CreateDetail from './CreateDetail';

// localStorage의 id
const loginId = localStorage.getItem('id');

// 돈 포맷
const formatter = new Intl.NumberFormat('ko-KR');

// ==============================|| INVOICE - EDIT ||============================== //

const Edit = () => {
  const [addId, setAddId] = useState(0);

  const [totalAdditionalPay, setTotalAdditionalPay] = useState(0);
  const [totalInsurancePay, setTotalInsurancePay] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  // -------------------------------------------------------------
  const [overtimePay, setOvertimePay] = useState(0);
  const [weekendWorkPay, setWeekendWorkPay] = useState(0);
  const [calculateRestDayPay, setCalculateRestDayPay] = useState(0);
  const [bonusForm, setBonusForm] = useState(0);
  const [pensionInsurance, setPensionInsurance] = useState(0);
  const [employeeInsurance, setEmployeeInsurance] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [compensationInsurance, setCompensationInsurance] = useState(0);

  // CreateDetail에서 totalAdditionalPay, totalInsurancePay, incomeTax 받아옴
  const handleValuesChanged = useCallback((values) => {
    const {
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
    } = values;

    setTotalAdditionalPay(totalAdditionalPay);
    setTotalInsurancePay(totalInsurancePay);
    setIncomeTax(incomeTax);
    setNetSalary(netSalary);
    setOvertimePay(overtimePay);
    setWeekendWorkPay(weekendWorkPay);
    setCalculateRestDayPay(calculateRestDayPay);
    setBonusForm(bonusForm);
    setPensionInsurance(pensionInsurance);
    setEmployeeInsurance(employeeInsurance);
    setHealthInsurance(healthInsurance);
    setCompensationInsurance(compensationInsurance);
  }, []);

  // 훅 사용
  const theme = useTheme();

  const dispatch = useDispatch();

  const { open, isCustomerOpen, list } = useSelector((state) => state.invoice);

  // Note 글자 수 제한
  const notesLimit = 500;

  const handleSubmit = async () => {
    // 입력한 값들을 새로운 객체에 할당
    const sendData = {
      addId: addId,
      totalAdditionalPay: totalAdditionalPay,
      totalInsurancePay: totalInsurancePay,
      incomeTax: incomeTax,
      netSalary: netSalary,
      overtimePay: overtimePay,
      weekendWorkPay: weekendWorkPay,
      calculateRestDayPay: calculateRestDayPay,
      bonusForm: bonusForm,
      pensionInsurance: pensionInsurance,
      employeeInsurance: employeeInsurance,
      healthInsurance: healthInsurance,
      compensationInsurance: compensationInsurance
    };

    // axios 요청

    // 상세 내역 요청
    try {
      axios
        .get(`http://localhost:8081/members/salaryeditDetail?id=${id}`,
        {
          headers : {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        })
        .then((response) => {
          console.log(response.data);
          setAttendanceList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }

    // 수정요청
    try {
      const response = await axios.put('http://localhost:8081/members/invoiceCreate', { sendData },
      {
        headers : {
          Authorization: 'Bearer ' + getAuthToken(),
        
        }
      });
      if (response.data == 1) {
        dispatch(
          openSnackbar({
            open: true,
            message: '작성이 완료되었습니다.',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          })
        );

        return;
      } else if (response.data == 0) {
        dispatch(
          openSnackbar({
            open: true,
            message: '작성에 실패하였습니다.',
            variant: 'alert',
            alert: {
              color: 'error'
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainCard>
      <Formik
        // enableReinitialize={true} - 초기값이 변경될 때마다 Formik 인스턴스를 다시 초기화
        enableReinitialize={true}
        // 초기값 지정
        initialValues={{
          empId: list?.customerInfo?.id || '',
          invoice_id: list?.invoice_id || '',
          status: list?.status || '',
          date: list?.date || null,
          due_date: list?.due_date || null,
          invoice_detail: list?.invoice_detail || [],
          discount: list?.discount || 0,
          tax: list?.tax || 0,
          notes: list?.notes || ''
        }}
        // 폼 제출 할 때 실행할 함수(handlerEdit) 지정
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, values, isValid, setFieldValue, touched }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {
                // #TODO - 삭제
                console.log(
                  '연장 근로 수당: ' +
                    overtimePay +
                    '주말 근로 수당, : ' +
                    weekendWorkPay +
                    ', 주휴 수당: ' +
                    calculateRestDayPay +
                    ', 상여급: ' +
                    bonusForm +
                    ', 연금 보험료: ' +
                    pensionInsurance +
                    ', 고용 보험료: ' +
                    employeeInsurance +
                    ', 건강 보험료: ' +
                    healthInsurance +
                    ', 산재 보험료: ' +
                    compensationInsurance +
                    addId
                )
              }
              <Grid container spacing={2}>
                {/* # 1 ======================================= */}
                {/* Invoice Id 시작 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>No</InputLabel>
                    <FormControl sx={{ width: '100%' }}>
                      <TextField required disabled type="number" name="invoice_id" id="invoice_id" onChange={handleChange} />
                    </FormControl>
                  </Stack>
                </Grid>
                {/* Invoice Id 끝 */}

                {/* Status 시작 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>지급여부</InputLabel>
                    {/* 폼 시작 */}
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        value={values.status}
                        displayEmpty
                        name="status"
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <Box sx={{ color: 'secondary.400' }}>Select status</Box>;
                          }
                          return selected;
                        }}
                        onChange={handleChange}
                        error={Boolean(errors.status && touched.status)}
                      >
                        <MenuItem disabled value="">
                          Select status
                        </MenuItem>
                        <MenuItem value="Paid">지급완료</MenuItem>
                        <MenuItem value="Unpaid">미지급</MenuItem>
                        <MenuItem value="Cancelled">취소</MenuItem>
                      </Select>
                    </FormControl>
                    {/* 폼 시작 */}
                  </Stack>
                  {touched.status && errors.status && <FormHelperText error={true}>{errors.status}</FormHelperText>}
                </Grid>
                {/* Status 끝 */}

                {/* Date 시작 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Date</InputLabel>
                    <FormControl sx={{ width: '100%' }} error={Boolean(touched.date && errors.date)}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputFormat="yyyy/MM/dd"
                          value={values.date}
                          onChange={(newValue) => setFieldValue('date', newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Stack>
                  {touched.date && errors.date && <FormHelperText error={true}>{errors.date}</FormHelperText>}
                </Grid>
                {/* Date 끝 */}

                {/* Due Date 시작 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Due Date</InputLabel>
                    <FormControl sx={{ width: '100%' }} error={Boolean(touched.due_date && errors.due_date)}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputFormat="yyyy/MM/dd"
                          value={values.due_date}
                          onChange={(newValue) => setFieldValue('due_date', newValue)}
                          renderInput={(params) => <TextField error={touched.due_date && Boolean(errors.due_date)} {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Stack>
                  {touched.due_date && errors.due_date && <FormHelperText error={true}>{errors.due_date}</FormHelperText>}
                </Grid>
                {/* Due Date 끝 */}

                {/* # 2 ======================================= */}
                {/* From 카드 시작 */}
                <Grid item xs={12} sm={6}>
                  <MainCard sx={{ minHeight: 168 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Stack spacing={2}>
                          <Typography variant="h5">From:</Typography>
                          <Stack sx={{ width: '100%' }}>
                            {/* #TODO - 이 부분 아이디에서 이름으로 바꾸기 */}
                            <Typography variant="subtitle1">{loginId}</Typography>

                            <Typography color="secondary">{values?.cashierInfo?.address}</Typography>
                            <Typography color="secondary">{values?.cashierInfo?.phone}</Typography>
                            <Typography color="secondary">{values?.cashierInfo?.email}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box textAlign={{ xs: 'left', sm: 'right' }} color="grey.200">
                          {/* Charge 버튼 눌렀을 때 뜨는 컴포넌트 */}
                          <AddressModal
                            open={open}
                            setOpen={(value) =>
                              dispatch(
                                toggleCustomerPopup({
                                  open: value
                                })
                              )
                            }
                            handlerAddress={(address) => setFieldValue('cashierInfo', address)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                {/* From 카드 끝 */}

                {/* To 카드 시작 */}
                <Grid item xs={12} sm={6}>
                  <MainCard sx={{ minHeight: 168 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Stack spacing={2}>
                          <Typography variant="h5">To:</Typography>
                          <Stack sx={{ width: '100%' }}>
                            <Typography variant="subtitle1">{values?.customerInfo?.name}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.address}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.phone}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.email}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box textAlign="right" color="grey.200">
                          <Button
                            size="small"
                            startIcon={<PlusOutlined />}
                            color="secondary"
                            variant="outlined"
                            onClick={() =>
                              dispatch(
                                customerPopup({
                                  isCustomerOpen: true
                                })
                              )
                            }
                          >
                            Add
                          </Button>
                          <AddressModal
                            open={isCustomerOpen}
                            setOpen={(value) =>
                              dispatch(
                                customerPopup({
                                  isCustomerOpen: value
                                })
                              )
                            }
                            handlerAddress={(value) => {
                              setFieldValue('customerInfo', value);
                              setAddId(values?.customerInfo?.id);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </MainCard>
                  {touched.customerInfo && errors.customerInfo && (
                    <FormHelperText error={true}>{errors?.customerInfo?.name}</FormHelperText>
                  )}
                </Grid>
                {/* To 카드 끝 */}

                {/* # 3 ======================================= */}
                {/** 새 컴포넌트 */}
                {/* Form Layout 시작 */}
                <Grid item xs={12}>
                  <CreateDetail addId={values?.customerInfo?.id} onValuesChanged={handleValuesChanged} />
                </Grid>

                {/* Form Layout 시작 끝 */}

                <Divider />
                {/*  */}
                {touched.invoice_detail && errors.invoice_detail && !Array.isArray(errors?.invoice_detail) && (
                  <Stack direction="row" justifyContent="center" sx={{ p: 1.5 }}>
                    <FormHelperText error={true}>{errors.invoice_detail}</FormHelperText>
                  </Stack>
                )}
                <Grid container justifyContent="right">
                  <Grid item xs={12} md={4}>
                    <Grid container justifyContent="space-between" spacing={2} sx={{ pt: 2.5, pb: 2.5 }}></Grid>

                    <Grid item xs={12}>
                      <Stack spacing={2}>
                        {/* Sub Total 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>추가 급여 :</Typography>
                          <Typography>{formatter.format(totalAdditionalPay)}원</Typography>
                        </Stack>
                        {/* Sub Total 끝 */}

                        {/* Discount 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>보험료 :</Typography>
                          <Typography variant="h6">{formatter.format(Math.round(totalInsurancePay))}원</Typography>
                        </Stack>
                        {/* Discount 끝 */}

                        {/* Tax 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>소득세 :</Typography>
                          <Typography>{formatter.format(Math.round(incomeTax))}원</Typography>
                        </Stack>
                        {/* Tax 끝 */}

                        {/* Grand Total 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle1">실 수령액 :</Typography>
                          <Typography variant="subtitle1" color={theme.palette.success.main}>
                            {' '}
                            {formatter.format(Math.round(netSalary))}원
                          </Typography>
                        </Stack>
                        {/* Grand Total 끝 */}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                {/* # 4 ======================================= */}
                {/* Notes 시작 */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Notes</InputLabel>
                    <TextField
                      placeholder="Address"
                      rows={3}
                      multiline
                      name="notes"
                      onChange={handleChange}
                      inputProps={{
                        maxLength: notesLimit
                      }}
                      helperText={`${values.notes.length} / ${notesLimit}`}
                      sx={{
                        width: '100%',
                        '& .MuiFormHelperText-root': {
                          mr: 0,
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }
                      }}
                    />
                  </Stack>
                </Grid>
                {/* Notes 끝 */}

                {/* # 5 ======================================= */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}></Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} sx={{ height: '100%' }}>
                    {/* Preview* 시작 */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={!isValid}
                      sx={{ color: 'secondary.dark' }}
                      onClick={() =>
                        dispatch(
                          reviewInvoicePopup({
                            isOpen: true
                          })
                        )
                      }
                    >
                      Preview
                    </Button>
                    {/* Preview* 끝 */}

                    {/* Update & Send 버튼*/}
                    <Button color="primary" variant="contained" type="submit">
                      Update & Send
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </MainCard>
  );
};

export default Edit;
