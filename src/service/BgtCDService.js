import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
class BgtCDService {
  getSearchData(coCd, gisu, bgtCdSearchText, groupCd, accessToken) {
    if (bgtCdSearchText === undefined) {
      bgtCdSearchText = "";
    }

    const returnData = axios.get(
      ACCTMGMT_API_BASE_URL + "/bgtcd/" + coCd,
      {
        params: {
          gisu: gisu,
          groupCd: groupCd,
          keyword: bgtCdSearchText,
        },
      },
      {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      }
    );
    return returnData;
  }

  getDetailInfo(data) {
    //columns을 클릭했을때 해당 항목의 DetailInfo를 가져오는 코드
    console.log(
      "2.BudgetReg 서비스의 getDetailInfo : " + data.coCd + "/" + data.bgtCd
    );
    const returnData1 = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/bgtcd/" + data.coCd + "/" + data.bgtCd,
        {},
        {
          headers: {
            "access-token": data.accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    console.log(
      "3.BudgetReg 서비스의 getDetailInfo 통신성공, 아래에 데이터 보여주기"
    );
    console.dir(returnData1);

    return returnData1;
  }

  insertAddRow(data, accessToken) {
    const returnData = axios
      .post(ACCTMGMT_API_BASE_URL + "/bgtcd", data, {
        //insertAddRow
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
    return returnData;
  }

  getDefNmFromBGTCD_TERM(coCd, divFg, accessToken) {
    const returnData = axios(
      ACCTMGMT_API_BASE_URL + "/bgtcd/getdefnmfrombgtcdterm",
      {
        params: {
          coCd: coCd,
          divFg: divFg,
        },
      },
      {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      }
    ).then((response) => response.data);
    return returnData;
  }

  getAddRowData(data, accessToken) {
    console.log("getAddRowData서비스 !");
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/bgtcd/getaddrowdata",
        {
          params: {
            bgtCd: data.bgtCd,
            coCd: data.coCd,
            groupCd: data.groupCd,
            gisu: data.gisu,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    return returnData;
  }

  getBgtCDdialog(coCd, keyword, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/bgtcd/bgtcddialog",
        {
          params: {
            coCd: coCd,
            keyword: keyword,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    return returnData;
  }
  getBgtCdLikeSearch(data, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/bgtcd/getbgtcdlikesearch",
        {
          params: {
            coCd: data.coCd,
            keyword: data.keyword,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    return returnData;
  }
  getinitGisuList(coCd, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/gisu/"+coCd,
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    console.log("기수데이터 ?");
    console.log(returnData);
    return returnData;
  }
  getBgtGrSearch(data, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtcd/"+data.coCd+"/"+data.keyword,
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);

    return returnData;
  }
  getinitBgtGrSearch(coCd, keyword, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+coCd+"/"+keyword,
        {
          params: {
            coCd: coCd,
            keyword: keyword,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);

    return returnData;
  }
  getbgtGrSearchKeywordData(data, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtgr/"+data.coCd+"/"+data.keyword,
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);

    return returnData;
  }

  checkTopData(data, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/bgtcd/checktopdata",
        {
          params: {
            coCd: data.coCd,
            gisu: data.gisu,
            tDataPath: data.tDataPath,
            keyword: data.keyword,
            groupCd: data.groupCd,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);

    return returnData;
  }

  updateBgtNm(data, accessToken) {
    console.log("updateBgtNm");
    console.log(data);
    const returnData = axios
      .put(
        ACCTMGMT_API_BASE_URL + "/bgtcd/bgtnm/"+data.coCd+"/"+data.bgtCd,
        {
          //updateBgtNm
          bgtNm: data.bgtNm,
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);

    return returnData;
  }

  //수정
  updateDetailInfo(updateData, accessToken) {
    //json 형태의 key value 값    //updateData
    console.log("서비스의 updateDetailInfo");
    console.dir(updateData);
    console.log("서비스의 updateDetailInfo");
    return axios
      .put(
        ACCTMGMT_API_BASE_URL +
          "/bgtcd/" +
          updateData.coCd +
          "/" +
          updateData.bgtCd,
        updateData,
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
  }

  //삭제
  deleteRow(data, accessToken) {
    return axios
      .delete(
        ACCTMGMT_API_BASE_URL + "/bgtcd/" + data.coCd + "/" + data.bgtCd,
        {
          params: {
            bgtCd: data.bgtCd,
            coCd: data.coCd,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
  }

  // ============================================================

  getBgtCDTerm(CO_CD, accessToken) {
    const returnData = axios
      .get(
        ACCTMGMT_API_BASE_URL + "/dialog/bgtcdterm/" + CO_CD,
        {
          params: {
            CO_CD: CO_CD,
          },
        },
        {
          headers: {
            "access-token": accessToken,
          },
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    return returnData;
  }
  updateBgtCDTerm(data, coCd, accessToken) {
    const returnData = axios
      .put(ACCTMGMT_API_BASE_URL + "/dialog/bgtcdterm/" + coCd, data, {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
    return returnData;
  }
}

export default new BgtCDService();
