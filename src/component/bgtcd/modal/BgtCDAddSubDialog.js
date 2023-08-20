import { Button, Grid, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtCDService from "../../../service/BgtCDService";
import BgtGrService from "../../../service/BgtGrService";
import {
  CustomButtonGridContainer,
  CustomCloseIcon,
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog
} from "../../common/style/CommonDialogStyle";
class BgtCDADDSubDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        {
          field: "bgtGrCd",
          headerName: "예산과목그룹코드",
          flex: 1,
          headerAlign: "center",
          editable: true,
        },
        {
          field: "bgtGrNm",
          headerName: "예산과목그룹명",
          flex: 1,
          headerAlign: "center",
          editable: true,
        },
      ],
      bgtGrRows: [],
      selectedRow: [],
    };
  }

  initBgtGr = () => {
    BgtGrService.findBgtGrByCoCd({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
    }).then((response) => {
      const bgtGrRows = response.map((row) => ({
        id: randomId(),
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));
      bgtGrRows.push({
        id: randomId(),
        bgtGrCd: "",
        bgtGrNm: "",
        isNew: true,
      });
      this.setState({ bgtGrRows: bgtGrRows });
    });
  };

  clickedRow = (params) => {
    const { bgtGrCd } = params.row;
    this.setState({ bgtGrCd: bgtGrCd }, () => console.log(this.state.bgtGrCd));
  };
  processRowUpdate = (newRow) => {
    console.log(newRow);

    if (newRow.isNew) {
      if (newRow.bgtGrCd !== "" && newRow.bgtGrNm !== "") {
        console.log("저장");
        this.insertBgtGr(newRow);
      }

      // this.setState((prevState) => ({
      //   rows: prevState.rows.map((row) =>
      //     row.id === newRow.id ? newRow : row
      //   ),
      // }));

      return newRow;
    } else {
      console.log("수정");
      const updatedRow = { ...newRow, isNew: false };

      //   this.setState((prevState) => ({
      //     rows: prevState.rows.map((row) =>
      //       row.id === newRow.id ? updatedRow : row
      //     ),
      //   }));
      this.updateBgtGr(updatedRow);

      return updatedRow;
    }
  };
  insertBgtGr = (data) => {
    BgtGrService.insertBgtGr({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtGr: data,
    }).then(() => {
      this.initBgtGr();
    });
  }
  updateBgtGr = (data) => {
    BgtGrService.updateBgtGr({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtGr: data,
    }).then(() => {
      this.initBgtGr();
    });
  };

  deleteBgtGr = () => {
    console.log(this.state.selectedRow);
    BgtGrService.deleteBgtGr({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      bgtGrCd: this.state.selectedRow.bgtGrCd,
    }).then(() => {
      this.initBgtGr();
    });
  };

  handleClickRow = (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
  };

  /*default function */
  handleUp = () => {
    this.setState({ open: true });
    this.initBgtGr();
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickConfirm = () => {
    // console.log("확인버튼 ");
    // console.log(this.state.rows);
    // const { accessToken } = this.props;
    // const data = this.state.rows;
    // BgtCDService.insertBgtGr(data, accessToken);
    this.props.initSubList();
    console.log('확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼확인버튼')
    this.handleDown();
  };

  render() {
    const { open, columns, bgtGrRows } = this.state;

    return (
      <CustomShortDialog
        open={open}
        PaperProps={{ sx: { width: 500, height: 600 } }}
      >
        <CustomDialogTitle sx={{ fontWeight: "bold" }}>
          예산과목그룹 등록
          <IconButton
            size="small"
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
              onClick={this.deleteBgtGr}
            >
              삭 제
            </Button>
          </Grid>

          <CustomShortDataGridContainer container>
            <DataGrid
              sx={{ borderTop: "2px solid #000" }}
              rows={bgtGrRows}
              columns={columns}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              processRowUpdate={this.processRowUpdate}
              onRowClick={this.handleClickRow}
              hideFooter
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton variant="outlined" onClick={this.handleClickConfirm}>
              확인
            </CustomConfirmButton>

            <Button
              variant="outlined"
              onClick={() => this.setState({ open: false })}
            >
              취소
            </Button>
          </CustomButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {}
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtCDADDSubDialog
);
