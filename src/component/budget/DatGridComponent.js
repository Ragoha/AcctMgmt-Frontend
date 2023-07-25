import React, { Component } from "react";
import Box from "@mui/material/Box";

import {
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid-pro";
import {
  randomId,
} from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";
import BgtICFService from "../../service/BgtICFService";

const newRow = {
  coCd: 'ABC', 
  gisu: 123,
  sq: 1,
  divCd: 'XYZ',
  deptCd: 'DEF',
  bgtCd: "BGT001",
  bgtCnt: "1",
  bgtFg: "FG001",
  bgtTy: "A",
  bottomNm: "BT001",
  carrAm: 1000,
  carrAm1: 2000,
  carrAm2: 1500,
  carrAm3: 1800,
  empCd: "EMP001",
  gisu: 123,
  id: 1,
  insertDt: 1689834394000,
  insertId: "127.0.0.1",
  insertIp: null,
  mgtCd: "MGT001",
  modifyDt: 1689834394000,
  modifyId: "ID001",
  modifyIp: "127.0.0.1",
  remDc:  "Dummy description 1",
  sq: 1
}

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
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
    console.log("aaaaaaaa");
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

  handleGetBgtICFList() {
    BgtICFService.getBgtICFList().then((response) => {
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.sq,
      }));
      this.setState({ rows: rowsWithId });
    });
  }

  handleDeleteClick = (id) => () => {
    BgtICFService.deleteBgtICF(id).then(
      () => {
        this.handleGetBgtICFList();
      });
    
  };

  processRowUpdate = (newRow) => {
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
    console.log(params.row);
    this.props.setSelectedRowId(params.row.id);
  };

  componentDidMount() {}

  render() {
    const { rows, rowModesModel, selectedRowId } = this.state;

    const currencyFormatter = new Intl.NumberFormat("ko-KR", {
      /* style: "currency", currency: "KRW", */
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
        field: "bottomNm",
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
          showCellVerticalBorder
          processRowUpdate={this.processRowUpdate}
          onRowClick={this.handleRowClick}
          components={{
            NoRowsOverlay: () => "",
          }}
          hideFooter
        />
      </Box>
    );
  }
}

export default DataGridComponent;