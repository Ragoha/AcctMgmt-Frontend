import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import PjtService from '../../../service/PjtService';
import {
  CustomButtonGridContainer,
  CustomCloseIcon,
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog,
  CustomShortFormGridContainer,
} from "../../common/style/CommonDialogStyle";
import {
  CustomDataGrid,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../../common/style/CommonStyle";

const columns = [
  { field: 'check', headerName: '', width: 10, headerAlign: 'center' },
  { field: 'pjtCd', headerName: '프로젝트코드', width: 180, headerAlign: 'center' },
  { field: 'pjtNm', headerName: '프로젝트명', width: 286, headerAlign: 'center' }
]
const rows = [
  { id: 1, pjtCd: "1", pjtNm: "John" },
  { id: 2, pjtCd: "2", pjtNm: "John" },
  { id: 3, pjtCd: "3", pjtNm: "John" },
]

class PjtDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      selectedRow: { pjtCd: "", pjtNm: "" }, //클릭된 열의 cd와 이름 
      pjtRows: [],          //열 배열넣기
      keyword: "",
      rows: rows,
      columns: columns
    }
  }

  handleUp = () => {
    this.setState({ open: true });

    this.handleSearchPjt();
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
      this.handleSearchPjt();
    }
  }
  //검색
  handleSearchPjt = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    PjtService.getPjtBy(this.state.keyword, coCd)
      .then(
        async (response) => {
          const pjtRows = response.map((row) => ({
            id: row.pjtCd,
            pjtCd: row.pjtCd,
            pjtNm: row.pjtNm,
          }));
          await this.setState({ pjtRows: pjtRows}, () => {
            console.log(this.state);
          });
        }
      );
  };

  handleClickConfirm = async () => {
    if (!this.state.selectedRow.pjtCd || !this.state.selectedRow.pjtNm) {
      // 선택된 값이 없거나 빈 값인 경우
      const emptyRow = { pjtCd: "", pjtNm: "" };
      this.setState({ selectedRow: emptyRow }); // 선택된 값을 빈 값으로 설정
    }
  
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetPjtTextField(this.state.selectedRow);
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
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          프로젝트코드
          <IconButton
            size="small"
            onClick={() => this.setState({ open: false })}
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
                  <SearchIcon onClick={this.handleSearchPjt} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.pjtRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton variant="outlined" onClick={this.handleClickConfirm}>
              확인
            </CustomConfirmButton>
            <Button variant="outlined" onClick={() => this.setState({ open: false })}>
              취소
            </Button>
          </CustomButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(PjtDialogComponent);
// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCD);