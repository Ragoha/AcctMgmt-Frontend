import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class UserService {
  getListUser() {
    // return axios.get(ACCTMGMT_API_BASE_URL + "/");
  }

  getTime() {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/time")
      .then((response) => response.data);
  }
}


export default new UserService();