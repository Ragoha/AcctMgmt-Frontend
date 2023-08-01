import { Autocomplete, Box, Button, Container, Grid, InputLabel, TextField } from "@mui/material";
import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import BgtCDService from "../../service/BgtCDService";
import BgtCDDevFgCustom from "./modal/BgtCDDevFgCustom";
import BgtCDAddSubDialog from "./modal/BgtCDAddSubDialog";
import BgtCDDetailInfo from "./BgtCDDetailInfo";
import BgtCDDatagrid from "./BgtCDDatagrid";
import BgtCDGroupModal from "./modal/BgtCDEzSearch";
import BgtCDGroupReg from "./modal/BgtCDGroupReg";
import BgtCDDropDownBox from "./BgtCDDropDownBox";

import { connect } from 'react-redux';

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
            groupcd: 'GROUP3',
            focus: null,
            //testList: ['블레', '블래', '리퍼', '소서', '건슬', '기공', '알카'],
        }
    }
    componentDidMount() {
        console.log('1--------------------------')
        console.log(this.state.kimChiBox);
        console.log('2--------------------------')
    }


    /*상단 조건 검색바 start*/

    /*상단 조건 검색바 end  */
    setDetailInfo = (target) => {
        console.log('---setDetailInfo---')
        console.log(target)
        this.BgtCDDetailInfo.current.setDetailInfo(target);
    }

    /*데이터그리드 부분 start*/
    getDataGridRows(groupcd) { //groupcd를 받아서 최초의 데이터를 뿌리는 화면 
        console.log('데이터체크')
        console.log(this.state.kimChiBox);

        BgtCDService.getGridData(groupcd)
            .then(rows => {
                console.log('통신성공')
                console.dir(rows) //데이터 받았음 .
                this.setState({ rows }, () => console.log(this.state));
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    //데이터 그리드에 추가하는 기능
    //[230728] TreeView 수정했는데 addRow 로직은 아직 변경하지 않음 한번 손봐야함
    handleRowAdd = () => {
        //DetailInfo 에 저장된 BgtCd 값을 가져와 ->
        console.log('추가버튼')
        console.log(this.BgtCDDetailInfo.current.getBgtCd())
        const bgtCd = this.BgtCDDetailInfo.current.getBgtCd();
        BgtCDService.getPath(bgtCd)
            .then((path) => {
                console.log("패스는 ? : " + path) //이 패스는 현재 찍은 위치의 path이다 
                path = "수입,장,관,항                                  ";
                const newRows = [
                    ...this.state.rows,
                    { dataPath: path, defNm: "", bgtCd: "", bgtNm: "", isNew: true },
                ];
                this.setState({ rows: newRows });
            })
        // *일단 로우를 특정하기부터 ..

    };

    /*  데이터 그리드 부분 end */

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
        const { rows, groupcd, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd } = this.state;
        return (
            <>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundColor: '#7895CB',
                                height: '50px',
                                alignItems: 'center',
                                display: 'flex',
                                border: '1px solid'
                            }}
                            padding={2}>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={this.handleRowAdd}
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: '10px',
                                    border: '1px solid'
                                }}
                            >추가</Button>
                            <Button variant="contained"
                                size="medium"
                                onClick={() => this.getDataGridRows(groupcd)}
                                style={{ marginRight: '10px', border: '1px solid' }}
                            >Grid채우기</Button>
                            <Button variant="contained" size="medium" style={{ marginRight: '10px', border: '1px solid' }} onClick={this.BgtCDAddSubDialogOpen}>
                                예산과목추가
                            </Button>
                            <Button variant="contained" size="medium" style={{ marginRight: '10px', border: '1px solid' }} onClick={this.BgtCDDevFgCustomOpen}>
                                그룹레벨설정
                            </Button>
                            {/* 기능모음 드롭다운박스 */}
                            <BgtCDDropDownBox />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{ height: '40px', alignItems: 'center', display: 'flex', border: '1px solid' }}
                            padding={4}
                            variant>
                            {/* <InputLabel sx={{ marginLeft: '20px' }}>예산그룹</InputLabel><TextField onChange={this.GroupCdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} /> */}
                            <InputLabel>테스트용 리스트</InputLabel>
                            <InputLabel>예산과목코드</InputLabel><TextField onClick={this.BgtCDGroupModalOpen} onChange={this.Bgt_nmOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} />
                            <InputLabel>예산과목명</InputLabel><TextField onChange={this.Bgt_cdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px' }} />
                            <Button onClick={this.searchClick}><SearchIcon /></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <BgtCDDatagrid ref={this.BgtDataGrid} rows={rows} setDetailInfo={this.setDetailInfo} />
                    </Grid>
                    <Grid item xs={5} border={3} sx={{ marginTop: '5px' }}>
                        <BgtCDDetailInfo ref={this.BgtCDDetailInfo} prevBgtCd={prevBgtCd} ctlFg={ctlFg} bgajustFg={bgajustFg} bottomFg={bottomFg} bizFg={bizFg} />{/*자식컴포넌트에 state를 props로 전달 */}
                    </Grid>
                </Grid>
                <BgtCDDevFgCustom ref={this.BgtCDDevFgCustom} />
                <BgtCDAddSubDialog ref={this.BgtCDAddSubDialog} />
                <BgtCDGroupReg ref={this.BgtCDGroupReg} />
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    // accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    // userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
    kimChiBox: state.boxData.kimChiBox,
});

export default connect(mapStateToProps)(BgtCD);