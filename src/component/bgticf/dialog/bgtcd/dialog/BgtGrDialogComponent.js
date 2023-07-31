import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import BgtICFService from "../../../../../service/BgtICFService";
import { connect } from "react-redux";

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
    width: 270,
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, bgtGrCd: "1", bgtGrNm: "John" },
  { id: 2, bgtGrCd: "2", bgtGrNm: "John" },
  { id: 3, bgtGrCd: "3", bgtGrNm: "John" },
];

class BgtGrDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      bgtGrRows: [],
      keyword: "",
      rows: rows,
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
      this.handleSearchBgtGrIcon();
    }
  };

  handleInitBgtGrDialog = () => {
    console.log("asdf");
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
      this.setState({ bgtGrRows: bgtGrRows, keyword: "" });
    });
    this.handleUp();
  };

  handleSearchBgtGrIcon = () => {
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
    this.handleUp();
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetBgtCDTextField(this.state.selectedRow);
  };

  render() {
    const { open, columns, rows } = this.state;

    return (
      <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
        <DialogTitle
          sx={{
            backgroundColor: "#7895CB",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 60,
          }}
        >
          예산그룹검색
          <IconButton
            size="small"
            onClick={() =>
              this.setState({ open: false, userList: [], searchResult: [] })
            }
          >
            <CloseIcon fontSize="medium" sx={{ color: "white" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
            sx={{
              border: "3px solid #EAEAEA",
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
              mb: 1,
            }}
          >
            <Grid mb={2}></Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 1,
              }}
            >
              <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>검색</InputLabel>
              <TextField
                id="keyword"
                name="keyword"
                value={this.state.keyword}
                onChange={this.handleInputChange}
                variant="outlined"
                size="small"
                onKeyDown={this.handlePressEnter}
              ></TextField>
              <Button
                variant="outlined"
                style={{
                  padding: "0px",
                  minWidth: "5px",
                  position: "absolute",
                  right: "33px",
                }}
                onClick={() => {
                  this.handleSearchBgtGrIcon();
                }}
              >
                <SearchIcon fontSize="medium" />
              </Button>
            </Grid>
            <Grid mb={1}></Grid>
          </Grid>
          <Grid mb={2}></Grid>
          <Divider sx={{ border: "1px solid #EAEAEA" }} />
          <Grid sx={{ mt: 1, width: "100%" }}>
            <Grid style={{ height: 350, width: "100%" }}>
              <DataGrid
                columns={columns}
                rows={this.state.bgtGrRows}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true} // 각 셀마다 영역주기
                onRowClick={this.handleClickRow}
                hideFooter
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#4A55A2",
              color: "white",
              "&:hover": {
                backgroundColor: "#4A55A2",
              },
            }}
            onClick={this.handleClickConfirm}
          >
            확인
          </Button>

          <Button
            variant="outlined"
            onClick={() => this.setState({ open: false })}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
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
