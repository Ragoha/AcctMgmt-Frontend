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
import Image from './back.gif';
import Image2 from './back2.gif';
import Image3 from './back3.gif';
import Image4 from './back4.jpg';
import { CSSTransition } from 'react-transition-group';

// import { useNavigate } from "react-router-dom";


class LoginComponent extends Component {
    //기본값 생성자
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isIconOpen: false,
            showForm: false,
        };
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
        const { email, password } = this.state;
        const loginData = { email, password }; // 입력한 아이디와 패스워드를 JSON 데이터로 구성
        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        // 로그인 API 호출
        axios.post(ACCTMGMT_API_BASE_URL +'/api/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // 로그인 성공 시 처리 로직
                alert("로그인 성공", response);
                console.log(response.data);
                window.location.href = "/main";
            })
            .catch((error) => {
                // 로그인 실패 시 처리 로직
                alert("로그인 실패", error);
                console.error(error);
                // window.location.href = "/login";
            });
    };

    render() {
        const { showForm } = this.state;
        const { email, password } = this.state;
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
                            height: '70px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            borderRadius: '25px',
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
                                    fontSize: '40px',
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
                        {/* <form onSubmit={this.handleFormSubmit}> */}
                            {/* 나머지 폼 요소들을 배치해주세요 */}
                            <form onSubmit={this.handleFormSubmit}>
                                <Box
                                    sx={{
                                        mt: '40px',
                                        width: '300px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TextField
                                        InputProps={{ style: { borderRadius: '8px', color:'blue' } }}
                                        margin="normal"
                                        label="Email Address"
                                        required
                                        fullWidth
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={this.handleInputChange}
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
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" />}
                                        label="아이디 저장"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onMouseEnter={this.handleMouseEnter}
                                        onMouseLeave={this.handleMouseLeave}
                                        sx={{
                                            mt: 5,
                                            mb: 3,
                                            bgcolor: '#7895CB',
                                            color: '#FFFFFF',
                                            '&:hover': { bgcolor: '#4A55A2', cursor: 'pointer',},
                                            fontFamily: '"Lilita One", cursive',
                                        }}
                                    >
                                        {isIconOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                                        Sign in
                                    </Button>

                                    <Grid container>
                                        <Grid item xs  sx={{'&:hover': { cursor: 'pointer',}}}>
                                            <ForgotPasswordDialog />
                                        </Grid>
                                        <Grid item sx={{'&:hover': { cursor: 'pointer',}}}>
                                            <SignUpDialog />
                                        </Grid>
                                    </Grid>
                                </Box >
                            </form>
                        {/* </form> */}
                    </CSSTransition>
                </Box>
            </Box>
        );
    }
}

export default LoginComponent;
