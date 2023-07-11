import { DensityMedium } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, InputLabel, TextField } from "@mui/material";
import { Component } from "react";
import "./BudgetComponent.css";
import { DataGrid } from "@mui/x-data-grid";
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
    };
  }


  haldleSearch = (e) => {
    e.preventDefault();
    const { divCd, frDt, groupCd, grFg, bgtCd } = this.state;
    const formData = { divCd, frDt, groupCd, grFg, bgtCd };
    BudgetService.getBGT(formData);
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const labelStyle = {
      display: "inline",
    };

    const floatRight = {
      float: "right",
    };

    return (
      <Container>
        <Box>
          <DensityMedium />
          <InputLabel style={labelStyle}>예산초기이월등록</InputLabel>
          <Box style={floatRight}>
            <Button>추가</Button>
            <Button onClick={this.haldleSearch}>저장</Button>
            <Button>삭제</Button>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx="display:inline;">회계단위</InputLabel>
            <TextField
              name="divCd"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx="display:inline;">회계기간</InputLabel>
            <TextField
              name="frDt"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx="display:inline;">예산그룹</InputLabel>
            <TextField
              name="groupCd"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx="display:inline;">출력구분</InputLabel>
            <TextField
              name="grFg"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx="display:inline;">예산과목</InputLabel>
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
              columns={[
                { field: "bgtCd", headerName: "예산코드", flex: 1 },
                { field: "divFg", headerName : "예산구분", flex: 1 },
                { field: "bgtNm", headerName: "예산과목명", minWidth: 90, flex: 1 },
                { field: "carrAm" ,headerName: "금액", flex: 1 },
              ]}
              rows={[
                { id: 1, code: 1, name: "React" },
                { id: 2, code: 2, name: "MUI" },
                { id: 3, name: "MUI" },
              ]}
              hideFooter
              hideFooterRowCount
              hideFooterPagination
              hideFooterSelectedRowCount
            />
          </Grid>
          <Grid item xs={9}>
            <DataGrid
              sx=""
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