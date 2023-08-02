import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { Component, createRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import BgtICFService from "../../service/BgtICFService";
import DataGridComponent from "./DatGridComponent";
import BgtGrDialogComponent from "./dialog/BgtGrDialogComponent";
import DivDialogComponent from "./dialog/DivDialogComponent";
import BgtCDDialogComponent from "./dialog/bgtcd/BgtCDDialogComponent";
import AutocompleteWithRemove from "./test";
import { CustomTextField } from "../common/style/CommonStyle";

const BGTCD_COLUMN = [
  { field: "bgtCd", headerName: "예산코드", flex: 1 /* editable: true, */ },
  { field: "bgtFg", headerName: "예산구분", flex: 1 /* editable: true, */ },
  {
    field: "bgtNm",
    headerName: "예산과목명",
    minWidth: 90,
    flex: 1 /* editable: true, */,
  },
  { field: "amount", headerName: "금액", flex: 1 /* editable: true, */ },
];

class BgtICFComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divCd: "",
      divNm: "",
      divTextField: "",
      bgtGrTextField: "",
      bgtCDTextField: "",
      gisuRows: [],
      gisuRangeRows: [],
      frDt: "",
      groupCd: "",
      grFg: "",
      bgtCd: "",
      bgtDTO: [],
      divRows: [],
      selectedRowId: "",
      isNew: false,
    };

    this.childRef = createRef();
    this.divRef = createRef();
    this.bgtGrRef = createRef();
    this.bgtCDRef = createRef();
  }

  handleSet = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleGetBgtICFList = (e) => {
    this.childRef.current.handleGetBgtICFList();
  };

  handleRowAdd = () => {
    this.childRef.current.handleRowAdd();
  };

  handleRowDelete = () => {
    this.childRef.current.handleDeleteClick(this.state.selectedRowId)();
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

  setSelectedRowId = (selectedId) => {
    console.log(this.state);
    this.setState({ selectedRowId: selectedId });
  };

  handleSetDivTextField = async (data) => {
    console.log(data);
    await this.setState({ divTextField: data.divCd + ". " + data.divNm });
    console.log(this.state);
  };

  handleSetBgtGrTextField = async (data) => {
    await this.setState({
      bgtGrTextField: data.bgtGrCd + ". " + data.bgtGrNm,
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

    this.setState({ bgtCDTextField: data.bgtCd + ". " + data.bgtNm });
  };

  componentWillMount() {
    BgtICFService.findGisuByCoCd({
      accessToken: this.props.accessToken,
      user: this.props.user,
    }).then((response) => {

      const gisuRows = response.map((row) => row.gisu);
      // const gisuRows = response.map((row) => ({
      //   label: row.gisu,
      //   gisu: row.gisu
      // }))
      const gisuRangeRows = response.map(
        (row) =>
          dayjs(row.frDt).format("YYYY-MM-DD") +
          " ~ " +
          dayjs(row.toDt).format("YYYY-MM-DD")
      );

      this.setState({ gisuRows: gisuRows, gisuRangeRows: gisuRangeRows });
      console.log(gisuRows);
      console.log(gisuRangeRows);
    });
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
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>예산초기이월등록</span>
          </Grid>
        </Grid>
        <Box>
          {/* <InputLabel style={labelStyle}>예산초기이월등록</InputLabel> */}
          <InputLabel style={labelStyle}>{mainHeader}</InputLabel>
          <Box style={floatRight}>
            <Button onClick={this.handleRowAdd}>추가</Button>
            <Button onClick={this.handleRowDelete}>삭제</Button>
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            // marginLeft: "20px",
            // marginRight: "20px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>회계단위</InputLabel>
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
              <InputLabel sx={{ marginRight: "10px" }}>회계기간</InputLabel>
              <Autocomplete
                disableClearable
                disablePortal
                options={this.state.gisuRows}
                getOptionLabel={(option) => option.toString()}
                size="small"
                sx={{ width: "65px", marginRight: "10px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={this.state.gisuRows[this.state.gisuRows.length - 1]}
                  />
                )}
              />
              <TextField value={this.state.gisuRangeRows[2]}/>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>예산그룹</InputLabel>
              <TextField
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
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>출력구분</InputLabel>
              <Autocomplete
                disableClearable
                disablePortal
                id="combo-box-demo"
                defaultValue="전체"
                options={[
                  { label: "전체", value: "전체" },
                  { label: "수입", value: "수입" },
                  { label: "지출", value: "지출" },
                ]}
                size="small"
                sx={{ width: "90px", marginRight: "10px" }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>예산과목</InputLabel>
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
            <Button onClick={this.handleGetBgtICFList}>조회</Button>
            {/* <AutocompleteWithRemove /> */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DataGrid
              sx={{
                fontSize: 10,
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
              columns={BGTCD_COLUMN}
              // editMode="cell"
              rows={bgtDTO}
              hideFooter
              hideFooterRowCount
              hideFooterPagination
              hideFooterSelectedRowCount
              onEditCellChange={this.handleEditCellChange}
            />
          </Grid>
          <Grid item xs={9}>
            <DataGridComponent
              ref={this.childRef}
              setSelectedRowId={this.setSelectedRowId}
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


export default connect(mapStateToProps, null, null, {forwardRef: true}) (BgtICFComponent);