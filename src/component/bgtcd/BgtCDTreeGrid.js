import { DataGridPro } from "@mui/x-data-grid-pro";
import { Component } from "react";

class BgtCDTreeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{ field: 'jobTitle', width: 250 }],
            rows: [
                { path: 'Sarah', jobTitle: 'CEO', id: 0 },
                { path: 'Sarah,Thomas', jobTitle: 'Head of Sales', id: 1 },
                { path: 'Sarah,Thomas,Robert', jobTitle: 'Sales Person', id: 2 },
                { path: 'Sarah,Thomas,Karen', jobTitle: 'Sales Person', id: 3 },
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
            />
        );
    }
}

export default BgtCDTreeGrid;