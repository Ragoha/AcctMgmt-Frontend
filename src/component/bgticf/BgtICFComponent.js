import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import dayjs from "dayjs";
import React, { Component, createRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import CustomSwal from "../common/CustomSwal";
import {
  CustomAutoComplete,
  CustomGridContainer,
  CustomHeaderGridContainer,
  CustomHeaderInputLabel,
  CustomInputLabel,
  CustomSearchButton,
} from "../common/style/CommonStyle";
import DataGridComponent from "./DatGridComponent";
import BgtCdAutocomplete from "./autocomplete/BgtCdAutocomplete";
import BgtGrAutocomplete from "./autocomplete/BgtGrAutocomplete";
import DivDialogComponent from "./dialog/DivDialogComponent";

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  /* style: "currency", currency: "KRW", */
});

const krAmount = {
  type: "number",
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  cellClassName: "font-tabular-nums",
};

const BGTCD_COLUMN = [
  {
    // flex: 1,
    field: "bgtCd",
    headerName: "예산코드",
    width: 100,
    headerAlign: "center",
  },
  {
    field: "defNm",
    headerName: "예산구분",
    width: 80,
    headerAlign: "center",
  },
  {
    flex: 1,
    field: "bgtNm",
    headerName: "예산과목명",
    // width: 100,
    headerAlign: "center",
    cellClassName: "bgtNm",
  },
  {
    flex: 1,
    field: "carrAm",
    headerName: "금액",
    headerAlign: "center",
    // width: 120,
    ...krAmount,
  },
];

class BgtICFComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgtCDRows: [],
      divCd: this.props.user.divCd,
      divNm: "",
      divTextField: this.props.user.divCd + ". " + this.props.user.divNm,
      bgtGrCd: "",
      bgtGrNm: "",
      bgtGrCdList: [],
      bgtGrTextField: "",
      gisuText: "",
      gisuRows: [],
      gisuRangeText: "",
      gisuRangeRows: [],
      frDt: "",
      groupCd: "",
      grFg: "",
      grFgText: "전체",
      bgtCd: "",
      bgtNm: "",
      bgtCdList: [],
      bgtCDTextField: "",
      bgtDTO: [],
      divRows: [],
      selectedRowId: "",
      selectedRowSq: "",
      selectedRows: [],
      isNew: false,
      innerHeight: window.innerHeight,
    };
  
    this.bgtCdListRef = createRef();
    this.bgtICFRef = createRef();
    this.divRef = createRef();
    this.bgtGrRef = createRef();
    this.bgtCDRef = createRef();
  }

  handleGetBgtICFList = (e) => {
    this.bgtICFRef.current.handleGetBgtICFList();
  };

  handleRowDelete = () => {
    console.log("Asdf");
    CustomSwal.showCommonSwalYn(
      "삭제",
      "삭제하시겠습니까?",
      "info",
      "삭제",
      (confirm) => {
        if (confirm) {
          this.bgtICFRef.current.handleDeleteClick({
            bgtCd: this.state.selectedRowId,
            sq: this.state.selectedRowSq,
            sqList: this.state.selectedRows,
          });
        }
      }
    );
  };

  setSelectedRows = async (selectedRows) => {
    await this.setState({ selectedRows: selectedRows });
    console.log(this.state.selectedRows);
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleAddRow = () => {
    const { bgtDTO } = this.state;
    const newRow = {
      id: bgtDTO.length + 1,
      bgtCd: "", // 예산코드 기본 값 설정
      bgtFg: "", // 예산구분 기본 값 설정
      bgtNm: "", // 예산과목명 기본 값 설정
      amount: 0, // 금액 기본 값 설정
    };
    this.setState((prevState) => ({
      bgtDTO: [...prevState.bgtDTO, newRow], // 새로운 행을 기존 행 배열에 추가
    }));
    console.log(bgtDTO);
  };

  handleEditCellChange = (params) => {
    const { bgtDTO } = this.state;
    const updatedRow = {
      ...params.row,
      [params.field]: params.value,
    };
    const updatedRows = bgtDTO.map((row) =>
      row.id === params.id ? updatedRow : row
    );
    this.setState((prevState) => ({
      bgtDTO: [...prevState.bgtDTO, updatedRows],
    }));
  };

  resetBgtICF = () => {
    // this.setState({bgtCdList: [], bgtGrCdList:[]})
  };

  setSelectedRowId = (row) => {
    this.setState({ selectedRowId: row.bgtCd, selectedRowSq: row.sq });
  };

  handleSetDivTextField = (data) => {
    if (data.divCd && data.divNm) {
      this.setState({
        divTextField: data.divCd + ". " + data.divNm,
        divCd: data.divCd,
        divNm: data.divNm,
      });
    } else {
      this.setState({
        divTextField: "",
        divCd: "",
        divNm: "",
      });
    }
  };

  handleSetBgtGrTextField = (dataList) => {
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
        });
      }
    }
  };

  handleClickDivSearchIcon = () => {
    // this.divRef.current.initDivDialog();
    this.divRef.current.setDivDialog(this.state.divTextField);
  };

  handleClickBgtGrSerachIcon = () => {
    // this.bgtGrRef.current.initBgtGrDialog();
    this.bgtGrRef.current.setBgtGrDialog(this.state.bgtGrTextField);
  };

  handleSearchBgtCD = () => {
    // this.bgtCDRef.current.initBgtCDDialog();
    this.bgtCDRef.current.setBgtCDDialog(this.state.bgtCDTextField);
  };

  handleSetBgtCDTextField = (dataList) => {
    if (dataList.length > 0) {
      console.log(dataList);
      console.log("asdf");
      const concatenatedText = dataList
        .map((data) => data.bgtCd + ". " + data.bgtNm)
        .join(", ");

      const bgtCdList = dataList.map((data) => data.bgtCd);

      this.setState({
        bgtCDTextField: concatenatedText,
        bgtCdList: bgtCdList,
      });
    } else {
      if (dataList.bgtCd && dataList.bgtNm) {
        this.setState({
          bgtCDTextField: dataList.bgtCd + ". " + dataList.bgtNm,
          bgtCd: dataList.bgtCd,
          bgtNm: dataList.bgtNm,
        });
      } else {
        this.setState({
          bgtCDTextField: "",
          bgtCd: "",
          bgtNm: "",
        });
      }
    }
  };

  changeBgtCdList = async (bgtCdList) => {
    console.log("zzzzzzzzzzzzzzzzzzz");
    console.log(bgtCdList);
    await this.setState({ bgtCdList: bgtCdList, bgtCDRows: [] });
    console.log(this.state.bgtCdList);
  };

  changeBgtGrList = async (bgtGrCdList) => {
    await this.setState({ bgtGrCdList: bgtGrCdList, bgtCDRows: [] });
    console.log(this.state);
  };

  resetBgt = () => {
    this.setState({ bgtCDRows: [], bgtCdList: [] });
    this.bgtICFRef.current.initBgtICF();
  };

  resetBgtGr = () => {
    this.setState({ bgtCDRows: [], bgtGrCdList: [] });
    this.bgtICFRef.current.initBgtICF();
  };

  handleClickSerachButton = () => {
    BgtICFService.findBgtCdByGisuAndGroupCdAndGrFgAndBgtCd({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      divCd: this.state.divCd,
      divNm: this.state.divNm,
      divText: this.state.divTextField,
      gisu: this.state.gisuText,
      bgtGrCd: this.state.bgtGrCd,
      bgtGrNm: this.state.bgtGrNm,
      bgtGrCdList: this.state.bgtGrCdList,
      bgtGrText: this.state.bgtGrTextField,
      grFg: this.state.grFg,
      bgtCd: this.state.bgtCd,
      bgtCdList: this.state.bgtCdList,
      bgtNm: this.state.bgtNm,
      bgtText: this.state.bgtCDTextField,
    }).then((response) => {
      console.log(response);
      const rowsWithId = response.map((row) => ({
        ...row,
        id: randomId(),
      }));
      this.setState({ bgtCDRows: rowsWithId });
    });
  };

  componentDidMount() {
    BgtICFService.findGisuByCoCd({
      accessToken: this.props.accessToken,
      user: this.props.user,
    }).then((response) => {
      const gisuRows = response.map((row) => row.gisu);
      const gisuRangeRows = response.map(
        (row) =>
          dayjs(row.frDt).format("YYYY-MM-DD") +
          " ~ " +
          dayjs(row.toDt).format("YYYY-MM-DD")
      );

      this.setState({
        gisu: gisuRows[gisuRows.length - 1],
        gisuRows: gisuRows,
        gisuRangeRows: gisuRangeRows,
        gisuText: gisuRows[gisuRows.length - 1],
        gisuRangeText: gisuRangeRows[gisuRangeRows.length - 1],
      });
    });


  }

  handleClickBgtCDRow = (e) => {
    this.setState({ selectedRows: [] });
    this.bgtICFRef.current.getBgtICFList(e.row, { divCd: this.state.divCd });
  };

  handleKeyDownDivTextField = (e) => {
    if (e.key == "Enter") {
      this.divRef.current.setDivDialog(this.state.divTextField);
    }

    if (e.key == "Backspace") {
      this.setState({ divTextField: "", divCd: "", bgtCDRows: [] });
      this.bgtICFRef.current.initBgtICF();
    }
  };

  handleKeyDownBgtGrTextField = (e) => {
    if (e.key == "Enter") {
      this.bgtGrRef.current.setBgtGrDialog(this.state.bgtGrTextField);
    }

    if (e.key == "Backspace") {
      this.setState({
        bgtGrTextField: "",
        bgtGrCd: "",
        bgtGrCdList: [],
        bgtCDRows: [],
      });
      this.bgtICFRef.current.initBgtICF();
    }
  };

  handleKeyDownBgtCDTextField = (e) => {
    if (e.key == "Enter") {
      this.bgtCDRef.current.setBgtCDDialog(this.state.bgtCDTextField);
    }

    if (e.key == "Backspace") {
      this.setState({ bgtCDTextField: "", bgtCd: "", bgtCDRows: [] });
      this.bgtICFRef.current.initBgtICF();
    }
  };

  handleChangeGisuText = (event, newValue) => {
    console.log("Selected value:", newValue);
    const index = this.state.gisuRows.findIndex((value) => value === newValue);

    this.setState({
      gisuText: newValue,
      gisuRangeText: this.state.gisuRangeRows[index],
      bgtCDRows: [],
    });
    this.bgtICFRef.current.initBgtICF();
    console.log("Selected option index:", index);
  };

  handleChangeGrFgText = (event, newValue) => {
    console.log(newValue);
    this.setState({
      grFg: newValue.value,
      grFgText: newValue.label,
      bgtCDRows: [],
    });
    this.bgtICFRef.current.initBgtICF();
  };

  handleTest = (data) => {
    // alert("test");

    this.bgtCdListRef.current.setListItem(data);
  };

  render() {
    const { divTextField, bgtCDTextField } = this.state;

    return (
      <>
        <CustomHeaderGridContainer
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container direction="row">
              <PlaylistAddIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>예산초기이월등록</CustomHeaderInputLabel>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={this.handleRowDelete}>
              삭 제
            </Button>
          </Grid>
        </CustomHeaderGridContainer>
        <CustomGridContainer
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>회계단위</CustomInputLabel>
              <TextField
                name="divTextField"
                value={divTextField}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDownDivTextField}
                placeholder="사업장코드/사업장명"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.handleClickDivSearchIcon} />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>회계기간</CustomInputLabel>
              <Autocomplete
                name="gisuText"
                disableClearable
                disablePortal
                defaultValue={this.state.gisuText}
                value={this.state.gisuText}
                options={this.state.gisuRows}
                onChange={this.handleChangeGisuText}
                getOptionLabel={(option) => option.toString()}
                size="small"
                sx={{ width: "65px", marginRight: "8px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={this.state.gisuRows[this.state.gisuRows.length - 1]}
                  />
                )}
              />
              <TextField
                value={this.state.gisuRangeText}
                disabled={true}
                fontSize="13px"
                sx={{
                  width: 182,
                  "& .MuiInputBase-root": { fontSize: "13px", height: "40px" },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <CustomInputLabel>예산그룹</CustomInputLabel>
              <BgtGrAutocomplete
                ref={this.bgtGrRef}
                changeBgtGrList={this.changeBgtGrList}
                resetBgtGr={this.resetBgtGr}
              />
              <CustomSearchButton
                variant="outlined"
                onClick={this.handleClickSerachButton}
                sx={{ marginLeft: "auto" }}
              >
                <SearchIcon />
              </CustomSearchButton>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>출력구분</CustomInputLabel>
              <CustomAutoComplete
                disableClearable
                disablePortal
                id="combo-box-demo"
                options={[
                  { label: "전체", value: "" },
                  { label: "수입", value: "0" },
                  { label: "지출", value: "1" },
                ]}
                // getOptionLabel={(option) => option.label}
                value={this.state.grFgText}
                onChange={this.handleChangeGrFgText}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산과목</CustomInputLabel>
              <BgtCdAutocomplete
                bgtCdList={this.state.bgtCdList}
                changeBgtCdList={this.changeBgtCdList}
                resetBgt={this.resetBgt}
                ref={this.bgtCdListRef}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </CustomGridContainer>
        <Grid container spacing={2} sx={{}}>
          <Grid item xs={3}>
            <DataGrid
              sx={{
                height: "calc(100vh - 296px)",
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
                borderTop: "3px solid black",
                borderLeft: "2px solid #EAEAEA",
                borderRight: "2px solid #EAEAEA",
                borderBottom: "2px solid #EAEAEA",
                "& .MuiDataGrid-row:hover": {
                  background: "#F5F5F5",
                },
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  background: "#F5F5F5",
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "#EDF4FB !important",
                  fontWeight: "bold",
                },

                "& .style-divfg-1": { background: "#86E57F" },
                "& .style-divfg-1 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "0px !important",
                },
                "& .style-divfg-2": { background: "#AAFFA3" },
                "& .style-divfg-2 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "8px !important",
                },
                "& .style-divfg-3": { background: "#CEFFC7" },
                "& .style-divfg-3 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "16px !important",
                },
                "& .style-divfg-4": { background: "#F2FFEB" },
                "& .style-divfg-4 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "24px !important",
                },
                "& .style-divfg-5": { background: "#FFFFFF" },
                "& .style-divfg-5 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "32px !important",
                },
                "& .style-divfg-6": { background: "#FFFFFF" },
                "& .style-divfg-6 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "40px !important",
                },
                "& .style-divfg-7": { background: "#FFFFFF" },
                "& .style-divfg-7 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "48px !important",
                },
                "& .style-divfg-8": { background: "#FFFFFF" },
                "& .style-divfg-8 .bgtNm .MuiDataGrid-cellContent": {
                  paddingLeft: "56px !important",
                },
              }}
              columns={BGTCD_COLUMN}
              // editMode="cell"
              rows={this.state.bgtCDRows}
              onRowClick={this.handleClickBgtCDRow}
              hideFooter
              showCellVerticalBorder
              showColumnVerticalBorder
              onEditCellChange={this.handleEditCellChange}
              getRowClassName={(params) => `style-divfg-${params.row.divFg}`}
              components={{
                NoRowsOverlay: () => "",
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <DataGridComponent
              ref={this.bgtICFRef}
              setSelectedRowId={this.setSelectedRowId}
              handleClickSerachButton={this.handleClickSerachButton}
              setSelectedRows={this.setSelectedRows}
              divCd={this.state.divCd}
            />
          </Grid>
        </Grid>

        <DivDialogComponent
          ref={this.divRef}
          handleSetDivTextField={this.handleSetDivTextField}
        />

        {/* <BgtGrDialogComponent
          ref={this.bgtGrRef}
          handleSetBgtGrTextField={this.handleSetBgtGrTextField}
        /> */}

        {/* <BgtCDDialogComponent
          ref={this.bgtCDRef}
          handleSetBgtCDTextField={this.handleSetBgtCDTextField}
          handleTest={this.handleTest}
        /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
  config: state.config.configData,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtICFComponent
);
