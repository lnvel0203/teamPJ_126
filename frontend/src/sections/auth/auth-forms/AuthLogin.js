import React, { Component } from 'react';
import { request, setAuthToken, setId } from '../../../utils/axios';
import { InputLabel, Grid, Stack, Button, Divider, Typography, Link } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

class AuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pwd: '',
      message: null
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  pwdChange = () => {
    window.open("forgot-password", "_blank", "width=400,height=600,top=100,left=100");
  };

  onKeyPress=(e)=>{
    console.log(e.data);
    if(e.key === 'Enter'){
      this.login(e);
    }
  }

  login = (e) => {
    localStorage.clear();
    e.preventDefault();
    request(
      'POST',
      '/members/login',
      {
        id: this.state.id,
        pwd: this.state.pwd
      }
    ).then((response) => {
        this.setState({ componentToShow: 'messages' });
        setAuthToken(response.data.token);
        setId(this.state.id);
        window.location.href = '/apps/main-page';
      }).catch((err) => {
        console.log(`Error Occured : ${err}`),
        alert("비밀번호를 잘못 입력하셨습니다.")
      });
  };

  render() {
    const style = {
      width: 390,
      height: 50
    };

      return (
      <div>
        <form className="login_btn">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">아이디</InputLabel>
                <div className="text_area">
                  <input
                    style={style}
                    type="text"
                    id="id"
                    name="id"
                    value={this.state.id}
                    className="text_input"
                    onChange={this.onChange}
                    placeholder="아이디를 입력하세요"
                  />
                </div>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">비밀번호</InputLabel>
                <div className="text_area">
                  <input
                    style={style}
                    type="password"
                    id="pwd"
                    name="pwd"
                    value={this.state.pwd}
                    className="text_input"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyPress}
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="button" variant="contained" color="primary" onClick={this.login}>
                  Login
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="caption">
                  <AnimateButton>
                    <Link variant="h6" onClick={this.pwdChange} color="text.primary">
                      Forgot Password?
                    </Link>
                  </AnimateButton>
                </Typography>
              </Divider>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
export default AuthLogin;
