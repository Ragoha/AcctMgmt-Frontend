
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
                //{ field: 'id', headerName : 'id' , width:100},
                { field: 'bgt_CD', headerName: '예산코드', width: 100 },
                { field: 'bgt_NM', headerName: '예산과목명', width: 250 },
                { field: 'big_FG', headerName: '구매구분d', width: 250 }
            ],
            rows:[]
          }
         
    }
    clickedRow = (params)=>{
        console.log('하이')
        console.log(params.row.bgt_CD);
        BudgetRegService.getDetailInfo(params.row.bgt_CD)
        .then(response=> {
            console.log('hi - - - ')
            console.dir(response)
        }).catch(error => {
            console.error("Error fetching data:", error);
        });

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
                <Box style={{ height: 500, width: '100%' }} >
                <DataGrid
                        rows={rows}
                        columns={editableColumns}
                        getRowId={(row) => row.bgt_CD}
                        headerStyle={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                        onRowClick={this.clickedRow}
                    />
                </Box>
            </Box>
        )
    }
};
export default Budget_DataGrid;