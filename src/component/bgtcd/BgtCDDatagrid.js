
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Component } from 'react';
import BgtCDService from '../../service/BgtCDService';

class BgtCDDatagrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'defNm', headerName: '분류명', width: 100 },
                { field: 'bgtCd', headerName: '예산코드', width: 100 },
                { field: 'bgtNm', headerName: '예산과목명', width: 250 },
            ],
            rows: [],
        }
    }
    handleRowAdd = () => {
        console.log('자식의 handleRowAdd')
        const newRows = [
            ...this.props.rows,
            { defNm: "", bgtCd: "", bgtNm: "", isNew: true },
        ];
        this.setState({ rows: newRows });
    };
    clickedRow = (params) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
        console.log('clickedROw !' + params.row.bgtCd)
        const target = params.row.bgtCd;
        if (target !== null && target !== undefined) {
            console.log(target)
            console.log('이게 target이야 : ' + target);
            this.props.setDetailInfo(target);
        }
    }

    render() {
        const { columns } = this.state;
        const { rows } = this.props;
        const editableColumns = columns.map(column => ({
            ...column,
            editable: column.field !== 'id' ? true : false
        }));

        return (
            <Box>
                <Box style={{ height: 480, width: '95%' }} >

                    <DataGridPro
                        treeData
                        getTreeDataPath={(row) => row.dataPath.split(',')}
                        rows={rows}
                        columns={editableColumns}
                        getRowId={(row) => row.bgtCd}
                        headerStyle={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                        onRowClick={this.clickedRow}
                        components={{
                            Footer: () => null
                        }}
                    />
                </Box>
            </Box>
        )
    }
};
export default BgtCDDatagrid;