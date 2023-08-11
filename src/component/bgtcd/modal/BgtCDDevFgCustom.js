import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtCDService from "../../../service/BgtCDService";
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomShortDataGridContainer, CustomShortDialog } from "../../common/style/CommonDialogStyle";

class BgtCDDevFgCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: [],
      changes: [],
      columns: [
        {
          field: "divFg",
          headerName: "구분",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "defNm",
          headerName: "과목분류",
          editable: true,
          flex: 1,
          headerAlign: "center",
        },
      ],
    };
  }
  componentDidMount() {
    const { coCd } = this.props.user;
    BgtCDService.getBgtCDTerm(coCd)
      .then((rows) => {
        console.log("여긴 BgtCDDevFgCustom 컴포넌트 마운트");
        const changes = rows.map((row) => ({ ...row }));
        this.setState({ rows, changes });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  /*추가 기능 */
  handleClickConfirm = () => {
    console.log('전부 다 가져왔음')
    console.log(this.state.changes)

  }
  processRowUpdate = (newRow) => {
    console.log('processRowupdate')
    console.log(newRow)
    const updatedRow = { ...newRow, isNew: false };
    this.setState((prevState) => ({
      rows: prevState.rows.map((row) =>
        row.divFg === newRow.divFg ? updatedRow : row
      ),
    }), () => console.log(this.state.rows));
    console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
    return updatedRow;
  };
  updateBgtCDTerm = () => {
    const data = this.state.rows;
    const { accessToken } = this.props;
    console.log("업데이트된 목록은 ? ");
    console.log(data);
    BgtCDService.updateBgtCDTerm(data, accessToken).then(
      this.handleDown()
    );
  };
  /*기본 open */
  handleUp = () => {
    this.setState({ open: true });
  };
  handleDown = () => {
    this.setState({ changes: this.state.rows }); //취소했을땐 초기화
    this.setState({ open: false });
  };
  /*---------*/ // onEditCellChangeCommitted={this.handleEditCellChangeCommitted}
  render() {
    const { columns, rows, open } = this.state;
    return (
      //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          그룹레벨설정
          <IconButton size="small" onClick={this.handleDown}>
            <CustomCloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomShortDataGridContainer>
            <DataGrid
              rows={rows}
              editMode="row" //row단위로 편집창이뜸
              columns={columns}
              getRowId={(row) => row.divFg}
              rowHeight={48}
              sx={{ mt: "16px", height: "442px" }}
              components={{
                Pagination: () => null,
                Footer: () => null,
              }}
              showCellVerticalBorder={true}
              showColumnVerticalBorder={true}
              onRowClick={this.click}
              processRowUpdate={this.processRowUpdate}
              onProcessRowUpdateError={(error) => { }}
            // rowModesModel={rowModesModel}
            // onRowModesModelChange={this.handleRowModesModelChange}
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton
              variant="outlined"
              onClick={this.updateBgtCDTerm}
            >
              확인
            </CustomConfirmButton>
            <Button variant="outlined" onClick={this.handleDown}>
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
  user: state.user || {},
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtCDDevFgCustom
);
