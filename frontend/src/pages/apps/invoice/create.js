import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
import { useNavigate } from 'react-router';

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
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// project import
import Loader from 'components/Loader';
import AddressModal from 'sections/apps/invoice/AddressModal';

import { reviewInvoicePopup, customerPopup, toggleCustomerPopup, getInvoiceSingleList, getInvoiceUpdate } from 'store/reducers/invoice';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

//asset
import { PlusOutlined } from '@ant-design/icons';

import CreateDetail from './CreateDetail';

// localStorage의 id
const loginId = localStorage.getItem('id');

// 유효성 검사(Yup 라이브러리 사용)
const validationSchema = yup.object({
  // 날짜 필수 유효성 검사
  date: yup.date().required('Invoice date is required'),

  // 마감 날짜 필수 + 시작 날짜 이후인지 확인 하는 유효성 검사
  due_date: yup
    .date()
    .required('Due date is required')
    .when('date', (date, schema) => date && schema.min(date, "Due date can't be before invoice date"))
    .nullable()

  // 고객 정보 필수 유효성 검사
  // customerInfo: yup
  //   .object({
  //     name: yup.string().required('Invoice receiver information is required')
  //   })
  //   .required('Invoice receiver information is required'),

  // 문자열 필수 유효성 검사
  // status: yup.string().required('Status selection is required')

  // 배열 필수 유효성 검사 + 배열에 최소 1개 이상 있는지 확인
  // invoice_detail: yup
  //   .array()
  //   .required('Invoice details is required')
  //   .of(
  //     yup.object().shape({
  //       name: yup.string().required('Product name is required')
  //     })
  //   )
  //   .min(1, 'Invoice must have at least 1 items')
});

// ==============================|| INVOICE - EDIT ||============================== //

const Create = () => {
  // 훅 사용
  const theme = useTheme();
  // const { id } = useParams();
  const id = 1;
  const navigation = useNavigate();
  const dispatch = useDispatch();

  // 로딩 상태 설정, useSelector 사용해서 Redux 스토어에서 필요한 상태를 가져옴
  const [loading, setLoading] = useState(false);
  const { open, isCustomerOpen, list } = useSelector((state) => state.invoice);

  // useEffect 사용
  // 컴포넌트 마운트될 때 invoice 정보 가져옴
  // +  id를 의존성 배열에 넣어 id 값이 변경될 때마다 디스패치
  // src\store\reducers\invoice.js 에서 getInvoiceSingleList 메서드 axios 요청으로 리스트를 가져옴
  useEffect(() => {
    dispatch(getInvoiceSingleList(Number(id))).then(() => setLoading(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // invoiceSingleList 초기화
  const invoiceSingleList = {
    name: '',
    address: '',
    phone: '',
    email: ''
  };

  // Note 글자 수 제한
  const notesLimit = 500;

  const handlerEdit = (values) => {
    // 입력한 값들을 새로운 객체에 할당
    const NewList = {
      id: Number(list?.id),
      invoice_id: Number(values.invoice_id),
      customer_name: values.cashierInfo?.name,
      email: values.cashierInfo?.email,
      avatar: Number(list?.avatar),
      discount: Number(values.discount),
      tax: Number(values.tax),
      date: format(new Date(values.date), 'MM/dd/yyyy'),
      due_date: format(new Date(values.due_date), 'MM/dd/yyyy'),
      quantity: Number(
        values.invoice_detail?.reduce((sum, i) => {
          return sum + i.qty;
        }, 0)
      ),
      status: values.status,
      cashierInfo: values.cashierInfo,
      customerInfo: values.customerInfo,
      invoice_detail: values.invoice_detail,
      notes: values.notes
    };

    // 업데이트 액션 디스패치
    dispatch(getInvoiceUpdate(NewList)).then(() => {
      dispatch(
        // 성공 알림
        openSnackbar({
          open: true,
          message: 'Invoice Updated successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      navigation('/apps/invoice/list');
    });
  };

  // 로딩 중 상태 표시
  if (!loading) return <Loader />;

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
          // date: list?.date || null,
          // due_date: list?.due_date || null,
          cashierInfo: list?.cashierInfo || invoiceSingleList,
          customerInfo: list?.customerInfo || invoiceSingleList,
          invoice_detail: list?.invoice_detail || [],
          discount: list?.discount || 0,
          tax: list?.tax || 0,
          notes: list?.notes || ''
        }}
        // 유효성 검사 스키마 적용
        validationSchema={validationSchema}
        // 폼 제출 할 때 실행할 함수(handlerEdit) 지정
        onSubmit={(values) => {
          handlerEdit(values);
        }}
      >
        {({ errors, handleChange, handleSubmit, values, isValid, setFieldValue, touched }) => {
          const subtotal =
            values?.invoice_detail?.reduce((prev, curr) => {
              if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
              else return prev;
            }, 0) || 0;

          // 계산들
          const taxRate = (values?.tax * subtotal) / 100;
          const discountRate = (values.discount * subtotal) / 100;
          const total = subtotal - discountRate + taxRate;

          return (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* # 1 ======================================= */}
                {/* Invoice Id 시작 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Invoice Id</InputLabel>
                    <FormControl sx={{ width: '100%' }}>
                      <TextField
                        required
                        disabled
                        type="number"
                        name="invoice_id"
                        id="invoice_id"
                        value={values.invoice_id}
                        onChange={handleChange}
                      />
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
                  <CreateDetail addId={values?.customerInfo?.id} />
                  {console.log('create 테스트: ' + values?.customerInfo?.id)}
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
                    <Grid container justifyContent="space-between" spacing={2} sx={{ pt: 2.5, pb: 2.5 }}>
                      {/* Discount(%) 시작 */}
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <InputLabel>공제액계(원)</InputLabel>
                          <TextField
                            type="number"
                            style={{ width: '100%' }}
                            name="discount"
                            id="discount"
                            placeholder="0.0"
                            value={values.discount}
                            onChange={handleChange}
                          />
                        </Stack>
                      </Grid>
                      {/* Discount(%) 끝 */}

                      {/* Tax(%) 시작 */}
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <InputLabel>Tax(원)</InputLabel>
                          <TextField
                            type="number"
                            style={{ width: '100%' }}
                            name="tax"
                            id="tax"
                            placeholder="0.0"
                            value={values.tax}
                            onChange={handleChange}
                          />
                        </Stack>
                      </Grid>
                      {/* Tax(%) 끝 */}
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={2}>
                        {/* Sub Total 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>지급액계:</Typography>
                          <Typography>{subtotal.toFixed(2)}원</Typography>
                        </Stack>
                        {/* Sub Total 끝 */}

                        {/* Discount 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>공제액계:</Typography>
                          <Typography variant="h6" color={theme.palette.success.main}>
                            {discountRate.toFixed(2)}원
                          </Typography>
                        </Stack>
                        {/* Discount 끝 */}

                        {/* Tax 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color={theme.palette.grey[500]}>Tax:</Typography>
                          <Typography>{taxRate.toFixed(2)}원</Typography>
                        </Stack>
                        {/* Tax 끝 */}

                        {/* Grand Total 시작 */}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle1">실 수령액:</Typography>
                          <Typography variant="subtitle1"> {total % 1 === 0 ? total : total.toFixed(2)}원</Typography>
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
                      value={values.notes}
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

export default Create;
