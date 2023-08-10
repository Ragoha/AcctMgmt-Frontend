import { Box } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Component } from 'react';
import BgtCDService from '../../service/BgtCDService';
import { connect } from 'react-redux';
import { GridRowModes, GridRowEditStopReasons } from "@mui/x-data-grid-pro";
class BgtCDDatagrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                //{ field: 'defNm', headerName: '분류명', width: 100 },
                { field: 'bgtCd', headerName: '예산코드', width: 140, headerAlign: 'center', },
                { field: 'bgtNm', headerName: '예산과목명', width: 250, headerAlign: 'center', },
            ],
            rows: [],
            dataPath: '초기값그대로야~ 다시 뽑아 ~',

            rowModesModel: {},

        }
    }
    processRowUpdate = (params, event) => {
        console.log('========================processRowUpdate입니다========================')
        console.log(params)
        console.log(params.bgtNm)
        console.log(params.bgtCd)
        console.log(params.dataPath)
        const data = {
            bgtNm: params.bgtNm,
            bgtCd: params.bgtCd,
            dataPath: params.dataPath
        }
         this.props.insertAddRow(data).then(() => {
            // this.setRowModesModel(data, GridRowModes.View);
         })

        console.log('올까?')
        console.log(params.bgtCd)
    };
    setRowModesModel = (data, mode) => {
        // console.log(id)
        console.log('rowModesModel : ' + this.state.rowModesModel)
        this.setState((prevState) => ({
            rowModesModel: {
                ...prevState.rowModesModel,
                [data.bgtCd]: { mode },
            },
        }));
    };
    // pressEnterBtn=(params , event)=>{
    //     //console.log(event.code);
    //      //console.log(params)
    //     console.log(event)
    //     ///console.log(details)
    //     if(event.code==="Enter"){
    //         console.log(event.target.value)
    //         console.log(params.field)
    //         console.log('과연:'+event.target.row)
    //     }
    //     // console.log('pressEnterBtn이 실행되는가 ? 아래는 params값.')
    //     //  console.log('여기서 걍 데이터패스일단 찍어봄'+params.row.dataPath);

    // }

    clickedRow = (params, event) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
        console.dir(params)
        console.log('clickedROw !' + params.row.bgtCd + 'and DataPath ' + params.row.dataPath)
        console.log("isnew ?: " + params.row.isNew);
        const { bgtCd, dataPath } = params.row;
        this.setState({ dataPath: dataPath }, () => console.log("state가 바뀜!!" + this.state.dataPath))
        if (params.row.isNew !== true) {//새로 만들어진 행이 아니라 기존의 행일땐 이대로 간다. 
            if (bgtCd !== null && bgtCd !== undefined) {
                console.log(bgtCd)
                console.log('이게 bgtCd야 : ' + bgtCd);
                this.props.setDetailInfo(bgtCd);
            }
        } else if (params.row.isNew !== true) {//만약 새로 만들어진 행이라면 

        }
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
    // handleRowEditStop = (params, event) => {
    //     console.log('edit끝낫을때!')
    //     console.log(params)
    //     console.log(params.reason) //reason : "rowFocusOut" ,"enterKeyDown","tabKeyDow"
    //     if (params.reason === "rowFocusOut" || params.reason === "enterKeyDown" || params.reason === "tabKeyDown") {
    //         setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.View } });
    //     }
    //     console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
    // };
    // handleRowModesModelChange = (newRowModesModel) => {
    //     this.setState({ rowModesModel: newRowModesModel });
    // };


    render() {
        const { columns, rowModesModel } = this.state;
        const { rows } = this.props;
        const editableColumns = columns.map(column => ({
            ...column,
            editable: column.field !== 'id' ? true : false
        }));

        return (
            <Box style={{ height: 800, borderTop: "3px solid black" }} >
                <DataGridPro
                    treeData
                    getTreeDataPath={(row) => row.dataPath.split(',')}
                    rows={rows}
                    columns={editableColumns}
                    getRowId={(row) => row.bgtCd}
                    headerStyle={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                    onRowClick={this.clickedRow}
                    //onCellKeyDown ={this.pressEnterBtn}
                    defaultGroupingExpansionDepth={7}
                    editMode='row' //row 단위로 편집 모양 잡힘
                    headerAlign="center"
                    processRowUpdate={this.processRowUpdate}
                    rowModesModel={rowModesModel}
                    // onRowEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
                    //     if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                    //       event.defaultMuiPrevented = true;
                    //     }
                    //   }}
                    groupingColDef={{
                        headerName: '분류명', headerAlign: 'center',
                    }}
                    InputProps={{
                        style: {
                            font: 15
                        }
                    }}
                    components={{
                        Footer: () => null
                    }}
                />
            </Box>
        )
    }
};
const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
    //groupcd: state.BgtCDStore || {}

});
export default connect(mapStateToProps, null, null, { forwardRef: true })(BgtCDDatagrid);
