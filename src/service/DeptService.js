import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class DeptService {

    getDeptList(coCd, divCd, deptCd, deptNm, deptZip, deptAddr, deptAddr1) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/dept", {
                // headers: {
                //     "access-token": data.accessToken,
                // },
                // withCredentials: true,
                coCd: coCd,
                divCd: divCd,
                deptCd: deptCd,
                deptNm: deptNm,
                deptZip: deptZip,
                deptAddr: deptAddr,
                deptAddr1: deptAddr1
            })
    }

    getDept(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/ozt/sdept", {
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
                params :{coCd:data.coCd}
            })
};

}
export default new DeptService();