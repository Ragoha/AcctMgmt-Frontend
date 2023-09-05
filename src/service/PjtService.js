import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PjtService {

  getPjtList(data) {
    console.log("accesstoken : ", data.accessToken);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjt/" + data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
      })
  }

  getSelPjtList(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/pjt/" + data.coCd + "/" + data.pjtCd, {
        headers: {
          "access-token": data.accessToken,
        },
      })
  }

  updatePjt(data) {
    return axios.put(ACCTMGMT_API_BASE_URL + "/pjt/" + data.coCd + "/" + data.pjtCd, data.Pjt, {
      headers: {
        "access-token": data.accessToken,
      },
    });
  }

  insertPjt(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjt", data.Pjt, {
      params: {
        coCd: data.coCd,
      },
      headers: {
        "access-token": data.accessToken,
      },
    });
  }

  deletePjt(data) {
    console.log(data);

    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/pjt/" + data.coCd + "/" + data.pjtCd, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
  }


  getPjtBy(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/dialog/pjt/" + data.coCd + "/" + data.keyword, {
        headers: {
          "access-token": data.accessToken,
        },
      })
      .then((response) => response.data);
  }

  duplication(data) {
    return axios.get(ACCTMGMT_API_BASE_URL + "/pjt/pjtcd/" + data.Pjt.coCd + "/" +data.Pjt.pjtCd, {
      headers: {
        "access-token": data.accessToken,
      },
    });
  }
  getGroupPjt(data) {
    return axios.post(ACCTMGMT_API_BASE_URL + "/pjt/groupSel", data.data, {
      headers: {
        "access-token": data.accessToken,
      },
    });
  }
}


export default new PjtService();