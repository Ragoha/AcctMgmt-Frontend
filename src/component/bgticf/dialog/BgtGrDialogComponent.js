import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  Grid
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../service/BgtICFService";
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDataGrid, CustomDataGridContainer, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomIconButton, CustomInputLabel, CustomSearchButton, CustomSearchGridContainer, CustomTextField } from "../../common/style/dialog/MediumDialogStyle";

const columns = [
  {
    field: "bgtGrCd",
    headerName: "예산그룹코드",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm",
    headerName: "예산그룹명",
    width: 286.4,
    headerAlign: "center",
  },
];

class BgtGrDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      bgtGrRows: [],
      keyword: "",
      rows: [],
      columns: columns,
    };
  }

  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickRow = (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
    // console.log(this.state);
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handlePressEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSearchBgtGr();
    }
  };

  initBgtGrDialog = () => {

    this.setState({ keyword: "", bgtGrRows :[]});

    BgtICFService.findBgtGrByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const bgtGrRows = response.map((row) => ({
        id: row.bgtGrCd,
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));

      await this.setState({ bgtGrRows: bgtGrRows });
    });

    this.handleUp();
  };

  handleCickSearchIcon = () => {
    BgtICFService.findBgtGrByCoCdAndKeyword({
      keyword: this.state.keyword,
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
    }).then((response) => {
      const bgtGrRows = response.map((row) => ({
        id: row.bgtGrCd,
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));
      this.setState({ bgtGrRows: bgtGrRows });
    });
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetBgtGrTextField(this.state.selectedRow);
  };

  render() {
    const { open, columns, rows, keyword } = this.state;

    return (
      <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
        <CustomDialogTitle>
          예산그룹검색
          <CustomIconButton
            onClick={() =>
              this.setState({ open: false, userList: [], searchResult: [] })
            }
          >
            <CustomCloseIcon/>
          </CustomIconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomSearchGridContainer
            container
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CustomInputLabel>
                  검색어
                </CustomInputLabel>
                <CustomTextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  size="small"
                  onKeyDown={this.handlePressEnter}
                ></CustomTextField>
                <CustomSearchButton
                  variant="outlined"
                  onClick={this.handleCickSearchIcon}
                >
                  <SearchIcon/>
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomSearchGridContainer>
          <CustomDataGridContainer
            container
          >
            <CustomDataGrid
              columns={columns}
              rows={this.state.bgtGrRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
            />
          </CustomDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer
            container
            justifyContent="flex-end"
          >
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleClickConfirm}
            >
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
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, {forwardRef: true}) (BgtGrDialogComponent);