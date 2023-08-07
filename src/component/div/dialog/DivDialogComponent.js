import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import CompanyService from '../../../service/CompanyService';
import DivsService from '../../../service/DivsService';

const columns = [
  { field: 'divCd', headerName: '사업장코드', width: 180, headerAlign: 'center' },
  { field: 'divNm', headerName: '사업장명', width: 286, headerAlign: 'center' }
]
const rows = [
  { id: 1, divCd: "1", divNm: "John" },
  { id: 2, divCd: "2", divNm: "John" },
  { id: 3, divCd: "3", divNm: "John" },
]

class CoDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      selectedRow: { divCd: "", divNm: "" }, //클릭된 열의 cd와 이름 
      divdialRows: [],          //열 배열넣기
      keyword: "",
      rows: rows,
      columns: columns
    }
  }

  handleUp = () => {
    this.setState({ open: true });
    DivsService.getDivBydivCdAnddivNm(this.state.keyword)
      .then(
        async (response) => {
          const divdialRows = response.map((row) => ({
            id: row.divCd,
            divCd: row.divCd,
            divNm: row.divNm,
          }));
          await this.setState({ divdialRows: divdialRows });
          console.log(this.state);
        }
      );
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
  handlePressEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSearchCoDial();
    }
  }
  //검색
  handleSearchDivDial = () => {
    DivsService.getDivBydivCdAnddivNm(this.state.keyword)
      .then(
        async (response) => {
          const divdialRows = response.map((row) => ({
            id: row.divCd,
            divCd: row.divCd,
            divNm: row.divNm,
          }));
          await this.setState({ divdialRows: divdialRows });
          console.log(this.state);
        }
      );
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetDivdialTextField(this.state.selectedRow);
  }

  //열 클릭처리
  handleClickRow = (params) => {
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
            padding: 2
          }}
        >사업장검색
          {this.props.DialogTitle}
          <IconButton
            size="small"
            onClick={() =>
              this.setState({ open: false })
            }>
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
                  style={{
                    padding: "0px",
                    minWidth: "5px",
                    position: "relative",
                    right: "-66px",
                  }}
                >
                  <SearchIcon fontSize="medium" onClick={this.handleSearchDivDial} />
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
              rows={this.state.divdialRows}
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
export default CoDialogComponent;