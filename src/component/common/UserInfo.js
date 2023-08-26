import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'; // styled-components 불러오기
import '../../css/font.css';
import Cookie from "../../storage/Cookie";
import { DELETE_TOKEN } from "../../store/Auth";
import { DEL_CONFIG } from "../../store/Config";
import { DEL_USER } from "../../store/User";
import CustomSwal from "./CustomSwal";
// 스타일드 컴포넌트로 스타일링
const UserInfoContainer = styled(Card)`
  position: absolute;
  top: 60px;
  right: 150px;
  width: 360px;
  color: black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: left;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(to bottom, #F6F6F6, #B2CCFF); 
`;

const IconWrapper = styled.div`
  cursor: pointer;
  color: #6B66FF;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const IconAndInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(AccountBoxIcon)`
  font-size: 75px;
  color: #5D5D5D; /* 아이콘 색상 변경 */
  margin-right: 16px; /* 아이콘과 정보 간격 설정 */
`;

class UserInfo extends Component {
  // ... 이전 코드 ...
  constructor(props) {
    super(props);

    this.state = {
      coNm: "",
      empName: "",
      empCd: "",
      divCd: "",
      divNm: "",
      deptOd: "",
      empEmail: "",
      empTel: "",
      empAuth: "",
      empOd: "",
    };
    this.role = "";
  }
  componentDidMount() {
    const { coNm, empName, empCd, divCd, divNm, deptOd, empEmail, empTel, empAuth, empOd } = this.props.userInfo;
    this.setState({
      coNm,
      empName,
      empCd,
      divCd,
      divNm,
      deptOd,
      empEmail,
      empTel,
      empAuth,
      empOd,
    });
  }
  logout = () => {
    CustomSwal.showCommonToast("info", "오늘도 수고하셨습니다.", "1500");
    // const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    const accessToken = this.props.accessToken; // Redux Store에서 토큰 가져오기
    const userInfo = this.props.userInfo;
    const config = this.props.configData;
    console.log("불러온 엑세스 토큰 : " + accessToken);
    this.props.delAccessToken(accessToken);
    console.log("삭제 후 엑세스 토큰 : " + accessToken);
    console.log("불러온 유저정보 : " + userInfo.coCd);
    this.props.delUserInfo(userInfo);
    console.log("삭제 후 유저정보 : " + userInfo.coCd);
    Cookie.removeCookieToken();
    console.log("삭제 후 설정정보 : " + config);
    this.props.delConfig(config);
    this.props.navigate("/");
    // axios.post(ACCTMGMT_API_BASE_URL + '/logouta', {
    // });
  };
  render() {
    const { coNm, empName, empCd, divCd, divNm, deptOd, empEmail, empTel, empAuth, empOd } = this.state;
    console.log("직책: ", empOd);
    if (empAuth === "ROLE_ADMIN") {
      this.role = empOd;
    } else {
      this.role = empOd;
    }
    return (
      <UserInfoContainer>
        <CardContent>
          <IconAndInfoContainer>
            <Icon />
            <div>
              <Typography variant="h6" component="div" style={{ fontFamily: 'Lora, ital' }}>
                {empName}
              </Typography>
              <Typography color="textSecondary" style={{ fontFamily: 'Lora, ital' }}>
                소속: {coNm}
              </Typography>
              <Typography color="textSecondary" style={{ fontFamily: 'Lora, ital' }}>
                직책: {this.role}
              </Typography>
              <Typography color="textSecondary" style={{ fontFamily: 'Lora, ital' }}>
                이메일: {empEmail}
              </Typography>
              <Typography color="textSecondary" style={{ fontFamily: 'Lora, ital' }}>
                연락처: {empTel}
              </Typography>
            </div>
          </IconAndInfoContainer>
        </CardContent>
        <IconWrapper onClick={this.logout}>
          <PowerSettingsNewIcon />
        </IconWrapper>
      </UserInfoContainer>
    );
  }
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  configData: state.config.configData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    delAccessToken: (accessToken) => dispatch(DELETE_TOKEN(accessToken)),
    delUserInfo: (userInfo) => dispatch(DEL_USER(userInfo)),
    delConfig: (config) => dispatch(DEL_CONFIG(config)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(UserInfo));
