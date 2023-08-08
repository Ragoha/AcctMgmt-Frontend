import axios from "axios";
import dayjs from "dayjs";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BtgICFService {
  getBGT(formData) {
    // const data = JSON.stringify(formData);
    return axios.post(ACCTMGMT_API_BASE_URL + "/budget", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getBgtICFList(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf", {
        params: {
          coCd: data.coCd,
          bgtCd: data.bgtCd,
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
    console.log("asdfasdfiweoidosodsodsowo");
    console.log(data);
    console.log("asdfasdfiweoidosodsodsowo");

    return axios
      .post(
        ACCTMGMT_API_BASE_URL + "/bgticf",
        {
          coCd: data.user.coCd,
          gisu: data.row.gisu,
          sq: data.row.sq,
          bgtCd: data.row.bgtCd,
          divCd: data.row.divCd,
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
    return axios
      .put(
        ACCTMGMT_API_BASE_URL + "/bgticf",
        {
          coCd: data.user.coCd,
          gisu: data.row.gisu,
          sq: data.row.sq,
          bgtCd: data.row.bgtCd,
          divCd: data.row.divCd,
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
      })
      .catch((error) => {
        console.error("오류:", error); // 오류가 발생한 경우 오류 메시지 출력
        throw error; // 오류를 다음 단계로 넘겨서 처리하도록 예외 던지기
      });
  }

  deleteBgtICF(data) {
    console.log(data);
    return axios
      .delete(ACCTMGMT_API_BASE_URL + "/bgticf", {
        params: {
          coCd: data.coCd,
          bgtCd: data.bgtCd,
          sq: data.sq,
        },
        headers: {
          "access-token": data.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  findDivByCoCdAndKeyword(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/div", {
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
  }

  findBgtGrByCoCdAndKeyword(data) {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtgr", {
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
  }

  findBgcCDByGisuAndGroupCdAndToDtAndKeyword(data) {
    console.log(data);
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd", {
        params: {
          coCd: data.user.coCd,
          gisu: data.gisu,
          groupCd: data.bgtGrCd,
          keyword: data.keyword,
          toDt: dayjs(data.range),
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
    console.log(data);

    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgticf/bgtcd/search", {
        params: {
          gisu: data.gisu,
          coCd: data.coCd,
          divCd: data.divCd,
          groupCd: data.bgtGrCd,
          grFg: data.grFg,
          bgtCd: data.bgtCd,
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
}




export default new BtgICFService();