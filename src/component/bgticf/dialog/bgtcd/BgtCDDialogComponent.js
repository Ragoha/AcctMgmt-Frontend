import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { randomId } from "@mui/x-data-grid-generator";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../../service/BgtICFService";
import {
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomLargeButtonGridContainer,
  CustomLargeDataGridContainer,
  CustomLargeFormGridContainer,
} from "../../../common/style/CommonDialogStyle";
import {
  CustomDataGrid,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../../../common/style/CommonStyle";
import BgtGrDialogComponent from "./dialog/BgtGrDialogComponent";

class BgtCDDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      bgtGr: { Cd: "", Nm: "" },
      selectedRow: { bgtCDCd: "", bgtCDNm: "" },
      bgtGrCd: "",
      bgtCDRows: [],
      bgtCDCdRows: [],
      gisu: "모든예산과목",
      gisuValue: "0",
      keyword: "",
      rangeState: true,
      rangeTextField: dayjs(new Date()).format("YYYY-MM-DD"),
      bgtCDMarkTextField: "",
      bgtGrTextField: "",
      bgtGrCdList: [],
      selectedRows: [],
      keywordTextField: "",
    };

    this.childBgtGrRef = createRef();
  }

  setBgtCDDialog = (keyword) => {
    let tmpRange = "";

    this.setState({ rangeState: false, selectedRow: [], selectedRows: [] });

    if (this.state.rangeState) {
      tmpRange = this.state.rangeTextField;
    } else {
      tmpRange = dayjs("1900-01-01").format("YYYY-MM-DD");
    }

    BgtICFService.findBgcCDByGisuAndGroupCdAndToDtAndKeyword({
      gisu: this.state.gisuValue,
      bgtGrCd: this.state.bgtGrCd,
      keyword: keyword,
      range: tmpRange,
      accessToken: this.props.accessToken,
      user: this.props.user,
      bgtGrCdList: this.state.bgtGrCdList,
    }).then((response) => {
      const bgtCDRows = response.map((row) => ({
        id: randomId(),
        gisu: row.gisu,
        bgtGrNm: row.bgtGrNm,
        bgtCd: row.bgtCd,
        bgtNm: row.bgtNm,
        hBgtNm: row.dataPath,
      }));
      console.log("asdf");
      this.setState({ bgtCDRows: bgtCDRows, keyword: keyword });
      this.handleUp();
    });

    // BgtICFService.findBgcCDByGisuAndGroupCdAndToDtAndKeyword({
    //   user: this.props.user,
    //   accessToken: this.props.accessToken,
    //   keyword: keyword,
    // }).then((response) => {
    //   const bgtCDRows = response.map((row) => ({
    //     id: randomId(),
    //     gisu: row.gisu,
    //     bgtGrNm: row.bgtGrNm,
    //     bgtCd: row.bgtCd,
    //     bgtNm: row.bgtNm,
    //     hBgtNm: row.dataPath,
    //   }));
    //   this.setState({ bgtCDRows: bgtCDRows, keyword: keyword });
    //   this.handleUp();
    // });
  };

  initBgtCDDialog = async () => {
    await this.setState({ keyword: "", bgtGrTextField: "", rangeState: true });
    this.handleSearchBgtCd();
    this.handleUp();
  };

  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickRow = (params) => {
    this.setState({ selectedRow: [params.row] });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSearchBgtGr = () => {
    BgtICFService.findBgtGrCdAndBgtGrNmByKeyword(this.state.keyword).then(
      (response) => {
        const bgtCDRows = response.map((row) => ({
          id: row.bgtGrCd,
          bgtGrCd: row.bgtGrCd,
          bgtGrNm: row.bgtGrNm,
        }));
        this.setState({ bgtCDRows: bgtCDRows });
      }
    );
  };

  handleClickConfirm = async () => {
    if (this.state.selectedRows.length == 0) {
      await this.props.handleSetBgtCDTextField(this.state.selectedRow);
      // this.test(this.state.selectedRow);
    } else {
      let sortedSelectedRows = [...this.state.selectedRows];
      sortedSelectedRows.sort((a, b) => a.bgtCd - b.bgtCd);
      await this.props.handleSetBgtCDTextField(sortedSelectedRows);
      // this.test(sortedSelectedRows);
    }
    this.handleDown();
  };

  handleSearchBgtGr = () => {
    // this.childBgtGrRef.current.handleInitBgtGrDialog();
    this.childBgtGrRef.current.setBgtGrDialog(this.state.bgtGrTextField);
  };

  handleSetBgtCDTextField = (dataList) => {
    if (dataList.length > 0) {
      const concatenatedText = dataList
        .map((data) => data.bgtGrCd + ". " + data.bgtGrNm)
        .join(", ");

      const bgtGrCdList = dataList.map((data) => data.bgtGrCd);

      this.setState({
        bgtGrTextField: concatenatedText,
        bgtGrCdList: bgtGrCdList,
      });
    } else {
      if (dataList.bgtGrCd && dataList.bgtGrNm) {
        this.setState({
          bgtGrTextField: dataList.bgtGrCd + ". " + dataList.bgtGrNm,
          bgtGrCd: dataList.bgtGrCd,
          bgtGrNm: dataList.bgtGrNm,
        });
      } else {
        this.setState({
          bgtGrTextField: "",
          bgtGrCd: "",
          bgtGrNm: "",
          bgtGrCdList: [],
        });
      }
    }
  };

  handleSearchBgtCd = () => {
    let tmpRange = "";

    if (this.state.rangeState) {
      tmpRange = this.state.rangeTextField;
    } else {
      tmpRange = dayjs("1900-01-01").format("YYYY-MM-DD");
    }

    BgtICFService.findBgcCDByGisuAndGroupCdAndToDtAndKeyword({
      gisu: this.state.gisuValue,
      bgtGrCd: this.state.bgtGrCd,
      keyword: this.state.keyword,
      range: tmpRange,
      accessToken: this.props.accessToken,
      user: this.props.user,
      bgtGrCdList: this.state.bgtGrCdList,
    }).then((response) => {
      const bgtCDRows = response.map((row) => ({
        id: randomId(),
        gisu: row.gisu,
        bgtGrNm: row.bgtGrNm,
        bgtCd: row.bgtCd,
        bgtNm: row.bgtNm,
        hBgtNm: row.dataPath,
      }));
      this.setState({ bgtCDRows: bgtCDRows });
    });
  };

  toggleRangeState = () => {
    this.setState((prevState) => ({
      rangeState: !prevState.rangeState,
    }));
  };

  handleChangeDatePicker = (newValue) => {
    this.setState({
      rangeTextField: dayjs(newValue).format("YYYY-MM-DD"),
    });
  };

  handleKeyDownBgtGrTextField = (e) => {
    if (e.key == "Enter") {
      this.childBgtGrRef.current.setBgtGrDialog(this.state.bgtGrTextField);
    }

    if (e.key == "Backspace") {
      this.setState({ bgtGrTextField: "", bgtGrCd: "" });
    }
  };

  handleKeyDownKeyword = (e) => {
    if (e.key == "Enter") {
      this.handleSearchBgtCd();
    }
  };

  // test = (data) => {
  //   this.props.handleTest(data);
  // }

  render() {
    const { open, rangeState, bgtGrTextField, rangeTextField, selectedRows } =
      this.state;

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
            checked={selectedRows.length === this.state.bgtCDRows.length}
            onClick={async (e) => {
              this.setState({ bgtCDCdRows: this.state.bgtCDRows });
              console.log(e.target.checked);

              if (!e.target.checked) {
                await this.setState({ selectedRows: [] });
              } else {
                await this.setState({
                  selectedRows: [...this.state.bgtCDRows],
                });
              }
              console.log(this.state.selectedRows);
            }}
          />
        ),
        renderCell: (params) => (
          <Checkbox
            checked={selectedRows.some((row) => row.bgtCd === params.row.bgtCd)}
            onChange={async () => {
              const newSelectedRow = {
                bgtCd: params.row.bgtCd,
                bgtNm: params.row.bgtNm,
              };
              const isSelected = selectedRows.some(
                (row) => row.bgtCd === newSelectedRow.bgtCd
              );

              if (isSelected) {
                const updatedSelectedRows = selectedRows.filter(
                  (row) => row.bgtCd !== newSelectedRow.bgtCd
                );
                await this.setState({ selectedRows: updatedSelectedRows });
              } else {
                await this.setState((prevState) => ({
                  selectedRows: [...prevState.selectedRows, newSelectedRow],
                }));
              }
            }}
          />
        ),
      },
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
        field: "hBgtNm",
        headerName: "상위예산과목",
        width: 507,
        headerAlign: "center",
      },
    ];

    return (
      <>
        <Dialog
          open={open}
          PaperProps={{
            sx: { maxWidth: 1200, width: 1200, height: 840, minHeight: 840 },
          }}
        >
          <CustomDialogTitle>
            예산과목검색
            <IconButton size="small" onClick={this.handleDown}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </CustomDialogTitle>
          <CustomDialogContent>
            <CustomLargeFormGridContainer container direction="row" spacing={2}>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomInputLabel>과목표시</CustomInputLabel>
                  <Autocomplete
                    name="gisu"
                    size="small"
                    sx={{ width: 255 }}
                    value={this.state.gisu}
                    options={["모든예산과목", "당기승인예산"]}
                    disabled={true}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomInputLabel>예산그룹</CustomInputLabel>
                  <CustomTextField
                    name="bgtGrTextField"
                    value={bgtGrTextField}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDownBgtGrTextField}
                    placeholder="예산그룹코드/예산그룹명"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon onClick={this.handleSearchBgtGr} />
                        </InputAdornment>
                      ),
                    }}
                  ></CustomTextField>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomInputLabel>검색어</CustomInputLabel>
                  <CustomTextField
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDownKeyword}
                    variant="outlined"
                  />
                  <CustomSearchButton variant="outlined" sx={{ right: "-9px" }}>
                    <SearchIcon onClick={this.handleSearchBgtCd} />
                  </CustomSearchButton>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ pl: "51px" }}
                >
                  <CustomInputLabel sx={{ mr: "34px !important" }}>
                    범위
                  </CustomInputLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rangeState}
                        onClick={this.toggleRangeState}
                      />
                    }
                    label="기준일"
                    sx={{
                      "& .MuiCheckbox-root": {
                        pr: 0,
                      },
                    }}
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
                          sx: { width: "150px", mr: "16px" },
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
                        onClick={this.toggleRangeState}
                      />
                    }
                    label="전체"
                    sx={{
                      "& .MuiCheckbox-root": {
                        pr: 0,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CustomLargeFormGridContainer>
            <CustomLargeDataGridContainer container>
              <CustomDataGrid
                // checkboxSelection
                columns={columns}
                rows={this.state.bgtCDRows}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true}
                onRowClick={this.handleClickRow}
                hideFooter
                sx={{ borderTop: "3px solid black" }}
              />
            </CustomLargeDataGridContainer>
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
                확 인
              </CustomConfirmButton>
              <Button variant="outlined" onClick={this.handleDown}>
                취 소
              </Button>
            </CustomLargeButtonGridContainer>
          </CustomDialogActions>
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

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtCDDialogComponent
);
