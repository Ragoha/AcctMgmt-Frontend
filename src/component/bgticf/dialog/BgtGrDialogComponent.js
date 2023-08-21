import SearchIcon from "@mui/icons-material/Search";
import { Button, Checkbox, Grid, IconButton } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../service/BgtICFService";
import {
  CustomButtonGridContainer,
  CustomCloseIcon,
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog,
  CustomShortFormGridContainer,
} from "../../common/style/CommonDialogStyle";
import {
  CustomDataGrid,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../../common/style/CommonStyle";

class BgtGrDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      bgtGrRows: [],
      keyword: "",
      rows: [],
      selectedRows: [],
    };
  }

  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickRow = (params) => {
    this.setState({
      selectedRow: [
        { bgtGrCd: params.row.bgtGrCd, bgtGrNm: params.row.bgtGrNm },
      ],
    });
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  setBgtGrDialog = (keyword) => {
    BgtICFService.findBgtGrByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
      keyword: keyword,
    }).then(async (response) => {
      const bgtGrRows = response.map((row) => ({
        id: row.bgtGrCd,
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));
      this.setState({
        bgtGrRows: bgtGrRows,
        keyword: keyword,
        selectedRow: "",
        selectedRows: [],
      });
      this.handleUp();
    });
  };

  initBgtGrDialog = () => {
    this.setState({ keyword: "", bgtGrRows: [], selectedRows: [] });

    BgtICFService.findBgtGrByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const bgtGrRows = response.map((row) => ({
        id: row.bgtGrCd,
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));

      await this.setState({ bgtGrRows: bgtGrRows, selectedRow: [] });
      this.handleUp();
    });
  };

  handleSearchBgtGr = () => {
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
      this.setState({
        bgtGrRows: bgtGrRows,
        selectedRow: [],
        selectedRows: [],
      });
    });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSearchBgtGr();
    }
  };

  handleClickConfirm = async () => {
    if (this.state.selectedRows.length == 0) {
      await this.props.handleSetBgtGrTextField(this.state.selectedRow);
    } else {
      let sortedSelectedRows = [...this.state.selectedRows];
      sortedSelectedRows.sort((a, b) => a.bgtGrCd - b.bgtGrCd);
      await this.props.handleSetBgtGrTextField(sortedSelectedRows);
    }
    this.handleDown();
  };

  handleHeaderCheckboxClick = () => {
    if (this.state.selectedRows.length === this.state.bgtGrRows.length) {
      this.setState({ selectedRows: [] });
    } else {
      this.setState({ selectedRows: [...this.state.bgtGrRows] });
    }
  };

  render() {
    const { open, selectedRows } = this.state;

    const columns = [
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
            checked={selectedRows.length === this.state.bgtGrRows.length}
            indeterminate={
              selectedRows.length > 0 &&
              selectedRows.length < this.state.bgtGrRows.length
            }
            onClick={(e) => {
              if (!e.target.checked) {
                this.setState({ selectedRows: [] });
              } else {
                this.setState({ selectedRows: [...this.state.bgtGrRows] });
              }
            }}
          />
        ),
        renderCell: (params) => (
          <Checkbox
            checked={selectedRows.some(
              (row) => row.bgtGrCd === params.row.bgtGrCd
            )}
            onChange={() => {
              const newSelectedRow = {
                bgtGrCd: params.row.bgtGrCd,
                bgtGrNm: params.row.bgtGrNm,
              };
              const isSelected = selectedRows.some(
                (row) => row.bgtGrCd === newSelectedRow.bgtGrCd
              );

              if (isSelected) {
                const updatedSelectedRows = selectedRows.filter(
                  (row) => row.bgtGrCd !== newSelectedRow.bgtGrCd
                );
                this.setState({ selectedRows: updatedSelectedRows });
              } else {
                this.setState((prevState) => ({
                  selectedRows: [...prevState.selectedRows, newSelectedRow],
                }));
              }
            }}
          />
        ),
      },
      {
        field: "bgtGrCd",
        headerName: "예산그룹코드",
        flex: 1,
        headerAlign: "center",
      },
      {
        field: "bgtGrNm",
        headerName: "예산그룹명",
        flex: 1,
        headerAlign: "center",
      },
    ];

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          예산그룹검색
          <IconButton size="small" onClick={this.handleDown}>
            <CustomCloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomShortFormGridContainer
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
                <CustomInputLabel>검색어</CustomInputLabel>
                <CustomTextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  onKeyDown={this.handleKeyDown}
                ></CustomTextField>
                <CustomSearchButton variant="outlined" sx={{ right: "-50px" }}>
                  <SearchIcon onClick={this.handleSearchBgtGr} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.bgtGrRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
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
  BgtGrDialogComponent
);
