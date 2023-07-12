import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DensityMedium } from "@mui/icons-material";
import "./BudgetComponent.css";
import BudgetService from "../../service/BudgetService";

class BudgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divCd: "",
      frDt: "",
      groupCd: "",
      grFg: "",
      bgtCd: "",
      bgtDTO: [],
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { divCd, frDt, groupCd, grFg, bgtCd } = this.state;
    const formData = { divCd, frDt, groupCd, grFg, bgtCd };
    BudgetService.getBGT(formData)
      .then((bgtDTO) => {
        console.log(bgtDTO);
        this.setState({ bgtDTO });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      bgtDTO : [...prevState.bgtDTO, updatedRows],
    }));
  };

  render() {
    const labelStyle = {
      display: "inline",
    };

    const floatRight = {
      float: "right",
    };

    const { bgtDTO } = this.state;

    return (
      <Container>
        <Box>
          <DensityMedium />
          <InputLabel style={labelStyle}>예산초기이월등록</InputLabel>
          <Box style={floatRight}>
            <Button onClick={this.handleSearch}>조회</Button>
            <Button onClick={this.handleAddRow}>추가</Button>
            <Button>저장</Button>
            <Button>삭제</Button>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{ display: "inline" }}>회계단위</InputLabel>
            <TextField
              name="divCd"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ display: "inline" }}>회계기간</InputLabel>
            <TextField
              name="frDt"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ display: "inline" }}>예산그룹</InputLabel>
            <TextField
              name="groupCd"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ display: "inline" }}>출력구분</InputLabel>
            <TextField
              name="grFg"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ display: "inline" }}>예산과목</InputLabel>
            <TextField
              name="bgtCd"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DataGrid
              sx={{ fontSize: 10 }}
              columns={[
                {
                  field: "bgtCd",
                  headerName: "예산코드",
                  flex: 1,
                  editable: true,
                },
                {
                  field: "bgtFg",
                  headerName: "예산구분",
                  flex: 1,
                  editable: true,
                },
                {
                  field: "bgtNm",
                  headerName: "예산과목명",
                  minWidth: 90,
                  flex: 1,
                  editable: true,
                },
                {
                  field: "amount",
                  headerName: "금액",
                  flex: 1,
                  editable: true,
                },
              ]}
              editMode="cell"
              rows={bgtDTO}
              hideFooter
              hideFooterRowCount
              hideFooterPagination
              hideFooterSelectedRowCount
              onEditCellChange={this.handleEditCellChange}
            />
          </Grid>
          <Grid item xs={9}>
            <DataGrid
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
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default BudgetComponent;
