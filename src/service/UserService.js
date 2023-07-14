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
  getBoardData() {
    console.log("UserService.getBoard DATA STRAT !!");
    const returnData =
      axios
        .get(ACCTMGMT_API_BASE_URL + "/boardData")
        .then((response) => response.data);

    console.log("UserService.getBoardData's return data ? :  ");
    console.dir(returnData);
    return returnData;
  }
  getDataGridRows(){
    return axios
      .post(ACCTMGMT_API_BASE_URL+"/SBGTCD")
      .then((response)=>response.data);
  }
}

export default new UserService();