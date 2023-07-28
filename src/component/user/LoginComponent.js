import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import ForgotPasswordDialog from '../dialog/ForgotPasswordDialog';
import SignUpDialog from '../dialog/SignUpDialog';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { CSSTransition } from 'react-transition-group';
import Image4 from './back4.jpg';
import { connect } from 'react-redux';
import { SET_TOKEN }  from '../../store/Auth';
import { SET_USER } from '../../store/User';
import Typography from '@mui/material/Typography';
import Cookie from '../../storage/Cookie';
import axios from "axios";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      isIconOpen: false,
      showForm: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showForm: true });
    }, 2000);
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
    const { id, password } = this.state;
    const loginData = { empId: id, empPw: password };
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    
    axios.post(ACCTMGMT_API_BASE_URL + '/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      alert("로그인 성공", response);
      const jwtToken = response.data.refreshToken;
      Cookie.setRefreshToken(jwtToken);

      const accToken = response.data.accessToken;
      const acwte = this.props.setAccessToken(accToken);

      const user = response.data;
      const USER = this.props.setUserInfo(user);

      console.log(response.data);
      console.log(jwtToken);
      console.log(accToken);
      console.log("가자 : " + acwte);
      console.log("리덕스에 있는 유저 정보 : " + USER);
      window.location.href = "/acctmgmt/bgt";
    })
    .catch((error) => {
      alert("아이디 또는 비밀번호가 다릅니다.", error);
    });
  };

  render() {
    const { showForm, id, password, isIconOpen } = this.state;

    return (
      <Box component="div" sx={{ display: 'flex', height: '100vh' }}>
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

// 리덕스 액션 매핑
const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (accessToken) => dispatch(SET_TOKEN(accessToken)),
    setUserInfo: (userInfo) => dispatch(SET_USER(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(LoginComponent);
