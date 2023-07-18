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

const roles = ["직접입력", "직접입력"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    bgtTy: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    bgtTy: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    bgtTy: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    bgtTy: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    bgtTy: randomRole(),
  },
];

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: initialRows,
      rowModesModel: {},
      selectedRowId: "",
    };
  }

  handleRowAdd = () => {
    console.log("Aaa");
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

  handleRowClick = (params) => {
    this.props.setSelectedRowId(params.row.id);
  };

  render() {
    const { rows, rowModesModel, selectedRowId } = this.state;
    
    const currencyFormatter = new Intl.NumberFormat("ko-KR", {
      // style: "currency",
      // currency: "KRW0",
    });

    const krAmount = {
      type: "number",
      width: 130,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      cellClassName: "font-tabular-nums",
    };

    const columns = [
      {
        field: "divCd",
        headerName: "사업",
        headerAlign: "center",
        editable: true,
      },
      {
        field: "bottomCd",
        headerName: "하위사업",
        headerAlign: "center",
        editable: true,
      },
      {
        field: "carrAm",
        headerName: "이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
      },
      {
        field: "carrAm1",
        headerName: "사고이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
      },
      {
        field: "carrAm2",
        headerName: "명시이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
      },
      {
        field: "carrAm3",
        headerName: "예비이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
      },
      {
        field: "remDc",
        headerName: "적요",
        headerAlign: "center",
        editable: true,
      },
      {
        field: "bgtTy",
        headerName: "입력구분",
        headerAlign: "center",
        editable: true,
      },
      {
        field: "insertId",
        headerName: "작성자",
        headerAlign: "center",
        editable: true,
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
        {selectedRowId}
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={this.handleRowModesModelChange}
          onRowEditStop={this.handleRowEditStopop}
          processRowUpdate={this.processRowUpdate}
          onRowClick={this.handleRowClick}
        />
      </Box>
    );
  }
}

export default DataGridComponent;