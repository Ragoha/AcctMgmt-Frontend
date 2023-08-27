import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from "@mui/x-data-grid/internals";
import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BgtGrService {
  findBgtGrByCoCd(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+data.coCd, {
        params: {
          keyword: data.keyword,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  insertBgtGr(data) {
    console.log("여기아님?:")
    console.log(data)
    console.dir(data)
    console.log('뚜 우 따 따 띠 띠 띠 띠 ')
    return axios
      .post(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtgr",
        {
          coCd: data.coCd,
          insertId:data.insertId,
          bgtGrCd: data.bgtGr.bgtGrCd,
          bgtGrNm: data.bgtGr.bgtGrNm,
          gisu : data.gisu,
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

  deleteBgtGr(data) {
    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+data.coCd+"/"+data.bgtGrCd, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  updateBgtGr(data) {
    console.log("--------");
    console.log(data);
    console.log(data.coCd);
    console.log(data.bgtGr.bgtGrCd);
    console.log(data.bgtGr.bgtGrNm);
    console.log("========");
    return axios
      .put(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+data.coCd+"/"+data.bgtGr.bgtGrCd,
        {
          bgtGrNm: data.bgtGr.bgtGrNm,
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

export default new BgtGrService();
