import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PgrService from '../../../service/PgrService';

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
  { field: 'pgrCd', headerName: '프로젝트그룹코드', width: 230, headerAlign: 'center' },
  { field: 'pgrNm', headerName: '프로젝트그룹명', width: 200, headerAlign: 'center' }
]

class PgrDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      selectedRow: { pgrCd: "", pgrNm: "" }, //클릭된 열의 cd와 이름 
      pgrRows: [],          //열 배열넣기
      keyword: "",
      rows: [],
      columns: columns
    }
  }

  handleUp = () => {
    this.setState({ open: true });
    this.handleSearchPgr();

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
      this.handleSearchPgr();
    }
  }
  //검색
  handleSearchPgr = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    const {keyword}= this.state;
    PgrService.getPgrBy({keyword, coCd,
      accessToken: this.props.accessToken,
    })
      .then(
        async (response) => {
          const pgrRows = response.map((row) => ({
            id: row.pgrCd,
            pgrCd: row.pgrCd,
            pgrNm: row.pgrNm,
          }));
          await this.setState({ pgrRows: pgrRows });
          console.log(this.state);
        }
      );
  };

  handleClickConfirm = async () => {
    if (!this.state.selectedRow.pgrCd || !this.state.selectedRow.pgrNm) {
      // 선택된 값이 없거나 빈 값인 경우
      const emptyRow = { pgrCd: "", pgrNm: "" };
      await this.props.handleSetPgrTextField(emptyRow); // 빈 값의 데이터를 부모로 전달
      this.setState({ selectedRow: emptyRow, keyword: '', pgrRows: [] }); // 선택된 값을 빈 값으로 설정
      this.handleDown();
    } else {
      this.handleDown();
      const selectedRow = this.state.selectedRow;
      await this.props.handleSetPgrTextField(selectedRow); // 선택된 데이터를 부모로 전달
      this.setState({ selectedRow: { pgrCd: "", pgrNm: "" }, keyword: '', pgrRows: [] }); // 선택된 값을 빈 값으로 설정
    }
  }

  //열 클릭처리
  handleClickRow = (params) => {
    if (params && params.row) {
      this.setState({ selectedRow: params.row }, () => {
        console.log("click : ", this.state.selectedRow);
      });
    } else {
      this.setState({
        selectedRow: { pgrCd: "", pgrNm: "" },
        pgrRows: [],  // 선택되지 않았을 때 pgrRows도 빈 값으로 초기화
        keyword: '', // 선택되지 않았을 때 keyword도 빈 값으로 초기화
      }, () => {
      });
    }
  }

  render() {
    const { open, columns } = this.state;

    return (
      //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          프로젝트그룹검색
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
                <CustomInputLabel>그룹검색어</CustomInputLabel>
                <CustomTextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword || this.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  onKeyDown={this.handlePressEnter}
                />
                <CustomSearchButton
                  variant="outlined"
                  sx={{ right: "-30px" }}
                >
                  <SearchIcon onClick={this.handleSearchPgr} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.pgrRows}
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
              onClick={() => this.setState({ open: false })}
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
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(PgrDialogComponent);
// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCD);