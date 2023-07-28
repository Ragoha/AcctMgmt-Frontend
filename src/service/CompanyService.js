import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class CompanyService {
  getListUser() {
    // return axios.get(ACCTMGMT_API_BASE_URL + "/");
  }

  getTime() {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/time")
      .then((response) => response.data);
  }

  getCoList(coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/co", {
        coCd: coCd,
        coNm: coNm,
        jongmok: jongmok,
        businessType: businessType,
        coNb: coNb,
        ceoNm: ceoNm,
        coZip: coZip,
        coAddr: coAddr,
        coAddr1: coAddr1
      })
  }

  insertCo(coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/ozt/ico", {
        coNm: coNm,
        jongmok: jongmok,
        businessType: businessType,
        coNb: coNb,
        ceoNm: ceoNm,
        coZip: coZip,
        coAddr: coAddr,
        coAddr1: coAddr1
      })
  };

  getCo(coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/sco",{
        params: {
          coCd: coCd
        }
      }
      )};

  deleteCo(coCd){
    return axios
    .post(ACCTMGMT_API_BASE_URL + "/ozt/dco",{
      coCd: coCd
    })
  };

  updateCo(coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1){
    return axios
    .post(ACCTMGMT_API_BASE_URL + "/ozt/uco",{
        coCd : coCd,
        coNm: coNm,
        jongmok: jongmok,
        businessType: businessType,
        coNb: coNb,
        ceoNm: ceoNm,
        coZip: coZip,
        coAddr: coAddr,
        coAddr1: coAddr1
    })
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