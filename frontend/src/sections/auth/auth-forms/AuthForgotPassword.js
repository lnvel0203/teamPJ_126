
// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { request } from '../../../utils/axios';
// third party
//import * as Yup from 'yup';
import { Formik } from 'formik';

// project import

import AnimateButton from 'components/@extended/AnimateButton';


// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {

  return (
    <>
      <Formik
        initialValues={{
          pwd: '',
          confirmpwd:'',
          email:'',
          submit: null
        }}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        // })}
        onSubmit={async (values) => {
          try {
              await request(
              'POST',
              '/members/passwordChange',
              {
                pwd:values.pwd,
                email:values.email,
              }
            ).then((response) => {

              if(response.data === 1){
                alert("비밀번호가 변경되었습니다.");
                window.close();
              }else{
                alert("비밀번호가 변경되지 않았습니다.");
              }})

          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">이메일</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요."
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">비밀번호</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.pwd)}
                    id="email-forgot"
                    type="password"
                    value={values.pwd}
                    name="pwd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
               <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">비밀번호 재확인</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.confirmpwd)}
                    id="email-forgot"
                    type="password"
                    value={values.confirmpwd}
                    name="confirmpwd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="동일한 비밀번호를 입력하세요"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    비밀번호 변경
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
