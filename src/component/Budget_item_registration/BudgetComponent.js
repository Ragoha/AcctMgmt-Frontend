import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  ];

class BudgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: initialRows,
      rowModesModel: {},
    };
    this.setRows = this.setRows.bind(this);
    this.setRowModesModel = this.setRowModesModel.bind(this);
  }

  setRows(newRows) {
    this.setState({ rows: newRows });
  }

  setRowModesModel(newModel) {
    this.setState({ rowModesModel: newModel });
  }
   handleClick = () => {
    const id = randomId();
    const newRow = { id, name: "New Record", age: 0, joinDate: new Date(), role: "Market", isNew: true };
  
    this.setState(prevState => ({
      rows: [...prevState.rows, newRow],
      rowModesModel: {
        ...prevState.rowModesModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }
    }));
  };
  render() {
    const { rows, rowModesModel } = this.state;
    const EditToolbar = ({ setRows, setRowModesModel }) => {
      return (
        <GridToolbarContainer>
          <Button color="secondary" startIcon={<AddIcon />} onClick={this.handleClick}>
            Add recorddd
          </Button>
        </GridToolbarContainer>
      );
    };

    const columns = [
        { field: "name", headerName: "Name", width: 180, editable: true },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          width: 80,
          align: "left",
          headerAlign: "left",
          editable: true,
        },
        {
          field: "joinDate",
          headerName: "Join date",
          type: "date",
          width: 180,
          editable: true,
        },
        {
          field: "role",
          headerName: "Department",
          width: 220,
          editable: true,
          type: "singleSelect",
          valueOptions: ["Market", "Finance", "Development"],
        },
        
      ];

    return (
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={this.handleRowModesModelChange}
          onRowEditStop={this.handleRowEditStopop}
          processRowUpdate={this.processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows: this.setRows, setRowModesModel: this.setRowModesModel },
          }}
        />
      </Box>
    );
  }
}

export default BudgetComponent;