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
import PjtDialogComponent from "./dialog/PjtDialogComponent";
import { createRef } from "react";
import { Button } from "@mui/base";
import { FormControlLabel, IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgtCd: "",
      mgtCd: "",
      rows: [],
      rowModesModel: {},
      selectedRowId: "",
    };

    this.pjtRef = createRef();
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

    this.setState((prevState) => ({
      rowModesModel: {
        ...prevState.rowModesModel,
        [params.id]: { mode: GridRowModes.View },
      },
    }));
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
    BgtICFService.getBgtICFList({ accessToken: this.props.accessToken }).then(
      (response) => {
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.bgtCd,
        }));
        this.setState({ rows: rowsWithId });
      }
    );
  }

  handleDeleteClick = (data) => () => {
    BgtICFService.deleteBgtICF({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtCd: data.bgtCd,
      sq: data.sq,
    }).then(() => {
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

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          bottomNm: "",
          carrAm: 0,
          carrAm1: 0,
          carrAm2: 0,
          carrAm3: 0,
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });

        this.setState({ rows: rowsWithId });
      });
    });
  }

  getBgtICFList = async (data) => {
    console.log(data);
    await this.setState({ bgtCd: data.bgtCd });
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

      rowsWithId.push({
        id: randomId(),
        bgtCd: this.state.bgtCd,
        divCd: this.state.divCd,
        bottomNm: "",
        carrAm: 0,
        carrAm1: 0,
        carrAm2: 0,
        carrAm3: 0,
        remDc: "",
        bgtTy: "",
        modifyId: "",
        isNew: true,
      });

      this.setState({ rows: rowsWithId });
    });
  };

  insertBgtICF = (row) => {
    BgtICFService.insertBgtICF({
      accessToken: this.props.accessToken,
      user: this.props.user,
      row: row,
    }).then(() => {
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

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          bottomNm: "",
          carrAm: 0,
          carrAm1: 0,
          carrAm2: 0,
          carrAm3: 0,
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });

        this.setState({ rows: rowsWithId });
      });
    });
  }

  updateBgtICF = (row) => {
    BgtICFService.updateBgtICF({
      accessToken: this.props.accessToken,
      user: this.props.user,
      row: row,
    }).then(() => {
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

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          bottomNm: "",
          carrAm: 0,
          carrAm1: 0,
          carrAm2: 0,
          carrAm3: 0,
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });

        this.setState({ rows: rowsWithId });
      });
    });
  };

  processRowUpdate = (newRow) => {
    console.log(newRow.isNew);
    console.log(newRow.isNew);
    console.log(newRow.isNew);

    if (newRow.isNew) {
      this.insertBgtICF(newRow);
    } else {
      const updatedRow = { ...newRow, isNew: false };

      this.setState((prevState) => ({
        rows: prevState.rows.map((row) =>
          row.id === newRow.id ? updatedRow : row
        ),
      }));
      this.updateBgtICF(updatedRow);
    }

    const updatedRow = { ...newRow, isNew: false };

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
    console.log("asdf11");
    console.log(newRowModesModel);
    this.setState({ rowModesModel: newRowModesModel });
  };

  handleRowClick = (params) => {
    console.log(params);
    this.props.setSelectedRowId(params.row);
  };

  test = () => {
    console.log("테스트입니다.");
  }

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
        field: "mgtCd",
        headerName: "프로젝트",
        headerAlign: "center",
        editable: true,
        // renderCell: (params) =>{
        //   console.log(params);
        //   return (
        //     <div
        //       className="d-flex justify-content-between align-items-center"
        //       style={{ cursor: "pointer" }}
        //     >
        //       {params.row.name}
        //       <MatEdit index={params.row.id} />
        //     </div>
        //   );
        // },
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
          height: "100%",
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
          onRowEditStop={this.handleRowEditStop}
          showCellVerticalBorder
          processRowUpdate={this.processRowUpdate}
          onRowClick={this.handleRowClick}
          onCellClick={(e) => {
            if (e.field == "divCd" && e.cellMode == "edit") {
              this.pjtRef.current.handleUp();
            }
          }}
          components={{
            NoRowsOverlay: () => "",
          }}
          sx={{ borderTop: "3px solid black" }}
          hideFooter
        />
        <PjtDialogComponent ref={this.pjtRef} />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});


export default connect(mapStateToProps, null, null, {forwardRef: true}) (DataGridComponent);


