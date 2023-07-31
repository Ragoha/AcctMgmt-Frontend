import axios from "axios";
import dayjs from "dayjs";

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

  findDivByCoCdAndKeyword(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/div", {
        params: {
          coCd: data.coCd,
          keyword: data.keyword,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgtGrByCoCdAndKeyword(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtgr", {
        params: {
          coCd: data.coCd,
          keyword: data.keyword,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgcCDByGroupCdAndToDtAndKeyword(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd/search", {
        params: {
          coCd: data.user.coCd,
          bgtCDMark: data.bgtCDMark,
          gisu: 1,
          groupCd: data.bgtGrCd,
          keyword: data.keyword,
          toDt: dayjs(data.range),
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }
}


export default new BtgICFService();