import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
class SyscfgService {

    configCheck(data) {
        return axios.get(
            ACCTMGMT_API_BASE_URL + '/config/' + data.selectedData + '/' + data.selectedValue + '/' + data.commonSettingValue + '/' + data.coCd, {
            headers: {
                
                "access-token": data.accessToken,
            },
        })
    }
    config(data) {
        return axios
        .get(ACCTMGMT_API_BASE_URL + '/config/' + data.coCd, {
            headers: {
                "access-token": data.accessToken,
            },
        })
    }
    getCoNm(data) {
        return axios.get(ACCTMGMT_API_BASE_URL + '/config/coNm/' + data.coCd, {
            headers: {
                "access-token": data.accessToken,
            },
        })
    }
}
export default new SyscfgService();