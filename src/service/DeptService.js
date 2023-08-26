import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DeptService {

    getDepartment(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/dept/" + data.coCd + "/" + data.deptCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
    };

    insertDept(data) {
        return axios
            .post(ACCTMGMT_API_BASE_URL + "/dept", {
                coCd: data.coCd,
                divCd: data.divCd,
                deptCd: data.deptCd,
                deptNm: data.deptNm,
                deptZip: data.deptZip,
                deptAddr: data.deptAddr,
                deptAddr1: data.deptAddr1,
                insertId: data.insertId
            }, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
    };

    updateDept(data) {
        console.log(data);
        return axios
            .put(ACCTMGMT_API_BASE_URL + "/dept/" + data.coCd + "/" + data.deptCd, {
                deptNm: data.deptNm,
                deptZip: data.deptZip,
                deptAddr: data.deptAddr,
                deptAddr1: data.deptAddr1,

            }, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
    };

    deleteDept(data) {
        return axios
            .delete(ACCTMGMT_API_BASE_URL + "/dept/" + data.coCd + "/" + data.deptCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
    };

    getDivDept(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/dept/" + data.coCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
    };


  getDeptBydeptCdAnddeptNm(data) {
    console.log(data);

    console.log("iiiiiiiiiiiiiiiiiiiiiii")
        console.log(ACCTMGMT_API_BASE_URL + "/dialog/dept/" + data.coCd + "/" + data.keyword);

        if (data.keyword) {
            return axios
                .get(ACCTMGMT_API_BASE_URL + "/dialog/dept/" + data.coCd + "/" + data.keyword, {
                    headers: {
                        "access-token": data.accessToken,
                    },
                    withCredentials: true,
                    params: {
                        // coCd: data.coCd,
                        // keyword: data.keyword
                    },
                })
                .then((response) => response.data);
        } else {
            return axios.get(ACCTMGMT_API_BASE_URL + "/dialog/dept/" + data.coCd, {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                params: {
                    // coCd: data.coCd,
                    // keyword: data.keyword
                },
            })
                .then((response) => response.data);
        }
    }

}
export default new DeptService();