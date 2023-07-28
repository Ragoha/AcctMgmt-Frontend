import axios from 'axios';

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class LoginService {
  loginUser(email, password) {
    const loginData = {
      email: email,
      password: password,
    };

    return axios.post('${ACCTMGMT_API_BASE_URL}/login', loginData)

    
      .then(response => {
        // 로그인 성공 시 처리 로직
        return response.data;
      })
      .catch(error => {
        // 로그인 실패 시 처리 로직
        throw error;
      });
  }
}

export default new LoginService();