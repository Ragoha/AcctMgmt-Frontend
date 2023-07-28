import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BtgICFService {
  getBGT(formData) {
    // const data = JSON.stringify(formData);
    alert(formData);
    return axios.post(ACCTMGMT_API_BASE_URL + "/budget", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getBgtICFList() {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf")
      .then((response) => response.data);
  }

  deleteBgtICF(sq) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/bgticf/" + sq);
  }

  findDivCdAndDivNmByCoCd(coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/div", {
        params: {
          coCd: coCd,
        },
      })
      .then((response) => response.data);
  }

  findDivCdAndDivNmByKeyword(keyword) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/div/search", {
        params: {
          coCd: "1",
          keyword: keyword,
        },
      })
      .then((response) => response.data);
  }

  findBgtGrCdAndBgtGrNmByCoCd(coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtgr", {
        params: {
          coCd: coCd,
        },
      })
      .then((response) => response.data);
  }

  findBgtGrNmByKeyword(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtgr/search", {
        params: {
          coCd: data.user.coCd,
          keyword: data.keyword,
        },
        headers: {
          Authorization: data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgtCDByKeword(data) {
    console.log(data);
  }
}


export default new BtgICFService();