import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PjtService {
    getListUser() {
        // return axios.get(ACCTMGMT_API_BASE_URL + "/");
    }
    getCoList(coCd, coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1) {
        return axios
          .get(ACCTMGMT_API_BASE_URL + "/ozt/co", {
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
      }

    getCompany(pjtCd) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/pjtDate", {
                params: {
                    pjtCd: pjtCd
                }
            }
            )
    };
}
export default new PjtService();