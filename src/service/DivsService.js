import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DivsService {

    getDivsList(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/div", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                coCd: data.coCd,
                divCd: data.divCd,
                divNm: data.divNm,
                ceoNm: data.ceoNm,
                jongmok: data.jongmok,
                businessType: data.businessType,
                divNb: data.divNb,
                toNb: data.toNb,
                divZip: data.divZip,
                divAddr: data.divAddr,
                divAddr1: data.divAddr1
            })
    }

    getDivision(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/sdiv", {
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

    getDiv(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/sdivi", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                params: {
                    divCd: data.divCd
                }
            }
            )
    };

    insertDivs(data) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/ozt/idiv", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                coCd: data.coCd,
                divNm: data.divNm,
                ceoNm: data.ceoNm,
                jongmok: data.jongmok,
                businessType: data.businessType,
                divNb: data.divNb,
                toNb: data.toNb,
                divZip: data.divZip,
                divAddr: data.divAddr,
                divAddr1: data.divAddr1
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

    deleteDivs(data) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/ozt/ddiv", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                divCd: data.divCd
            })
    };

    getDivBydivCdAnddivNm(keyword) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/div/search", {
                params: {
                    keyword: keyword
                },
            })
            .then((response) => response.data);
    }
}

export default new DivsService();
