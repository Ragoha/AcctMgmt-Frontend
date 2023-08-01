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
    this.setState({ selectedRow: params.row });
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
  };

  handlePressEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSearchBgtGrIcon();
    }
  };

  handleInitBgtGrDialog = () => {
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
            padding: 2,
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
        <DialogContent sx={{ margin: 0, padding: 0 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              maxWidth: "468px",
              border: "3px solid #EAEAEA",
              display: "flex",
              ml: 2,
              mt: 1,
              mr: 2,
              mb: 2,
              pb: 2,
            }}
            position="relative"
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                  검색어
                </InputLabel>
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
                    position: "relative",
                    right: "-66px",
                  }}
                  onClick={() => {
                    this.handleSearchBgtGrIcon();
                  }}
                >
                  <SearchIcon fontSize="medium" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ height: "364px", maxWidth: "468px", ml: 2, mr: 2 }}
          >
            <DataGrid
              columns={columns}
              rows={this.state.bgtGrRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
              sx={{ borderTop: "3px solid black" }}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ margin: 0, padding: 0 }}>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ maxWidth: "468px", ml: 2, mr: 2, mb: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#4A55A2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#4A55A2",
                },
                mr: 1,
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
          </Grid>
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
