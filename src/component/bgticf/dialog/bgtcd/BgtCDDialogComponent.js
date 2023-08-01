import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../../service/BgtICFService";
import BgtGrDialogComponent from "./dialog/BgtGrDialogComponent";

const columns = [
  {
    field: "gisu",
    headerName: "기수",
    width: 50,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "bgtGrNm",
    headerName: "예산그룹",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtCd",
    headerName: "예산과목코드",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtNm",
    headerName: "예산과목명",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtData",
    headerName: "상위예산과목",
    width: 300,
    headerAlign: "center",
  },
];

class BgtCDDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      bgtGr: { Cd: "", Nm: "" },
      selectedRow: { bgtCDCd: "", bgtCDNm: "" },
      bgtGrCd: "",
      bgtCDRows: [],
      gisu: "",
      keyword: "",
      columns: columns,
      rangeState: true,
      rangeTextField: dayjs(new Date()).format("YYYY-MM-DD"),
      bgtCDMarkTextField: "",
      bgtGrTextField: "",
      keywordTextField: "",
    };

    this.childBgtGrRef = createRef();
  }

  initBgtCDDialog = () => {
    this.setState({ keyword: "", rangeState: true });

    this.handleUp();
  }

  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickRow = (params) => {
    this.setState({ bgtCd: params.row.bgtCd, bgtNm: params.row.bgtNm });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log("test");
  };

  handleSearchBgtGr = () => {
    BgtICFService.findBgtGrCdAndBgtGrNmByKeyword(this.state.keyword).then(
      async (response) => {
        const bgtCDRows = response.map((row) => ({
          id: row.bgtGrCd,
          bgtGrCd: row.bgtGrCd,
          bgtGrNm: row.bgtGrNm,
        }));
        await this.setState({ bgtCDRows: bgtCDRows });
        console.log(this.state);
      }
    );
  };

  handleClickConfirm = () => {
    this.props.handleSetBgtCDTextField({
      bgtCd: this.state.bgtCd,
      bgtNm: this.state.bgtNm,
    });

    this.handleDown();
  };

  handleClickBgtGrSearchIcon = () => {
    // console.dir(this.childBgtGrRef);
    this.childBgtGrRef.current.handleInitBgtGrDialog();
    // this.childBgtGrRef.current.handleUp();
  };

  handleSetBgtCDTextField = (response) => {
    this.setState({
      bgtGrTextField: response.bgtGrCd + ". " + response.bgtGrNm,
      bgtGrCd: response.bgtGrCd,
    });
  };

  handleClickSearchIcon = () => {
    let tmpRange = "";

    if (this.state.rangeState) {
      tmpRange = this.state.rangeTextField;
    } else {
      tmpRange = dayjs("1900-01-01").format("YYYY-MM-DD");
    }

    BgtICFService.findBgcCDByGisuAndGroupCdAndToDtAndKeyword({
      gisu: this.state.gisu,
      bgtGrCd: this.state.bgtGrCd,
      keyword: this.state.keyword,
      range: tmpRange,
      accessToken: this.props.accessToken,
      user: this.props.user,
    }).then((response) => {
      const bgtCDRows = response.map((row) => ({
        id: randomId(),
        gisu: row.gisu,
        bgtGrNm: row.bgtGrNm,
        bgtCd: row.bgtCd,
        bgtNm: row.bgtNm,
      }));
      this.setState({ bgtCDRows: bgtCDRows });

      console.log(this.state);
    });
  };

  toggleRangeState = () => {
    this.setState((prevState) => ({
      rangeState: !prevState.rangeState,
    }));
  };

  handleChangeDatePicker = async (newValue) => {
    await this.setState({
      rangeTextField: dayjs(newValue).format("YYYY-MM-DD"),
    });
    console.log(this.state);
  };

  render() {
    const {
      open,
      bgtGrCd,
      columns,
      rangeState,
      bgtCDMarkTextField,
      bgtGrTextField,
      keywordTextField,
      rangeTextField,
    } = this.state;

    return (
      <>
        <Dialog
          open={open}
          PaperProps={{ sx: { maxWidth: 1200, width: 1200, height: 840 } }}
        >
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
            예산과목검색
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
              spacing={2}
              sx={{
                maxWidth: "1168px",
                border: "3px solid #EAEAEA",
                display: "flex",
                justifyContent: "space-between",
                ml: 2,
                mt: 1,
                mr: 2,
                mb: 2,
                pb: 2,
              }}
            >
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                    과목표시
                  </InputLabel>
                  <TextField
                    name="gisu"
                    value={this.state.gisu}
                    onChange={this.handleInputChange}
                    variant="outlined"
                    size="small"
                    onKeyDown={this.handlePressEnter}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                    예산그룹
                  </InputLabel>
                  <TextField
                    name="bgtGrTextField"
                    value={bgtGrTextField}
                    onChange={this.handleInputChange}
                    variant="outlined"
                    size="small"
                    onKeyDown={this.handlePressEnter}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon
                            onClick={this.handleClickBgtGrSearchIcon}
                          />
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={4}>
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
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.handleInputChange}
                    variant="outlined"
                    size="small"
                    onKeyDown={this.handlePressEnter}
                  />
                  <Button
                    variant="outlined"
                    style={{
                      padding: "0px",
                      minWidth: "5px",
                      position: "relative",
                      right: "-28px",
                    }}
                  >
                    <SearchIcon
                      fontSize="medium"
                      onClick={this.handleClickSearchIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ pl: "50px" }}
                >
                  <InputLabel sx={{ fontWeight: "bold", mr: "8px" }}>
                    범위
                  </InputLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rangeState}
                        sx={{ mr: "-10px" }}
                        onClick={this.toggleRangeState}
                      />
                    }
                    label="기준일"
                    sx={{ mr: "8px" }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="rangeTextField"
                      disabled={!rangeState}
                      format="YYYY-MM-DD"
                      value={dayjs(rangeTextField)}
                      onChange={this.handleChangeDatePicker}
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: { width: "166px", mr: "8px" },
                          inputProps: {
                            sx: { height: "auto" },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!rangeState}
                        sx={{ mr: "-10px" }}
                        onClick={this.toggleRangeState}
                      />
                    }
                    label="전체"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ height: "552px", maxWidth: "1168px", ml: 2, mr: 2 }}
            >
              <DataGrid
                checkboxSelection
                columns={columns}
                rows={this.state.bgtCDRows}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true}
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
              sx={{ maxWidth: "1168px", ml: 2, mr: 2, mb: 2 }}
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
        <BgtGrDialogComponent
          ref={this.childBgtGrRef}
          handleSetBgtCDTextField={this.handleSetBgtCDTextField}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, { forwardRef: true}) (BgtCDDialogComponent);

