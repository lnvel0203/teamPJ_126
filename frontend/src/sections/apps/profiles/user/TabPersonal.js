import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { useOutletContext } from 'react-router';

import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  CardHeader,
  // Chip,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
// import { useInputRef } from './index';

import MainCard from 'components/MainCard';

// assets
// import { CloseOutlined } from '@ant-design/icons';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// const skills = [];

function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const handleChangeDay = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const dispatch = useDispatch();

  // # 추가 axios 요청 ==============================================================
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 추가 데이터를 가져오기 전까지 폼이 렌더링 되지 못하게 함

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/members/userInfoDetail');
        setFetchedData(response.data);
        setIsLoading(false); // 추가 폼 렌더링 관련
        // console.log(response.data.name);
      } catch (error) {
        console.error('Error fetching data', error);
        setIsLoading(false); // 추가 폼 렌더링 관련
      }
    }

    fetchData();
  }, []);

  // axios 수정사항 업데이트
  function getInvoiceUpdate(NewLists) {
    return async (dispatch) => {
      try {
        console.log('NewLists:', JSON.stringify(NewLists, null, 2));
        const response = await axios.post('http://localhost:8081/members/userInfoUpdate', NewLists, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('결과' + response);
        dispatch(invoice.actions.UpdateInvoice(response.data));
      } catch (error) {
        dispatch(invoice.actions.hasError(error));
      }
    };
  }
  // ===============================================================================

  const inputRef = useInputRef();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> // 로딩 중인 경우에 표시할 컴포넌트
      ) : (
        <MainCard content={false} title="내정보" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
          <Formik
            initialValues={{
              name: fetchedData?.name || '',
              lastname: fetchedData?.lastname || '',
              email: fetchedData?.email || '',
              dob: fetchedData?.dob ? new Date(fetchedData.dob) : new Date(),
              countryCode: fetchedData?.countryCode || '',
              contact: fetchedData?.contact || '',
              designation: fetchedData?.designation || '',
              address: fetchedData?.address || '',
              address1: fetchedData?.address1 || '',
              country: fetchedData?.country || '',
              state: fetchedData?.state || '',
              submit: null
            }}
            // 유효성 검사
            validationSchema={Yup.object().shape({
              // firstname: Yup.string().max(255).required('First Name is required.'),
              // lastname: Yup.string().max(255).required('Last Name is required.'),
              // email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
              // dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
              // contact: Yup.number()
              //   .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
              //   .required('Phone number is required'),
              // designation: Yup.string().required('Designation is required'),
              // address: Yup.string().min(50, 'Address to short.').required('Address is required'),
              // country: Yup.string().required('Country is required'),
              // state: Yup.string().required('State is required'),
              // note: Yup.string().min(150, 'Not shoulde be more then 150 char.')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                // 서버에 수정된 내용 전송
                dispatch(getInvoiceUpdate(values));

                // 성공 메시지 표시
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'Personal profile updated successfully.',
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
                setStatus({ success: false });
                setSubmitting(false);
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ p: 2.5 }}>
                  {/* Personal Information 시작 */}
                  <Grid container spacing={3}>
                    {/* First Name 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                        {/* {console.log('values:', values)} */}

                        <TextField
                          fullWidth
                          id="name"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                          autoFocus
                          inputRef={inputRef}
                        />
                        {touched.firstname && errors.firstname && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.firstname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* First Name 끝 */}

                    {/* Last Name 시작 */}
                    {/* <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="personal-last-name-helper">
                        {errors.lastname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid> */}
                    {/* Last Name 끝 */}

                    {/* 이메일 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-email">Email</InputLabel>
                        <TextField
                          type="email"
                          fullWidth
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="personal-email"
                          placeholder="Email Address"
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="personal-email-helper">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 이메일 끝 */}

                    {/* 입사일 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-date">입사일</InputLabel>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Select
                            fullWidth
                            value={values.dob.getMonth().toString()}
                            name="dob-month"
                            onChange={(e) => handleChangeMonth(e, values.dob, setFieldValue)}
                          >
                            <MenuItem value="0">January</MenuItem>
                            <MenuItem value="1">February</MenuItem>
                            <MenuItem value="2">March</MenuItem>
                            <MenuItem value="3">April</MenuItem>
                            <MenuItem value="4">May</MenuItem>
                            <MenuItem value="5">June</MenuItem>
                            <MenuItem value="6">July</MenuItem>
                            <MenuItem value="7">August</MenuItem>
                            <MenuItem value="8">September</MenuItem>
                            <MenuItem value="9">October</MenuItem>
                            <MenuItem value="10">November</MenuItem>
                            <MenuItem value="11">December</MenuItem>
                          </Select>
                          <Select
                            fullWidth
                            value={values.dob.getDate().toString()}
                            name="dob-date"
                            onBlur={handleBlur}
                            onChange={(e) => handleChangeDay(e, values.dob, setFieldValue)}
                            MenuProps={MenuProps}
                          >
                            {[
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                              31
                            ].map((i) => (
                              <MenuItem
                                key={i}
                                value={i}
                                disabled={
                                  (values.dob.getMonth() === 1 && i > (values.dob.getFullYear() % 4 === 0 ? 29 : 28)) ||
                                  (values.dob.getMonth() % 2 !== 0 && values.dob.getMonth() < 7 && i > 30) ||
                                  (values.dob.getMonth() % 2 === 0 && values.dob.getMonth() > 7 && i > 30)
                                }
                              >
                                {i}
                              </MenuItem>
                            ))}
                          </Select>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              views={['year']}
                              value={values.dob}
                              maxDate={maxDate}
                              onChange={(newValue) => {
                                setFieldValue('dob', newValue);
                              }}
                              renderInput={(params) => <TextField fullWidth {...params} helperText={null} />}
                            />
                          </LocalizationProvider>
                        </Stack>
                        {touched.dob && errors.dob && (
                          <FormHelperText error id="personal-dob-helper">
                            {errors.dob}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 생년월일 끝 */}

                    {/* 전화번호 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-phone">Phone</InputLabel>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                            <MenuItem value="010">010</MenuItem>
                            <MenuItem value="011">011</MenuItem>
                            <MenuItem value="011">019</MenuItem>
                          </Select>
                          <TextField
                            fullWidth
                            id="personal-contact"
                            value={values.contact}
                            name="contact"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="1234-5678"
                          />
                        </Stack>
                        {touched.contact && errors.contact && (
                          <FormHelperText error id="personal-contact-helper">
                            {errors.contact}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 전화번호 끝 */}

                    {/* 직책인 것 같아요 */}
                    {/* <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-designation">Designation</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-designation"
                      value={values.designation}
                      name="designation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                    {touched.designation && errors.designation && (
                      <FormHelperText error id="personal-designation-helper">
                        {errors.designation}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid> */}
                  </Grid>
                </Box>

                {/* Address 시작 */}
                <CardHeader title="Address" />
                <Divider />
                <Box sx={{ p: 2.5 }}>
                  <Grid container spacing={3}>
                    {/* 주소1 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-addrees1">주소</InputLabel>
                        <TextField
                          multiline
                          rows={3}
                          fullWidth
                          id="personal-addrees1"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address 01"
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="personal-address-helper">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 주소1 끝 */}

                    {/* 주소2 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-addrees2">상세주소</InputLabel>
                        <TextField
                          multiline
                          rows={3}
                          fullWidth
                          id="personal-addrees2"
                          value={values.address1}
                          name="address1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address 02"
                        />
                      </Stack>
                    </Grid>
                    {/* 주소2 끝 */}
                  </Grid>
                </Box>
                {/* Address 끝 */}

                {/* 스킬 탭 */}
                {/* <CardHeader title="Skills" />
            <Divider />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 2.5, m: 0 }} component="ul">
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                options={skills}
                value={values.skill}
                onBlur={handleBlur}
                getOptionLabel={(label) => label}
                onChange={(event, newValue) => {
                  setFieldValue('skill', newValue);
                }}
                renderInput={(params) => <TextField {...params} name="skill" placeholder="Add Skills" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      {...getTagProps({ index })}
                      variant="combined"
                      label={option}
                      deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                      sx={{ color: 'text.primary' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 0,
                    '& .MuiAutocomplete-tag': {
                      m: 1
                    },
                    '& fieldset': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                      display: 'none'
                    }
                  }
                }}
              />
            </Box> */}
                {/* <CardHeader title="Note" />
                <Divider /> */}
                <Box sx={{ p: 2.5 }}>
                  {/* <TextField
                    multiline
                    rows={5}
                    fullWidth
                    value={values.note}
                    name="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="personal-note"
                    placeholder="Note"
                  /> */}
                  {/* {touched.note && errors.note && (
                    <FormHelperText error id="personal-note-helper">
                      {errors.note}
                    </FormHelperText>
                  )} */}
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                    <Button variant="outlined" color="secondary">
                      Cancel
                    </Button>
                    <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                      Save
                    </Button>
                  </Stack>
                </Box>
              </form>
            )}
          </Formik>
        </MainCard>
      )}
    </>
  );
};

export default TabPersonal;
