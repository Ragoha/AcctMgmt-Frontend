import { Box } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import React, { Component } from 'react';
import BgtCDService from '../../service/BgtCDService';
import { connect } from 'react-redux';
import { GridRowModes, GridRowEditStopReasons } from "@mui/x-data-grid-pro";
import SnackBarComponent from "../common/SnackBarComponent";
class BgtCDDatagrid extends Component {
    constructor(props) {
        super(props);
        this.snackBarRef = React.createRef();
        this.state = {
            columns: [
              { field: 'bgtCd', headerName: '예산코드'  , minWidth:180,width: 300, headerAlign: 'center',align:'left', editable:false },
              { field: 'bgtNm', headerName: '예산과목명', width:   250  ,headerAlign: 'center',align:'left', flex:1},
            ],
            rows: [],
            tRows: [],
            dataPath: '초기값그대로야~ 다시 뽑아 ~',
            rowModesModel: {},
            bgtCd: null,
            isNew: false,
          
        }
    }
    //[230810] 업데이트 끝내고 isNew 값 바꿔야함
    // changeIsNew = () => {
    //     console.log('changeIsNew에 도착했음')

    // }
    processRowUpdate = (newRow) => {
        console.log('================processRowUpdate입니다===============')
        const { coCd } = this.props.userInfo;
        const { accessToken } = this.props;
        const gisu = this.props.gisuDefaultValue;
        const keyword = this.props.keyword;
        const groupCd = this.props.groupCd;
        // console.log('data--')
        // console.log("gisu: " +gisu +"/keyword : "+ keyword + "/groupCd :" +groupCd);
        if (newRow.isNew === true) {
          console.log("isNew가 들어온다고 ?")
            const data = {
                divFg: newRow.divFg,
                bgtNm: newRow.bgtNm,
                bgtCd: newRow.bgtCd,
                dataPath: newRow.dataPath,
                parentCd: newRow.parentCd
            }
            this.props.insertAddRow(data);
            this.snackBarRef.current.handleUp("success" , "추가 되었습니다")
            const updatedRow = { ...newRow, isNew: false };
            this.setState((prevState) => ({
                rows: prevState.rows.map((row) =>
                    row.divFg === newRow.divFg ? updatedRow : row
                ),
            }));
            this.props.chkFlag(false);
            return updatedRow;
        } else {
            const data = {
                bgtCd: newRow.bgtCd,
                bgtNm: newRow.bgtNm,
                coCd: coCd
            }
            BgtCDService.updateBgtNm(data, accessToken);
            // this.props.chkFlag(false);
            this.snackBarRef.current.handleUp("success" , "수정 되었습니다")
           this.props.chkFlag(false);
          return newRow;
        }

    };
    clickedRow = (params) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
      console.log('00000000000000000000000')
        console.log(params.row.bgtCd)
        if (params.row.bgtCd === "          " || params.row.bgtCd === "           " || params.row.bgtCd === undefined) {
            console.log('수입수출눌렀을때' + params.row.bgtCd + "|")
            this.props.disableFlag(true);
            let tDataPath = "";
            let bgtCDA = "";
            if (params.row.bgtCd === undefined) { //데이터를 조회한 상태에서 추가할때
                console.log("수입수출이 undefine일때")
                tDataPath = params.id
                console.log("파람아이디 : " + params.id)
                tDataPath = tDataPath.split("/");
                tDataPath = tDataPath[tDataPath.length - 1] +","; 
                console.log(tDataPath);
            }
            
            if(params.row.bgtCd==="          "){ //아무것도 없는 화면에서 찍었을때 
                console.log('수입 공백 ')
                tDataPath = '수입,'
            }
            if(params.row.bgtCd==="           "){
              console.log('수출 공백 ')
              tDataPath = '수출,'
            }
            console.log('그럼 tDataPath 가 :' + tDataPath)
            this.props.setClickDataPath(tDataPath,null)
            return null;
        }
        console.log(params.row)
        console.log('clickedROw !' + params.row.bgtCd + 'and DataPath ' + params.row.dataPath)
        console.log('isNew까지 체크해볼게 : ' + params.row.isNew)
        const { bgtCd, dataPath, isNew, bgtNm, divFg } = params.row;
        this.setState({ dataPath: dataPath })
        this.props.setClickedData(dataPath, bgtCd, divFg);
        if (isNew !== true) {//새로 만들어진 행이 아니라 기존의 행일땐 이대로 간다. 
            this.props.setDetailInfo(bgtCd);
        } else if (isNew === true) {
            console.log('이건 새로 만들어진 로우다');
            this.setState({
                bgtCd: params.row.bgtCd,
                isNew: params.row.isNew,
                dataPath: params.row.dataPath,
                bgtNm: params.row.bgtNm,
            });
        }
        
        this.props.disableFlag(false);
    }
    getDataPathFromDataGrid = () => { //DataPath를 전달.
        console.log('일단 getDataPathFromDataGrid는 실행되는가')
        const { dataPath } = this.state;
        return dataPath;
    }
    setDataPathFromHandleRowAdd = (dataPath) => {
        this.setState({ dataPath: dataPath },
            console.log('DataPath 변경 확인 ' + this.state.dataPath + "|"));
    }

    render() {
        const { columns} = this.state;
        const { rows } = this.props;
        const editableColumns = columns.map(column => ({
            ...column,
            editable: column.field !== 'id' ? true : false
        }));

        return (
          <Box
            style={{
              height: "calc(100vh - 256px)",
              borderTop: "3px solid black",
            }}
          >
            <DataGridPro
              treeData
              showCellVerticalBorder
              showColumnVerticalBorder
              getTreeDataPath={(row) => row.dataPath.split(",")}
              rows={rows}
              columns={editableColumns}
              getRowId={(row) => row.bgtCd}
              headerStyle={{ backgroundColor: "lightgray", fontWeight: "bold" }}
              onRowClick={this.clickedRow}
              processRowUpdate={this.processRowUpdate}
              onProcessRowUpdateError={(error) => {}}
              defaultGroupingExpansionDepth={9}
              getRowClassName={(params) => `style-divfg-${params.row.divFg}${params.row.isNew ? "-new" : ""}`}
              editMode="cell" //row 단위로 편집 모양 잡힘
              headerAlign="center"
              groupingColDef={{
                headerName: "분류명",
                headerAlign: "center",
                width:270
              }}
              InputProps={{
                style: {
                  font: 15,
                },
              }}
              components={{
                Footer: () => null,
              }}
              sx={{
                "& .MuiDataGrid-row:hover": {
                  background: "#F5F5F5",
                },
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  background: "#F5F5F5",
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "#EDF4FB !important",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
                "& .style-divfg-undefined": { background: "#74D36D" },
                "& .style-divfg-1": { background: "#86E57F" },
                "& .style-divfg-2": { background: "#AAFFA3" },
                "& .style-divfg-3": { background: "#CEFFC7" },
                "& .style-divfg-4": { background: "#F2FFEB" },
                "& .style-divfg-5, .style-divfg-6, .style-divfg-7, .style-divfg-8":
                {
                  background: "#FFFFFF",
                },
                "& .style-divfg-1-new, .style-divfg-2-new, .style-divfg-3-new, .style-divfg-4-new, .style-divfg-5-new, .style-divfg-6-new, .style-divfg-7-new, .style-divfg-8-new":
                {
                  background: "#FFF5F5",
                },
                "& .style-divfg-4-new .MuiDataGrid-cell.bgtNm": {
                  background: "#FFEAEA !important",
                },
              }}
            />
             <SnackBarComponent ref={this.snackBarRef}/>
          </Box>
        );
    }
};
const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
    //groupcd: state.BgtCDStore || {}

});
export default connect(mapStateToProps, null, null, { forwardRef: true })(BgtCDDatagrid);
