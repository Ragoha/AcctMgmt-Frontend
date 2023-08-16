import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    return (
<div style={{
  position: "absolute",
  top: "50px",
  right: "-35px",
  background: "white",
  padding: "10px",
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)", 
  height: "200px",
  width: "300px",
  fontSize: "15px",
  color: "black",
  borderRadius: "15px", // 네모 모양의 코너를 둥글게 조정
}}>
        <div>소속: 더존</div>
        <div>이름: 강상호</div>
        <div>직책: 사원</div>
        <div>이메일: sangho@douzone.com</div>
        <div>전화번호: 010-1234-5678</div>
        <button style={{
            background: "transparent",
            border: "2px solid skyblue",
            color: "skyblue",
            borderRadius: "5px",
            marginTop: "20px",
            cursor: "pointer",
          }}>사원 페이지로 이동</button>
      </div>
    );
  }
}

export default UserInfo;
