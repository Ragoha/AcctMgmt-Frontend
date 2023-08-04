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
import { SET_DETAILINFO ,SET_GROUPCD } from '../../store/BgtCDStore';
import { connect } from 'react-redux';
import BgtCDSubReg from "./modal/BgtCDSubReg";
import { CustomGridContainer, CustomInputLabel } from "../common/style/CommonStyle";


{/* <Autocomplete
variant=""
size="small"

openOnFocus
// clearOnEscape
options={[
   { label: "간편검색", value: "" },
   { label: "예산그룹등록", value: "deran" },
   { label: "예산과목복사", value: "deran" },
   { label: "과목분류명등록", value: "deran" },
   { label: "회계계정과목복사", value: "deran" },
   { label: "예산과목엑셀업로드", value: "deran" },
   { label: "예산과목 일괄설정", value: "deran" },
]}
sx={{ width: '200px', marginRight: '50px',}}// backgroundColor: "#7895CB",

renderInput={(params) => <TextField {...params} />}
></Autocomplete> */}

class BgtCD extends Component {
    constructor(props) {
        super(props);
        this.BgtCDDevFgCustom = React.createRef();
        this.BgtCDAddSubDialog = React.createRef();
        this.BgtDataGrid = React.createRef();
        this.BgtCDDetailInfo = React.createRef();
        this.BgtCDGroupModal = React.createRef();
        this.BgtCDGroupReg = React.createRef();
        this.state = {
            kimChiBox: this.props.kimChiBox,
            open: false,
            rows: [],
            groupcd: '101',
            focus: null,

        }
    }
  componentDidMount() {
    console.log("여기");
    console.log(this.props.accessToken);
        console.log(this.state.kimChiBox);
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
        const {groupcd}  = this.props.groupcd;
        console.log('이상하네:'+groupcd)
        BgtCDService.getGridData(groupcd)
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
    handleRowAdd = () => {
        const dataPath= this.BgtDataGrid.current.getDataPathFromDataGrid()+"                   ";
        console.log("여긴 handleRowAdd: "+dataPath);
        const newRows = [
            ...this.state.rows,
            { dataPath: dataPath, bgtCd: "abckk", bgtNm: "abc", isNew: true },
        ];
        this.setState({ rows: newRows });
    };
    /*---로우 추가 관련된 메서드 end---*/

        // *일단 로우를 특정하기 성공했고 
        /*[230803] 혹시 만약 참고할거면 하고 위에 addRow기능 성공했으면 지워도 되는 코드
        //DetailInfo 에 저장된 BgtCd 값을 가져와 ->
        // console.log('추가버튼')
        // console.log(this.BgtCDDetailInfo.current.getBgtCd());
        // const bgtCd = this.BgtCDDetailInfo.current.getBgtCd();
        // console.log(bgtCd);
        // BgtCDService.getPath(bgtCd)
        //     .then((path) => {
        //         console.log("패스는 ? : " + path) //이 패스는 현재 찍은 위치의 path이다
        //         const newRows = [
        //             ...this.state.rows,
        //             { dataPath: path, defNm: "", bgtCd: "", bgtNm: "", isNew: true },
        //         ];
        //         this.setState({ rows: newRows });
        //     })
        */
   
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
    render() {
        const { rows, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd } = this.state;
        return (
          <>
            <Grid container spacing={2} padding={0}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <ListIcon fontSize="large" />
                  </Grid>
                  <Grid item>
                    <span>예산과목등록</span>
                  </Grid>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={this.handleRowAdd}
                    style={{
                      marginLeft: "auto",
                      marginRight: "10px",
                      border: "1px solid",
                    }}
                  >
                    추가
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => this.getDataGridRows()}
                    style={{ marginRight: "10px", border: "1px solid" }}
                  >
                    Grid채우기
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    style={{ marginRight: "10px", border: "1px solid" }}
                    onClick={this.BgtCDAddSubDialogOpen}
                  >
                    예산과목추가
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    style={{ marginRight: "10px", border: "1px solid" }}
                    onClick={this.BgtCDDevFgCustomOpen}
                  >
                    그룹레벨설정
                  </Button>
                  {/* 기능모음 드롭다운박스 */}
                  <BgtCDDropDownBox />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "-10px" }}>
                <CustomGridContainer
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  {/* <InputLabel sx={{ marginLeft: '20px' }}>예산그룹</InputLabel><TextField onChange={this.GroupCdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} /> */}
                  <Grid item xs={4}>
                    <Grid container direction="row" alignItems="center">
                      <CustomInputLabel>예산과목코드</CustomInputLabel>
                      <TextField
                        onClick={this.BgtCDGroupModalOpen}
                        onChange={this.Bgt_nmOnChange}
                        size="small"
                        inputProps={{ style: { height: "11px" } }}
                        sx={{ width: "200px", marginRight: "50px" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" alignItems="center">
                      <CustomInputLabel>예산과목명</CustomInputLabel>
                      <TextField
                        onChange={this.Bgt_cdOnChange}
                        size="small"
                        inputProps={{ style: { height: "11px" } }}
                        sx={{ width: "200px" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={this.searchClick}>
                      <SearchIcon />
                    </Button>
                  </Grid>
                </CustomGridContainer>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={7}>
                  <BgtCDDatagrid
                    ref={this.BgtDataGrid}
                    rows={rows}
                    setDetailInfo={this.setDetailInfo}
                  />
                </Grid>
                <Grid item xs={5} justifyContent="center">
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
    // userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
    groupcd : state.BgtCDStore || {}
   
});
const mapDispatchToProps=(dispatch)=>{
    return{
        SET_GROUPCD :  (response) => dispatch(SET_GROUPCD(response)),
    };
}

export default connect(mapStateToProps ,mapDispatchToProps, null, {forwardRef:true})(BgtCD);