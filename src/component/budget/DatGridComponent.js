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
  DataGridPro,
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
class EditToolbar extends Component {

  constructor(props) {
    super(props);
  }
  
  handleClick = () => {
    this.props.addRow();
  };

  render() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={this.handleClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
}

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: initialRows,
      rowModesModel: {},
    };
  }

  addRow = () => {
const newRows = [
  ...this.state.rows,
  { id: randomId(), name: "", age: 0, joinDate: "", role: "", isNew: true },
];
    this.setState({ rows: newRows });
  };

  handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  handleEditClick = (id) => () => {
    this.setState((prevState) => ({
      rowModesModel: {
        ...prevState.rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      },
    }));
  };

  handleSaveClick = (id) => () => {
    this.setState((prevState) => ({
      rowModesModel: {
        ...prevState.rowModesModel,
        [id]: { mode: GridRowModes.View },
      },
    }));
  };

  handleDeleteClick = (id) => () => {
    this.setState((prevState) => ({
      rows: prevState.rows.filter((row) => row.id !== id),
    }));
  };

  handleCancelClick = (id) => () => {
    this.setState((prevState) => {
      const { rows, rowModesModel } = prevState;
      const updatedRowModesModel = {
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      };

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        return {
          rows: rows.filter((row) => row.id !== id),
          rowModesModel: updatedRowModesModel,
        };
      }

      return {
        rowModesModel: updatedRowModesModel,
      };
    });
  };

  processRowUpdate = (newRow) => {
    const { rows } = this.state;
    const updatedRow = { ...newRow, isNew: false };
    this.setState((prevState) => ({
      rows: prevState.rows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      ),
    }));
    return updatedRow;
  };

  handleRowModesModelChange = (newRowModesModel) => {
    this.setState({ rowModesModel: newRowModesModel });
  };

  render() {
    const { rows, rowModesModel, addRow } = this.state;
    

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
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={this.handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={this.handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={this.handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={this.handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
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
            toolbar: { addRow : this.addRow },
          }}
        />
      </Box>
    );
  }
}

export default DataGridComponent;