import { Box, Button, Container, Grid, InputLabel, TextField } from "@mui/material";
import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import BgtCDService from "../../service/BgtCDService";
import DialogComponent from "../common/DialogComponent";
import BgtCDDevFgCustom from "./modal/BgtCDDevFgCustom";
import BgtCDAddSubDialog from "./modal/BgtCDAddSubDialog";
import BgtCDTreeGrid from "./BgtCDTreeGrid";
import BgtCDDetailInfo from "./BgtCDDetailInfo";
import BgtCDDatagrid from "./BgtCDDatagrid";

class BgtCD extends Component {
    constructor(props) {
        super(props);
        this.BgtCDDevFgCustom = React.createRef();
        this.BgtCDAddSubDialog = React.createRef();
        this.state = {
            open:false,
            rows: [],
            groupcd: 'GROUP3',
            detailInfo: null,
            textfieldgroupcd: null,
            textfieldbgtnm: null,
            textfieldbgtcd: null,

            //상세정보 임시값.
            ctlFg: null,
            bgajustFg: null,
            bottomFg: null,
            bizFg: null,
            //DataGrid 를 클릭하고 다시 클릭했을때, 이전의 event.target.value를 갖고있기 위한 변수
            prevBgtCd: null,

        }
    }
    componentDidMount() {
    }
    /*상단 조건 검색바 start*/
    /*상단 조건 검색바 end  */

    /*데이터그리드 부분 start*/
    getDataGridRows(groupcd) { //groupcd를 받아서 최초의 데이터를 뿌리는 화면 
        BgtCDService.getGridData(groupcd)
            .then(rows => {
                console.log('통신성공')
                console.dir(rows) //데이터 받았음 .
                this.setState({ rows });
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    clickedRow = (params) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
        if (this.state.prevBgtCd === params.row.bgtCd) {
            console.log('이땐 값을 바꿀 필요가 없어 친구')
        } else {
            BgtCDService.getDetailInfo(params.row.bgtCd)
                .then(response => {
                    console.dir(response)
                    this.setDetailInfoFromClickedRow(response, params.row.bgtCd);
                    console.log("1.prevBgtCd : " + params.row.bgtCd)
                    this.setState({ prevBgtCd: params.row.bgtCd }, () => {
                        console.log("2.prevBGTCD 스테이트 ? " + this.state.prevBgtCd)
                    }) //상세정보가 들어갈때, 상세정보를 갖고온 bgtCd를 prevBgtCd에 저장함. 
                }).catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }

    setDetailInfoFromClickedRow(detailInfo, param) {//clickedRow로 데이터그리드를 클릭했을 때 받아온 array를 detailInfo에 매핑하는 메소드 
        //[SBGTCDDomain(CO_CD=null, BGT_CD=null, GISU=0, BGT_NM=null, DIV_FG=null, ㄱCTL_FG=3, ㄴBGAJUST_FG=1, ㄷTO_DT=20231231, ㄹBOTTOM_FG=0, ㅁBIG_FG=null)]
        console.log('setDetailInfoFromClickedRow 실행 해볼까 ~~~!');
        this.setState({
            ctlFg: detailInfo[0].ctlFg,
            bgajustFg: detailInfo[0].bgajustFg,
            bottomFg: detailInfo[0].bottomFg,
            bizFg: detailInfo[0].bizFg,
        }
        ); //,()=>{ console.log('state에 들어갔니 ? ' + this.state.ctlFg +' --  '+ this.state.bgajustFg+' --'+this.state.bottomFg +' --'+ this.state.bizFg)} [230720]=>setState 결과 확인용 , 콜백으로 넣어야함.
    }

    /*  데이터 그리드 부분 end */

    /* 모달창  */
    /*BgtCDDevFgCustomOpen*/
    BgtCDDevFgCustomOpen = () => {
        this.BgtCDDevFgCustom.current.handleUp();
    }
    BgtCDAddSubDialogOpen=()=>{
        this.BgtCDAddSubDialog.current.handleUp();
    }
    render() {
        const { rows, groupcd, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd } = this.state;
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            sx={{ backgroundColor: '#7895CB', height: '50px', alignItems: 'center', display: 'flex', border: '1px solid' }}
                            padding={1}>
                            <Button variant="contained"
                                size="medium"
                                onClick={() => this.getDataGridRows(groupcd)}
                                style={{ marginLeft: 'auto', marginRight: '10px', border: '1px solid' }}
                            >Grid채우기</Button>
                            <Button variant="contained" size="medium" style={{ marginRight: '10px', border: '1px solid' }}onClick={this.BgtCDAddSubDialogOpen}>
                                예산과목추가
                            </Button>
                            <Button variant="contained" size="medium" style={{ marginRight: '10px', border: '1px solid' }} onClick={this.BgtCDDevFgCustomOpen}>
                                그룹레벨설정
                            </Button>
                            <Button variant="contained" size="medium" style={{ border: '1px solid' }}>기능모음</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{ height: '40px', alignItems: 'center', display: 'flex', border: '1px solid' }}
                            padding={1}
                            variant>
                            <InputLabel sx={{ marginLeft: '20px' }}>예산그룹</InputLabel><TextField onChange={this.GroupCdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} />
                            <InputLabel>예산과목코드</InputLabel><TextField onChange={this.Bgt_nmOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} />
                            <InputLabel>예산과목명</InputLabel><TextField onChange={this.Bgt_cdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px' }} />
                            <Button onClick={this.searchClick}><SearchIcon /></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <BgtCDDatagrid rows={rows} clickedRow={this.clickedRow} />
                        {/* <BgtCDTreeGrid/> */}
                    </Grid>
                    <Grid item xs={5} border={3} sx={{ marginTop: '5px' }}>
                        <BgtCDDetailInfo prevBgtCd={prevBgtCd} ctlFg={ctlFg} bgajustFg={bgajustFg} bottomFg={bottomFg} bizFg={bizFg} />{/*자식컴포넌트에 state를 props로 전달 */}
                    </Grid>
                </Grid>
                <BgtCDDevFgCustom ref={this.BgtCDDevFgCustom} />
                <BgtCDAddSubDialog ref={this.BgtCDAddSubDialog} />
            </>
        )
    }
}
export default BgtCD;