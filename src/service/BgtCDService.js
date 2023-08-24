import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
class BgtCDService {
  /*---select  start ---*/
  //coCd, bgtCdSearchText,groupCd, accessToken
  // test(data){
  //   console.log("2........")
  //   const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd", {
  //     params: {
  //       coCd: data.coCd,
  //     }
  //   }, {
  //     headers: {
  //       "access-token": data.accessToken,
  //     },
  //     withCredentials: true,
  //   })
  //   return returnData;
  // }
  getSearchData(coCd, gisu, bgtCdSearchText, groupCd, accessToken) {
    if (bgtCdSearchText === undefined) {
      bgtCdSearchText = "";
    }
    console.log("coCd" + coCd + "/gisu:" + gisu + "/bgtCdSearchText:" + bgtCdSearchText + "/groupCd:" + groupCd);
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getsearchdata", {
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
      .get(ACCTMGMT_API_BASE_URL + "/bgtcd", {//getGridData
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
      .get(ACCTMGMT_API_BASE_URL + "/bgtcd/detailinfo", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/bgtcdterm", {
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
  updateBgtCDTerm(data, accessToken) {
    const returnData = axios.put(ACCTMGMT_API_BASE_URL + "/bgtcd/bgtcdterm", data, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
      .then((response) => response.data);
    return returnData;
  }
  
  getPath(bgtCd, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getpath", {
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
  
  insertBgtGr(data, accessToken) {
    const returnData = axios.put(ACCTMGMT_API_BASE_URL + "/bgtcd/bgtgr", data, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
  }
  insertAddRow(data, accessToken) {
    const returnData = axios.post(ACCTMGMT_API_BASE_URL + "/bgtcd", data, {//insertAddRow
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    })
      .then((response) => response.data);
    return returnData;
  }
  getBgtGrData(coCd, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/bgtgr", {
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
    const returnData = axios(ACCTMGMT_API_BASE_URL + "/bgtcd/getdefnmfrombgtcdterm", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getaddrowdata", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/bgtcddialog", {
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
    return returnData;
  }
  getBgtCdLikeSearch(data, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getbgtcdlikesearch", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/gisu", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getbgtgrsearch", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getinitbgtgrsearch", {
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
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/getbgtgrsearchkeyworddata" , {
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
    const returnData = axios.put(ACCTMGMT_API_BASE_URL + "/bgtcd", {//updateBgtNm
        coCd: data.coCd,
        bgtCd: data.bgtCd,
        bgtNm: data.bgtNm,
    }, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);

    return returnData;
  }
  checkTopData(data, accessToken) {
    const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/bgtcd/checktopdata", {
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
    return axios.put(ACCTMGMT_API_BASE_URL + "/bgtcd/detailinfo", updateData, {
      headers: {
        "access-token": accessToken,
      },
      withCredentials: true,
    }).then((response) => response.data);
  }
  
  /*---update end---*/

  /*---delete start ---*/
  deleteRow(data, accessToken) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/bgtcd", { 
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
    return axios.delete(ACCTMGMT_API_BASE_URL + "/bgtcd/deletebgtgr", {
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