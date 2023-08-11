import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BgtCDService from "../../service/BgtCDService";
import { SET_GROUPCD } from '../../store/BgtCDStore';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomSearchButton, CustomSelect, CustomTextField } from "../common/style/CommonStyle";
import BgtCDDatagrid from "./BgtCDDatagrid";
import BgtCDDetailInfo from "./BgtCDDetailInfo";
import BgtCDDropDownBox from "./BgtCDDropDownBox";
import BgtCDAddSubDialog from "./modal/BgtCDAddSubDialog";
import BgtCDDevFgCustom from "./modal/BgtCDDevFgCustom";
import BgtCDGroupReg from "./modal/BgtCDGroupReg";
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
      open: false,
      rows: [],
      //focus: null,
      top100Films: [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },],


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
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    // console.log('토큰씨 :' +  accessToken + " coCd: " +coCd)
    BgtCDService.getGridData(coCd, accessToken)
      .then(rows => {
        // console.log('통신성공')
        // console.dir(rows) //데이터 받았음 .
        this.setState({ rows });
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  /*---로우 추가 관련된 메서드 start---*/
  //데이터 그리드에 추가하는 기능
  //[230808] 
  handleRowAdd = () => {
    const bgtCd = this.BgtCDDetailInfo.current.getBgtCd();
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    const data = { bgtCd: bgtCd, coCd: coCd }
    BgtCDService.getAddRowData(data, accessToken)
      .then(data => {
        // console.log('handleRowAdd 리턴하고 보자 BGTCD야 여긴')
        // console.dir(data);
        // console.log(data.dataPath);
        // console.log(data.bgtCd);
        // console.log('여기까진 나와야 돼 ')f
        const dataPath = data.dataPath;
        const bgtCd = data.bgtCd;
        const newRows = [
          ...this.state.rows,
          { dataPath: dataPath, bgtCd: bgtCd, bgtNm: "", isNew: true },
        ];
        this.setState({ rows: newRows });
        this.BgtCDDetailInfo.current.setDetailInfoAfterAddRow(data);
      })
  };
  updateDetailInfo = () => {
    const { accessToken } = this.props;
    let updateData;
    updateData = this.BgtCDDetailInfo.current.getDetailInfo();
    BgtCDService.updateDetailInfo(updateData, accessToken)
      .then(response => {
      }).catch(error => {
        console.error("Error fetching data:", error);
      });

    // }

  }

  //추가된 로우에 데이터를 입력하고 DB로 보내는 메서드
  insertAddRow = (data) => {
    console.log('BgtCd의 insertAddRow입니다.')
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    data.coCd = coCd;
    const detailInfo = this.BgtCDDetailInfo.current.selectData();
    data.ctlFg = detailInfo.ctlFg;
    data.bgajustFg = detailInfo.bgajustFg;
    data.bizFg = detailInfo.bgajustFg;
    data.toDt = detailInfo.toDt;
    data.bottomFg = detailInfo.bottomFg;
    data.insertId = this.props.userInfo.empId;
    BgtCDService.insertAddRow(data, accessToken);

  }


  /*---로우 추가 관련된 메서드 end---*/


  /*  데이터 그리드 부분 end */
  /* DetailInfo부분 */

  /* 모달창  */
  /*BgtCDDevFgCustomOpen*/
  BgtCDDevFgCustomOpen = () => {
    this.BgtCDDevFgCustom.current.handleUp();
  }
  BgtCDAddSubDialogOpen = () => {
    this.BgtCDAddSubDialog.current.initStart();
  }
  BgtCDGroupRegOpen = () => {
    this.BgtCDGroupReg.current.handleUp();
  }
  selectBgtCDDropDownBox = (openWhat) => {
    console.log('오픈왓 :' + openWhat) //BgtCDDevFgCustomOpen
    this[openWhat]();
  }

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleClickSubCodeSearchIcon = () => {
    this.BgtCDAddSubDialog.current.handleUp();
  };


  render() {
    const { rows, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd, top100Films } = this.state;
    const defaultProps = {
      options: top100Films,
      getOptionLabel: (option) => option.title,
    };
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
              <CustomHeaderInputLabel>예산과목등록
                <CustomSearchButton></CustomSearchButton>
              </CustomHeaderInputLabel>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Button
                onClick={this.handleRowAdd}
                variant="outlined"
                style={{
                  marginRight: "8px",
                  //border: "1px solid",
                }}
              >
                추 가
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.getDataGridRows()}
                style={{ marginRight: "8px" }}
              >
                Grid채우기
              </Button>
              <Button
                variant="outlined"
                style={{ marginRight: "8px" }}
                onClick={this.BgtCDAddSubDialogOpen}
              >
                예산과목추가
              </Button>
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
              <CustomTextField
                name="subCode"
                // value={divTextField}
                onChange={this.handleInputChange}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.handleClickSubCodeSearchIcon} /> 
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산과목코드</CustomInputLabel>
              <CustomTextField></CustomTextField>
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
              insertAddRow={this.insertAddRow}
              getDataGridRows={this.getDataGridRows}
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
              updateDetailInfo={this.updateDetailInfo}
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