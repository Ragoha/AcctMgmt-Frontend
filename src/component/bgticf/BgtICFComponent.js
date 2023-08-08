import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { Component, createRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import {
  CustomAutoComplete,
  CustomGridContainer,
  CustomHeaderGridContainer,
  CustomHeaderInputLabel,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../common/style/CommonStyle";
import DataGridComponent from "./DatGridComponent";
import BgtGrDialogComponent from "./dialog/BgtGrDialogComponent";
import DivDialogComponent from "./dialog/DivDialogComponent";
import BgtCDDialogComponent from "./dialog/bgtcd/BgtCDDialogComponent";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ListDisplay from "./test";

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
    field: "bgtCd",
    headerName: "예산코드",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "divFg",
    headerName: "예산구분",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "dataPath",
    headerName: "예산과목명",
    width: 160,
    headerAlign: "center",
  },
  {
    field: "carrAm",
    headerName: "금액",
    headerAlign: "center",
    ...krAmount,
  },
];

class BgtICFComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgtCDRows: [],
      divCd: "",
      divNm: "",
      divTextField: "",
      bgtGrCd: "",
      bgtGrNm: "",
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
      bgtCDTextField: "",
      bgtDTO: [],
      divRows: [],
      selectedRowId: "",
      selectedRowSq: "",
      isNew: false,
      innerHeight: window.innerHeight
    };

    this.bgtICFRef = createRef();
    this.divRef = createRef();
    this.bgtGrRef = createRef();
    this.bgtCDRef = createRef();
  }

  handleSet = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleGetBgtICFList = (e) => {
    this.bgtICFRef.current.handleGetBgtICFList();
  };

  handleRowAdd = () => {
    this.bgtICFRef.current.handleRowAdd();
  };

  handleRowDelete = () => {
    this.bgtICFRef.current.handleDeleteClick({
      bgtCd: this.state.selectedRowId,
      sq: this.state.selectedRowSq
    })();
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleChangeGisuText = (event, newValue) => {
    console.log("Selected value:", newValue);
    const index = this.state.gisuRows.findIndex((value) => value === newValue);

    this.setState({
      gisuText: newValue,
      gisuRangeText: this.state.gisuRangeRows[index],
    });

    console.log("Selected option index:", index);
  };

  handleChangeGrFgText = (event, newValue) => {
    console.log(newValue);
    this.setState({ grFg: newValue.value, grFgText: newValue.label });
  }

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

  setSelectedRowId = (row) => {
    this.setState({ selectedRowId: row.bgtCd, selectedRowSq: row.sq });
  };

  handleSetDivTextField = (data) => {
    console.log(data);
    this.setState({
      divTextField: data.divCd + ". " + data.divNm,
      divCd: data.divCd,
      divNm: data.divNm,
    });
    console.log(this.state);
  };

  handleSetBgtGrTextField = (data) => {
    this.setState({
      bgtGrTextField: data.bgtGrCd + ". " + data.bgtGrNm,
      bgtGrCd: data.bgtGrCd,
      bgtGrNm: data.bgtGrNm,
    });
  };

  handleClickDivSearchIcon = () => {
    this.divRef.current.initDivDialog();
  };

  handleClickBgtGrSerachIcon = () => {
    this.bgtGrRef.current.initBgtGrDialog();
  };

  handleClickBgtCDSearchIcon = () => {
    this.bgtCDRef.current.initBgtCDDialog();
  };

  handleSetBgtCDTextField = (data) => {
    console.log(data);

    this.setState({ bgtCDTextField: data.bgtCd + ". " + data.bgtNm, bgtCd: data.bgtCd, bgtNm: data.bgtNm });
  };

  handleClickSerachButton = () => {

    BgtICFService.findBgtCdByGisuAndGroupCdAndGrFgAndBgtCd({
      accessToken: this.props.accessToken,
      coCd: this.props.user.coCd,
      divCd: this.state.divCd,
      divNm: this.state.divNm,
      gisu: this.state.gisuText,
      bgtGrCd: this.state.bgtGrCd,
      bgtGrNm: this.state.bgtGrNm,
      grFg: this.state.grFg,
      bgtCd: this.state.bgtCd,
      bgtNm: this.state.bgtNm
    }).then((response) => {
      console.log(response);
      const rowsWithId = response.map((row) => ({
        ...row,
        id: row.bgtCd,  
      }));
      this.setState({ bgtCDRows: rowsWithId });
    });
  };

  componentWillMount() {
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
        gisuRows: gisuRows,
        gisuRangeRows: gisuRangeRows,
        gisuText: gisuRows[gisuRows.length - 1],
        gisuRangeText: gisuRangeRows[gisuRangeRows.length - 1],
      });
      const gisuLenght = gisuRows.length;
      const test = gisuRows[gisuLenght - 1];
      console.log(test);
      console.log(gisuRows.length);
      console.log(gisuRows);
      console.log(gisuRangeRows);
      console.log(gisuRows[gisuRows.lenght - 1]);
    });
  }

  handleClickBgtCDRow = (e) => {
    console.log(e.row);
    // BgtICFService.findBgtICFByCoCdAndBgtCd
    // this.bgtICFRef.current.handleGetBgtICFList();
    this.bgtICFRef.current.getBgtICFList(e.row);
  };

  test = () => {
    alert("Asdf");
    this.bgtICFRef.current.updateBgtICF();
  }

  render() {
    const labelStyle = {
      display: "inline",
    };

    const floatRight = {
      float: "right",
    };

    const { bgtDTO, startDate, mainHeader, divTextField, bgtCDTextField } =
      this.state;

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
            <InputLabel style={labelStyle}>{mainHeader}</InputLabel>
            <Box style={floatRight}>
              <Button onClick={this.handleRowAdd}>추가</Button>
              <Button onClick={this.handleRowDelete}>삭제</Button>
            </Box>
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
              <CustomTextField
                name="bgtGrTextField"
                value={this.state.bgtGrTextField}
                onChange={this.handleInputChange}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.handleClickBgtGrSerachIcon} />
                    </InputAdornment>
                  ),
                }}
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
              <CustomTextField
                name="bgtCd"
                value={bgtCDTextField}
                onChange={this.handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.handleClickBgtCDSearchIcon} />
                    </InputAdornment>
                  ),
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <ListDisplay/>
          </Grid>
        </CustomGridContainer>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sx={{
              // height: `calc(${this.state.innerHeight}px - 345px)`,
              maxHeight: `calc(100vh)`,
            }}
          >
            <DataGrid
              sx={{
                // maxHeight: "calc(100vh - 0px)",
                // fontSize: 10,
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
                borderTop: "3px solid black",
              }}
              columns={BGTCD_COLUMN}
              // editMode="cell"
              rows={this.state.bgtCDRows}
              onRowClick={this.handleClickBgtCDRow}
              hideFooter
              hideFooterRowCount
              hideFooterPagination
              hideFooterSelectedRowCount
              onEditCellChange={this.handleEditCellChange}
            />
          </Grid>
          <Grid item xs={9}>
            <DataGridComponent
              ref={this.bgtICFRef}
              setSelectedRowId={this.setSelectedRowId}
              handleClickSerachButton={this.handleClickSerachButton}
            />
          </Grid>
        </Grid>

        <DivDialogComponent
          ref={this.divRef}
          handleSetDivTextField={this.handleSetDivTextField}
        />

        <BgtGrDialogComponent
          ref={this.bgtGrRef}
          handleSetBgtGrTextField={this.handleSetBgtGrTextField}
        />

        <BgtCDDialogComponent
          ref={this.bgtCDRef}
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
  BgtICFComponent
);
