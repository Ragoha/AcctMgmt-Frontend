import { Box, Button, Container, Grid, InputLabel, TextField } from "@mui/material";
import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Budget_DataGrid from "./Budget_DataGrid";
import Detail_Info from "./Detail_Info";
import BudgetRegService from "../../service/BudgetRegService";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { WidthFull } from "@mui/icons-material";


class Budget_item_registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            groupcd: 'GROUP1',
            detailInfo: null,
            textfieldgroupcd: null,
            textfieldbgt_nm: null,
            textfieldbgt_cd: null,

            //상세정보 임시값.
            CTL_FG: '임시',
            BGAJUST_FG:null,
            BOTTOM_FG:null,
            BIZ_FG:null,
        }
    }
    componentDidMount() {
    }
    /*상단 조건 검색바 start*/
    searchClick = () => {
        const { textfieldgroupcd, textfieldbgt_nm, textfieldbgt_cd } = this.state;
        BudgetRegService.getSearchData(textfieldgroupcd, textfieldbgt_nm, textfieldbgt_cd);

    }
    //상단 검색바의 데이터를 searchClick에서 쓰기 위해 setState하는 부분
    GroupCdOnChange = (event) => {
        this.setState({ textfieldgroupcd: event.target.value });
    };
    Bgt_nmOnChange = (event) => {
        this.setState({ textfieldbgt_nm: event.target.value });
    };
    Bgt_cdOnChange = (event) => {
        this.setState({ textfieldbgt_cd: event.target.value });
    };

    /*상단 조건 검색바 end  */
    /*데이터그리드 부분 start*/
    getDataGridRows(groupcd) { //groupcd를 받아서 최초의 데이터를 뿌리는 화면 
        BudgetRegService.getGridData(groupcd)
            .then(rows => {
                console.log('통신성공')
                console.dir(rows) //데이터 받았음 .
                this.setState({ rows });
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    clickedRow = (params) => {//데이터 그리드를 클릭했을때 해당 row의 데이터를 가져오는 로직
        BudgetRegService.getDetailInfo(params.row.bgt_CD)
            .then(response => {
                console.dir(response)
                this.setDetailInfoFromClickedRow(response);
            }).catch(error => {
                console.error("Error fetching data:", error);
            });

    }

    setDetailInfoFromClickedRow(detailInfo) {//clickedRow로 데이터그리드를 클릭했을 때 받아온 array를 detailInfo에 매핑하는 메소드 
        //[SBGTCDDomain(CO_CD=null, BGT_CD=null, GISU=0, BGT_NM=null, DIV_FG=null, ㄱCTL_FG=3, ㄴBGAJUST_FG=1, ㄷTO_DT=20231231, ㄹBOTTOM_FG=0, ㅁBIG_FG=null)]
        
        console.log('setDetailInfoFromClickedRow 실행 해볼까 ~~~!');
        console.dir(detailInfo); //값 잘 들어옴 ;
        console.log('아래는 detailInfo 에서 추출 ')
        console.dir(detailInfo[0].ctl_FG);
        console.log(detailInfo[0].bgajust_FG);
        console.log(detailInfo[0].bottom_FG);
        this.setState({
            CTL_FG: detailInfo[0].ctl_FG,
            BGAJUST_FG: detailInfo[0].bgajust_FG,
            BOTTOM_FG: detailInfo[0].bottom_FG,
            BIZ_FG: detailInfo[0].biz_FG
        },()=>{ console.log('state에 들어갔니 ? ' + this.state.CTL_FG +'  '+ this.state.BGAJUST_FG+'  '+this.state.BOTTOM_FG +'  '+ this.state.BIZ_FG)});
    }

    /*  데이터 그리드 부분 end */

    /*render*/
    //
    render() {
        const { rows, groupcd, CTL_FG ,BGAJUST_FG ,BOTTOM_FG ,BIG_FG} = this.state;
        return (
            <Container style={{ border: '2px solid black' }}>
                <Grid container spacing={2} padding={5} >
                    <Grid item xs={12}>
                        <Box
                            sx={{ backgroundColor: '#7895CB', height: '30px', alignItems: 'center', display: 'flex', border: '1px solid' }}
                            padding={1}>
                            <Button variant="contained"
                                size="medium"
                                onClick={() => this.getDataGridRows(groupcd)}
                                style={{ marginLeft: 'auto', marginRight: '10px', border: '1px solid' }}
                            >Group_cd를 기반으로 데이터를 가져오는 버튼</Button>
                            <Button variant="contained" size="medium" style={{ border: '1px solid' }}>예산과목추가</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{ height: '21px', alignItems: 'center', display: 'flex', border: '1px solid' }}
                            padding={1}
                            variant>
                            <InputLabel sx={{ marginLeft: '20px' }}>예산그룹</InputLabel><TextField onChange={this.GroupCdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} />
                            <InputLabel>예산과목코드</InputLabel><TextField onChange={this.Bgt_nmOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px', marginRight: '50px' }} />
                            <InputLabel>예산과목명</InputLabel><TextField onChange={this.Bgt_cdOnChange} size="small" inputProps={{ style: { height: '11px' } }} sx={{ width: '200px' }} />
                            <Button onClick={this.searchClick}><SearchIcon/></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Budget_DataGrid rows={rows} clickedRow={this.clickedRow} />
                        {/*<BudgetComponent/>*/}
                    </Grid>
                    <Grid item xs={5} border={3} sx={{ marginTop: '5px' }}>
                        <Detail_Info CTL_FG={CTL_FG} BGAJUST_FG={BGAJUST_FG}  BOTTOM_FG={BOTTOM_FG} BIG_FG={BIG_FG}/>{/*자식컴포넌트에 state를 props로 전달 */}
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
export default Budget_item_registration;