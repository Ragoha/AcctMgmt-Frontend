
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Component } from 'react';
import Detail_Info from './Detail_Info';
import UserService from '../../service/UserService';
import BudgetRegService from '../../service/BudgetRegService';

class Budget_DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'bgtCd', headerName: '예산코드', width: 100 },
                { field: 'bgtNm', headerName: '예산과목명', width: 250 },
                { field: 'bizFg', headerName: '구매구분', width: 250 }
            ],
            rows:[]
          }
         
    }

    render() { 
        const {columns } = this.state;
        const {rows} = this.props;
        const editableColumns = columns.map(column => ({
            ...column,
            editable: column.field !== 'id' ? true : false
        }));
    
        return (
            <Box>
                <Box style={{ height: 480, width: '95%' }} >

                <DataGrid
                        rows={rows}
                        columns={editableColumns}
                        getRowId={(row) => row.bgtCd}
                        headerStyle={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                        onRowClick={this.props.clickedRow}
                    />
                </Box>
            </Box>
        )
    }
};
export default Budget_DataGrid;