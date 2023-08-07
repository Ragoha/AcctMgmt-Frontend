import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt/bgt/bgtcd";
class BgtCDService {
    /*---select  start ---*/
    getGridData(groupcd, accessToken) { //(★임시로 데이터 테스트 용으로 만든것, 반드시 수정해야함!!!)예산코드 그룹을 만들면 해당 그룹명을 조회해서 가져옴.
        console.log("BudgetReg 서비스의 getGrid Data  ::::" + groupcd);
        const returnData = axios
            .get(ACCTMGMT_API_BASE_URL + "/getGridData", {
                params: {
                    groupcd: groupcd
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

    getDetailInfo(bgtCd , accessToken) {//columns을 클릭했을때 해당 항목의 DetailInfo를 가져오는 코드
        console.log("2.BudgetReg 서비스의 getDetailInfo : " + bgtCd);
        const returnData1 = axios
            .get(ACCTMGMT_API_BASE_URL + "/getDetailInfo", {
                params: {
                    bgtCd: bgtCd
                }
            },{
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
    getBgtCDTerm(CO_CD ,accessToken){ //(★임시로 데이터 테스트 용 CoCd, 반드시 수정해야함!!!) BgtCD 그룹레벨설정 할때 초기값.
        console.log("1111찍어보자 : " + CO_CD)
        const returnData=axios.get(ACCTMGMT_API_BASE_URL + "/getBgtCDTerm" ,{
            params:{
                CO_CD : CO_CD
            }
        },{
            headers: {
              "access-token": accessToken,
            },
            withCredentials: true,
          })
        .then((response)=> response.data);
        return returnData;
    }
    getPath(bgtCd,accessToken){
        console.log('서비스에서 bgtCd:'+bgtCd+"이렇게 보낼것이야")
        const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getPath", {
            params:{
                bgtCd:bgtCd
            }
        },{
            headers: {
              "access-token": accessToken,
            },
            withCredentials: true,
          }).then((response)=>response.data)
            console.log(returnData)
        return returnData;
    }
    updateBgtCDTerm(data ,accessToken){
        const returnData =axios.put(ACCTMGMT_API_BASE_URL + "/updateBgtCDTerm", data,{
            headers: {
              "access-token": accessToken,
            },
            withCredentials: true,
          })
        .then((response)=>response.data);
        
        console.log('흠!')
        console.log(returnData)
        return returnData ;
    }
    getBgtGrData(coCd ,accessToken){
      const returnData = axios.get(ACCTMGMT_API_BASE_URL + "/getBgtGrData",{
        params:{
          coCd: coCd
        }
      },{
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      }).then((response)=>response.data);

      return returnData;
    }
    /*---select  end  ---*/
    /*---update  start---*/
    updateDetailInfo(updateData,accessToken) { //json 형태의 key value 값    //updateData
        console.log('서비스의 updateDetailInfo');
        console.dir(updateData)
        console.log('서비스의 updateDetailInfo');
        return axios.put(ACCTMGMT_API_BASE_URL + "/updateDetailInfo" , updateData,{
            headers: {
              "access-token": accessToken,
            },
            withCredentials: true,
          }).then((response) => response.data);
    }
    /*---update end---*/
    
    /*---delete start ---*/
    deleteRow(bgtCd , accessToken){
        console.log('서비스임 ' +  bgtCd)
        return axios.delete(ACCTMGMT_API_BASE_URL+"/deleteRow" , {params :{bgtCd:bgtCd}},{
            headers: {
              "access-token": accessToken,
            },
            withCredentials: true,
          }).then((response)=>response.data)
    }
    /*---delete end ---*/
}

export default new BgtCDService();