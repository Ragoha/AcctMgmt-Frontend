import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyService from '../../../service/CompanyService';
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomShortDataGridContainer, CustomShortDialog, CustomShortFormGridContainer } from '../../common/style/CommonDialogStyle';
import { CustomDataGrid, CustomInputLabel, CustomSearchButton, CustomTextField } from '../../common/style/CommonStyle';

const columns =[
  { field: 'coCd', headerName: '회사코드', width: 180, headerAlign: 'center' },
  { field: 'coNm', headerName: '회사명', width: 267, headerAlign: 'center' }
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

//   setCoKeyword = (data) => {
//     this.setState({ keyword: data }, () => {
//       this.handleSearchCoDial(); // 데이터를 설정한 후에 엔터 함수 실행  
//     })
// }

  handleUp = () => {
    this.handleSearchCoDial();
    this.setState({ open: true });
  }

  setCoKeyword = (data) => {
    this.setState({ keyword: data }, () => {
      this.handleSearchCoDial(); // 데이터를 설정한 후에 엔터 함수 실행  
    })
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
    CompanyService.getCoBycoCdAndcoNm({
      accessToken: this.props.accessToken,
      keyword: this.state.keyword,
     })
    .then(
      async (response) => {
        const codialRows = response.map((row) => ({
          id: row.coCd,
          coCd: row.coCd,
          coNm: row.coNm,
        }));
        await this.setState({ codialRows: codialRows });
      }
    );
  };

  handleClickConfirm = async () =>{
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetCodialTextField(this.state.selectedRow);
    this.setState({ keyword: "", selectedRow:"" });
  }

  handleClickCancel = () =>{
    console.log(this.state.selectedRow);
    this.handleDown();
    this.setState({ keyword: "" });
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
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          회사검색
          <IconButton
            size="small"
            onClick={this.handleClickCancel}
          >
            <CustomCloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomShortFormGridContainer
            container
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CustomInputLabel>검색어</CustomInputLabel>
                <CustomTextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  onKeyDown={this.handlePressEnter}
                />
                <CustomSearchButton variant="outlined" sx={{ right: "-50px" }}>
                  <SearchIcon onClick={this.handleSearchCoDial} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.codialRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleClickConfirm}
            >
              확인
            </CustomConfirmButton>
            <Button
              variant="outlined"
              onClick={this.handleClickCancel}
            >
              취소
            </Button>
          </CustomButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(CoDialogComponent);