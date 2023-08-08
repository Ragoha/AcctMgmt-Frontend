import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from '@mui/icons-material/Search';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ListIcon from '@mui/icons-material/List';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputAdornment from '@mui/material/InputAdornment';
import CompanyService from '../../service/CompanyService';
import DeptService from '../../service/DeptService';
import DivsService from '../../service/DivsService';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomTextField } from '../common/style/CommonStyle';
import AddressComponent from './dialog/AddressComponent';
import DivDialogComponent from './dialog/DeptDialogComponent';

class DeptMgmtComponent extends Component {
    constructor(props) {
        super(props);
        this.divDialogRef = React.createRef();
        this.addrRef = React.createRef();
        this.state = {
            open: false,
            focused: null,
            trees: [],
            cardCount: 0,
            coCd: 0,
            divCd: 0,
            deptCd: 0,
            coNm: '',
            divNm: '',
            deptNm: '',
            //insertId: '', //등록자
            //insertDt: '', //등록일  String???
            //insertIp: '', //등록자 ip
            //modifyId: '', //수정자
            //modifyDt: '', //수정일
            //modifyIp: '', //수정 ip
            // jongmok: '', //종목
            // businessType: '', //업태
            // divNb: '', //사업자번호
            // toNb: '',
            ceoNm: '', //대표자명
            deptZip: '', //우편번호
            deptAddr: '', //주소
            deptAddr1: '', //상세주소

            coCdList: [],
            divCdList: [],
            coNmList: [],
            divNmList: [],
            deptCdList: [],
            deptNmList: [],
            CodialTextField: '',
            isChanged: false
        }
    }

    componentDidMount() {
        const userInfo = this.props.userInfo;
        const { coCd, empId, empEmail } = userInfo;
        console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

        this.setState({ coCd: coCd });
            DeptService.getDept({
                accessToken: this.props.accessToken,
                coCd: coCd
            })
            .then((response) => {
                const coCdList = response.data.map((item) => item.coCd);
                const divCdList = response.data.map((item) => item.divCd);
                const divNmList = response.data.map((item) => item.divNm);
                const deptCdList = response.data.map((item) => item.deptCd);
                const deptNmList = response.data.map((item) => item.deptNm);
                const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                const coCd = response.data[0].coCd;
                const divCd = response.data[0].divCd;
                const divNm = response.data[0].divNm;
                const deptCd = response.data[0].deptCd;
                const deptNm = response.data[0].deptNm;
                // const ceoNm = response.data[0].ceoNm;
                const deptZip = response.data[0].deptZip;
                const deptAddr = response.data[0].deptAddr;
                const deptAddr1 = response.data[0].deptAddr1;

                this.setState({
                    cardCount: cardCount, // state에 값을 저장
                    coCdList: coCdList,
                    divCdList: divCdList,
                    divNmList: divNmList,
                    deptCdList: deptCdList,
                    deptNmList: deptNmList,

                    focused: deptCd,
                    coCd: coCd,
                    divCd: divCd,
                    divNm: divNm,
                    deptCd: deptCd,
                    deptNm: deptNm,
                    // ceoNm: ceoNm,
                    deptZip: deptZip,
                    deptAddr: deptAddr,
                    deptAddr1: deptAddr1
                })
                CompanyService.getCompany({
                    accessToken: this.props.accessToken,
                    coCd: coCd
                })
                    .then((response) => {
                        const coNm = response.data[0].coNm;

                        this.setState({
                            coNm: coNm
                        })
                })
            })
    }

    handleCompany = (e) => {
        // console.log(e.target.id);
        this.setState({
            isChanged: true,
            [e.target.name]: e.target.value
        })
        // console.log(this.state);
    }

 
    addrButton = () => {
        this.addrRef.current.handleUp();
    }

    closeAddrDialog = () => {
        this.addrRef.current.handleDown();
    }

   
    helpClick = () => {
        this.divDialogRef.current.handleUp();
    };


    closeDialog = () => {
        this.dialogRef.current.handleDown();
    }

    handleSetDivdialTextField = async (data) => {
        await this.setState({
            DivdialTextField: data.divCd + ". " + data.divNm,
            divCd: data.divCd  //밑에 coCd 넘겨주기
        });
    };


    setDeptZipAddr = (data) => {
        this.setState({ divZip: data.deptZip });
        this.setState({ divAddr: data.deptAddr });
    }

   
    handleChange = (e) => {
        this.setState({
            coCd: e.target.value
        })
    }

    render() {
        const { open, coCd, divCd, deptCd, deptNm, divNm, ceoNm, deptZip, deptAddr, deptAddr1 } = this.state;
        const { coNm } = this.state;
        const { cardCount, divCdList, divNmList, coCdList, coNmList, deptCdList, deptNmList } = this.state;


        const currentDate = new Date();

        //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

        const trees = (
            <TreeItem nodeId={coCd.toString()} label={coNm}>
              {divCdList.map((divCd, index) => (
                <TreeItem key={index} nodeId={index} label={divCd}>
                  {deptNmList[index] && (
                    <TreeItem key={index} nodeId={{index}} label={deptNmList[index]} />
                  )}
                </TreeItem>
              ))}
            </TreeItem>
          );

        return (
            <>
        <CustomHeaderGridContainer
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container direction="row">
              <GroupIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>부서등록</CustomHeaderInputLabel>
            </Grid>
          </Grid>
        </CustomHeaderGridContainer>

                <CustomGridContainer container direction="row" spacing={2}
                    justifyContent="left"
                    alignItems="center" >

                    <Grid item xs={3}>
                        <Grid container alignItems="center">
                            <CustomInputLabel>회사</CustomInputLabel>
                            <CustomTextField name='DivdialTextField' value={this.state.DivdialTextField} placeholder="회사코드/회사명 "
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon onClick={this.helpClick} /></InputAdornment>
                                    ),
                                }}
                            ></CustomTextField>
                        </Grid>
                    </Grid>

                    <Grid item >
                        <Grid container alignItems="center">
                            <CustomInputLabel >부서</CustomInputLabel>
                            <CustomTextField name='DivdialTextField' value={this.state.DivdialTextField} placeholder="부서코드/부서명 "
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon onClick={this.helpClick} /></InputAdornment>
                                    ),
                                }}
                            ></CustomTextField>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" onClick={() => this.searchClick(divCd)} style={{ padding: "0px", minWidth: "5px", position: 'relative', top: '10px', left: "836px" }}>
                        <SearchIcon fontSize="medium" />
                    </Button>
                </CustomGridContainer >

                <Grid sx={{ position: 'relative', display: 'flex', width: '100%' }}>
                    <Grid container sx={{ width: '22%', height: 670, border: '1px solid #EAEAEA', backgroundColor: '#f5f5f5' }}>

                        <Grid item sx={{ mb: 1, display: 'flex', justifyContent: 'left', alignItems: "center", width: '100%', height: 22, backgroundColor: '#f5f5f5', borderBottom: '1px solid' }}>
                            <CustomInputLabel >총 부서:</CustomInputLabel><CustomInputLabel >{cardCount}</CustomInputLabel>
                        </Grid>

                        <Grid item sx={{ pl: 1.2, width: '95%', height: 'calc(100% - 5%)', overflowY: 'auto' }}>
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpanded={['root']}
                                defaultExpandIcon={<ChevronRightIcon />}
                                sx={{ height: 110, flexGrow: 1, maxWidth: 400 }}
                                onNodeSelect={this.handleSelect}
                            >
                                {trees}
                            </TreeView>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ ml: 1, height: 670, border: '2px solid #EAEAEA' }}>
                        <Grid container sx={{ height: 40, borderBottom: '2px solid #000' }}>
                            <Grid item xs={10}>
                                <CustomInputLabel sx={{ ml: 1, mt: 1, color: 'black' }}>기본정보</CustomInputLabel>
                            </Grid>

                            <Grid item xs={0.6} sx={{ mr: 0.2 }}>
                                <Button variant="outlined" onClick={this.comInfo}>추가</Button>
                            </Grid>

                            <Grid item xs={0.6} sx={{ ml: 0.3 }}>
                                {coCd && divCd ?
                                    <Button variant="outlined" onClick={this.updateDivs}>수정</Button>
                                    :
                                    <Button variant="outlined" onClick={this.insertDivs}>저장</Button>
                                }
                            </Grid>

                            <Grid item xs={0.6} sx={{ ml: 0.5 }}>
                                <Button variant="outlined" onClick={this.deleteDivs}>삭제</Button>
                            </Grid>

                            <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel>회사</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} size='small' sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                                {divCd != 0 ?
                                    <CustomTextField xs={4} sx={{ ml: 2 }} value={coCd + ' . ' + coNm} InputProps={{ readOnly: true }}></CustomTextField> //disabled={true}
                                    :
                                    <FormControl sx={{
                                        ml: 2, width: 255, "& .MuiInputBase-root": {
                                            height: 40
                                        }
                                    }}>
                                        <Select name='coNm' value={coNm} onChange={this.handleCompany}>
                                            {coNmList.map((coNm) => (
                                                <MenuItem key={coNm} value={coNm}>
                                                    {coNm}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                }
                            </Grid>

                            <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                                <CustomInputLabel sx={{ color: 'black' }}  >사업장</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }} >
                                <CustomTextField sx={{ ml: 2, backgroundColor: '#FFA7A7' }} name='divCd' onChange={this.handleCompany} value={divCd || ''} InputProps={{ readOnly: true }}></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >부서코드</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2, backgroundColor: '#FFA7A7' }} name='deptCd' onChange={this.handleCompany} value={deptCd || ''}></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                                <CustomInputLabel sx={{ color: 'black' }}  >부서명</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }} >
                                <CustomTextField sx={{ ml: 2 }} name='deptNm' onChange={this.handleCompany} value={deptNm || ''}></CustomTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >종목</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >업태</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomTextField>
                            </Grid>



                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >대표자명</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} name='ceoNm' onChange={this.handleCompany} value={ceoNm || ''}></CustomTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >사업자번호</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#EAEAEA', borderBottom: '1px solid lightgray', }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >부서주소</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField size='small' id="deptZip" name="deptZip" onChange={this.handleCompany} value={deptZip || ''} InputProps={{ readOnly: true }}
                                    sx={{ ml: 2, width: '150px' }}></TextField>
                                <Button sx={{ ml: 1 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
                            </Grid>

                            <Grid item xs={6}></Grid>

                            <Grid item xs={2} sx={{ height: 50, borderBottom: '1px solid lightgray', backgroundColor: '#EAEAEA' }}>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField size='small' sx={{ ml: 2, width: '570px' }} id="deptAddr" name="deptAddr" onChange={this.handleCompany} value={deptAddr || ''} InputProps={{ readOnly: true }}></TextField>
                            </Grid>
                            <Grid item xs={4}></Grid>

                            <Grid item xs={2} sx={{ height: 50, borderBottom: '1px solid lightgray', backgroundColor: '#EAEAEA' }}></Grid>
                            <Grid item xs={6} sx={{ borderBottom: '1px solid #EAEAEA' }}>
                                <TextField size='small' sx={{ ml: 2, width: '570px' }} name="deptAddr1" onChange={this.handleCompany} value={deptAddr1 || ''} ></TextField>
                            </Grid>
                            <Grid item xs={4} sx={{ borderBottom: '1px solid #EAEAEA' }}></Grid>

                        </Grid>
                    </Grid>
                </Grid>

                <AddressComponent setDeptZipAddr={this.setDeptZipAddr} ref={this.addrRef} />
                <DivDialogComponent handleSetDivdialTextField={this.handleSetDivdialTextField} ref={this.divDialogRef} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    userInfo: state.user || {} //  userInfo 정보 매핑해주기..
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(DeptMgmtComponent);
