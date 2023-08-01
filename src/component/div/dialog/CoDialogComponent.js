import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import CompanyService from '../../../service/CompanyService';

const columns =[
  { field: 'coCd', headerName: '회사코드', width: 180.3, headerAlign: 'center' },
  { field: 'coNm', headerName: '회사명', width: 270.4, headerAlign: 'center' }
]
const rows = [
  { id: 1, coCd: "1", coNm: "John" },
  { id: 2, coCd: "2", coNm: "John" },
  { id: 3, coCd: "3", coNm: "John" },
]

class CoDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      selectedRow: { coCd: "", coNm: "" }, //클릭된 열의 cd와 이름 
      codialRows: [],          //열 배열넣기
      keyword: "",
      rows: rows,
      columns: columns
    }
  }

  handleUp = () => {
    this.setState({ open: true });
  }

  handleDown = () => {
    this.setState({ open: false });
  }
  
  //텍스트필드변화
  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  }
  //엔터키 입력처리
  handlePressEnter= (e) => {
    if (e.key === "Enter") {
    this.handleSearchCoDial();
    }
  }
  //검색
  handleSearchCoDial= () => {
    CompanyService.getCoBycoCdAndcoNm(this.state.keyword)
    .then(
      async (response) => {
        const codialRows = response.map((row) => ({
          id: row.coCd,
          coCd: row.coCd,
          coNm: row.coNm,
        }));
        await this.setState({ codialRows: codialRows });
        console.log(this.state);
      }
    );
  };

  handleClickConfirm = async () =>{
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetCodialTextField(this.state.selectedRow);
  }

  //열 클릭처리
  handleClickRow= (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
  }

  render() {
    const { open, columns } = this.state;

    return (
      //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
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
        >회사검색
          {this.props.DialogTitle}
          <IconButton
            size="small"
            onClick={() =>
              this.setState({ open: false })
            }>
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
              position: 'relative'
            }}
          >
            <Grid mb={2} sx={{ position: 'relative' }}></Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 1,
              }}
            >
              <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                검색
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
                style={{ padding: "0px", minWidth: "5px", position: 'absolute', right: "5px" }}
              >
                <SearchIcon fontSize="medium" onClick={this.handleSearchCoDial}/>
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
                rows={this.state.codialRows}
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
export default CoDialogComponent;