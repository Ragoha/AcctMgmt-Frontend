import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import {
  CustomButtonGridContainer,
  CustomCloseIcon,
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog,
} from "../../common/style/CommonDialogStyle";
import GisuService from "../../../service/GisuService";
import { random, randomId } from "@mui/x-data-grid-generator";
import CustomSwal from '../../common/CustomSwal.js';

class GisuDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { gisu: "", frDt: "", toDt: "" }, //클릭된 열의 cd와 이름
      gisuRows: [],
      data: {
        columns: [
          {
            field: "gisu",
            headerName: "기수",
            editable: true,
            width: 90,
            headerAlign: "center",
            align: "center",
          },
          {
            field: "frDt",
            headerName: "시작일",
            type: "date",
            editable: true,
            width: 188.2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
              return (
                <Grid container alignContent="center" justifyContent="center">
                  {params.row.frDt === ""
                    ? ""
                    : dayjs(params.row.frDt).format("YYYY-MM-DD")}
                </Grid>
              );
            },
          },
          {
            field: "toDt",
            headerName: "종료일",
            type: "date",
            editable: true,
            width: 188.2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
              return (
                <Grid container alignContent="center" justifyContent="center">
                  {params.row.toDt === ""
                    ? ""
                    : dayjs(params.row.toDt).format("YYYY-MM-DD")}
                </Grid>
              );
            },
          },
        ],
        rows: [{ id: 1, gisu: "", frDt: "", toDt: "" }],
      },
    };
  }

  handleUp = () => {
    this.setState({ open: true });
    this.initGisu();
  };

  handleDown = () => {
    this.setState({ open: false });
    this.props.setGisuInfo(this.state.selectedRow);
  };

  initGisu = () => {
    GisuService.findGisuByCoCd({
      accessToken: this.props.accessToken,
      coCd: this.props.coCd,
    }).then((response) => {
      const gisuRows = response.map((row) => ({
        id: randomId(),
        gisu: row.gisu,
        frDt: dayjs(row.frDt).toDate(),
        toDt: dayjs(row.toDt).toDate(),
      }));
      gisuRows.push({
        id: randomId(),
        gisu: "",
        frDt: "",
        toDt: "",
        isNew: true,
      });
      this.setState({ gisuRows: gisuRows });
    });
  };

  insertGisu = (data) => {
    GisuService.insertGisu({
      accessToken: this.props.accessToken,
      coCd: this.props.coCd,
      gisu: data
    }).then(() => {
      this.initGisu();
    });
  }

  // updateGisu = (data) => {
  //   console.log(data);
  //   GisuService.updateGisu({
  //     accessToken: this.props.accessToken,
  //     coCd: this.props.user.coCd,
  //     gisu: data,
  //   }).then(() => {
  //     CustomSwal.showCommonToast("warning", "기수는 삭제 후 등록해주세요.");
  //     this.initGisu();
  //   });
  // }

  handleClickDelete = () => {
    console.log(this.state.selectedRow.gisu);
    CustomSwal.showCommonSwalYn("삭제", "삭제하시겠습니까?", "info", "확인", (confirmed) => {
      if (confirmed) {
    GisuService.deleteGisu({
      accessToken: this.props.accessToken,
      coCd: this.props.coCd,
      gisu: this.state.selectedRow.gisu,
    }).then(() => {
      CustomSwal.showCommonToast("success", "삭제되었습니다.");
      this.initGisu();
    });
  }
})
  };

  handleClickConfirm = () => {
    // console.log(this.state.selectedRow)
    // if(this.state.selectedRow.toDt.includes('')){
    //   console.log("뭐여이건ㅉ")
    //   CustomSwal.showCommonToast("warning", "적용 할 기수를 클릭해주세요.");
    // }else{
    this.handleDown();
  // }
  };

  handleClickRow = (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
  };

  processRowUpdate = (newRow) => {
    console.log(newRow);

    if (newRow.isNew) {
      if (newRow.frDt !== "" && newRow.toDt !== "") {
        console.log("저장");
        this.insertGisu(newRow);
      }
      this.setState({selectedRow : newRow});
      // this.setState((prevState) => ({
      //   rows: prevState.rows.map((row) =>
      //     row.id === newRow.id ? newRow : row
      //   ),
      // }));

      return newRow;
    } else {
      console.log(newRow);
      console.log(this.state.selectedRow);
      const updatedRow = { ...newRow, isNew: false };
      
      
      //   this.setState((prevState) => ({
      //     rows: prevState.rows.map((row) =>
      //       row.id === newRow.id ? updatedRow : row
      //     ),
      //   }));
      // this.updateGisu(updatedRow);
      CustomSwal.showCommonToast("warning", "기수는 수정이 불가능합니다.");
      return this.state.selectedRow;
    }
  };

  render() {
    const { open, data, gisuRows } = this.state;

    return (
      <CustomShortDialog
        open={open}
        PaperProps={{ sx: { width: 500, height: 600 } }}
      >
        <CustomDialogTitle sx={{ fontWeight: "bold" }}>
          회계기수 등록
          <IconButton
            size="small"
            sx={{ ml: 36 }}
            onClick={() => this.setState({ open: false })}
          >
            <CustomCloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <Grid container direction="column" alignItems="flex-end">
            <Button
              sx={{ mt: 1, mb: 1, mr: 2 }}
              variant="outlined"
              onClick={this.handleClickDelete}
            >
              삭 제
            </Button>
          </Grid>

          <Grid style={{ height: 413, width: "100%" }}>
            <CustomShortDataGridContainer container>
              <DataGrid
                sx={{ borderTop: "2px solid #000" }}
                rows={gisuRows}
                columns={data.columns.map((col) => {
                  if (col.field === "frDt" || col.field === "toDt") {
                    return {
                      ...col,
                      valueFormatter: (params) =>
                        dayjs(params.value).format("YYYY-MM-DD"), // 날짜 포맷 지정
                    };
                  }
                  return col;
                })}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true}
                processRowUpdate={this.processRowUpdate}
                onRowClick={this.handleClickRow}
                hideFooter
              />
            </CustomShortDataGridContainer>
          </Grid>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleDown}>
              확 인
            </CustomConfirmButton>

            <Button
              variant="outlined"
              onClick={() => this.setState({ open: false })}
            >
              취 소
            </Button>
          </CustomButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  GisuDialogComponent
);
