import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class CompanyService {

  getCoList(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/co", {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
        coCd: data.coCd,
        coNm: data.coNm,
        gisu: data.gisu,
        frDt: data.frDt,
        toDt: data.toDt,
        jongmok: data.jongmok,
        businessType: data.businessType,
        coNb: data.coNb,
        ceoNm: data.ceoNm,
        coZip: data.coZip,
        coAddr: data.coAddr,
        coAddr1: data.coAddr1
      })
  }

  insertCo(data) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/ozt/ico", {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
        coNm: data.coNm,
        gisu: data.gisu,
        frDt: data.frDt,
        toDt: data.toDt,
        jongmok: data.jongmok,
        businessType: data.businessType,
        coNb: data.coNb,
        ceoNm: data.ceoNm,
        coZip: data.coZip,
        coAddr: data.coAddr,
        coAddr1: data.coAddr1
      })
  };

  getCo(coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/sco", {
        params: {
          coCd: coCd
        }
      }
      )
  };

  getCompany(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/scom", {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
        params: {
          coCd: data.coCd
        }
      }
      )
  };

  deleteCo(coCd) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/ozt/dco", {
        coCd: coCd
      })
  };

  updateCo(coCd, coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/ozt/uco", {
        coCd: coCd,
        coNm: coNm,
        gisu: gisu,
        frDt: frDt,
        toDt: toDt,
        jongmok: jongmok,
        businessType: businessType,
        coNb: coNb,
        ceoNm: ceoNm,
        coZip: coZip,
        coAddr: coAddr,
        coAddr1: coAddr1
      })
  };

  getCoNm(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/sconm", {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
        params: {
          coNm: data.coNm
        }
      }
      )
  };

  getCoBycoCdAndcoNm(keyword) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/co/search", {
        params: {
          keyword: keyword
        },
      })
      .then((response) => response.data);
  }
}

export default new CompanyService();