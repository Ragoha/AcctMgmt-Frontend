import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtCDService from "../../../service/BgtCDService";
import {
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomLargeButtonGridContainer,
  CustomShortDataGridContainer,
  CustomShortDialog,
  CustomShortFormGridContainer,
} from "../../common/style/CommonDialogStyle";
import SearchIcon from '@mui/icons-material/Search';
import { CustomDataGrid } from "../../common/style/CommonStyle";
class BgtCDADDSubDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [
        {
          field: "bgtGrCd",
          headerName: "그룹코드",
          flex: 1,
          headerAlign: "center",
          editable:true
        },
        {
          field: "bgtGrNm",
          headerName: "그룹명aaa",
          flex: 1,
          headerAlign: "center",
          editable:true
        },
      ],
      rows: [],
    };
  }
  initStart = () => {
    const { coCd } = this.props.userInfo;
    BgtCDService.getBgtGrData(coCd)
      .then((fetchedRows) => {
        console.log("여긴 BgtCDDevFgCustom 컴포넌트 마운트");
        // 받아온 rows 데이터에 isEditable 속성을 false로 설정합니다.
        const updatedRows = fetchedRows.map(row => ({ ...row, editable: false}));
        // 새로운 항목도 isEditable을 false로 설정합니다.
        updatedRows.push({ coCd: coCd, bgtGrCd: '', editable: true });

        this.setState({ rows: updatedRows });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    this.handleUp();
  }
  processRowUpdate = (newRow) => {
    console.log('processRowupdate');
    console.log(newRow);

    // 새로운 행이 isEditable: true 속성을 가진 마지막 행인지 확인
    const isLastRow = this.state.rows[this.state.rows.length - 1].editable;

    if (isLastRow) {
        // 입력된 새 행을 업데이트
        const updatedRow = { ...newRow, editable: false, isNew: false };

        this.setState((prevState) => {
            // 기존 행들을 유지하면서 마지막 빈 행을 제거하고, 새로운 행을 추가
            const newRows = [...prevState.rows.slice(0, prevState.rows.length - 1), updatedRow];
            return { rows: newRows };
        }, () => {
            const { coCd } = this.props.userInfo;

            // 새로운 빈 행을 마지막에 추가
            this.setState({
                rows: [...this.state.rows, { coCd: coCd, bgtGrCd: '', editable: true }]
            });
        });
    } else {
        // 기존 행이 업데이트되는 경우 (여기서는 일단 간단하게 처리하였습니다)
        const updatedRow = { ...newRow, isNew: false };
        this.setState((prevState) => ({
            rows: prevState.rows.map((row) => row.bgtGrCd === newRow.bgtGrCd ? updatedRow : row)
        }));
    }

    return newRow;
};

  /*default function */
  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickConfirm = () => {
    console.log('확인버튼 ')
    console.log(this.state.rows)
    const { accessToken } = this.props;
    const data =this.state.rows;
    BgtCDService.insertBgtGr(data,accessToken)
    .then(this.handleDown());
  }

  render() {
    const { open, columns, rows } = this.state;

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          예산그룹등록
          <IconButton size="small" onClick={this.handleDown}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomShortFormGridContainer container direction="row" spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="outlined" sx={{ mr: "16px" }}>
                삭제
              </Button>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer>
            <Grid item xs={12}>
              <CustomDataGrid
                columns={columns}
                rows={rows}
                getRowId={(row) => row.bgtGrCd}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true} // 각 셀마다 영역주기
                editMode="row"
                processRowUpdate={this.processRowUpdate}
                onProcessRowUpdateError={(error) => { }}
                hideFooter
              />
            </Grid>
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomLargeButtonGridContainer
            container
            justifyContent="flex-end"
            sx={{ maxWidth: "1168px", ml: 2, mr: 2, mb: 2 }}
          >
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleClickConfirm}
            >
              확인
            </CustomConfirmButton>
            <Button variant="outlined" onClick={this.handleDown} >
              취소
            </Button>
          </CustomLargeButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  //groupcd: state.BgtCDStore || {}
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtCDADDSubDialog
);
