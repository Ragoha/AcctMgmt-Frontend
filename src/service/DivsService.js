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
                    coCd:data.coCd
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
                    divCd:data.divCd
                }
            }
            )
    };

    // getCoCd(data) {
    //     return axios
    //         .get(ACCTMGMT_API_BASE_URL + "/ozt/scodi", {
    //             headers: {
    //                 "access-token": data.accessToken,
    //             },
    //             withCredentials: true,
    //             params: {
    //                 divCd: data.divCd
    //             }
    //         }
    //         )
    // };

    insertDivs(data) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/ozt/idiv", {
                coCd: data.coCd,
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
            },{
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
    };

    updateDivs(data) {
        console.log(data);
        return axios
            .put(ACCTMGMT_API_BASE_URL + "/ozt/udiv", {
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
                modifyId: data.modifyId
                
            },{
                headers: {
                  "access-token": data.accessToken,
                },
                withCredentials: true
              })
    };

    deleteDivs(data) {
        return axios
            .delete(ACCTMGMT_API_BASE_URL + "/ozt/ddiv",{
                headers: {
                  "access-token": data.accessToken,
                },
                withCredentials: true,
                params :{divCd:data.divCd}
              })
    };

    getDivBydivCdAnddivNm(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/div/search", {
                headers: {
                    "access-token": data.accessToken,
                  },
                  withCredentials: true,
                params: {
                    keyword: data.keyword
                },
            })
            .then((response) => response.data);
    }
}

export default new DivsService();
