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

  getBgtICFList(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf", {
        params: {
          coCd: data.coCd,
          bgtCd: data.bgtCd,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  // deleteBgtICF(sq) {
  //   return axios.delete(ACCTMGMT_API_BASE_URL + "/bgticf/" + sq);
  // }

  deleteBgtICF(data) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/bgticf", {
      params: {
          coCd: data.coCd,
          bgtCd: data.bgtCd,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
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

  findBgcCDByGisuAndGroupCdAndToDtAndKeyword(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd", {
        params: {
          coCd: data.user.coCd,
          gisu: data.gisu,
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

  findGisuByCoCd(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/gisu", {
        params: {
          coCd: data.user.coCd,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgtCdByGisuAndGroupCdAndGrFgAndBgtCd(data) {
    console.log(data);

    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd/search", {
        params: {
          gisu: data.gisu,
          coCd: data.coCd,
          divCd: data.divCd,
          groupCd: data.bgtGrCd,
          grFg: data.grFg,
          bgtCd: data.bgtCd,
          // coCd: data.coCd,
          // divCd: data.divCd,
          // groupCd: data.groupCd,
          // grFg: data.grFg
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