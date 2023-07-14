import React, { Component } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";

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
      isIdDuplicated: false,
      isAddressDialogOpen: false,
      isIdValid: false,
      isPasswordValid: false,
      isConfirmPasswordValid: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ isIdDuplicated: false });
  };

  handleIdCheck = (e) => {
    // 중복 확인 로직 처리
    // DB에서 아이디 중복 여부를 확인하는 API 호출 등을 수행
    // 여기에서는 예시로 무조건 중복된 아이디로 설정
    e.preventDefault();
    const { id } = this.state;
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    //api 호출
    axios.get(ACCTMGMT_API_BASE_URL + '/api/emp/idcheck/' + id)
      .then((response) => {
        // 아이디 중복일 때 처리 로직
        alert("아이디 중복이요", response);
        console.log(response.data);
        this.setState({ isIdDuplicated: false });
      })
      .catch((error) => {
        // 아이디 중복 없을 때 처리 로직
        alert("사용가능한 아이디 입니다.", error);
        console.error(error);
        this.setState({ isIdDuplicated: true });
      });

  };

  handleAddressSearch = () => {
    // 주소 검색 로직 처리
    // DB에서 주소를 검색하는 API 호출 등을 수행
    // 여기에서는 예시로 주소를 무조건 설정
    this.setState({ address: '서울특별시 강남구' });
  };

  handleOpenAddressDialog = () => {
    this.setState({ isAddressDialogOpen: true });
  };

  handleCloseAddressDialog = () => {
    this.setState({ isAddressDialogOpen: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleIdCheck = () => {
    // Perform duplicate ID check logic here
    // ...
    const isIdDuplicated = false; // Example value, replace with actual logic

    this.setState({ isIdDuplicated });
  };

  validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]+$/;
    return idRegex.test(id);
  };

  validatePassword = (password) => {
    // Add your password validation logic here
    // For example, to check if it has at least 8 characters and contains a special character:
    // const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    // return passwordRegex.test(password);

    // For simplicity, let's assume any password longer than 8 characters is valid
    return password.length >= 8;
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
      isIdDuplicated,
      isIdDuplicated2,
    } = this.state;
    const isIdValid = this.validateId(id);
    const isPasswordValid = this.validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword;
    // const displayInline = {
    //   display:"inline"
    // const idRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    // const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

    // }
    return (
      <form onSubmit={this.handleSubmit} >
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} >
            <InputLabel>ID</InputLabel>
            <TextField
              name="id"
              placeholder="ID"
              variant="outlined"//required
              // color={isIdValid ? 'success' : 'error'}
              value={id}
              onChange={this.handleChange}
              sx={{
                width: '95%', 
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isIdValid ? 'success.main' : 'error.main',
                },
                '& .MuiFormHelperText-root': {
                  color: isIdValid ? 'success.main' : 'error.main',
                },
              }}
              // value={id}
              // onChange={this.handleChange}
            // error={!isIdValid}
            />
            <Button onClick={this.handleIdCheck} disabled={isIdDuplicated}>
              중복확인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="standard"
              color="secondary"
              value={name}
              onChange={this.handleChange}
              sx={{ width: '95%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              color={isPasswordValid ? 'success' : 'error'}
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={this.handleChange}
              sx={{ width: '95%' }}
              error={!isPasswordValid}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              color={isConfirmPasswordValid ? 'success' : 'error'}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={this.handleChange}
              sx={{ width: '95%' }}
              error={!isConfirmPasswordValid}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              color="secondary"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={this.handleChange}
              sx={{ width: '95%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '95%' }}>
              <InputLabel>Gender</InputLabel>
              <Select
                variant="standard"
                color="secondary"
                name="gender"
                value={gender}
                onChange={this.handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              color="secondary"
              name="phone"
              label="Phone"
              value={phone}
              onChange={this.handleChange}
              sx={{ width: '95%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              color="secondary"
              name="company"
              label="Company"
              value={company}
              onChange={this.handleChange}
              fullWidth
            />
            <Button onClick={this.handleAddressSearch}>
              회사 검색
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '95%' }}>
              <InputLabel>Position</InputLabel>
              <Select
                variant="standard"
                color="secondary"
                name="position"
                value={position}
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
            <Button type="submit" variant="contained" color="primary">
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