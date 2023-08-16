import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import validator from "validator";
import { CustomInputLabel, CustomMediumTextField } from "../common/style/CommonStyle";
class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      password: "",
      email: "",
      confirmPassword: "",
      birthdate: "",
      gender: "",
      phone: "",
      address: "",
      zipcode: "",
      affiliation: "",
      company: "",
      department: "",
      position: "",
      isIdDuplicated: false, //중복확인 변수
      isIdValid: false, // 실시간
      isPasswordValid: false,
      isConfirmPasswordValid: false,
      value: "",
      error: false,
      errorMessage: "",
    };
  }

  handleChange2 = (e) => {
    const { value } = e.target;
    const isIdValid =
      validator.matches(value, /^[a-zA-Z0-9]+$/) || value === ""; // 알파벳 대소문자와 숫자만 사용 가능하거나 값이 비어있을 경우에 유효한 값으로 간주합니다.
    const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value); // 입력된 값에 한글이 포함되어 있는지 확인합니다.
    this.setState({ isIdDuplicated: false });
    this.setState({
      id: isIdValid ? value : "",
      // error: !isIdValid,
      errorMessage: isKoreanInput
        ? "알파벳 대소문자와 숫자만 사용 가능합니다."
        : !isIdValid
          ? "알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다."
          : "",
      isIdValid: isIdValid && !isKoreanInput,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = () => {
    const { error, id } = this.state;
    const isIdValid = validator.matches(id, /^[a-z0-9_-]{2,10}$/);
    if (!error && id !== "") {
      this.setState({
        errorMessage: !isIdValid
          ? "알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다."
          : "사용 가능한 양식입니다.",
      });
    }
  };

  handleClose = () => {
    this.setState({
      id: "",
      name: "",
      password: "",
      email: "",
      confirmPassword: "",
      gender: "",
      phone: "",
      company: "",
      position: "",
      isIdDuplicated: false,
      isIdValid: false,
      isPasswordValid: false,
      isConfirmPasswordValid: false,
      value: "",
      error: false,
      errorMessage: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, password, email, gender, phone, company, position } =
      this.state;
    const signData = {
      coCd: company,
      empId: id,
      empPw: password,
      empEmail: email,
      empTel: phone,
      empName: name,
      empOd: position,
      empAuth: "ROLE_USER",
    };

    // 폼 필드의 값이 비어있는지 확인
    if (Object.values(signData).some((value) => value === "")) {
      alert("모든 필드에 값을 입력해주세요.");
      return;
    }

    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    // 회원가입 API 호출
    axios
      .post(ACCTMGMT_API_BASE_URL + "/join", signData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // 회원가입 성공 시 처리 로직
        alert("회원가입 성공", response);
        console.log(response.data);
        this.props.handleClose();
        this.handleClose(); // 추가: 회원가입 성공 시 상태 초기화
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
    // 중복 확인 로직 처리
    // DB에서 아이디 중복 여부를 확인하는 API 호출 등을 수행
    // 여기에서는 예시로 무조건 중복된 아이디로 설정
    e.preventDefault();
    const { id } = this.state;
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    //api 호출
    axios
      .get(ACCTMGMT_API_BASE_URL + "/emp/idcheck/" + id)
      .then((response) => {
        // 아이디 중복일 때 처리 로직
        alert("사용가능한 아이디 입니다.", response);
        console.error(response);
        this.setState({ isIdDuplicated: true });
      })
      .catch((error) => {
        // 아이디 중복 없을 때 처리 로직
        alert("아이디 중복이요", error);
        console.log(error.data);
        this.setState({
          isIdDuplicated: false,
          errorMessage: "중복된 아이디 입니다.",
          isIdValid:false,
        });
      });
  };

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
      error,
      errorMessage,
    } = this.state;

    const isPasswordValid = this.validatePassword(password);
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction="column" spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomInputLabel>
                    아이디
                  </CustomInputLabel>
                  <span style={{ marginLeft: '8px', fontSize: '10px', color: isIdValid ? 'green' : 'red' }}>
                    {errorMessage}
                  </span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    name="id"
                    placeholder="아이디 입력(6 ~ 20자)"
                    variant="outlined"
                    value={id}
                    onChange={this.handleChange2}
                    onBlur={this.handleBlur}
                    disabled={error}
                    error={error}
                    // helperText={errorMessage}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: isIdValid ? "success.main" : "error.main",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px",
                      },
                    }}
                  />
                  <InputLabel
                    sx={{
                      ml: 1,
                      color: "#1976D2",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={this.handleIdCheck}
                    disabled={isIdDuplicated}
                  >
                    중복확인
                  </InputLabel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomInputLabel>
                    패스워드
                  </CustomInputLabel>
                  {password && !isPasswordValid && (
                    <span style={{ marginLeft: '8px', fontSize: '10px', color: isPasswordValid ? 'green' : 'red' }}>
                      {this.state.isPasswordValid ? '사용 가능한 패스워드 입니다.' : '알파벳 대소문자, 숫자, 특수문자를 포함한 8글자 이상을 입력하세요!!!'}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    variant="outlined"
                    color="secondary"
                    name="password"
                    placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
                    type="password"
                    value={password}
                    error={password && !isPasswordValid}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: isPasswordValid ? "success.main" : "error.main",
                      },
                      whiteSpace: "pre-wrap",
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px",
                      },
                    }}
                  />
                  {/* {password && !isPasswordValid && (
                    <span style={{ marginLeft: '8px', fontSize: '10px', color: 'red' }}>
                      알파벳 대소문자, 숫자, 특수문자를 포함한 8글자 이상을 입력하세요
                    </span>
                  )} */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>패스워드 확인</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <Tooltip
                  title={
                    <div>
                      {confirmPassword !== "" &&
                        (password !== confirmPassword
                          ? "비밀번호가 일치하지 않습니다."
                          : "비밀번호가 일치합니다.")}
                    </div>
                  }
                >
                  <CustomMediumTextField
                    variant="outlined"
                    color={
                      confirmPassword
                        ? password === confirmPassword
                          ? "success"
                          : "error"
                        : "secondary"
                    }
                    name="confirmPassword"
                    placeholder="패스워드 재입력"
                    // placeholder="한번 더 입력하세요"
                    type="password"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    sx={{
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px", // 원하는 폰트 크기로 설정
                      },
                    }}
                    error={confirmPassword && password !== confirmPassword}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>이름</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  name="name"
                  placeholder="이름을 입력해주세요"
                  variant="outlined"
                  color="secondary"
                  value={name}
                  onChange={this.handleChange}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>이메일</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>휴대전화</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <Grid container></Grid>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  name="phone"
                  placeholder="휴대폰 번호 입력('-' 제외 11자리 입력)"
                  value={phone}
                  onChange={this.handleChange}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>회사</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    variant="outlined"
                    color="secondary"
                    name="company"
                    placeholder="회사명을 입력해주세요"
                    value={company}
                    onChange={this.handleChange}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px", // 원하는 폰트 크기로 설정
                      },
                    }}
                  />
                  <InputLabel
                    sx={{
                      ml: 1,
                      color: "#1976D2",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={this.handleAddressSearch}
                  >
                    회사 검색
                  </InputLabel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <CustomInputLabel>직책</CustomInputLabel>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  name="position"
                  placeholder="직책을 입력해주세요"
                  onChange={this.handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </div>
          </Grid> */}
        </Grid>
      </form>
    );
  }
}
export default SignUpComponent;
