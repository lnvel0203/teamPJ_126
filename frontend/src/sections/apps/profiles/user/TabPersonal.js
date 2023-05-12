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

  Stack,
  TextField
} from '@mui/material';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
// import { useInputRef } from './index';

import MainCard from 'components/MainCard';



function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {


  const id = localStorage.getItem("id");
  console.log('id',id)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const [hireDate, setHireDate] = useState('');
  const [name, setName] = useState('');
  
 

  const dispatch = useDispatch();
  

  // # 추가 axios 요청 ==============================================================
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 추가 데이터를 가져오기 전까지 폼이 렌더링 되지 못하게 함

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/members/mypage/'+id);
        setFetchedData(response.data);
        console.log("성공",response.data)
        console.log("입사일",response.data.hireDate)
        setHireDate(response.data.hireDate)
        setName(response.data.name)
        format(new Date(hireDate), 'yyyy-MM-dd')

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
  function getInvoiceUpdate(id, NewLists) {
    return async (dispatch) => {
      try {
        console.log('NewLists:', JSON.stringify(NewLists, null, 2));
        const response = await axios.post(`http://localhost:8081/members/userInfoUpdate/${id}`, NewLists, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('결과' + response);
        window.location.reload(); 
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
              email: fetchedData?.email || '',
             // dob: fetchedData?.dob ? new Date(fetchedData.dob) : new Date(),
               hp: fetchedData?.hp || '',
              address: fetchedData?.address || '',
              submit: null
            }}
            // 유효성 검사
            validationSchema={Yup.object().shape({
              
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                // 서버에 수정된 내용 전송
                dispatch(getInvoiceUpdate(id, values));

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
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting,  touched, values }) => (
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
                          value={name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                          autoFocus
                          
                        />
                        {touched.firstname && errors.firstname && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.firstname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* First Name 끝 */}

                    

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
                          inputRef={inputRef}
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
                        <InputLabel htmlFor="personal-hireDate">입사일</InputLabel>
                        {/* {console.log('values:', values)} */}

                        <TextField
                          fullWidth
                          id="hireDate"
                          value={hireDate}
                          name="hireDate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="hireDate"
                          autoFocus
                          
                        />
                        {touched.hireDate && errors.hireDate && (
                          <FormHelperText error id="personal-hireDate-helper">
                            {errors.firstname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 입사일 끝 */}

                    {/* 전화번호 시작 */}
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-first-name">phone</InputLabel>
                        {/* {console.log('values:', values)} */}

                        <TextField
                          fullWidth
                          id="hp"
                          value={values.hp}
                          name="hp"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="phone"
                          autoFocus
                          
                          
                        />
                        {touched.hp && errors.hp && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.hp}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* 전화번호 끝 */}

                   
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
                          placeholder="Address"
                          
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="personal-address-helper">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    
                  </Grid>
                </Box>
                
                <Box sx={{ p: 2.5 }}>
                
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