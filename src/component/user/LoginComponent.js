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
import ForgotPasswordDialog from '../dialog/ForgotPasswordDialog';
import SignUpDialog from '../dialog/SignUpDialog';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import '../../css/font.css';
import { createTheme } from '@material-ui/core/styles';
import Image4 from './back4.jpg';
import { CSSTransition } from 'react-transition-group';
import Cookie from '../../storage/Cookie';
import { SET_TOKEN }  from '../../store/Auth';
import { SET_USER } from '../../store/User';
import { connect } from 'react-redux';


class LoginComponent extends Component {
    //기본값 생성자
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            isIconOpen: false,
            showForm: false,
        };
        // this.dispatch = useDispatch();
    }//2초뒤에 나오는 효과
    componentDidMount() {
        setTimeout(() => {
            this.setState({ showForm: true });
        }, 2000);
    }
    //마우스 호버 효과
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
        const { id, password } = this.state;
        const loginData = { empId : id, empPw : password }; // 입력한 아이디와 패스워드를 JSON 데이터로 구성
        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        // 로그인 API 호출
        axios.post(ACCTMGMT_API_BASE_URL +'/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // 로그인 성공 시 처리 로직
                alert("로그인 성공", response);
                const jwtToken = response.data.refreshToken; // 응답에서 토큰 추출
                Cookie.setRefreshToken(jwtToken); // 토큰을 쿠키에 저장

                const accToken = response.data.accessToken;//응답에서 엑세스토큰 추출
                const acwte = this.props.setAccessToken(accToken);//토큰을 리덕스에 저장

                const user = response.data;// user라는 변수에 응답 데이터 전부 저장
                const USER = this.props.setUserInfo(user);//로긴한 유저 정보를 리덕스에 저장
                console.log(response.data);
                console.log(jwtToken);
                console.log(accToken);
                console.log("가자 : "+acwte);
                console.log("리덕스에 있는 유저 정보 : " + USER);
                window.location.href = "/acctmgmt/bgt";
            })
            .catch((error) => {
                // 로그인 실패 시 처리 로직
                alert("아이디 또는 비밀번호가 다릅니다.", error);
                // console.error(error);
                // window.location.href = "/login";
            });
    };

    render() {
        const { showForm } = this.state;
        const { id, password } = this.state;
        const { isIconOpen } = this.state
        const theme = createTheme({
            typography: {
                fontFamily: '"VT323", monospace',
                fontFamily: '"Lilita One", cursive',
                fontfamily: '"Rubik Dirt", cursive',
                fontfamily: '"Rowdies", cursive',
                fontfamily: '"Montserrat", sans-serif',
            },
        });

        return (
            <Box
              component="div"
              sx={{
                display: 'flex',
                height: '100vh',
              }}
            >
              <Box
                sx={{
                  width: '90%',
                  backgroundImage: `url(${Image4})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '@media (max-width: 768px)': {
                    width: '100%',
                  },
                }}
              >
                {/* 나머지 요소들을 배치해주세요 */}
                <Avatar sx={{ m: 1, bgcolor: '#7895CB' }}>
                  {isIconOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                </Avatar>
                <Box
                  sx={{
                    mb: '40px',
                    bgcolor: '#4A55A2',
                    width: '70%',
                    height: '10vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '25px',
                    '@media (max-width: 768px)': {
                      width: '90%',
                    },
                  }}
                >
                  <CSSTransition
                    in={showForm}
                    timeout={500}
                    classNames="text-slide"
                    unmountOnExit
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '4vh',
                      }}
                    >
                      DOUZONE
                    </Typography>
                  </CSSTransition>
                </Box>
                <CSSTransition
                  in={showForm}
                  timeout={500}
                  classNames="form-slide"
                  unmountOnExit
                >
                  {/* 나머지 폼 요소들을 배치해주세요 */}
                  <form onSubmit={this.handleFormSubmit}>
                    <Box
                      sx={{
                        mt: '4vh',
                        width: '30vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '@media (max-width: 768px)': {
                          width: '100%',
                        },
                      }}
                    >
                      <TextField
                        InputProps={{ style: { borderRadius: '8px', color: 'blue' } }}
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
                          mb: '2vh',
                        }}
                      />
                      <TextField
                        InputProps={{ style: { borderRadius: '8px' } }}
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={this.handleInputChange}
                        sx={{
                          mb: '2vh',
                        }}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="아이디 저장"
                        sx={{
                          mb: '2vh',
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        sx={{
                          mt: '5vh',
                          mb: '3vh',
                          bgcolor: '#7895CB',
                          color: '#FFFFFF',
                          '&:hover': { bgcolor: '#4A55A2', cursor: 'pointer' },
                          fontFamily: '"Lilita One", cursive',
                        }}
                      >
                        {isIconOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                        Sign in
                      </Button>
                      <Grid container>
                        <Grid item xs sx={{ '&:hover': { cursor: 'pointer' } }}>
                          <ForgotPasswordDialog />
                        </Grid>
                        <Grid item sx={{ '&:hover': { cursor: 'pointer' } }}>
                          <SignUpDialog />
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </CSSTransition>
              </Box>
            </Box>
          );
          
    }
}
//setAccessToken 액션 생성자를 LoginComponent 컴포넌트의 props로 매핑
const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (accessToken) => dispatch(SET_TOKEN(accessToken)),
    setUserInfo: (userInfo) => dispatch(SET_USER(userInfo)),
  };
};


export default connect(null, mapDispatchToProps)(LoginComponent);