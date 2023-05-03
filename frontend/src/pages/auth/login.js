//이게 로그인이다. 이게 화면이다.

import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
//import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

const Login = () => {
   const { isLoggedIn } = '';

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">로그인</Typography>

            {/* 여기가 회원가입링크를 바꿀수있다. */}
            <Typography
              component={Link}
               to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              가입한 계정이 없으신가요?
            </Typography>




          </Stack>
        </Grid>
        <Grid item xs={12}>


          {/* 여기가 우리가 만든 곳이다. */}
          <AuthLogin />
        


        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;