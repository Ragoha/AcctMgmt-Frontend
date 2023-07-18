import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt/bgt/sbgtcd";
class BudgetReg{
    
/*---조회---*/
getGridData(groupcd){ //예산코드 그룹을 만들면 해당 그룹명을 조회해서 가져옴.
    console.log("BudgetReg 서비스의 getGrid Data  ::::"+groupcd);
    const returnData = axios
    .get(ACCTMGMT_API_BASE_URL + "/getGridData",{
        params:{
            groupcd : groupcd
        }
    })
    .then((response)=> response.data);
    console.log("BudgetReg 데이터 통신성공");
    console.dir(returnData);
    return returnData;
}

getDetailInfo(bgt_CD){//columns을 클릭했을때 해당 항목의 DetailInfo를 가져오는 코드
    console.log("BudgetReg 서비스의 getDetailInfo" + bgt_CD);
    const returnData1= axios
    .get(ACCTMGMT_API_BASE_URL + "/getDetailInfo",{
        params:{
            bgt_CD : bgt_CD
        }
    })
    .then((response)=> response.data);
    console.log("BudgetReg 서비스의 getDetailInfo 통신성공");
    console.dir(returnData1)

    return returnData1;
}
getSearchData(){
    
}

}
export default new BudgetReg();