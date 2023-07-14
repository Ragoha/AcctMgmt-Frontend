import { Box, Button, Grid, TextField, Card, CardContent, Typography } from '@mui/material';
import { Component } from "react";
import React, { useState} from 'react';
import axios from 'axios';

function CompanyComponent() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPw = (e) => {
    setUserPw(e.target.value);
  };

  // <input 
  //   type="id"
  //   className="form id"
  //   name=""
  //   value=""

  // />
 
  const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

//   const onClickLogin = () => {
//     console.log("click login");
//     console.log("ID:", userId);
//     console.log("PW:", userPw);
//     axios.post(ACCTMGMT_API_BASE_URL + '/company', {
//       id: userId,
//       pw: userPw,
//     })
//     .then((response) => {
//       // 성공적으로 응답을 받았을 때의 처리
//       console.log(response.data);
//     })
//     .catch((error) => {
//       // 오류 발생 시의 처리
//       console.error(error);
//     });
// };


const onClickInsert = () => {
  console.log("click login");
  console.log("ID:", userId);
  console.log("PW:", userPw);
  axios.post(ACCTMGMT_API_BASE_URL + '/company', {
    id: userId,
    pw: userPw,
  })
  .then((response) => {
    // 성공적으로 응답을 받았을 때의 처리
    console.log(response.data);
    window.confirm("계정등록 완료!");
  })
  .catch((error) => {
    // 오류 발생 시의 처리
    console.error(error);
    alert("중복된 아이디 또는 모두 입력해주세요");
    // window.confirm("중복된 아이디 또는 모두 입력해주세요");
  });
};
    
  return (
    <div>
    <Box width={'300px'} >
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 15 }}>
            회사코드
          </Typography>
          <Typography sx={{ fontSize: 25 }} color="blue" variant='h3' >
            회사명
          </Typography>
        </CardContent>
      </Card>
    </Box>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Login</h1>
        <Box
          sx={{
            m: 1,
            width: '25',
          }}
        >
          <TextField id="userId" label="ID" variant="outlined" onChange={handleUserId}/>
          <p />
          <TextField id="userPw" label="PASSWORD" variant="outlined" onChange={handleUserPw}/>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button variant="outlined" >SUBMIT</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick ={onClickInsert}>INSERT</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" >UPDATE</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" >DELETE</Button>
          </Grid>
        </Grid>
      </div>
      </div>
      </div>
  );
}

export default CompanyComponent;