import Box from "@mui/material/Box";
import React, { Component } from "react";

import { DataGrid, GridCellEditStopReasons, GridRowEditStopReasons } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { createRef } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import PjtDialogComponent from "./dialog/PjtDialogComponent";
import { GridRowModes } from "@mui/x-data-grid";
import { Button } from "@mui/base";
import SearchIcon from "@mui/icons-material/Search";

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgtCd: "",
      mgtCd: "",
      gisu: "",
      rows: [],
      rowModesModel: {},
      selectedRowId: "",
      pjtCd: "",
      pjtNm: "",
    };

    this.pjtRef = createRef();
  }

  SetPjtTextField = async (data) => {
    alert(data);
    await this.setState({ pjtCd: data.pjtCd, pjtNm: data.pjtNm });

    console.log(this.state.rows);
    // console.log("asdf :" + this.state.selectedRowId);
    // await this.setState((prevState) => ({
    //   rows: {
    //     ...prevState.rows,
    //     [this.selectedRowId]: { mgtCd: data.pjtCd },
    //   },
    // }));

    const updatedRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedRowId) {
        return { ...row, mgtCd: data.pjtCd }; // 클릭된 행의 mgtCd 값을 업데이트
      }
      return row;
    });
    await this.setState({ rows: updatedRows }); // rows 상태를 업데이트합니다.

    // Update mgtCd value here
    const updatedRow = updatedRows.find(
      (row) => row.id === this.state.selectedRowId
    );
    if (updatedRow) {
      updatedRow.mgtCd = data.pjtCd;
    }

    await this.setState({ rows: updatedRows });

    // Call processRowUpdate with the updated row
    const processedRow = this.processRowUpdate(updatedRow);
    console.log(processedRow);
  };

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

    // this.setState((prevState) => ({
    //   rowModesModel: {
    //     ...prevState.rowModesModel,
    //     [params.id]: { mode: GridRowModes.View },
    //   },
    // }));
    console.log("=============");
    console.log(params.row);
  };

  handleCellEditStop = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = true;
    }

    // this.setState((prevState) => ({
    //   rowModesModel: {
    //     ...prevState.rowModesModel,
    //     [params.id]: { mode: GridRowModes.View },
    //   },
    // }));
    console.log("=============");
    console.log(params.row);
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
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.sq,
        }));

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
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

  getBgtICFList = async (data) => {
    await this.setState({ bgtCd: data.bgtCd });
    BgtICFService.getBgtICFList({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtCd: this.state.bgtCd,
    }).then(async (response) => {
      console.log(response);
      console.log(response.length);
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.sq,
      }));

      if (response.length !== 0) {
        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          divCd: this.state.divCd,
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
          carrAm1: 0,
          carrAm2: 0,
          carrAm3: 0,
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });
      }
      await this.setState({ rows: rowsWithId });
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
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.sq,
        }));

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
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
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.sq,
        }));

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtCd: this.state.mgtCd,
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
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
    console.log(newRow);
    console.log("================================================");
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

    return updatedRow;
  };

  handleRowModesModelChange = (newRowModesModel) => {
    this.setState({ rowModesModel: newRowModesModel });
  };

  handleRowClick = (params) => {
    this.props.setSelectedRowId(params.row);

    this.setState({ selectedRowId: params.row.id });
  };

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
        // renderCell: (params) => {
        //   console.log(params);
        //   return (
        //     <div
        //       className="d-flex justify-content-between align-items-center"
        //       style={{ cursor: "pointer" }}
        //     >
        //       {params.row.mgtCd}
        //       <SearchIcon
        //         onClick={async () => {
        //           this.pjtRef.current.handleUp();
        //           console.log("asdf");
        //           console.log(params.row.id);
        //           await this.setState((prevState) => ({
        //             rowModesModel: {
        //               ...prevState.rowModesModel,
        //               [params.row.id]: { mode: GridRowModes.Edit },
        //             },
        //           }));
        //         }}
        //       />
        //     </div>
        //   );
        // },
        renderEditCell: (params) => {
          const rowIndex = this.state.rows.findIndex(
            (row) => row.id === params.row.id
          );
          const mgtCd = params.row.mgtCd;
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              {this.state.rows[rowIndex].mgtCd}
              <SearchIcon
                className="mgt-dialog-icon"
                sx={{
                  position: "absolute",
                  right: 0,
                }}
                onClick={async () => {
                  this.pjtRef.current.handleUp();
                  console.log(this.state.rows[rowIndex]);
                  // const updatedRows = this.state.rows.map((row) => {
                  //   if (row.id === params.row.id) {
                  //     return { ...row, mgtCd: 999 }; // 클릭된 행의 mgtCd 값을 업데이트
                  //   }
                  //   return row;
                  // });
                  // await this.setState({ rows: updatedRows }); // rows 상태를 업데이트합니다.
                  // console.log("변경후");
                  // console.log(this.state);
                }}
              />
            </div>
          );
        },
        className: "mgtCd",
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
        <DataGrid
          rows={rows}
          columns={columns}
          // editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={this.handleRowModesModelChange}
          onRowEditStop={this.handleRowEditStop}
          onCellEditStop={this.handleCellEditStop}
          showCellVerticalBorder
          processRowUpdate={this.processRowUpdate}
          onRowClick={this.handleRowClick}
          onCellClick={(e) => {
            if (e.field === "divCd" && e.cellMode === "edit") {
              this.pjtRef.current.handleUp();
            }
          }}
          components={{
            NoRowsOverlay: () => "",
          }}
          sx={{
            borderTop: "3px solid black",
            borderLeft: "2px solid #EAEAEA",
            borderRight: "2px solid #EAEAEA",
            borderBottom: "2px solid #EAEAEA",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell--editing": {
              position: "relative",
            },
          }}
          // hideFooter
          initialState={{
            aggregation: {
              model: {
                carrAm: "SUM",
                사고이월금액: "SUM",
                명시이월금액: "SUM",
                예비이월금액: "SUM",
              },
            },
          }}
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          slotProps={rows}
        />
        <PjtDialogComponent
          ref={this.pjtRef}
          SetPjtTextField={this.SetPjtTextField}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

class CustomFooterStatusComponent extends Component {
  state = {
    carrAmTotal: 0,
  };

  // componentDidUpdate(prevProps) {
  //   console.log(this.props.slotProps);
  //   if (this.props.slotProps !== prevProps.slotProps) {
      
  //     const { slotProps } = this.props;
  //     console.log(slotProps);
  //     const carrAmTotal = slotProps.reduce(
  //       (total, current) => total + (current.carrAm || 0),
  //       0
  //     );
  //     this.setState({ carrAmTotal: carrAmTotal });
  //   }
  // }

  render() {
    const { carrAmTotal } = this.state;
    return (
      <Box sx={{ p: 1, display: "flex" }}>Total carrAm: {carrAmTotal}</Box>
    );
  }
}



export default connect(mapStateToProps, null, null, { forwardRef: true })(
  DataGridComponent
);
