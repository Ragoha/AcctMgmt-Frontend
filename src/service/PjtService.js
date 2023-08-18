import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PjtService {
 
  getPjtList(coCd) {

    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtDate/" + coCd, {
      })
  }

  getSelPjtList(pjtCd, coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtSelDate/" + pjtCd + "/" + coCd, {
      })
  }

  updatePjt(coCd, Pjt) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/update/" + coCd, Pjt);
  }

  insertPjt(coCd, Pjt) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/insert/" + coCd, Pjt);
  }

  deletePjt(Pjt) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/delete/", Pjt);
  }

  getPjtBy(keyword, coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtDate/pjtSearch/" + coCd, {
        params: {
          keyword: keyword
        },
      })
      .then((response) => response.data);
  }

  getPgrBy(keyword, coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtDate/pgrSearch", coCd, {
        params: {
          keyword: keyword
        },
      })
      .then((response) => response.data);
  }

  selPjtBy(selData) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/pjtDate/pjtSel", selData)
  }

  duplication(coCd, Pjt) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/duplication/" + coCd, Pjt);
  }
  groupSelect(data){
    return axios.get(ACCTMGMT_API_BASE_URL + "/pjtDate/group" , data);
  }
}


export default new PjtService();