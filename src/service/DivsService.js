import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DivsService {

    // getDivsList(data) {
    //     return axios
    //         .get(ACCTMGMT_API_BASE_URL + "/ozt/div", {
    //             headers: {
    //                 "access-token": data.accessToken,
    //             },
    //             withCredentials: true,
    //             coCd: data.coCd,
    //             divCd: data.divCd,
    //             divNm: data.divNm,
    //             ceoNm: data.ceoNm,
    //             jongmok: data.jongmok,
    //             businessType: data.businessType,
    //             divNb: data.divNb,
    //             toNb: data.toNb,
    //             divZip: data.divZip,
    //             divAddr: data.divAddr,
    //             divAddr1: data.divAddr1
    //         })
    // }

    getDivision(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/div/" + data.coCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            }
            )
    };

    getDiv(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/div/" + data.coCd + "/" + data.divCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            }
            )
    };

    insertDivs(data) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/div", {
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
                divAddr1: data.divAddr1,
                insertId: data.insertId
            }, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
    };

    updateDivs(data) {
        console.log(data);
        return axios
            .put(ACCTMGMT_API_BASE_URL + "/div/" + data.coCd + "/" + data.divCd, {
                divNm: data.divNm,
                ceoNm: data.ceoNm,
                jongmok: data.jongmok,
                businessType: data.businessType,
                divNb: data.divNb,
                toNb: data.toNb,
                divZip: data.divZip,
                divAddr: data.divAddr,
                divAddr1: data.divAddr1,
                modifyId: data.modifyId

            }, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
    };

    deleteDivs(data) {
        return axios
            .delete(ACCTMGMT_API_BASE_URL + "/div/" + data.coCd + "/" + data.divCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
    };

    getDivBydivCdAnddivNm(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/dialog/div/" + data.coCd + "/" + data.keyword, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                params: {
                    coCd: data.coCd,
                    keyword: data.keyword
                },
            })
            .then((response) => response.data);
    }
}

export default new DivsService();
