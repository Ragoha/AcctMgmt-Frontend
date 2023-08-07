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
import { forwardRef } from "react";
import { connect } from "react-redux";

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgtCd: "",
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
    BgtICFService.getBgtICFList({accessToken: this.props.accessToken}).then((response) => {
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.bgtCd,
      }));
      this.setState({ rows: rowsWithId });
    });
  }

  handleDeleteClick = (data) => () => {
    BgtICFService.deleteBgtICF({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtCd: data.bgtCd,
      sq: data.sq
    }).then(() => {
      this.handleGetBgtICFList();
    });
    
  };

  getBgtICFList = async (data) => {
    console.log(data);
    await this.setState({ bgtCd : data.bgtCd});
    BgtICFService.getBgtICFList({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtCd: this.state.bgtCd
    }).then(
      (response) => {
        console.log(this.state.rows);
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.sq,
        }));
        this.setState({ rows: rowsWithId });
      }
    );
  }

  updateBgtICF = (row) => {
    BgtICFService.updateBgtICF({
      accessToken: this.props.accessToken,
      user: this.props.user,
      row: row,
    })
      .then(() => {
        this.props.handleClickSerachButton();
        BgtICFService.getBgtICFList({
          accessToken: this.props.accessToken,
          coCd: this.props.user.coCd,
          bgtCd: this.state.bgtCd,
        }).then((response) => {
          console.log(this.state.rows);
          const rowsWithId = response.map((row) => ({
            ...row,
            id: row.sq,
          }));
          this.setState({ rows: rowsWithId });
        });
      }
      );
  }

  processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };

    this.setState((prevState) => ({
      rows: prevState.rows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      ),
    }));

    this.updateBgtICF(updatedRow);
    // BgtICFService.deleteBgtICF({
    //   accessToken: this.props.accessToken,
    //   coCd: this.props.user.coCd,
    //   bgtCd: "B002",
    //   sq: "1",
    // }).then(() => {
    //   this.handleGetBgtICFList();
    // });

    

    return updatedRow;
  };

  

  handleRowModesModelChange = (newRowModesModel) => {
    console.log("asdf11")
    console.log(newRowModesModel);
    this.setState({ rowModesModel: newRowModesModel });
  };

  handleRowClick = (params) => {
    this.props.setSelectedRowId(params.row);
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
          sx={{ borderTop: "3px solid black" }}
          hideFooter
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});


export default connect(mapStateToProps, null, null, {forwardRef: true}) (DataGridComponent);


