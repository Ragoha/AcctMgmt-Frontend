import { DataGridPro } from "@mui/x-data-grid-pro";
import { Component } from "react";

class BgtCDTreeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                    { field: 'jobTitle', width: 250 },
                    { field: 'path', width: 250 },            
            ],
            rows: [
                { path: '수입', jobTitle: 'CEO', id: 0 },
                { path: '수입,Thomas', jobTitle: 'Head of Sales', id: 1 },
                { path: '수입,Thomas,Robert ', jobTitle: 'Sales Person', id: 2 },
                { path: '지출,Thomas,jenny', jobTitle: 'Sales Person', id: 3 },
                { path: '지출,Thomas,ashtal', jobTitle: 'Sales Person', id: 4 },
                { path: '지출,Thomas,Karen', jobTitle: 'Sales Person', id: 5 },
                { path: '지출,Thomas,bit', jobTitle: 'Sales Person', id: 6 },
            ],
           
        };
    }
    

    render() {
        const { rows, columns } = this.state;
        return (
            <DataGridPro     
                treeData
                getTreeDataPath={(row) => row.path.split(',')}
                rows={rows}
                columns={columns}
                onClick={this.clickedRow}
            />
        );
    }
}

export default BgtCDTreeGrid;