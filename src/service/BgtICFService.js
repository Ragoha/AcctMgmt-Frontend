import axios from "axios";
import dayjs from "dayjs";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BtgICFService {
  getBgtICFList(data) {
    console.log("--------------");
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/" + data.coCd + "/" + data.bgtCd, {
        params: {
          gisu: data.gisu,
          groupCd: data.groupCd,
          bgtFg: data.bgtFg,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  // deleteBgtICF(sq) {
  //   return axios.delete(ACCTMGMT_API_BASE_URL + "/bgticf/" + sq);
  // }

  insertBgtICF(data) {
    console.log(data);
    console.log("asdfasdfasdfasdf");
    return axios
      .post(
        ACCTMGMT_API_BASE_URL + "/bgticf",
        {
          coCd: data.user.coCd,
          gisu: data.row.gisu,
          sq: data.row.sq,
          bgtCd: data.row.bgtCd,
          divCd: data.divCd,
          deptCd: data.row.deptCd,
          mgtCd: data.row.mgtCd,
          bgtFg: data.row.bgtFg,
          bottomNm: data.row.bottomNm,
          carrAm: data.row.carrAm,
          carrAm1: data.row.carrAm1,
          carrAm2: data.row.carrAm2,
          carrAm3: data.row.carrAm3,
          empCd: data.user.empCd,
          remDc: data.row.remDc,
          insertId: data.user.empId,
          modifyId: data.user.empId,
        },
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("응답:", response.data); // 성공적으로 응답이 도착한 경우 응답 데이터 출력
        return response.data; // 다음 처리를 위해 응답 데이터 반환
      });
  }

  updateBgtICF(data) {
    console.log(data);
    console.log("zzzzzzzzzzzzzzzz");
    return axios
      .put(
        ACCTMGMT_API_BASE_URL +
          "/bgticf/" +
          data.user.coCd +
          "/" +
          data.row.bgtCd,
        {
          gisu: data.row.gisu,
          divCd: data.row.divCd,
          deptCd: data.row.deptCd,
          mgtCd: data.row.mgtCd,
          sq: data.row.sq,
          bgtFg: data.row.bgtFg,
          bottomNm: data.row.bottomNm,
          carrAm: data.row.carrAm,
          carrAm1: data.row.carrAm1,
          carrAm2: data.row.carrAm2,
          carrAm3: data.row.carrAm3,
          empCd: data.user.empCd,
          remDc: data.row.remDc,
          modifyId: data.user.empId,
        },
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("응답:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("오류:", error);
        throw error;
      });
  }

  deleteBgtICF(data) {
    console.log(data);
    return axios
      .delete(
        ACCTMGMT_API_BASE_URL + "/bgticf/" + data.coCd + "/" + data.bgtCd,
        {
          params: {
            sqList: data.sqList,
          },
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
  }

  findDivByCoCdAndKeyword(data) {
    return axios
      .get(
        ACCTMGMT_API_BASE_URL + "/dialog/div/" + data.coCd + "/" + data.keyword,
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
  }

  findBgtGrByCoCdAndKeyword(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+data.coCd +"/"+data.keyword, {
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgcCDByGisuAndGroupCdAndToDtAndKeyword(data) {
    console.log(data);
    let bgtGrCdListString = "";
    if (data.bgtGrCdList && data.bgtGrCdList.length > 0) {
      bgtGrCdListString = data.bgtGrCdList.join(", ");
    }
    console.log(bgtGrCdListString);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd", {
        params: {
          coCd: data.user.coCd,
          gisu: data.gisu,
          groupCd: data.bgtGrCd,
          keyword: data.keyword,
          toDt: dayjs(data.range),
          bgtGrCdList: bgtGrCdListString,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findGisuByCoCd(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/gisu", {
        params: {
          coCd: data.user.coCd,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findBgtCdByGisuAndGroupCdAndGrFgAndBgtCd(data) {
    console.log("===================");
    console.log(data);

    let bgtGrCdListString = "";
    if (data.bgtGrCdList && data.bgtGrCdList.length > 0) {
      bgtGrCdListString = data.bgtGrCdList.join(", ");
    }

    let bgtCdListString = "";
    if (data.bgtCdList && data.bgtCdList.length > 0) {
      bgtCdListString = data.bgtCdList.join(", ");
    }

    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd/search", {
        params: {
          gisu: data.gisu,
          coCd: data.coCd,
          divCd: data.divCd,
          groupCd: data.bgtGrCd,
          grFg: data.grFg,
          bgtCd: data.bgtCd,
          bgtCdList: bgtCdListString,
          bgtGrCdList: bgtGrCdListString,
          // coCd: data.coCd,
          // divCd: data.divCd,
          // groupCd: data.groupCd,
          // grFg: data.grFg
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findPjtByCoCdAndKeyword = (data) => {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/pjt", {
        params: {
          coCd: data.coCd,
          keyword: data.keyword,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  };

  findDeptByCoCdAndKeyword = (data) => {
    return axios
      .get(
        ACCTMGMT_API_BASE_URL +
          "/dialog/dept/" +
          data.coCd +
          "/" +
          data.keyword,
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
  };
}

export default new BtgICFService();
