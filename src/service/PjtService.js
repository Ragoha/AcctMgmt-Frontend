import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PjtService {
 
  getPjtList(data) {
    console.log("accesstoken : ", data.accessToken);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtDate/" + data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
      })
  }

  getSelPjtList(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtSelDate/" + data.pjtCd + "/" + data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
      })
  }

  updatePjt(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/update/" + data.coCd, data.Pjt,{
      headers: {
        "access-token": data.accessToken,
      },
    });
  }

  insertPjt(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/insert/" + data.coCd, data.Pjt,{
      headers: {
        "access-token": data.accessToken,
      },
    });
  }

  deletePjt(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/delete/", data.Pjt,{
      headers: {
        "access-token": data.accessToken,
      },
    });
  }

  getPjtBy(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjtDate/pjtSearch/" + data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
        params: {
          keyword: data.keyword
        },
      })
      .then((response) => response.data);
  }

  getPgrBy(data) {
    return axios
    .get(ACCTMGMT_API_BASE_URL + "/pjtDate/pgrSearch/" + data.coCd, {
      headers: {
        "access-token": data.accessToken,
      },
      params: {
          keyword: data.keyword
        },
      })
      .then((response) => response.data);
  }

  selPjtBy(data) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/pjtDate/pjtSel", data.selData,{
        headers: {
          "access-token": data.accessToken,
        },
      })
  }

  duplication(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/duplication/" + data.coCd, data.Pjt,{
      headers: {
        "access-token": data.accessToken,
      },
    });
  }
  getGroupPjt(data){
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjtDate/groupSel/", data.data,{
      headers: {
        "access-token": data.accessToken,
      },
    });
  }
}


export default new PjtService();