//import React, { Component, useState } from "react";
import React, { useState } from 'react';
import axios from 'axios'; 
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

//class AuthRegister extends Component {

  function AuthRegister() {

    const [id, setUserId] = useState("");
    const [pwd, setPassword] = useState("");
    const [name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [birth, setBirth] = useState("");
    const [address, setAddress] = useState("");
    
    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

const onChangeUserId = (e) => {
    const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
    if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUserIdError(false);
    else setUserIdError(true);
    setUserId(e.target.value);
};
const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if ((!e.target.value || (passwordRegex.test(e.target.value)))) setPasswordError(false);
    else setPasswordError(true);
    setPassword(e.target.value);

};

const onChangeUserName = (e) => {
    setUserNameError(false);
    setUserName(e.target.value)
};
const onChangeEmail = (e) => {
    const emailRegex = /^(([^<>(),[\].,;:\s@"]+(\.[^<>(),[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
};

const onChangeDate = (e) => {
  
  setBirth(e.target.value);
 
};

const onChangeHp = (e) => {
  
  setHp(e.target.value);

};
const onChangeAddress = (e) => {
  
  setAddress(e.target.value);

};

const validation = () => {
  if(!id) setUserIdError(true);
  if(!pwd) setPasswordError(true);
  if(!name) setUserNameError(true);
  if(!email) setEmailError(true);

  if(id && pwd && name && email){
    return true;
  } 
  else {
    return false;
  }
}


const dupleChk = (e) =>{

  const MEMBER_API_BASE_URL = 'http://localhost:8081/members';
  //const headers = {"Content-type":"application/x-www-form-urlencoded"}
  e.preventDefault();

  let memberId = {
    id:id,
  }

  if(id === ""){
    alert("아이디를 입력해주세요.");
  }else{

    axios.post(MEMBER_API_BASE_URL+ "/dupleChk", memberId)
    .then(res => {
     
        if(res.data === 0){
            alert("중복된 아이디입니다.");
            

        }else{
            alert("사용 가능한 아이디입니다.");
         
        }
     });
  }
}
  const signOn = (e) => {
    const MEMBER_API_BASE_URL = 'http://localhost:8081/members';
    e.preventDefault();
    let member = {
       id:id,
       pwd:pwd,
       name:name,
       hp:hp,
       birth:birth,
       email:email,
       address:address,
    };

    if(validation() === false){
      alert("회원가입 절차를 맞춰서 진행해주세요.");
      window.location.reload();
    }else{

      axios.post(MEMBER_API_BASE_URL+ "/register", member)
      .then(res =>{
          if(res.data === 1){
            window.location.href="/login";
        
          }else{
            console.error();
          }
        }
       );
    }
  };
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

                  <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup"> 아이디* </InputLabel>
                  
                   <div style={styleMargin}>
                    <input style={style}
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        className="text_input"
                        placeholder="아이디를 입력하세요"
                        onChange={onChangeUserId}
                      />
                    <Button disableElevation onClick={dupleChk} fullWidth size="small" type="button" variant="contained" color="primary">중복확인</Button>
                    <div>{userIdError && <div className="invalid-input">아이디는 5자이상 입력해야 합니다.</div>}</div> 
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
                        value={pwd}
                        className="text_input"
                        placeholder="비밀번호를 입력하세요"
                        onChange={onChangePassword}
                        
                      />
                    </div>
                    <div className='join_Chk'>{passwordError && <div className="invalid-input">비밀번호는 8자리 이상 영문+숫자를 입력해야 합니다. </div>}</div>
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
                        value={name}
                        className="text_input"
                        placeholder="이름을 입력하세요"
                        onChange={onChangeUserName}
                      />
                    </div>
                    <div className='join_Chk'>{userNameError && <div className="invalid-input">반드시 입력해야 합니다.</div>}</div>
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
                        value={email}
                        className="text_input"
                        placeholder="이메일을 입력하세요"
                        onChange={onChangeEmail}
                      />
                    <FormHelperText error id="helper-text-firstname-signup">
                    </FormHelperText>
                    </div>
                    <div className='join_Chk'>{emailError && <div className="invalid-input">이메일 형식을 맞춰서 입력해야 합니다.</div>}</div>
                    </Stack>
                    </Grid>
                    <Grid item xs={12}>
                    <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">생년월일*</InputLabel>
                    <div style={styleMargin}>
                    <input style={style}
                        type="date"
                        id="birth"
                        name="birth"
                        value={birth}
                        className="text_input"
                        placeholder="생년월일을 입력하세요"
                        onChange={onChangeDate}
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
                        value={hp}
                        className="text_input"
                        placeholder="핸드폰번호를 입력하세요"
                        onChange={onChangeHp}
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
                        value={address}
                        className="text_input"
                        placeholder="집 주소를 입력하세요"
                        onChange={onChangeAddress}
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
                  <Button disableElevation onClick={signOn}  fullWidth size="large" type="button" variant="contained" color="primary">
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

export default AuthRegister;
