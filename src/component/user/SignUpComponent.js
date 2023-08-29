import { Grid, InputLabel, Tooltip } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
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
  handleKey = (e) => {
    if (e.key === 'Tab') {
      this.helpClick();
    }
  };
  helpClick = () => {
    this.coDialogRef.current.handleUp();
  }
  closeDialog = () => {
    this.dialogRef.current.handleDown();
  };
  handleSetCodialTextField = async (data) => {
    console.log("coNm : " + data.coNm);
    await this.setState({
      CodialTextField: data.coCd,
      coCd: data.coCd + ". " + data.coNm, //밑에 coCd 넘겨주기
    });
  };
  handleChange2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ isIdDuplicated: false });

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange3 = (e) => {
    const inputValue = e.target.value;

    // 입력 값을 필터링하여 원하는 값 이외의 입력은 무시하지 않고, 그대로 상태에 저장합니다.
    this.setState({ position: inputValue });
  };

  handleBlur = () => {
    const { id } = this.state;
    const isIdValid = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{4,12}$/.test(id);
    const borderColor = id === '' ? 'error.main' : isIdValid ? 'success.main' : 'error.main';
    const errorMessage = id === ''
      ? '아이디를 입력해주세요.' // 빈 값일 때의 에러 메시지
      : !isIdValid
        ? '알파벳 대소문자와 숫자만 사용 가능하며, 4자리 이상 12자리 이하여야 합니다.'
        : '';
    if (isIdValid) {
      this.setState({
        isIdValid: true,
      })
    }
    else {
      this.setState({
        isIdValid: false,
      })
    }

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
    const borderEmail = email === '' ? 'error.main' : emailRegex.test(email) ? 'success.main' : 'error.main';
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
  }
  handleBlurPhone = () => {
    const { phone } = this.state;
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

    const borderphone = phone === '' ? 'error.main' : phoneRegex.test(phone) ? 'success.main' : 'error.main';
    const errorMessagephone = phone === ""
      ? "번호를 입력해주세요." // 빈 값일 때의 에러 메시지
      : !phoneRegex.test(phone)
        ? "올바른 번호를 입력해주세요(\"010-1234-5678, 01112345678\")"
        : "";
    this.setState({
      errorMessagephone,
      borderphone,
    });
  }
  handleBlurCompany = () => {
    const { company, CodialTextField } = this.state;

    const bordercompany = company !== '' ? 'success.main' : 'error.main';
    const errorMessagecompany = company === ''
      ? "회사를 입력해 주세요"
      : ""
    this.setState({
      errorMessagecompany,
      bordercompany,
      company: CodialTextField,
    });
  }
  handleBlurPosition = () => {
    const { position } = this.state;

    const borderposition = position !== '' ? 'success.main' : 'error.main';
    const errorMessageposition = position === ''
      ? "직책을 입력해 주세요"
      : ""
    this.setState({
      errorMessageposition,
      borderposition,
    });
  }
  handleBlurPosition
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
    if(id === ''){
      CustomSwal.showCommonToast("error", "아이디를 입력해 주세요.");
      return;
    }
    axios
      .get(ACCTMGMT_API_BASE_URL + "/emp/id/" + id)
      .then((response) => {
        // 아이디 중복일 때 처리 로직
        if (this.state.isIdValid) {
          CustomSwal.showCommonToast("success", "사용가능한 아이디 입니다");
          console.error(response);
          this.setState({ isIdDuplicated: true });
          return;
        }
        else {
          CustomSwal.showCommonToast("warning", "알파벳 대소문자와 숫자만 사용 가능하며, <br/>4자리 이상 12자리 이하여야 합니다.");
          console.error(response);
          this.setState({ isIdDuplicated: false });
          return;
        }
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

  render() {
    const {
      id,
      name,
      password,
      email,
      confirmPassword,
      phone,
      company,
      position,
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
      errorMessagecompany,
      bordercompany,
      errorMessageposition,
      borderposition,
      errorMessagephone,
      borderphone,
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
                    inputProps={{ maxLength: 12 }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: borderColor,
                        borderWidth: 2,
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
                        borderColor: borderPass,
                        borderWidth: 2,
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
                  inputProps={{ maxLength: 20 }}
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
                      borderColor: borderConfirmPass,
                      borderWidth: 2,
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
                  inputProps={{ maxLength: 20 }}
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
                      borderColor: borderName,
                      borderWidth: 2,
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
                          email === "" || email !== this.state.emailRegex ? "red" : "green",
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
                  inputProps={{ maxLength: 40 }}
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
                      borderColor: borderEmail,
                      borderWidth: 2,
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
                  <CustomInputLabel>휴대전화</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          phone === "" || phone !== this.state.phoneRegex ? "red" : "green",
                      }}
                    >
                      {errorMessagephone}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container></Grid>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  name="phone"
                  placeholder="휴대폰 번호 입력('-' 제외 11자리 입력)"
                  inputProps={{ maxLength: 13 }}
                  value={phone}
                  onChange={this.handleChange}
                  onBlur={this.handleBlurPhone}
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderphone,
                      borderWidth: 2,
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
                  <CustomInputLabel>회사</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          company === "" ? "red" : "green",
                      }}
                    >
                      {errorMessagecompany}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <Grid container direction="row" alignItems="center">
                  <CustomMediumTextField
                    onKeyDown={this.handleKey}
                    onClick={this.helpClick}
                    variant="outlined"
                    color="secondary"
                    name="company"
                    placeholder="회사검색"
                    value={this.state.coCd}
                    onBlur={this.handleBlurCompany}
                    onChange={this.handleChange}
                    inputProps={{ maxLength: 5 }}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px", // 원하는 폰트 크기로 설정
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: bordercompany,
                        borderWidth: 2,
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomInputLabel>직책</CustomInputLabel>
                  {(
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        color:
                          position === "" ? "red" : "green",
                      }}
                    >
                      {errorMessageposition}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={9}>
                <CustomMediumTextField
                  variant="outlined"
                  color="secondary"
                  inputProps={{ maxLength: 8 }}
                  name="position"
                  placeholder="ex)사원"
                  value={this.state.position}
                  onChange={this.handleChange3}
                  onBlur={this.handleBlurPosition}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-input::placeholder": {
                      fontSize: "12px", // 원하는 폰트 크기로 설정
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderposition,
                      borderWidth: 2,
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
