import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt/bgt/bgtcd";
class BgtCDService {
  /*---select  start ---*/
  //coCd, bgtCdSearchText,groupCd, accessToken
  getSearchData(coCd, gisu, bgtCdSearchText, groupCd, accessToken) {
    if (bgtCdSearchText === undefined) {
      bgtCdSearchText = "";
    }
    console.log("coCd" + coCd + "/gisu:" + gisu + "/bgtCdSearchText:" + bgtCdSearchText + "/groupCd:" + groupCd);
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getSearchData", {
      params: {
        coCd: coCd,
        gisu: gisu,
        groupCd: groupCd,
        keyword: bgtCdSearchText,
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
    return returnData;
  }

  getGridData(coCd, groupcd, gisu, accessToken) {
    const returnData = axios
      .get(ACCTMGMT_API_BASE_URL + "/getGridData", {
        params: {
          coCd: coCd,
          groupcd: groupcd,
          gisu: gisu
        }
      }, {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
    console.log("BudgetReg 데이터 통신성공");
    console.dir(returnData);
    return returnData;
  }

  getDetailInfo(bgtCd, accessToken) {//columns을 클릭했을때 해당 항목의 DetailInfo를 가져오는 코드
    console.log("2.BudgetReg 서비스의 getDetailInfo : " + bgtCd);
    const returnData1 = axios
      .get(ACCTMGMT_API_BASE_URL + "/getDetailInfo", {
        params: {
          bgtCd: bgtCd
        }
      }, {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      })
      .then((response) => response.data);
    console.log("3.BudgetReg 서비스의 getDetailInfo 통신성공, 아래에 데이터 보여주기");
    console.dir(returnData1)

    return returnData1;
  }
  getBgtCDTerm(CO_CD, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtCDTerm", {
      params: {
        CO_CD: CO_CD
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
      .then((response) => response.data);
    return returnData;
  }
  getPath(bgtCd, accessToken) {
    console.log('서비스에서 bgtCd:' + bgtCd + "이렇게 보낼것이야")
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getPath", {
      params: {
        bgtCd: bgtCd
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    console.log(returnData)
    return returnData;
  }
  updateBgtCDTerm(data, accessToken) {
    const returnData = axios.put(ACCTMGMT_API_BASE_URL + "/updateBgtCDTerm", data, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
      .then((response) => response.data);
    return returnData;
  }
  insertBgtGr(data, accessToken) {
    const returnData = axios.put(ACCTMGMT_API_BASE_URL + "/insertBgtGr", data, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
  }
  insertAddRow(data, accessToken) {
    const returnData = axios.post(ACCTMGMT_API_BASE_URL + "/insertAddRow", data, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
      .then((response) => response.data);
    return returnData;
  }
  getBgtGrData(coCd, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtGrData", {
      params: {
        coCd: coCd
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);

    return returnData;
  }
  getDefNmFromBGTCD_TERM(coCd, divFg, accessToken) {
    const returnData = axios(ACCTMGMT_API_BASE_URL + "/getDefNmFromBGTCD_TERM", {
      params: {
        coCd: coCd,
        divFg: divFg
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    return returnData;
  }
  getAddRowData(data, accessToken) {
    console.log("getAddRowData서비스 !")
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getAddRowData", {
      params: {
        bgtCd: data.bgtCd,
        coCd: data.coCd,
        groupCd:data.groupCd,
        gisu : data.gisu
        
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    return returnData;
  }
  getBgtCDdialog(coCd, keyword,accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtCDdialog", {
      params: {
        coCd: coCd,
        keyword: keyword ,
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    console.log('222겟비지티시디다이알로그 서비스')
    return returnData;
  }
  getBgtCdLikeSearch(data, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtCdLikeSearch", {
      params: {
        coCd: data.coCd,
        keyword: data.keyword
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    return returnData;
  }
  getinitGisuList(coCd, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getinitGisuList", {
      params: {
        coCd: coCd
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
    console.log('기수데이터 ?')
    console.log(returnData)
    return returnData;
  }
  getBgtGrSearch(data, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtGrSearch", {
      params: {
        coCd: data.coCd,
        keyword: data.keyword,
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);

    return returnData;
  }
  getinitBgtGrSearch(coCd, keyword ,accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getinitBgtGrSearch", {
      params: {
        coCd: coCd,
        keyword: keyword
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)

    return returnData;
  }
  getbgtGrSearchKeywordData(data,accessToken){
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getbgtGrSearchKeywordData" , {
      params:{
        coCd : data.coCd,
        keyword: data.keyword
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)

    return returnData;
  }
  updateBgtNm(data, accessToken) {
    console.log('updateBgtNm')
    console.log(data)
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/updateBgtNm", {
      params: {
        coCd: data.coCd,
        bgtCd: data.bgtCd,
        bgtNm: data.bgtNm,
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);

    return returnData;
  }
  checkTopData(data, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/checkTopData", {
      params: {
        coCd: data.coCd,
        gisu: data.gisu,
        tDataPath: data.tDataPath,
        keyword: data.keyword,
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)

    return returnData;
  }

  /*---select  end  ---*/
  /*---update  start---*/
  updateDetailInfo(updateData, accessToken) { //json 형태의 key value 값    //updateData
    console.log('서비스의 updateDetailInfo');
    console.dir(updateData)
    console.log('서비스의 updateDetailInfo');
    return axios.put(ACCTMGMT_API_BASE_URL + "/updateDetailInfo", updateData, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);
  }
  
  /*---update end---*/

  /*---delete start ---*/
  deleteRow(data, accessToken) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/deleteRow", { 
      params: { 
        bgtCd: data.bgtCd ,
        coCd : data.coCd
    } }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data)
  }
  deleteBgtGr(data, accessToken) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/deleteBgtGr", {
      params: {
        coCd: data.coCd,
        bgtGrCd: data.bgtGrCd
      }
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })

  }
  /*---delete end ---*/
}

export default new BgtCDService();