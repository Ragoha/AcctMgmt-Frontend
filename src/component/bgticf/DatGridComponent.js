import Box from "@mui/material/Box";
import React, { Component } from "react";

import { Grid } from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { createRef } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import PjtDialogComponent from "./dialog/PjtDialogComponent";

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divCd: "",
      bgtCd: "",
      mgtCd: "",
      gisu: "",
      rows: [],
      selectedRowId: "",
      selectedRow: [],
      pjtCd: "",
      pjtNm: "",
    };

    this.pjtRef = createRef();
    this.footerRef = createRef();
  }

  initBgtICF = () => {
    console.log("tet");
    console.log(this.state.rows);
    this.footerRef.current.sumCarrAm(this.state.rows);
  }

  SetPjtTextField = async (data) => {
    const { mgtCd, mgtNm } = this.state; // 현재 상태의 값 저장

    const updatedRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedRowId) {
        return { ...row, mgtCd: data.pjtCd, mgtNm: data.pjtNm }; // 클릭된 행의 mgtCd 값을 업데이트
      }
      return row;
    });
    await this.setState({ rows: updatedRows }); // rows 상태를 업데이트합니다.

    const updatedRow = updatedRows.find(
      (row) => row.id === this.state.selectedRowId
    );

    console.log(updatedRow);
    if (updatedRow) {
      updatedRow.mgtCd = data.pjtCd;
      updatedRow.mgtNm = data.pjtNm;
    }

    console.log("set");
    console.log(updatedRow);

    const processedRow = this.processRowUpdate(updatedRow);
  };

  handleRowAdd = () => {
    const newRows = [
      ...this.state.rows,
      { id: randomId(), name: "", age: 0, joinDate: "", role: "", isNew: true },
    ];
    this.setState({ rows: newRows });
  };

  handleCellEditStop = async (params, event) => {
    console.log("asdf");
    // 기존 코드 추가
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = false;
    }

  };

  processRowUpdate = async (newRow) => {
    console.log("cell")
    console.log(newRow)

    // const updatedRows = this.state.rows.map((row) => {
    //   if (row.id === this.state.selectedRowId) {
    //     return { ...row, newRow }; // 클릭된 행의 mgtCd 값을 업데이트
    //   }
    //   return row;
    // });
    // await this.setState({ rows: updatedRows });

    if (newRow.isNew) {
      if (
        newRow.mgtCd !== "" &&
        newRow.mgtNm !== "" &&
        newRow.carrAm1 !== "" &&
        newRow.carrAm2 !== "" &&
        newRow.carrAm3 !== ""
      ) {
        console.log("저장");
        console.log(newRow);
        this.insertBgtICF(newRow);
      }

      this.setState((prevState) => ({
        rows: prevState.rows.map((row) =>
          row.id === newRow.id ? newRow : row
        ),
      }));

      return newRow;
    } else {
      console.log("수정");
      console.log(newRow);

      const updatedRow = { ...newRow, isNew: false };

      this.setState((prevState) => ({
        rows: prevState.rows.map((row) =>
          row.id === newRow.id ? updatedRow : row
        ),
      }));
      this.updateBgtICF(updatedRow);

      

      
      return updatedRow;
    }

    console.log(this.state.rows);
    // const updatedRow = { ...newRow, isNew: false };

    
  };

  handleGetBgtICFList() {
    BgtICFService.getBgtICFList({ accessToken: this.props.accessToken }).then(
      async (response) => {
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.bgtCd,
        }));
        await this.setState({ rows: rowsWithId });
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
          mgtCd: "",
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
          carrAm1: "",
          carrAm2: "",
          carrAm3: "",
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
    await this.setState({ bgtCd: data.bgtCd, divCd: data.divCd });
    BgtICFService.getBgtICFList({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtCd: this.state.bgtCd,
    }).then(async (response) => {
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.sq,
      }));
      if (data.bottomFg == 0) {
        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtNm: "",
          mgtCd: "",
          divCd: data.divCd,
          gisu: data.gisu,
          bottomNm: "",
          carrAm: "",
          carrAm1: "",
          carrAm2: "",
          carrAm3: "",  
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });
      }
      await this.setState({ rows: rowsWithId });
      this.footerRef.current.sumCarrAm(rowsWithId);
    });
  };

  insertBgtICF = (row) => {
    console.log("insert")
    console.log(row);
    if (
      row.mgtCd !== "" &&
      row.mgtNm !== "" &&
      row.carrAm1 !== "" &&
      row.carrAm2 !== "" &&
      row.carrAm3 !== ""
    ) {
      BgtICFService.insertBgtICF({
        accessToken: this.props.accessToken,
        user: this.props.user,
        row: row,
        divCd: this.state.divCd,
      }).then(() => {
        this.props.handleClickSerachButton();
        BgtICFService.getBgtICFList({
          accessToken: this.props.accessToken,
          coCd: this.props.user.coCd,
          bgtCd: this.state.bgtCd,
        }).then(async (response) => {
          const rowsWithId = response.map((row) => ({
            ...row,
            id: row.sq,
          }));

          rowsWithId.push({
            id: randomId(),
            bgtCd: this.state.bgtCd,
            mgtCd: "",
            gisu: this.state.gisu,
            bottomNm: "",
            carrAm: "",
            carrAm1: "",
            carrAm2: "",
            carrAm3: "",
            remDc: "",
            bgtTy: "",
            modifyId: "",
            isNew: true,
          });

          await this.setState({ rows: rowsWithId });
        });
      });
    }
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
          mgtCd: "",
          gisu: this.state.gisu,
          bottomNm: "",
          carrAm: "",
          carrAm1: "",
          carrAm2: "",
          carrAm3: "",
          remDc: "",
          bgtTy: "",
          modifyId: "",
          isNew: true,
        });

        this.setState({ rows: rowsWithId });
      });
    });
  };

  handleRowClick = async (params) => {
    console.log("row");
    console.log(params.row);

    this.props.setSelectedRowId(params.row);

    await this.setState({ selectedRowId: params.row.id, selectedRow: params.row });
    console.log(this.state.selectedRowId);

    console.log(this.state.selectedRow);
  };

  render() {
    const { rows, selectedRowId } = this.state;

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
        field: "mgtNm",
        headerName: "프로젝트",
        headerAlign: "center",
        editable: false,
        renderCell: (params) => {
          return (
            <Grid
              container
              alignContent="center"
              sx={{ width: "100%", height: "100%", outline: "none" }}
              onDoubleClick={() => {
                this.pjtRef.current.handleUp();
              }}
              onKeyDown={(event) => {
                console.log(event.keyCode);
                const allowedKeys = /[a-zA-Z0-9]/;
                if (
                  event.key.match(allowedKeys) &&
                  event.keyCode >= 40 &&
                  event.keyCode <= 90
                ) {
                  this.pjtRef.current.handleUp();
                }
              }}
              tabIndex={0}
            >
              {params.row.mgtNm}
            </Grid>
          );
        },
        cellClassName: "mgtNm",
        flex: 1,
      },
      {
        field: "carrAm",
        headerName: "이월금액",
        headerAlign: "center",
        editable: false,
        ...krAmount,
        renderCell: (params) => {
          return (
            <Grid
              container
              alignContent="center"
              justifyContent="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              {params.row.carrAm1 === "" &&
              params.row.carrAm2 === "" &&
              params.row.carrAm3 === ""
                ? ""
                : (params.row.carrAm1 + params.row.carrAm2 - params.row.carrAm3)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Grid>
          );
        },
        flex: 1,
      },
      {
        field: "carrAm1",
        headerName: "사고이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
        cellClassName: "carrAm1",
        renderCell: (params) => {
          return (
            <Grid
              container
              alignContent="center"
              justifyContent="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              {params.row.carrAm1 === ""
                ? ""
                : params.row.carrAm1
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Grid>
          );
        },
        flex: 1,
      },
      {
        field: "carrAm2",
        headerName: "명시이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
        cellClassName: "carrAm2",
        renderCell: (params) => {
          return (
            <Grid
              container
              alignContent="center"
              justifyContent="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              {params.row.carrAm2 === ""
                ? ""
                : params.row.carrAm2
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Grid>
          );
        },
        flex: 1,
      },
      {
        field: "carrAm3",
        headerName: "예비이월금액",
        headerAlign: "center",
        editable: true,
        ...krAmount,
        cellClassName: "carrAm3",
        renderCell: (params) => {
          return (
            <Grid
              container
              alignContent="center"
              justifyContent="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              {params.row.carrAm3 === ""
                ? ""
                : params.row.carrAm3
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Grid>
          );
        },
        flex: 1,
      },
      {
        field: "remDc",
        headerName: "적요",
        headerAlign: "center",
        editable: true,
        flex: 1,
      },
      {
        field: "bgtTy",
        headerName: "입력구분",
        headerAlign: "center",
        editable: false,
        align: "center",
        flex: 1,
      },
      {
        field: "empName",
        headerName: "작성자",
        headerAlign: "center",
        editable: false,
        align: "center",
        flex: 1,
      },
    ];

    return (
      <>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellEditStop={this.handleCellEditStop}
          showCellVerticalBorder
          showColumnVerticalBorder
          processRowUpdate={this.processRowUpdate}
          onRowClick={this.handleRowClick}
          components={{
            NoRowsOverlay: () => "",
          }}
          sx={{
            height: "calc(100vh - 362px)",
            borderTop: "3px solid black",
            borderLeft: "2px solid #EAEAEA",
            borderRight: "2px solid #EAEAEA",
            borderBottom: "2px solid #EAEAEA",
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
              border: "1px solid #1976d2"
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell--editing": {
              position: "relative",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none !important",
              border: "1px solid #1976d2 !important",
            },
            "& .MuiDataGrid-row:last-child": {
              background: "#FFFCFC",
              color: "black",
            },
            "& .MuiDataGrid-row:hover": {
              background: "#F5F5F5 !important",
            },

            "& .MuiDataGrid-row.Mui-selected": {
              background: "#EDF4FB !important",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row.Mui-selected .mgtNm.MuiDataGrid-cell": {
              background: "#D9E5FF !important",
            },
            "& .MuiDataGrid-row.Mui-selected .carrAm1.MuiDataGrid-cell": {
              background: "#D9E5FF !important",
            },
            "& .MuiDataGrid-row.Mui-selected .carrAm2.MuiDataGrid-cell": {
              background: "#D9E5FF !important",
            },
            "& .MuiDataGrid-row.Mui-selected .carrAm3.MuiDataGrid-cell": {
              background: "#D9E5FF !important",
            },

            "& .MuiDataGrid-row:last-child .mgtNm.MuiDataGrid-cell": {
              background: "#FFEAEA",
            },
            "& .MuiDataGrid-row:last-child .carrAm1.MuiDataGrid-cell": {
              background: "#FFEAEA",
            },
            "& .MuiDataGrid-row:last-child .carrAm2.MuiDataGrid-cell": {
              background: "#FFEAEA",
            },
            "& .MuiDataGrid-row:last-child .carrAm3.MuiDataGrid-cell": {
              background: "#FFEAEA",
            },
          }}
          hideFooter
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
        />
        <CustomFooterStatusComponent
          rows={this.state.rows}
          ref={this.footerRef}
        />
        <PjtDialogComponent
          ref={this.pjtRef}
          SetPjtTextField={this.SetPjtTextField}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

class CustomFooterStatusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sumCarrAm: 0,
      sumCarrAm1: 0,
      sumCarrAm2: 0,
      sumCarrAm3: 0,
    };

    // this.sumCarrAm();
  }

  sumCarrAm = (rows) => {

    let sumCarrAm1 = 0;
    let sumCarrAm2 = 0;
    let sumCarrAm3 = 0;

    rows.map((row) => {
      sumCarrAm1 += row.carrAm1 === "" ? 0 : Number(row.carrAm1);
      sumCarrAm2 += row.carrAm2 === "" ? 0 : Number(row.carrAm2);
      sumCarrAm3 += row.carrAm3 === "" ? 0 : Number(row.carrAm3);
    });

    this.setState({sumCarrAm: sumCarrAm1+sumCarrAm2-sumCarrAm3, sumCarrAm1: sumCarrAm1, sumCarrAm2: sumCarrAm2, sumCarrAm3: sumCarrAm3});
  };

  render() {
    const { rows } = this.props;
    return (
      <Box container sx={{ mt: 2 }}>
        <DataGrid
          showCellVerticalBorder
          hideFooter
          rows={[
            {
              id: "unique-row-key", // 행에 고유한 키 추가
              sumCarrAm: this.state.sumCarrAm
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              sumCarrAm1: this.state.sumCarrAm1
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              sumCarrAm2: this.state.sumCarrAm2
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              sumCarrAm3: this.state.sumCarrAm3
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
          ]}
          columns={[
            {
              field: "unique-column-key1",
              flex: 1,
            },
            {
              field: "sumCarrAm",
              headerName: "이월금액",
              align: "right",
              flex: 1,
            },
            {
              field: "sumCarrAm1",
              headerName: "사고이월금액",
              align: "right",
              flex: 1,
            },
            {
              field: "sumCarrAm2",
              headerName: "명시이월금액",
              align: "right",
              flex: 1,
            },
            {
              field: "sumCarrAm3",
              headerName: "예비이월금액",
              align: "right",
              flex: 1,
            },
            {
              field: "unique-column-key2",
              flex: 1,
            },
            {
              field: "",
              flex: 1,
            },
            {
              field: "",
              flex: 1,
            },
          ]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              display: "none",
            },
            "& .MuiDataGrid-row": {
              background: "#F6FFCC",
            },
          }}
        />
      </Box>
    );
  }
}




export default connect(mapStateToProps, null, null, { forwardRef: true })(
  DataGridComponent
);
