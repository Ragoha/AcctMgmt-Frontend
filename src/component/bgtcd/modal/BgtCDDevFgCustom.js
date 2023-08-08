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
import { DataGrid } from "@mui/x-data-grid";
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
    console.log("ㅇㅇ체크양ㅇㅇㅇ");
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
  /*기본 open */
  handleUp = () => {
    this.setState({ open: true });
  };
  handleDown = () => {
    this.setState({ changes: this.state.rows }); //취소했을땐 초기화
    this.setState({ open: false });
  };
  /*추가 기능 */
  //확인버튼을 누르면 데이터 그리드의 내용을 업데이트하는 로직
  processRowUpdate = (newRow) => {
    //newRow에선 최근 변경된 열 값이 들어온다.
    console.log(newRow);
    this.setState((prevState) => {
      // 기존 changes 배열에서 newRow와 같은 id를 가진 row를 찾습니다.
      const existingRowIndex = prevState.changes.findIndex(
        (row) => row.divFg === newRow.divFg
      );
      if (existingRowIndex !== -1) {
        // 만약 같은 id를 가진 row가 이미 있다면, 그 row를 newRow로 업데이트합니다.
        return {
          changes: prevState.changes.map((row, index) =>
            index === existingRowIndex ? newRow : row
          ),
        };
      } else {
        // 같은 id를 가진 row가 없다면, newRow를 배열에 추가합니다.
        return {
          changes: [...prevState.changes, newRow],
        };
      }
    });
  };
  handleRowModesModelChange = (newRowModesModel) => {
    this.setState({ rowModesModel: newRowModesModel });
  };

  updateBgtCDTerm = () => {
    const data = this.state.changes;
    console.log("업데이트된 목록은 ? ");
    console.log(data);
    BgtCDService.updateBgtCDTerm(data).then(
      (data) => {
        this.setState({ rows: data });
      },
      () => {
        BgtCDService.getGridData(); //[230728 ]:이 부분에 넣을 GroupCd를 가지고오기 위해선 반드시 최상단에 groupCd TextField를 가져와야함.
      }
    );
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
              processRowUpdate={this.processRowUpdate}
              onProcessRowUpdateError={(error) => {}}
              // rowModesModel={rowModesModel}
              // onRowModesModelChange={this.handleRowModesModelChange}
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleClickConfirm}
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
