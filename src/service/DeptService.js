import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DeptService {

    getDeptList(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/dept", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                coCd: data.coCd,
                divCd: data.divCd,
                deptCd: data.deptCd,
                deptNm: data.deptNm,
                deptZip: data.deptZip,
                deptAddr: data.deptAddr,
                deptAddr1: data.deptAddr1
            })
    }

    getDept(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/sdept", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                params :{
                    coCd: data.coCd
                }
            })
};

getDepartment(data) {
    return axios
        .get(ACCTMGMT_API_BASE_URL + "/ozt/sdepart", {
            headers: {
                "access-token": data.accessToken,
            },
            withCredentials: true,
            params :{deptCd: data.deptCd}
        })
};

insertDept(data) {
    return axios
            .post(ACCTMGMT_API_BASE_URL + "/ozt/idept", {
                coCd: data.coCd,
                divCd: data.divCd,
                deptCd: data.deptCd,
                deptNm: data.deptNm,
                deptZip: data.deptZip,
                deptAddr: data.deptAddr,
                deptAddr1: data.deptAddr1
            },{
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true
            })
};

updateDept(data) {
    console.log(data);
    return axios
        .put(ACCTMGMT_API_BASE_URL + "/ozt/udept", {
            deptCd: data.deptCd,
            deptNm: data.deptNm,
            deptZip: data.deptZip,
            deptAddr: data.deptAddr,
            deptAddr1: data.deptAddr1,
            
        },{
            headers: {
              "access-token": data.accessToken,
            },
            withCredentials: true
          })
};

deleteDept(data) {
    return axios
        .delete(ACCTMGMT_API_BASE_URL + "/ozt/ddept",{
            headers: {
              "access-token": data.accessToken,
            },
            withCredentials: true,
            params :{deptCd:data.deptCd}
          })
};

}
export default new DeptService();