import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class GisuService {

  getGisu(coCd) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/ozt/sgisu", {
        params: {
          coCd: coCd
        }
      }
      )
  };

}

export default new GisuService();
