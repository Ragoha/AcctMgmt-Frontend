import React, { Component, createRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import BudgetService from "../../service/BudgetService";
import DataGridComponent from "./DatGridComponent";
import SearchIcon from "@mui/icons-material/Search";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BGTCD_COLUMN = [
  {field: "bgtCd", headerName: "예산코드", flex: 1, /* editable: true, */ },
  {field: "bgtFg", headerName: "예산구분", flex: 1, /* editable: true, */ },
  {field: "bgtNm", headerName: "예산과목명", minWidth: 90, flex: 1, /* editable: true, */},
  {field: "amount", headerName: "금액", flex: 1, /* editable: true, */ },
]
              




class BudgetInitCarryForwordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divCd: "",
      frDt: "",
      groupCd: "",
      grFg: "",
      bgtCd: "",
      bgtDTO: [],
      selectedRowId: "",
    };

    this.childRef = createRef();
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { divCd, frDt, groupCd, grFg, bgtCd } = this.state;
    const formData = { divCd, frDt, groupCd, grFg, bgtCd };
    BudgetService.getBGT(formData)
      .then((bgtDTO) => {
        console.log(bgtDTO);
        this.setState({ bgtDTO });
        const data = {
          id: bgtDTO.bgtCd,
          bgtNm: bgtDTO.bgtNm,
        };
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleRowAdd = () => {
    this.childRef.current.handleRowAdd();
  };

  handleRowDelete = () => {
    console.log(this.state.selectedRowId);
    this.childRef.current.handleDeleteClick(this.state.selectedRowId)();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
    console.log(`여기잖아 "${selectedId}"`);
    this.setState({ selectedRowId: selectedId }, () => {
      console.log(this.state);
    });
  }

  render() {
    const labelStyle = {
      display: "inline",
    };

    const floatRight = {
      float: "right",
    };

    const { bgtDTO, startDate, mainHeader, selectedRowId } = this.state;

    return (
      <>
        <Box>
          {/* <InputLabel style={labelStyle}>예산초기이월등록</InputLabel> */}
          <InputLabel style={labelStyle}>{mainHeader}</InputLabel>
          <Box style={floatRight}>
            <Button onClick={this.handleRowAdd}>추가</Button>
            <Button onClick={this.handleRowDelete}>삭제</Button>
          </Box>
        </Box>
        <Divider variant="middle" />
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
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>회계단위</InputLabel>
              <TextField
                name="divCd"
                onChange={this.handleInputChange}
                size="small"
                sx={{ width: "220px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>회계기간</InputLabel>
              <Autocomplete
                disableClearable
                disablePortal
                id="combo-box-demo"
                options={[
                  { label: "1", gisu: 1 },
                  { label: "2", gisu: 2 },
                  { label: "3", gisu: 3 },
                  { label: "13", gisu: 3 },
                ]}
                size="small"
                sx={{ width: "65px", marginRight: "10px" }}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              {/* <DatePicker
                  slotProps={{
                    textField: { size: "small" },
                  }}
                /> */}
              <ReactDatePicker
                showWeekNumbers
                showTimeInput
                showTimeSelect
                dateFormat="yyyy-mm-dd"
                isClearable
                showIcon
                selected={startDate}
                onChange={this.dateChange}
              />
              {/* </LocalizationProvider> */}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>예산그룹</InputLabel>
              <TextField
                name="groupCd"
                onChange={this.handleInputChange}
                size="small"
                sx={{ width: "220px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>출력구분</InputLabel>
              <Autocomplete
                disableClearable
                disablePortal
                id="combo-box-demo"
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
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center">
              <InputLabel sx={{ marginRight: "10px" }}>예산과목</InputLabel>
              <TextField
                name="bgtCd"
                onChange={this.handleInputChange}
                size="small"
                sx={{ width: "220px" }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={this.handleSearch}>조회</Button>
          </Grid>
        </Grid>
        <Divider variant="middle" />
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
            {/* <DataGrid
              columns={[
                { field: "사업" },
                { field: "하위사업" },
                { field: "이월금액" },
                { field: "사고이월금액" },
                { field: "명시이월금액" },
                { field: "예비이월금액" },
                { field: "적요" },
                { field: "입력구분" },
                { field: "작성자" },
              ]}
              rows={[
                { id: 1, name: "React" },
                { id: 2, name: "MUI" },
              ]}
              hideFooterPagination
              hideFooterSelectedRowCount
            /> */}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default BudgetInitCarryForwordComponent;
