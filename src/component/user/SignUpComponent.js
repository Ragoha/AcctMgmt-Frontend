import { Grid, InputLabel, Tooltip } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import validator from "validator";
import CustomSwal from '../common/CustomSwal.js';
import {
  CustomInputLabel,
  CustomMediumTextField,
} from "../common/style/CommonStyle";
import CoDialogComponent from "../co/dialog/CoDialogComponent";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.coDialogRef = React.createRef();
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
      value: "",
      error: false,
      errorMessage: "",
      CodialTextField: "",
      borderColor: 'none',
    };
  }
  helpClick = () => {
    this.coDialogRef.current.handleUp();
  }
  closeDialog = () => {
    this.dialogRef.current.handleDown();
  };
  handleSetCodialTextField = async (data) => {
    await this.setState({
      CodialTextField: data.coCd,
      coCd: data.coCd, //밑에 coCd 넘겨주기
    });
  };
  handleChange2 = (e) => {
    // const { value } = e.target;
    // const isIdValid =
    //   validator.matches(value, /^[a-zA-Z0-9]+$/) || value === "" && value.length >= 4; // 알파벳 대소문자와 숫자만 사용 가능하거나 값이 비어있을 경우에 유효한 값으로 간주합니다.
    // const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value); // 입력된 값에 한글이 포함되어 있는지 확인합니다.
    // this.setState({ isIdDuplicated: false });
    // this.setState({
    //   id: isIdValid ? value : "",
    //   // error: !isIdValid,
    //   errorMessage: isKoreanInput
    //     ? "알파벳 대소문자와 숫자만 사용 가능합니다."
    //     : !isIdValid
    //       ? "알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다."
    //       : "",
    //   isIdValid: isIdValid && !isKoreanInput,
    // });
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ isIdDuplicated: false });

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange3 = (event) => {
    const inputValue = event.target.value;

    // 입력 값을 필터링하여 원하는 값 이외의 입력은 무시하지 않고, 그대로 상태에 저장합니다.
    this.setState({ position: inputValue });
  };

  handleBlur = () => {
    const { id } = this.state;
    const isIdValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_-]{4,12}$/.test(id);
    const borderColor = id === '' ? 'error.main' : isIdValid ? 'success.main' : 'error.main';
    const errorMessage = id === ''
      ? '아이디를 입력해주세요.' // 빈 값일 때의 에러 메시지
      : !isIdValid
        ? '알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다.'
        : '';

    this.setState({
      error: id === '' || !isIdValid, // ID가 빈 값이거나 유효하지 않으면 에러 상태로 설정
      errorMessage,
      borderColor,
    });
  }

  handleBlurPassword = () => {
    const { password } = this.state;
    const isPasswordValid = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(password);

    const borderPass = password === '' ? 'error.main' : isPasswordValid ? 'success.main' : 'error.main';
    const errorMessagePass = password === ""
      ? "패스워드를 입력해주세요." // 빈 값일 때의 에러 메시지
      : !isPasswordValid
        ? "비밀번호는 알파벳 대소문자, 숫자, 특수문자를 포함한 8~20자 이내로 입력하셔야 합니다."
        : "";
    this.setState({
      errorMessagePass,
      borderPass,
    });
  }
  // {confirmPassword  !== password
  //   ? "비밀번호가 일치하지 않습니다."
  //   : "비밀번호가 일치합니다."}
  handleBlurconfirmPassword = () => {
    const { confirmPassword, password } = this.state;

    const borderConfirmPass = confirmPassword !== password || confirmPassword === '' ? 'error.main' : 'success.main';
    const errorMessageConfirmPass = confirmPassword === ''
      ? ""
      : confirmPassword !== password
        ? "비밀번호가 일치하지 않습니다."
        : "비밀번호가 일치합니다.";
    this.setState({
      errorMessageConfirmPass,
      borderConfirmPass,
    });
  }
  handleBlurName = () => {
    const { name } = this.state;

    const borderName = name !== '' ? 'success.main' : 'error.main';
    const errorMessageName = name === ''
      ? "이름을 입력해 주세요"
      : ""
    this.setState({
      errorMessageName,
      borderName,
    });
  }

  handleEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; // 이메일 주소 유효성을 검사하는 정규식
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    const borderEmail = email !== '' ? 'success.main' : 'error.main';
    const errorMessageEmail = email === ''
      ? "이메일을 입력해 주세요"
      : ""
    this.setState({
      errorMessageEmail,
      borderEmail,
    });
    if (email !== '') {
      if (!emailRegex.test(email)) {
        // 이메일 주소가 유효하지 않을 경우
        CustomSwal.showCommonToast("error", "유효하지 않은<br/> 이메일 주소입니다");
        this.setState({
          email: "", // 값 비워주기
        });
        return; // 함수 종료
      }
    }
    axios
      .get(ACCTMGMT_API_BASE_URL + "/emp/email", { params: { email } })
      .then((response) => {
        // CustomSwal.showCommonToast("success", "사용가능한 이메일 입니다");
      })
      .catch((error) => {
        CustomSwal.showCommonToast("error", "사용중인 이메일 입니다");
        this.setState({
          email: "",
        });
      });

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
      value: "",
      error: false,
      errorMessage: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, password, email, gender, phone, company, position } = this.state;
    const signData = {
      coCd: this.state.CodialTextField,
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
      // alert("모든 필드에 값을 입력해주세요.");
      CustomSwal.showCommonSwal("모든 필드에 값을 입력해주세요", "", "warning");
      return;
    }
    if (this.state.isIdDuplicated === false) {
      CustomSwal.showCommonSwal("아이디 중복확인을 진행해주세요", "", "warning");
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
        CustomSwal.showCommonSwal("회원가입 완료", "", "success", response);
        console.log(response.data);
        this.props.handleClose();
        this.handleClose(); // 추가: 회원가입 성공 시 상태 초기화
        // 다이얼로그 창 닫기
      })
      .catch((error) => {
        // 회원가입 실패 시 처리 로직
        // alert("회원가입 실패", error);
        CustomSwal.showCommonSwal("회원가입 실패", "", "error", error);
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
        CustomSwal.showCommonToast("success", "사용가능한 아이디 입니다");
        console.error(response);
        this.setState({ isIdDuplicated: true });
      })
      .catch((error) => {
        // 아이디 중복 없을 때 처리 로직
        CustomSwal.showCommonToast("warning", "중복된 아이디 입니다");
        console.log(error.data);
        this.setState({
          isIdDuplicated: false,
          errorMessage: "중복된 아이디 입니다.",
          isIdValid: false,
        });
      });
  };

  // validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  render() {
    const {
      id,
      name,
      password,
      email,
      confirmPassword,
      phone,
      isIdValid,
      isIdDuplicated,
      error,
      errorMessage,
      errorMessagePass,
      errorMessageConfirmPass,
      borderColor,
      borderPass,
      borderConfirmPass,
      isPasswordValid,
      errorMessageName,
      borderName,
      errorMessageEmail,
      borderEmail,
    } = this.state;

    // const isPasswordValid = this.validatePassword(password);
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction="column" spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>아이디</CustomInputLabel>
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "10px",
                      color: isIdValid ? "green" : "red",
                    }}
                  >
                    {errorMessage}
                  </span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    name="id"
                    placeholder="아이디(4 ~ 12자 이내, 영문, 숫자 사용가능)"
                    variant="outlined"
                    value={id}
                    onChange={this.handleChange2}
                    onBlur={this.handleBlur}
                    // disabled={error}
                    error={error}
                    inputProps={{ maxLength: 20 }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: borderColor,
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>패스워드</CustomInputLabel>
                  {password && !isPasswordValid && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color: isPasswordValid ? "green" : "red",
                      }}
                    >
                      {errorMessagePass}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    inputProps={{ maxLength: 20 }}
                    variant="outlined"
                    color="secondary"
                    name="password"
                    placeholder="비밀번호(문자, 숫자, 특수문자 포함 8~20자 이내)"
                    type="password"
                    value={password}
                    // error={password && !isPasswordValid}
                    onChange={this.handleChange}
                    onBlur={this.handleBlurPassword}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: borderPass
                      },
                      whiteSpace: "pre-wrap",
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>패스워드 확인</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          confirmPassword !== password ? "red" : "green",
                      }}
                    >
                      {errorMessageConfirmPass}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  variant="outlined"
                  // color={
                  //   confirmPassword
                  //     ? password === confirmPassword
                  //       ? "success"
                  //       : "error"
                  //     : "secondary"
                  // }
                  name="confirmPassword"
                  placeholder="패스워드 재입력"
                  type="password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  onBlur={this.handleBlurconfirmPassword}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderConfirmPass
                    },
                  }}
                // error={confirmPassword && password !== confirmPassword}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>이름</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          name === "" ? "red" : "green",
                      }}
                    >
                      {errorMessageName}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  name="name"
                  placeholder="ex)김더존"
                  variant="outlined"
                  color="secondary"
                  value={name}
                  onChange={this.handleChange}
                  onBlur={this.handleBlurName}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderName
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" sx={{ pl: 6 }}>
              <Grid item xs={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>이메일</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          email === "" ? "red" : "green",
                      }}
                    >
                      {errorMessageEmail}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  name="email"
                  placeholder="ex)douzone@duzone.com"
                  type="email"
                  value={email} // 이메일 상태 값을 입력 필드에 설정
                  onBlur={this.handleEmail} // 함수 참조만 전달
                  onChange={this.handleChange}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderEmail
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
                    onClick={this.helpClick}
                    variant="outlined"
                    color="secondary"
                    name="company"
                    placeholder="회사검색"
                    value={this.state.CodialTextField}
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
                    onClick={this.helpClick}
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
                  placeholder="ex)사원"
                  value={this.state.position}
                  onChange={this.handleChange3}
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
        </Grid>
        <CoDialogComponent
          handleSetCodialTextField={this.handleSetCodialTextField}
          ref={this.coDialogRef}
        />
      </form>
    );
  }
}
export default SignUpComponent;
