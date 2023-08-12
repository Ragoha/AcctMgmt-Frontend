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
            bgtCd: null,
            isNew: false,
        }
    }
    //[230810] 업데이트 끝내고 isNew 값 바꿔야함
    // changeIsNew = () => {
    //     console.log('changeIsNew에 도착했음')

    // }
    processRowUpdate = (newRow) => {
        console.log('========================processRowUpdate입니다========================')
        const data = {
            bgtNm: newRow.bgtNm,
            bgtCd: newRow.bgtCd,
            dataPath: newRow.dataPath
        }
        this.props.insertAddRow(data);
        const updatedRow = { ...newRow, isNew: false };
        this.setState((prevState) => ({
            rows: prevState.rows.map((row) =>
                row.divFg === newRow.divFg ? updatedRow : row
            ),
        }), () => console.log(this.state.rows));
        return updatedRow;
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
    clickedRow = (params) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
        console.dir(params)
        console.log('clickedROw !' + params.row.bgtCd + 'and DataPath ' + params.row.dataPath)
        console.log('isNew까지 체크해볼게 : ' + params.row.isNew)
        console.log("isnew ?: " + params.row.isNew);
        const { bgtCd, dataPath, isNew, bgtNm } = params.row;
        this.setState({ dataPath: dataPath })
        if (isNew !== true) {//새로 만들어진 행이 아니라 기존의 행일땐 이대로 간다. 
                console.log(bgtCd)
                console.log('이게 bgtCd야 : ' + bgtCd);
                this.props.setDetailInfo(bgtCd);
        } else if (isNew == true) {
            console.log('이건 새로 만들어진 로우다');
            this.setState({
                bgtCd: params.row.bgtCd,
                isNew: params.row.isNew,
                dataPath: params.row.dataPath,
                bgtNm: params.row.bgtNm,
            });
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
                    processRowUpdate={this.processRowUpdate}
                    onProcessRowUpdateError={(error) => { }}
                    defaultGroupingExpansionDepth={7}
                    editMode='row' //row 단위로 편집 모양 잡힘
                    headerAlign="center"
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
