
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Component } from 'react';

class BgtCDDatagrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'defNm', headerName: '분류명', width: 250 },
                { field: 'bgtCd', headerName: '예산코드', width: 100 },
                { field: 'bgtNm', headerName: '예산과목명', width: 250 },
            ],
            rows: []
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

                    <DataGrid
                        treeData
                        rows={rows}
                        columns={editableColumns}
                        getRowId={(row) => row.bgtCd}
                        headerStyle={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                        onRowClick={this.props.clickedRow}
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