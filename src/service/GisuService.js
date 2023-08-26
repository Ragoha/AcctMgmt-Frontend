import axios from "axios";
import { useNavigate } from "react-router-dom";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class GisuService {

  findGisuByCoCd(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/gisu/"+data.coCd, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  insertGisu(data) {
    return axios
      .post(
        ACCTMGMT_API_BASE_URL + "/gisu",
        {
          coCd: data.coCd,
          gisu: data.gisu.gisu,
          frDt: data.gisu.frDt,
          toDt: data.gisu.toDt,
        },
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  deleteGisu(data) {
    console.log(data);
    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/gisu/"+data.coCd+"/"+data.gisu, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  updateGisu(data) {
    return axios
      .put(
        ACCTMGMT_API_BASE_URL + "/gisu/"+data.coCd+"/"+data.gisu,
        {
          coCd: data.coCd,
          gisu: data.gisu.gisu,
          frDt: data.gisu.frDt,
          toDt: data.gisu.toDt,
        },
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      });
  }
}


export default new GisuService();