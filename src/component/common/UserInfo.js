import React, { Component } from "react";
import { connect } from 'react-redux';
import { DELETE_TOKEN } from "../../store/Auth";
import { DEL_USER } from "../../store/User";
import { DEL_CONFIG } from "../../store/Config";
import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "../../storage/Cookie";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CustomSwal from "./CustomSwal";

class UserInfo extends Component {
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
      empAuth:"",
      empOd:"",
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
    console.log("직책: " , empOd);
    if (empAuth === "ROLE_ADMIN") { 
      this.role = empOd; 
    } else {
      this.role = empOd; 
    }
    return (
      <div style={{
        position: "absolute",
        top: "60px",
        right: "220px",
        background: "white",
        padding: "10px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
        height: "180px",
        width: "200px",
        fontSize: "15px",
        color: "black",
        borderRadius: "15px", // 네모 모양의 코너를 둥글게 조정
      }}>
        <PermIdentityIcon color="primary"/>
        <div>{coNm}</div>
        <div>{empName}</div>
        <div>{this.role}</div>
        <div>{empEmail}</div>
        <div>{empTel}</div>
        <div style={{ marginLeft: "15px" }}>
          <PowerSettingsNewIcon
          onClick={this.logout}
          style={{
            cursor: "pointer",
            color: "#6799FF", // 아이콘 색상을 회색으로 변경
            position: "absolute", // 위치 조정을 위해 절대 위치 지정
            bottom: "5px", // 아이콘을 아래쪽으로 조금 내림
            right: "5px", // 아이콘을 오른쪽으로 조금 이동
          }}
        />
        </div>
      </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(UserInfo));