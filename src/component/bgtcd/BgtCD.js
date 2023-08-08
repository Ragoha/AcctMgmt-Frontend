import { Autocomplete, Box, Button, Container, Grid, InputLabel, TextField } from "@mui/material";
import React, { Component } from 'react';
import ListIcon from "@mui/icons-material/List";
import SearchIcon from '@mui/icons-material/Search';
import BgtCDService from "../../service/BgtCDService";
import BgtCDDevFgCustom from "./modal/BgtCDDevFgCustom";
import BgtCDAddSubDialog from "./modal/BgtCDAddSubDialog";
import BgtCDDetailInfo from "./BgtCDDetailInfo";
import BgtCDDatagrid from "./BgtCDDatagrid";
import BgtCDGroupModal from "./modal/BgtCDEzSearch";
import BgtCDGroupReg from "./modal/BgtCDGroupReg";
import BgtCDDropDownBox from "./BgtCDDropDownBox";
import { SET_DETAILINFO, SET_GROUPCD } from '../../store/BgtCDStore';
import { connect } from 'react-redux';
import BgtCDSubReg from "./modal/BgtCDSubReg";
import { CustomBtnBgtcd, CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomSearchButton, CustomSelect, CustomTextField } from "../common/style/CommonStyle";
import PostAddIcon from "@mui/icons-material/PostAdd";
class BgtCD extends Component {
  constructor(props) {
    super(props);
    this.BgtCDDevFgCustom = React.createRef();
    this.BgtCDAddSubDialog = React.createRef();
    this.BgtDataGrid = React.createRef();
    this.BgtCDDetailInfo = React.createRef();
    this.BgtCDGroupModal = React.createRef();
    this.BgtCDGroupReg = React.createRef();
    this.BgtCDDropDownBox = React.createRef();
    this.state = {
      kimChiBox: this.props.kimChiBox,
      open: false,
      rows: [],
      focus: null,

    }
  }
  /*상단 조건 검색바 start*/

  /*상단 조건 검색바 end  */
  setDetailInfo = (target) => {
    console.log('---BgtCD의 setDetailInfo 함수---')
    console.log(target)
    this.BgtCDDetailInfo.current.setDetailInfo(target);
    console.log('---BgtCD의 setDetailInfo 함수 끝임 ㅇㅇㅇㅇㅇ')
  }

  /*데이터그리드 부분 start*/
  getDataGridRows() { //groupcd를 받아서 최초의 데이터를 뿌리는 화면 
console.log('데이터체크')
    const {coCd} = this.props.userInfo;
    const {accessToken } = this.props;
// console.log('토큰씨 :' +  accessToken + " coCd: " +coCd)
    BgtCDService.getGridData(coCd ,accessToken)
      .then(rows => {
        console.log('통신성공')
        console.dir(rows) //데이터 받았음 .
        this.setState({ rows }, () => console.log(this.state));
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  /*---로우 추가 관련된 메서드 start---*/
  //데이터 그리드에 추가하는 기능
  //[230728] TreeView 수정했는데 addRow 로직은 아직 변경하지 않음 한번 손봐야함
  //[230808] 
  handleRowAdd = () => {
    const bgtCd = this.BgtCDDetailInfo.current.getBgtCd();
    const {coCd} = this.props.userInfo;
    const {accessToken } = this.props;
    const data = {bgtCd:bgtCd , coCd :coCd}
    BgtCDService.getAddRowData(data,accessToken)
    .then(data=>{

    })
    // const newRows = [
    //   ...this.state.rows,
    //   { dataPath: dataPath, bgtCd: "", bgtNm: "", isNew: true },
    // ];
    // this.setState({ rows: newRows });
  };
  /*---로우 추가 관련된 메서드 end---*/


  /*  데이터 그리드 부분 end */
  /* DetailInfo부분 */

  /* 모달창  */
  /*BgtCDDevFgCustomOpen*/
  BgtCDDevFgCustomOpen = () => {
    this.BgtCDDevFgCustom.current.handleUp();
  }
  BgtCDAddSubDialogOpen = () => {
    this.BgtCDAddSubDialog.current.handleUp();
  }
  BgtCDGroupRegOpen = () => {
    this.BgtCDGroupReg.current.handleUp();
  }
  selectBgtCDDropDownBox=(openWhat)=>{
    console.log('오픈왓 :' + openWhat) //BgtCDDevFgCustomOpen
    this[openWhat]();
  }

  render() {
    const { rows, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd } = this.state;
    return (
      <>
        <CustomHeaderGridContainer
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container>
              <PostAddIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>예산과목등록</CustomHeaderInputLabel>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <CustomBtnBgtcd
                onClick={this.handleRowAdd}
                variant="primary"
                style={{
                  marginLeft: "auto",
                  marginRight: "10px",
                  //border: "1px solid",
                }}
              >
                추 가
              </CustomBtnBgtcd>
              <CustomBtnBgtcd
                variant="primary"
                size="medium"
                onClick={() => this.getDataGridRows()}
                style={{ marginRight: "10px", border: "1px solid" }}
              >
                Grid채우기
              </CustomBtnBgtcd>
              <CustomBtnBgtcd
                variant="primary"
                size="medium"
                style={{ marginRight: "10px", border: "1px solid" }}
                onClick={this.BgtCDAddSubDialogOpen}
              >
                예산과목추가
              </CustomBtnBgtcd>
              {/* 기능모음 드롭다운박스 */}
              <BgtCDDropDownBox
                selectBgtCDDropDownBox={this.selectBgtCDDropDownBox}
              />
            </Grid>
          </Grid>
        </CustomHeaderGridContainer>
        <CustomGridContainer
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산그룹</CustomInputLabel>
              <CustomSelect />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산과목코드</CustomInputLabel>
              <CustomTextField />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  <CustomInputLabel>예산과목명</CustomInputLabel>
                  <CustomTextField />
                </Grid>
              </Grid>
              <Grid item>
                <CustomSearchButton
                  variant="outlined"
                  onClick={this.handleClickSerachButton}
                  sx={{ marginLeft: "auto" }}
                >
                  <SearchIcon />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </Grid>
        </CustomGridContainer>
        <Grid container spacing={2} direction="row">
          <Grid item xs={7}>
            <BgtCDDatagrid
              ref={this.BgtDataGrid}
              rows={rows}
              setDetailInfo={this.setDetailInfo}
            />
          </Grid>
          <Grid item xs={5}>
            <BgtCDDetailInfo
              ref={this.BgtCDDetailInfo}
              prevBgtCd={prevBgtCd}
              ctlFg={ctlFg}
              bgajustFg={bgajustFg}
              bottomFg={bottomFg}
              bizFg={bizFg}
            />
            {/*자식컴포넌트에 state를 props로 전달 */}
          </Grid>
        </Grid>
        <BgtCDDevFgCustom ref={this.BgtCDDevFgCustom} />
        <BgtCDAddSubDialog ref={this.BgtCDAddSubDialog} />
        {/*예산그룹등록 */}
        <BgtCDGroupReg ref={this.BgtCDGroupReg} />
        {/*그룹레벨설정 */}
      </>
    );

  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  //groupcd: state.BgtCDStore || {}

});

const mapDispatchToProps = (dispatch) => {
  return {
    SET_GROUPCD: (response) => dispatch(SET_GROUPCD(response)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCD);