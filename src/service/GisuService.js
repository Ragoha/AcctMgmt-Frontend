import axios from "axios";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class GisuService {
  findGisuByCoCd(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/gisu", {
        params: {
          coCd: data.coCd,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  deleteGisu(data) {

    console.log(data);
    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/gisu", {
        params: {
          coCd: data.coCd,
          gisu: data.gisu
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }
}

export default new GisuService();
