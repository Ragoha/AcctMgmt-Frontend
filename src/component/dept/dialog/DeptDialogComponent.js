import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DivsService from '../../../service/DivsService';

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
import DeptService from '../../../service/DeptService';

const columns = [
  { field: 'deptCd', headerName: '부서코드', width: 180, headerAlign: 'center' },
  { field: 'deptNm', headerName: '부서명', width: 286, headerAlign: 'center' }
]
const rows = [
  { id: 1, deptCd: "1", deptNm: "John" },
  { id: 2, deptCd: "2", deptNm: "John" },
  { id: 3, deptCd: "3", deptNm: "John" },
]

class DeptDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      selectedRow: { deptCd: "", deptNm: "" }, //클릭된 열의 cd와 이름 
      deptdialRows: [],          //열 배열넣기
      keyword: "",
      rows: rows,
      columns: columns
    }
  }

  handleUp = () => {
    this.setState({ open: true });
    this.handleSearchDeptDial();
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
      this.handleSearchDeptDial();
    }
  }
  //검색
  handleSearchDeptDial = () => {
    DeptService.getDeptBydeptCdAnddeptNm({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
      keyword: this.state.keyword
    })
      .then(
        async (response) => {
          const deptdialRows = response.map((row) => ({
            id: row.deptCd,
            deptCd: row.deptCd,
            deptNm: row.deptNm,
          }));
          await this.setState({ deptdialRows: deptdialRows });
          console.log(this.state);
        }
      );
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetDeptdialTextField(this.state.selectedRow);
    this.setState({ keyword: "" });
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
          부서검색
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
                  <SearchIcon onClick={this.handleSearchDeptDial} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.deptdialRows}
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
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(DeptDialogComponent);