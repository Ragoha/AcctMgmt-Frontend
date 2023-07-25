import React, { Component } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";
import validator from 'validator';
import { NextPlanSharp } from '@mui/icons-material';
class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      password: '',
      email: '',
      confirmPassword: '',
      birthdate: '',
      gender: '',
      phone: '',
      address: '',
      zipcode: '',
      affiliation: '',
      company: '',
      department: '',
      position: '',
      isIdDuplicated: false,  //중복확인 변수
      isIdValid: false, // 실시간 
      isPasswordValid: false,
      isConfirmPasswordValid: false,
      value: '',
      error: false,
      errorMessage: '',
    };
  }

  handleChange2 = (e) => {
    const { value } = e.target;
    const isIdValid = validator.matches(value, /^[a-zA-Z0-9]+$/) || value === ''; // 알파벳 대소문자와 숫자만 사용 가능하거나 값이 비어있을 경우에 유효한 값으로 간주합니다.
    const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value); // 입력된 값에 한글이 포함되어 있는지 확인합니다.
    this.setState({ isIdDuplicated: false });
    this.setState({
      id: isIdValid ? value : '',
      // error: !isIdValid,
      errorMessage: isKoreanInput
        ? '알파벳 대소문자와 숫자만 사용 가능합니다.'
        : !isIdValid
          ? '알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다.'
          : '',
      isIdValid: isIdValid && !isKoreanInput,
    });
  };



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  };

  handleBlur = () => {
    const { error, id } = this.state;
    const isIdValid = validator.matches(
      id, /^[a-z0-9_-]{2,10}$/);
    if (!error && id !== '') {
      this.setState({
        errorMessage: !isIdValid ? '알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다.' : '사용 가능한 양식입니다.',
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, password, email, gender, phone, company, position } = this.state;
    const signData = 
    { 
       coCd : company,
       empId : id,
       empPw: password,
       empEmail: email,
       empTel: phone,
       empName: name,
       empSx: gender,
       empOd: position, 
       empAuth: 'ROLE_USER',
    };

    // 폼 필드의 값이 비어있는지 확인
    if (Object.values(signData).some(value => value === '')) {
      alert('모든 필드에 값을 입력해주세요.');
      return;
    }

    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    // 회원가입 API 호출
    console.log(signData);
    axios.post(ACCTMGMT_API_BASE_URL + '/join', signData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // 회원가입 성공 시 처리 로직
        alert("회원가입 성공", response);
        console.log(response.data);
        this.props.handleClose();
        // 다이얼로그 창 닫기
      })
      .catch((error) => {
        // 회원가입 실패 시 처리 로직
        alert("회원가입 실패", error);
        console.error(error);
      });
    // handle form submission logic here
  };


  handleIdCheck = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
  
    axios.get(ACCTMGMT_API_BASE_URL + '/emp/idcheck/' + id)
      .then((response) => {
        if (response.status === 200) {
          // 아이디 중복 없을 때 처리 로직
          alert("사용 가능한 아이디입니다.");
          console.log(response.data);
          this.setState({ isIdDuplicated: true });
        } 
      })
      .catch(error => { 
        console.log(error.response);
        // if (error.response.status === 400) {
        //     // BAD_REQUEST 에러일 때 처리 로직
        //     alert("중복된 아이디입니다.");
        //     console.error(error.response.data);
        //     this.setState({
        //       isIdDuplicated: false,
        //       errorMessage: '중복된 아이디 입니다.',
        //     });
        //   } 
        }
      )};
  
  

  validatePassword = (password) => {
    // Add your password validation logic here
    // For example, to check if it has at least 8 characters and contains a special character:
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);

    // For simplicity, let's assume any password longer than 8 characters is valid
    // return password.length >= 8;
  };

  render() {
    const {
      id,
      name,
      password,
      email,
      confirmPassword,
      gender,
      phone,
      company,
      position,
      isIdValid,
      isIdDuplicated,
      error, errorMessage,

    } = this.state;


    const isPasswordValid = this.validatePassword(password);
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} >
            <InputLabel>아이디</InputLabel>
            <TextField
              name="id"
              placeholder="알파벳 대소문자와 숫자만 사용 가능"
              variant="outlined"
              value={id}
              onChange={this.handleChange2}
              onBlur={this.handleBlur}
              disabled={error}
              error={error}
              helperText={errorMessage}
              sx={{
                width: '46%',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isIdValid ? 'success.main' : 'error.main',
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
            />


            <Button onClick={this.handleIdCheck} disabled={isIdDuplicated}>
              중복확인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>이름</InputLabel>
            <TextField
              name="name"
              placeholder="이름을 입력하세요"
              variant="outlined"
              color="secondary"
              value={name}
              onChange={this.handleChange}
              sx={{
                width: '46%',
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>패스워드</InputLabel>
            <TextField
              variant="outlined"
              color="secondary"
              name="password"
              placeholder="알파벳 대소문자, 숫자, 특수문자를 포함"
              type="password"
              value={password}
              error={password && !isPasswordValid}
              helperText={
                password && !isPasswordValid ? (
                  <>
                    알파벳 대소문자, 숫자, 특수문자를 포함한<br />8글자 이상을 입력하세요
                  </>
                ) : (
                  ''
                )
              }
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              sx={{
                width: '95%', whiteSpace: 'pre-wrap',
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>패스워드 확인</InputLabel>
            <TextField
              variant="outlined"
              color={confirmPassword ? (password === confirmPassword ? 'success' : 'error') : 'secondary'}
              name="confirmPassword"
              placeholder="한번 더 입력하세요"
              type="password"
              value={confirmPassword}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              sx={{
                width: '95%',
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
              error={confirmPassword && password !== confirmPassword}
              helperText={confirmPassword && password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>이메일</InputLabel>
            <TextField
              variant="outlined"
              color="secondary"
              name="email"
              placeholder="exaple@example.com"
              type="email"
              value={email}
              onChange={this.handleChange}
              sx={{
                width: '95%',
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <InputLabel>성별</InputLabel>
            <FormControl sx={{ width: '95%',}}>
              <Select
                variant="outlined"
                color="secondary"
                name="gender"
                // value='male'
                onChange={this.handleChange}
              >
                <MenuItem value="male">남자</MenuItem>
                <MenuItem value="female">여자</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>휴대전화</InputLabel>
            <TextField
              variant="outlined"
              color="secondary"
              name="phone"
              placeholder="01012341234"
              value={phone}
              onChange={this.handleChange}
              sx={{
                width: '95%',
                '& .MuiOutlinedInput-input::placeholder': {
                  fontSize: '12px', // 원하는 폰트 크기로 설정
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>회사</InputLabel>
            <TextField
              variant="outlined"
              color="secondary"
              name="company"
              placeholder="dz00"
              value={company}
              onChange={this.handleChange}
              fullWidth
            />
            <Button onClick={this.handleAddressSearch}>
              회사 검색
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
          <InputLabel>직책</InputLabel>
            <FormControl
              sx={{ width: '95%',}}
            >
              <Select
                variant="outlined"
                color="secondary"
                name="position"
                // value={'사원'}
                onChange={this.handleChange}
              >
                <MenuItem value="사원">사원</MenuItem>
                <MenuItem value="주임">주임</MenuItem>
                <MenuItem value="과장">과장</MenuItem>
                <MenuItem value="팀장">팀장</MenuItem>
                <MenuItem value="부장">부장</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleSubmit} variant="contained" color="primary" >
              Sign Up
            </Button>
          </Grid>
        </Grid>
        {/* 주소 검색 다이얼로그 */}
        {/* <Dialog open={isAddressDialogOpen} onClose={this.handleCloseAddressDialog}>
          <DialogTitle>주소 검색</DialogTitle>
          <DialogContent> */}
        {/* 주소 검색 내용 */}
        {/* <iframe src="/address-search" frameBorder="0" width="100%" height="400px" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddressDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog> */}
      </form>
    );
  }
}
export default SignUpComponent;