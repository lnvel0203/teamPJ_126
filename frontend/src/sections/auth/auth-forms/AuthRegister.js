import React, { Component } from "react";
import axios from 'axios'; 

//import ApiService from "../../../ApiService";

//import ApiService from "../../../ApiService";
//import "./join.css";

import AnimateButton from 'components/@extended/AnimateButton';

import {
 // Box,
  Button,
 //Divider,
  FormControl,
  FormHelperText,
  Grid,
  //Link,
 // InputAdornment,
  InputLabel,
 // OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
class AuthRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      hp:"",
      birth:"",
      address:"",
      name: "",
      pwd: "",
      email: "",
      message: null,
    };
  }

  onChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  
  dupleChk = (e) =>{
    e.preventDefault();

    let memberId = {
      id: this.state.id,
      

  };

    const MEMBER_API_BASE_URL = 'http://localhost:8081/members';

    axios.post(MEMBER_API_BASE_URL+ "/dupleChk", memberId)
    .then(res => {
     
        if(res.data === 0){
            alert("중복된 아이디입니다.");
        }else{
            alert("사용 가능한 아이디입니다.");
        }
     })
}
  signOn = (e) => {
    
    e.preventDefault();
    let member = {
      id: this.state.id,
      pwd: this.state.pwd,
      name: this.state.name,
      hp:this.state.hp,
      birth:this.state.birth,
      email:this.state.email,
      address:this.state.address,

  };

  const MEMBER_API_BASE_URL = 'http://localhost:8081/members';
   
    axios.post(MEMBER_API_BASE_URL+ "/join", member)
    .then(res =>{
      if(res.data === 1){
        window.location.href="/login";
     
      }else{
        console.error();
      }
    }
    );

  };

  render() {
    const style = {
      width:390,
      height:50,
      
    }

    const styleMargin = {

      marginBottom:20
    }

    return (
      <div >
        <form>

                  <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">아이디*</InputLabel>
                   <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="id"
                        name="id"
                        value={this.state.id}
                        className="text_input"
                        placeholder="아이디를 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>
                    </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">비밀번호*</InputLabel>
                    <div style={styleMargin}>
                 <input style={style}
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={this.state.pwd}
                        className="text_input"
                        placeholder="비밀번호를 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>
                    </Stack>
                    </Grid>

                    <Grid item xs={12}>
                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">이름*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        className="text_input"
                        placeholder="이름을 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>
                    </Stack>
                    </Grid>
                    <Grid item xs={12}>
                    
                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">이메일*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        className="text_input"
                        placeholder="이메일을 입력하세요"
                        onChange={this.onChange}
                      />
                    <FormHelperText error id="helper-text-firstname-signup">
                   
                    </FormHelperText>
                    </div>
                     
                    </Stack>
                    </Grid>
                    
                    <Grid item xs={12}>

                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">생년월일*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="birth"
                        name="birth"
                        value={this.state.birth}
                        className="text_input"
                        placeholder="생년월일을 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>
                    </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">핸드폰번호*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="hp"
                        name="hp"
                        value={this.state.hp}
                        className="text_input"
                        placeholder="핸드폰번호를 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>
                    </Stack>
                    </Grid>

                    <Grid item xs={12}>

                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">집 주소*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="address"
                        name="address"
                        value={this.state.address}
                        className="text_input"
                        placeholder="집 주소를 입력하세요"
                        onChange={this.onChange}
                      />
                    </div>

                    </Stack>
                    </Grid>       

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                  
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                  
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
                    <br />
                    <div>
                    <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation onClick={this.signOn}  fullWidth size="large" type="button" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
                </Grid>
                    </div>
                 <br />
               </form>
      </div>

    );
  }
}

export default AuthRegister;
