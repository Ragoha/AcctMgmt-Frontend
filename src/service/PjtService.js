import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PjtService {
    getListUser() {
        // return axios.get(ACCTMGMT_API_BASE_URL + "/");
    }
    // coCd: "",
    //   pgrCd: 0,
    //   pgrNm: "",
    //   pjtCd: "",
    //   pjtNm: "",
    //   prDt: new Date(),
    //   toDt: new Date(),
    //   progFg: "",
    //   apjtNm: "",
    //   stDt: new Date(),
    //   note: "",
    getPjtList(coCd) {

        return axios
          .get(ACCTMGMT_API_BASE_URL + "/pjtDate/" + coCd, {
          })
      }

    // getCompany(pjtCd) {
    //     return axios
    //         .get(ACCTMGMT_API_BASE_URL + "/pjtDate", {
    //             params: {
    //                 pjtCd: pjtCd
    //             }
    //         }
    //         )
    // };

    getSelPjtList(pjtCd, coCd){
        return axios
          .get(ACCTMGMT_API_BASE_URL + "/pjtSelDate/" + pjtCd + "/" + coCd, {
          })
    }

    updatePjt(coCd, data){
        return axios
        .post(ACCTMGMT_API_BASE_URL + "/pjtDate/update/" + coCd + "/" + data,{

        })
    }
}
export default new PjtService();