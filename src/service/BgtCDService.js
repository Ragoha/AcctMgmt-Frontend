import axios from "axios";
const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt/bgt/bgtcd";
class BgtCDService {
    /*---select  start ---*/
    getGridData(groupcd) { //예산코드 그룹을 만들면 해당 그룹명을 조회해서 가져옴. (★임시로 데이터 테스트 용으로 만든것, 반드시 수정해야함!!!)
        console.log("BudgetReg 서비스의 getGrid Data  ::::" + groupcd);
        const returnData = axios
            .get(ACCTMGMT_API_BASE_URL + "/getGridData", {
                params: {
                    groupcd: groupcd
                }
            })
            .then((response) => response.data);
        console.log("BudgetReg 데이터 통신성공");
        console.dir(returnData);
        return returnData;
    }

    getDetailInfo(bgtCd) {//columns을 클릭했을때 해당 항목의 DetailInfo를 가져오는 코드
        console.log("BudgetReg 서비스의 getDetailInfo : " + bgtCd);
        const returnData1 = axios
            .get(ACCTMGMT_API_BASE_URL + "/getDetailInfo", {
                params: {
                    bgtCd: bgtCd
                }
            })
            .then((response) => response.data);
        console.log("BudgetReg 서비스의 getDetailInfo 통신성공");
        console.dir(returnData1)

        return returnData1;
    }
    getSearchData() {

    }
    /*---select  end  ---*/
    /*---update  start---*/
    updateDetailInfo(updateData) { //json 형태의 key value 값    //updateData
        console.log('서비스의 updateDetailInfo');
        console.dir(updateData)
        console.log('서비스의 updateDetailInfo');
        return axios.put(ACCTMGMT_API_BASE_URL + "/updateDetailInfo" , updateData).then((response) => response.data);
    }
    /*---update end---*/
    
    /*---delete start ---*/
    deleteRow(bgtCd){
        console.log('서비스임 ' +  bgtCd)
        return axios.delete(ACCTMGMT_API_BASE_URL+"/deleteRow" , {params :{bgtCd:bgtCd}}).then(console.log('삭제완료 ? -- -- - - -- -  '))
    }
    /*---delete end ---*/
}
export default new BgtCDService();