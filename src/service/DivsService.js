import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DivsService {

    getDivsList(coCd, divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/div", {
                coCd: coCd,
                divCd: divCd,
                divNm: divNm,
                ceoNm: ceoNm,
                jongmok: jongmok,
                businessType: businessType,
                divNb: divNb,
                toNb: toNb,
                divZip: divZip,
                divAddr: divAddr,
                divAddr1: divAddr1
            })
    }

    getDivision(divCd) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/sdiv", {
                params: {
                    divCd: divCd
                }
            }
            )
    };

    insertDivs(coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/ozt/idiv", {
                coCd: coCd,
                divNm: divNm,
                ceoNm: ceoNm,
                jongmok: jongmok,
                businessType: businessType,
                divNb: divNb,
                toNb: toNb,
                divZip: divZip,
                divAddr: divAddr,
                divAddr1: divAddr1
            })
    };

    updateDivs(divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1) {
        return axios
          .post(ACCTMGMT_API_BASE_URL + "/ozt/udiv", {
            divCd: divCd,
            divNm: divNm,
            ceoNm: ceoNm,
            jongmok: jongmok,
            businessType: businessType,
            divNb: divNb,
            toNb: toNb,
            divZip: divZip,
            divAddr: divAddr,
            divAddr1: divAddr1
          })
      };

    deleteDivs(divCd) {
        return axios
          .post(ACCTMGMT_API_BASE_URL + "/ozt/ddiv", {
            divCd: divCd
          })
      };

}

export default new DivsService();
