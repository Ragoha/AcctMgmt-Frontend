import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class UserService {

  getUser(){
    return axios
    .get(ACCTMGMT_API_BASE_URL + "/getUser")
    .then((response) => response.data);
  }

  getId(searchWord) {
    return axios
    .get(ACCTMGMT_API_BASE_URL + '/getId',{
      params: {
        id: searchWord
      }
    }).then((response) => response.data);
  }

  loginUser(userId, userPw) {
    return axios
    .post(ACCTMGMT_API_BASE_URL + '/scompany', {
      id: userId,
      pw: userPw,
})
};

  insertUser(userId, userPw) {
    return axios
    .post(ACCTMGMT_API_BASE_URL + '/company', {
      id: userId,
      pw: userPw,
})
};

  deleteUser(userId, userPw) {
    return axios
    .post(ACCTMGMT_API_BASE_URL + '/dcompany', {
            id: userId,
            pw: userPw,
    })
};

  getUserList(){
    return axios
    .get(ACCTMGMT_API_BASE_URL + "/getUserList")
    .then((response) => response.data);
  }

  getTime() {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/time")
      .then((response) => response.data);
  }
}

export default new UserService();