import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, IconButton } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtCDService from "../../../service/BgtCDService";
import {
  CustomConfirmButton,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog,
  CustomShortFormGridContainer,
} from "../../common/style/CommonDialogStyle";
import { CustomDataGrid } from "../../common/style/CommonStyle";
class BgtCDADDSubDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      idCounter: 0,
      columns: [
        {
          field: "bgtGrCd",
          headerName: "그룹코드",
          flex: 1,
          headerAlign: "center",
          editable: true,
        },
        {
          field: "bgtGrNm",
          headerName: "그룹명",
          flex: 1,
          headerAlign: "center",
          editable: true,
        },
      ],
      rows: [
        { bgtGrCd: "ABC", bgtGrNm: "Jon1" },
        { bgtGrCd: "DEF", bgtGrNm: "Jon2" },
        { bgtGrCd: "JYP", bgtGrNm: "Jon3" },
      ],
    };
  }
  componentDidMount() {
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    BgtCDService.getBgtGrData(coCd, accessToken)
      .then((data) => {
        console.log("BgtCDADDSubDialog입니다 처음에 로우뿌려보는거입니다.");
        console.dir(data);
        this.setState({ rows: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  createRandomRow = () => {
    var idCounter = this.state.idCounter;
    idCounter += 1;
    this.setState({ idCounter: idCounter }, () =>
      console.log("idcounter ? :" + idCounter)
    );
    return { groupcd: "", groupName: idCounter };
  };
  /*default function */
  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };
  /* additional function */
  processRowUpdate = (event) => {
    console.log("eh되는거냐~");
    console.log(event);
    const nRow = this.createRandomRow();
    const newRows = [...this.state.rows, nRow];
    this.setState({ rows: newRows });
  };

  render() {
    const { open, columns, rows } = this.state;

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          예산과목등록
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
              <CustomConfirmButton
                onClick={this.processRowUpdate}
                variant="contained"
              >
                등록
              </CustomConfirmButton>
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
                hideFooter
              />
            </Grid>
          </CustomShortDataGridContainer>
        </CustomDialogContent>
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
