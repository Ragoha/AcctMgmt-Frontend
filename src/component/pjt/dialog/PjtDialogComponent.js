import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import { Button, IconButton, Checkbox } from '@mui/material';
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
  { field: 'pjtCd', headerName: '프로젝트코드', width: 180, headerAlign: 'center' },
  { field: 'pjtNm', headerName: '프로젝트명', width: 200, headerAlign: 'center' }
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
      columns: columns,
      selectedRowIds: [], // 선택된 행 ID를 저장하는 배열
      selectedRows: [], // 선택된 행을 추적하는 배열 추가
    }
  }

  isSelected = (id) => this.state.selectedRowIds.includes(id);

  setPjtKeyword = (data) => {
    this.setState({ keyword: data }, () => {
      this.handleSearchPjt(); // 데이터를 설정한 후에 엔터 함수 실행  
    })
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
    const {keyword} = this.state;
    PjtService.getPjtBy({
      keyword, coCd,
      accessToken: this.props.accessToken,
    })
      .then(
        async (response) => {
          const pjtRows = response.map((row) => ({
            id: row.pjtCd,
            pjtCd: row.pjtCd,
            pjtNm: row.pjtNm,
          }));
          await this.setState({ pjtRows: pjtRows });
          this.setState({ keyword: '' });
        }
      );
  };

  handleClickConfirm = async () => {
    if (!this.state.selectedRow.pjtCd || !this.state.selectedRow.pjtNm) {
      // 선택된 값이 없거나 빈 값인 경우
      const emptyRow = { pjtCd: "", pjtNm: "" };
      await this.props.handleSetPjtTextField(emptyRow); // 빈 값의 데이터를 부모로 전달
      this.setState({ selectedRow: emptyRow, keyword: '', pjtRows: [] }); // 선택된 값을 빈 값으로 설정
      this.handleDown();
    } else {
      this.handleDown();
      const selectedRow = this.state.selectedRow;
      await this.props.handleSetPjtTextField(selectedRow); // 선택된 데이터를 부모로 전달
      this.setState({ selectedRow: { pjtCd: "", pjtNm: "" }, keyword: '', pjtRows: [] }); // 선택된 값을 빈 값으로 설정
    }
    // 선택된 행 데이터를 추적하는 배열 초기화
    this.setState({ selectedRows: [] });
  };



  //열 클릭처리
  handleClickRow = (params) => {
    if (params && params.row) {
      this.setState({ selectedRow: params.row }, () => {
        console.log("click : ", this.state.selectedRow);
      });
    } else {
      this.setState({
        selectedRow: { pjtCd: "", pjtNm: "" },
        pjtRows: [],  // 선택되지 않았을 때 pjtRows도 빈 값으로 초기화
        keyword: '', // 선택되지 않았을 때 keyword도 빈 값으로 초기화
      }, () => {
      });
    }
  }


  render() {
    const { open, columns, keyword } = this.state;

    return (
      //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          프로젝트검색
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
                  value={this.state.keyword || this.keyword}
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
              // checkboxSelection
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              onRowClick={this.handleClickRow}
              hideFooter
            // onSelectionModelChange={(newSelection) => {
            //   this.handleRowCheckboxClick(newSelection);
            // }}
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
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(PjtDialogComponent);
// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCD);