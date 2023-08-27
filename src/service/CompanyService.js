import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class CompanyService {

  getCoList(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/co", {
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

  getCompany(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/co/"+ data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      }
      )
  };

  insertCo(data) {
    return axios
      .post(ACCTMGMT_API_BASE_URL + "/co", {
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
      },{
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
  };

  getCo(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/sco", {
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

  deleteCo(data) {
    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/co/"+data.coCd, {

        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
  };

  updateCo(data) {
    return axios
      .put(ACCTMGMT_API_BASE_URL + "/co/"+data.coCd, {
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
      },{
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
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

  getCoBycoCdAndcoNm(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/dialog/co/" + data.keyword, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  };
}

export default new CompanyService();