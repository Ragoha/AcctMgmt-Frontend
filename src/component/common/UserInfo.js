import React, { Component } from "react";
import { connect } from 'react-redux';
import { DELETE_TOKEN } from "../../store/Auth";
import { DEL_USER } from "../../store/User";
import { DEL_CONFIG } from "../../store/Config";
import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "../../storage/Cookie";
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
    };
  }
  componentDidMount() {
    const { coNm, empName, empCd, divCd, divNm, deptOd, empEmail, empTel } = this.props.userInfo;
    this.setState({
      coNm,
      empName,
      empCd,
      divCd,
      divNm,
      deptOd,
      empEmail,
      empTel,
    });
  }
  logout = () => {
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
    const { coNm, empName, empCd, divCd, divNm, deptOd, empEmail, empTel } = this.state;
    return (
      <div style={{
        position: "absolute",
        top: "50px",
        right: "45px",
        background: "white",
        padding: "10px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
        height: "400px",
        width: "700px",
        fontSize: "15px",
        color: "black",
        borderRadius: "15px", // 네모 모양의 코너를 둥글게 조정
      }}>
        <div>소속: {coNm}</div>
        <div>이름: {empName}</div>
        <div>직책: 사원</div>
        <div>이메일: {empEmail}</div>
        <div>전화번호: {empTel}</div>
        <button style={{
          background: "transparent",
          border: "2px solid skyblue",
          color: "skyblue",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
        }}>사원 페이지로 이동</button>
        <div style={{ marginLeft: "15px" }}>
          <a onClick={this.logout} style={{ cursor: "pointer" }}>
            LogOut
          </a>
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