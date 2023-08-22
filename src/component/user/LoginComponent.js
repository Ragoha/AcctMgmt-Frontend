import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Cookie from '../../storage/Cookie';
import { SET_TOKEN } from '../../store/Auth';
import { SET_CONFIG } from '../../store/Config';
import { SET_USER } from '../../store/User';
import ForgotPasswordDialog from '../dialog/ForgotPasswordDialog';
import SignUpDialog from '../dialog/SignUpDialog';
import Image4 from './back4.jpg';
import CustomSwal from '../common/CustomSwal';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      isIconOpen: false,
      rememberId: false, // 아이디 저장 체크박스 상태
      isLoggingIn: false, // 로그인 중인지 여부를 나타내는 변수

    };
  }
  handleRememberIdChange = (e) => {
    this.setState({ rememberId: e.target.checked });
  };

  componentDidMount() {
    const rememberedId = Cookie.get("rememberedId");
    if (rememberedId) {
      this.setState({ id: rememberedId, rememberId: true });
    }
  }

  handleMouseEnter = () => {
    this.setState({ isIconOpen: true });
  };

  handleMouseLeave = () => {
    this.setState({ isIconOpen: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { id, password, rememberId } = this.state;
    const loginData = { empId: id, empPw: password };
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

    if (rememberId) {
      Cookie.set("rememberedId", id);
    } else {
      Cookie.remove("rememberedId"); // 체크 해제 시 쿠키 제거
    }
    this.setState({ isLoggingIn: true });

    axios
      .post(ACCTMGMT_API_BASE_URL + "/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        const jwtToken = response.data.refreshToken;
        Cookie.setRefreshToken(jwtToken);

        const accToken = response.data.accessToken;
        const acwte = this.props.setAccessToken(accToken);

        const user = response.data;
        const USER = this.props.setUserInfo(user);
        this.props.setConfig(response.data.config); //환경설정 초기데이터 리덕스 저장
        console.log(response.data);
        console.log(jwtToken);
        console.log(accToken);
        console.log("가자 : " + acwte);
        console.log("리덕스에 있는 유저 정보 : " + USER);
        axios
          .get(ACCTMGMT_API_BASE_URL + "/api/configdate/" + response.data.coCd)
          .then((response) => {
            console.log("로그인 : Config Data: ", response.data);
            // 받아온 데이터를 가공하여 userData 객체에 설정
            this.props.setConfig(response.data); //환경설정 초기데이터 리덕스 저장
            // this.props.history.push("/acctmgmt/bgt");
            this.setState({ isLoggingIn: false });
            CustomSwal.showCommonToast("success", user.empName+"님 환영합니다.", "1500");
            this.props.navigate("/acctmgmt/bgt");
          })
          .catch((error) => {
            this.setState({ isLoggingIn: false });
            console.error(error);
          });
      })
      .catch((error) => {
        // alert("아이디 또는 비밀번호가 다릅니다.", error);
        CustomSwal.showCommonSwal("아이디 또는 비밀번호를 <br/>잘못 입력하셨습니다.","", "error");
      });
  };

  render() {
    const { id, password, isIconOpen } = this.state;

    return (
      <Box component="div" sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: "90%",
            backgroundImage: `url(${Image4})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#7895CB" }}>
            {isIconOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
          </Avatar>
          <Box
            sx={{
              mb: "40px",
              bgcolor: "#4A55A2",
              width: "70%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              borderRadius: "25px",
              "@media (max-width: 768px)": {
                width: "90%",
              },
            }}
          >

              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: "4vh",
                  fontweight:"bold",
                }}
              >
                DOUZONE
              </Typography>
          </Box>
            <form onSubmit={this.handleFormSubmit}>
              <Box
                sx={{
                  mt: "4vh",
                  width: "30vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "@media (max-width: 768px)": {
                    width: "100%",
                  },
                }}
              >
                <TextField
                  InputProps={{ style: { borderRadius: "8px", color: "blue" } }}
                  margin="normal"
                  label="ID"
                  required
                  fullWidth
                  name="id"
                  autoComplete="id"
                  autoFocus
                  value={id}
                  onChange={this.handleInputChange}
                  sx={{
                    mb: "2vh",
                  }}
                />
                <TextField
                  InputProps={{ style: { borderRadius: "8px" } }}
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleInputChange}
                  sx={{
                    mb: "2vh",
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="rememberId"
                      checked={this.state.rememberId}
                      onChange={this.handleRememberIdChange}
                    />
                  }
                  label="아이디 저장"
                  sx={{
                    mr: "17vh",
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  sx={{
                    mt: "5vh",
                    mb: "3vh",
                    bgcolor: "#7895CB",
                    color: "#FFFFFF",
                    "&:hover": { bgcolor: "#4A55A2", cursor: "pointer" },
                    fontweight:"bold",
                    fontFamily: "'Roboto Mono', monospace",
                  }}
                >
                {isIconOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                로그인
              </Button>
              <Grid container>
                <Grid item xs sx={{ "&:hover": { cursor: "pointer" } }}>
                  <ForgotPasswordDialog />
                </Grid>
                <Grid item sx={{ "&:hover": { cursor: "pointer" } }}>
                  <SignUpDialog />
                </Grid>
              </Grid>
            </Box>
          </form>
      </Box>
      </Box >
    );
  }
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

// 리덕스 액션 매핑
const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (accessToken) => dispatch(SET_TOKEN(accessToken)),
    setUserInfo: (userInfo) => dispatch(SET_USER(userInfo)),
    setConfig: (config) => dispatch(SET_CONFIG(config))
  };

};


export default connect(null, mapDispatchToProps)(withNavigation(LoginComponent));