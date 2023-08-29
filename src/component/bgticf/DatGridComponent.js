import Box from "@mui/material/Box";
import React, { Component } from "react";

import { Checkbox, Grid } from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { createRef } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import SnackBarComponent from "../common/SnackBarComponent";
import PjtDialogComponent from "./dialog/PjtDialogComponent";
import DeptDialogComponent from "./dialog/DeptDialogComponent";

class DataGridComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divCd: this.props.divCd,
      bgtCd: "",
      mgtCd: "",
      bgtFg: "",
      gisu: "",
      groupCd: "",
      rows: [],
      sqList: [],
      selectedRowId: "",
      selectedRow: [],
      selectedRows: [],
      columns: [
        {
          field: "confirmed",
          width: 65,
          headerName: "",
          menu: false,
          disableColumnMenu: true,
          sortable: false,
          filterable: false,
          hideable: false,
          renderHeader: (params) => (
            <Checkbox
              checked={
                this.state.selectedRows.length === this.state.sqList.length
              }
              onClick={async (e) => {
                if (!e.target.checked) {
                  await this.setState({ selectedRows: [] });
                } else {
                  await this.setState({
                    selectedRows: [...this.state.sqList],
                  });
                }
                console.log(this.state.selectedRows);
                this.props.setSelectedRows(this.state.selectedRows);
              }}
            />
          ),
          renderCell: (params) => (
            <Checkbox
              checked={this.state.selectedRows.some(
                (row) => row.sq === params.row.sq
              )}
              onChange={async () => {
                // console.log(params);
                const newSelectedRow = {
                  sq: params.row.sq,
                };

                const isSelected = this.state.selectedRows.some(
                  (row) => row.sq === newSelectedRow.sq
                );

                if (isSelected) {
                  const updatedSelectedRows = this.state.selectedRows.filter(
                    (row) => row.sq !== newSelectedRow.sq
                  );
                  await this.setState({ selectedRows: updatedSelectedRows });
                } else {
                  await this.setState((prevState) => ({
                    selectedRows: [...prevState.selectedRows, newSelectedRow],
                  }));
                }
                this.props.setSelectedRows(this.state.selectedRows);
              }}
            />
          ),
        },
        this.props.config[0][0].sysYn === "2"
          ? {
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
                      this.pjtRef.current.initPjtDialog();
                    }}
                    onKeyDown={(event) => {
                      console.log(event.keyCode);
                      const allowedKeys = /[a-zA-Z0-9]/;
                      if (
                        event.key.match(allowedKeys) &&
                        event.keyCode >= 40 &&
                        event.keyCode <= 90
                      ) {
                        this.pjtRef.current.initPjtDialog();
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
            }
          : {
              field: "mgtNm",
              headerName: "부서",
              headerAlign: "center",
              editable: false,
              renderCell: (params) => {
                return (
                  <Grid
                    container
                    alignContent="center"
                    sx={{ width: "100%", height: "100%", outline: "none" }}
                    onDoubleClick={() => {
                      this.deptRef.current.initDeptDialog();
                    }}
                    onKeyDown={(event) => {
                      console.log(event.keyCode);
                      console.log("여기 아니야?");
                      const allowedKeys = /[a-zA-Z0-9]/;
                      if (
                        event.key.match(allowedKeys) &&
                        event.keyCode >= 40 &&
                        event.keyCode <= 90
                      ) {
                        this.deptRef.current.initDeptDialog();
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
                  : (
                      (params.row.carrAm1 === ""
                        ? 0
                        : parseInt(params.row.carrAm1)) +
                      (params.row.carrAm2 === ""
                        ? 0
                        : parseInt(params.row.carrAm2)) +
                      (params.row.carrAm3 === ""
                        ? 0
                        : parseInt(params.row.carrAm3))
                    )
                      .toLocaleString()
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
      ],
    };
    console.log("---------------");
    // console.log()
    console.log("---------------");
    console.log("---------------");
    this.pjtRef = createRef();
    this.deptRef = createRef();
    this.footerRef = createRef();
    this.snackBarRef = createRef();
  }

  initBgtICF = () => {
    console.log("tet");
    console.log(this.state.rows);
    this.setState({ rows: [] });
    this.footerRef.current.sumCarrAm([]);
  };

  SetMgtTextField = async (data) => {
    const { mgtCd, mgtNm } = this.state; // 현재 상태의 값 저장

    console.log("zzzzzzzzzzzzzzzzzzzzzzzzz");
    console.log(data);
    const updatedRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedRowId) {
        return { ...row, mgtCd: data.mgtCd, mgtNm: data.mgtNm }; // 클릭된 행의 mgtCd 값을 업데이트
      }
      return row;
    });
    await this.setState({ rows: updatedRows }); // rows 상태를 업데이트합니다.

    const updatedRow = updatedRows.find(
      (row) => row.id === this.state.selectedRowId
    );

    console.log(updatedRow);
    if (updatedRow) {
      updatedRow.mgtCd = data.mgtCd;
      updatedRow.mgtNm = data.mgtNm;
    }

    console.log("set");
    console.log(updatedRow);

    const processedRow = this.processRowUpdate(updatedRow);
  };

  setDeptTextField = async (data) => {
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
      updatedRow.mgtCd = data.deptCd;
      updatedRow.mgtNm = data.deptNm;
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

  processRowUpdate = (newRow) => {
    if (newRow.isNew) {
      const updatedRow = { ...newRow };

      console.log(newRow.carrAm1.length);

      // if (
      //   !/^[0-9]+$/.test(updatedRow.carrAm1) ||
      //   updatedRow.carrAm1.length > 11
      // ) {
      //   updatedRow.carrAm1 = "";
      //   this.snackBarRef.current.handleUp(
      //     "warning",
      //     "올바르지 않은 입력입니다."
      //   );
      // }
      if (
        (updatedRow.carrAm1 !== "" && !/^[0-9]+$/.test(updatedRow.carrAm1)) ||
        updatedRow.carrAm1.length > 10
      ) {
        updatedRow.carrAm1 = "";
        this.snackBarRef.current.handleUp(
          "warning",
          "올바르지 않은 입력입니다."
        );
      }
      if (
        (updatedRow.carrAm2 !== "" && !/^[0-9]+$/.test(updatedRow.carrAm1)) ||
        updatedRow.carrAm2.length > 10
      ) {
        updatedRow.carrAm2 = "";
        this.snackBarRef.current.handleUp(
          "warning",
          "올바르지 않은 입력입니다."
        );
      }
      if (
        (updatedRow.carrAm3 !== "" && !/^[0-9]+$/.test(updatedRow.carrAm1)) ||
        updatedRow.carrAm3.length > 10
      ) {
        updatedRow.carrAm3 = "";
        this.snackBarRef.current.handleUp(
          "warning",
          "올바르지 않은 입력입니다."
        );
      }

      // if (!/^[0-9]+$/.test(updatedRow.carrAm2)) {
      //   updatedRow.carrAm2 = "";
      //   this.snackBarRef.current.handleUp(
      //     "warning",
      //     "올바르지않은 입력입니다."
      //   );
      // }

      // if (!/^[0-9]+$/.test(updatedRow.carrAm3)) {
      //   updatedRow.carrAm3 = "";
      //   this.snackBarRef.current.handleUp(
      //     "warning",
      //     "올바르지않은 입력입니다."
      //   );
      // }

      if (
        updatedRow.mgtCd !== "" &&
        updatedRow.mgtNm !== "" &&
        updatedRow.carrAm1 !== "" &&
        updatedRow.carrAm2 !== "" &&
        updatedRow.carrAm3 !== ""
        // && updatedRow.remDc !== ""
      ) {
        console.log("저장");
        console.log(updatedRow);
        this.insertBgtICF(updatedRow);
      }

      this.setState((prevState) => ({
        rows: prevState.rows.map((row) =>
          row.id === updatedRow.id ? updatedRow : row
        ),
      }));

      return updatedRow;
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

  handleDeleteClick = (data) => {
    console.log("================");
    console.log(data);
    console.log(this.state);
    console.log(data.sqList.length);

    if (this.state.selectedRows.length >= 1) {
      const sqList = this.state.selectedRows.map((sq) => sq.sq).join(",");

      console.log(sqList);

      BgtICFService.deleteBgtICF({
        accessToken: this.props.accessToken,
        coCd: this.props.user.coCd,
        bgtCd: data.bgtCd,
        sq: data.sq,
        sqList: sqList,
      }).then(() => {
        this.props.handleClickSerachButton();
        BgtICFService.getBgtICFList({
          accessToken: this.props.accessToken,
          coCd: this.props.user.coCd,
          bgtCd: this.state.bgtCd,
          divCd: this.state.divCd,
          gisu: this.state.gisu,
          bgtFg: this.state.bgtFg,
        }).then(async (response) => {
          const rowsWithId = response.map((row) => ({
            ...row,
            id: row.sq,
          }));

          rowsWithId.push({
            id: randomId(),
            bgtCd: this.state.bgtCd,
            mgtNm: "",
            mgtCd: "",
            bgtFg: this.state.bgtFg,
            divCd: data.divCd,
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
          this.footerRef.current.sumCarrAm(rowsWithId);
          this.snackBarRef.current.handleUp("success", "삭제되었습니다.");
        });
      });
    } else {
      BgtICFService.deleteBgtICF({
        accessToken: this.props.accessToken,
        coCd: this.props.user.coCd,
        bgtCd: data.bgtCd,
        sq: data.sq,
        sqList: this.state.selectedRow.sq,
      }).then(() => {
        this.props.handleClickSerachButton();
        BgtICFService.getBgtICFList({
          accessToken: this.props.accessToken,
          coCd: this.props.user.coCd,
          bgtCd: this.state.bgtCd,
          divCd: this.state.divCd,
          gisu: this.state.gisu,
          bgtFg: this.state.bgtFg,
        }).then(async (response) => {
          const rowsWithId = response.map((row) => ({
            ...row,
            id: row.sq,
          }));

          rowsWithId.push({
            id: randomId(),
            bgtCd: this.state.bgtCd,
            mgtNm: "",
            mgtCd: "",
            bgtFg: this.state.bgtFg,
            divCd: data.divCd,
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
          this.footerRef.current.sumCarrAm(rowsWithId);
          this.snackBarRef.current.handleUp("success", "삭제되었습니다.");
        });
      });
    }
  };

  getBgtICFList = async (data, parent) => {
    console.log(data);
    console.log(parent);
    console.log("==============");
    await this.setState({
      bgtCd: data.bgtCd,
      divCd: parent.divCd,
      gisu: data.gisu,
      sqList: [],
      bgtFg: parent.bgtFg,
    });
    console.log(this.state);
    BgtICFService.getBgtICFList({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      divCd: this.state.divCd,
      bgtCd: this.state.bgtCd,
      gisu: this.state.gisu,
      groupCd: this.state.groupCd,
      bgtFg: parent.bgtFg,
    }).then(async (response) => {
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.sq,
      }));

      const sqList = response.map((row) => ({
        sq: row.sq,
      }));
      if (data.bottomFg == 0) {
        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtNm: "",
          mgtCd: "",
          bgtFg: this.state.bgtFg,
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
      await this.setState({
        rows: rowsWithId,
        gisu: data.gisu,
        sqList: sqList,
      });
      this.footerRef.current.sumCarrAm(rowsWithId);
    });
  };

  insertBgtICF = (row) => {
    console.log("insert");
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
        bgtFg: this.state.bgtFg,
        // gisu: this.state.gisu,
      }).then(() => {
        this.props.handleClickSerachButton();
        BgtICFService.getBgtICFList({
          accessToken: this.props.accessToken,
          coCd: this.props.user.coCd,
          bgtCd: this.state.bgtCd,
          divCd: this.state.divCd,
          gisu: this.state.gisu,
          bgtFg: this.state.bgtFg,
        }).then(async (response) => {
          const rowsWithId = response.map((row) => ({
            ...row,
            id: row.sq,
          }));

          rowsWithId.push({
            id: randomId(),
            bgtCd: this.state.bgtCd,
            mgtNm: "",
            mgtCd: "",
            bgtFg: this.state.bgtFg,
            divCd: this.state.divCd,
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
          this.footerRef.current.sumCarrAm(rowsWithId);
          this.snackBarRef.current.handleUp("success", "저장되었습니다.");
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
        divCd: this.state.divCd,
        gisu: this.state.gisu,
        bgtFg: this.state.bgtFg,
      }).then(async (response) => {
        const rowsWithId = response.map((row) => ({
          ...row,
          id: row.sq,
        }));

        rowsWithId.push({
          id: randomId(),
          bgtCd: this.state.bgtCd,
          mgtNm: "",
          mgtCd: "",
          bgtFg: this.state.bgtFg,
          divCd: this.state.divCd,
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
        this.footerRef.current.sumCarrAm(rowsWithId);
      });
    });
    this.snackBarRef.current.handleUp("success", "수정되었습니다.");
  };

  handleRowClick = async (params) => {
    this.props.setSelectedRowId(params.row);

    await this.setState({
      selectedRowId: params.row.id,
      selectedRow: params.row,
    });
    console.log(this.state.selectedRow);
  };

  componentDidMount() {
    console.log(this.props.config);

    const bgtFgArray = this.props.config
      .filter((sys) => sys.sysCd === "1")
      .map((sys) => sys.sysYn);
    const bgtFgString = bgtFgArray.length > 0 ? bgtFgArray[0] : "";

    this.setState({ bgtFg: bgtFgString }, () => {
      console.log(this.state);

      if (bgtFgString === "2") {
        const updatedColumns = this.state.columns.map((column) => {
          if (column.field === "mgtNm") {
            return {
              ...column, // 기존 열 속성 복사
              cellClassName: "mgtNm",
              editable: false,
              field: "mgtNm",
              flex: 1,
              headerAlign: "center",
              headerName: "부서",
            };
          }
          return column; // 기존 열 유지
        });

        this.setState({ columns: updatedColumns }, () => {
          console.log(this.state);
          console.log("==========");
          console.log("==========");
          console.log("==========");
          console.log("==========");
        });
      }
    });
  }

  render() {
    const { rows, selectedRows, selectedRowId, columns } = this.state;

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
            height: "calc(100vh - 367px)",
            borderTop: "3px solid black",
            borderLeft: "2px solid #EAEAEA",
            borderRight: "2px solid #EAEAEA",
            borderBottom: "2px solid #EAEAEA",
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
              border: "1px solid #1976d2",
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
            "& .MuiDataGrid-row.MuiDataGrid-row--lastVisible:last-child .MuiCheckbox-root":
              {
                display: "none",
              },

            "& .MuiDataGrid-row:last-child": {
              background: "#FFF5F5",
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
          SetMgtTextField={this.SetMgtTextField}
        />
        <DeptDialogComponent
          ref={this.deptRef}
          SetMgtTextField={this.SetMgtTextField}
        />

        <SnackBarComponent ref={this.snackBarRef} />
      </>
    );
  }
}

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

    this.setState({
      sumCarrAm: sumCarrAm1 + sumCarrAm2 + sumCarrAm3,
      sumCarrAm1: sumCarrAm1,
      sumCarrAm2: sumCarrAm2,
      sumCarrAm3: sumCarrAm3,
    });
  };

  render() {
    return (
      <Box
        container
        sx={{
          mt: 2,
          // height: 120,
          border: "none",
        }}
      >
        <DataGrid
          showCellVerticalBorder
          hideFooter
          getRowId={(row) => row.id}
          rows={[
            {
              id: 0,
              text: "합계",
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
              field: "emp0",
              width: 65,
            },
            {
              field: "text",
              flex: 1,
              align: "right",
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
              field: "emp1",
              flex: 1,
            },
            {
              field: "emp2",
              flex: 1,
            },
            {
              field: "emp3",
              flex: 1,
            },
          ]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              display: "none",
            },
            "& .MuiDataGrid-row": {
              background: "#F6FFCC",
              fontWeight: "bold",
            },

            "& .MuiDataGrid-cellContent:first-child": {
              float: "right",
            },
          }}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
  config: state.config.configData,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  DataGridComponent
);
