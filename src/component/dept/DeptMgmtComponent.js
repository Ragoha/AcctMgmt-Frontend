import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, InputLabel, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputAdornment from '@mui/material/InputAdornment';
import { CustomGridContainer, CustomInputLabel, CustomTextField } from '../common/style/CommonStyle';
import CompanyService from '../../service/CompanyService';
import DivsService from '../../service/DivsService';
import AddressComponent from './dialog/AddressComponent';
import DivDialogComponent from './dialog/DivDialogComponent';

class DeptMgmtComponent extends Component {

    renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => this.renderTree(node))
                : null}
        </TreeItem>
    );

    constructor(props) {
        super(props);
        this.divDialogRef = React.createRef();
        this.addrRef = React.createRef();
        this.state = {
            open: false,
            focused: null,
            cards: [],
            cardCount: 0,
            coCd: 0,
            divCd: 0,
            coNm: '',
            divNm: '',
            //insertId: '', //등록자
            //insertDt: '', //등록일  String???
            //insertIp: '', //등록자 ip
            //modifyId: '', //수정자
            //modifyDt: '', //수정일
            //modifyIp: '', //수정 ip
            jongmok: '', //종목
            businessType: '', //업태
            divNb: '', //사업자번호
            toNb: '',
            ceoNm: '', //대표자명
            divZip: '', //우편번호
            divAddr: '', //주소
            divAddr1: '', //상세주소
            coCdList: [],
            divCdList: [],
            coNmList: [],
            divNmList: [],
            CodialTextField: '',
            isChanged: false
        }
    }

    componentDidMount() {
        const userInfo = this.props.userInfo;
        const { coCd, empId, empEmail } = userInfo;
        console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

        this.setState({ coCd: coCd });
        DivsService.getDivision({
            accessToken: this.props.accessToken,
            coCd: coCd
        })
            .then((response) => {
                const coCdList = response.data.map((item) => item.coCd);
                const divCdList = response.data.map((item) => item.divCd);
                const divNmList = response.data.map((item) => item.divNm);
                const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                const coCd = response.data[0].coCd;
                const divCd = response.data[0].divCd;
                const divNm = response.data[0].divNm;
                const ceoNm = response.data[0].ceoNm;
                const jongmok = response.data[0].jongmok;
                const businessType = response.data[0].businessType;
                const divNb = response.data[0].divNb;
                const toNb = response.data[0].toNb;
                const divZip = response.data[0].divZip;
                const divAddr = response.data[0].divAddr;
                const divAddr1 = response.data[0].divAddr1;

                this.setState({
                    cardCount: cardCount, // state에 값을 저장
                    coCdList: coCdList,
                    divCdList: divCdList,
                    divNmList: divNmList,

                    focused: divCd,
                    coCd: coCd,
                    divCd: divCd,
                    divNm: divNm,
                    ceoNm: ceoNm,
                    jongmok: jongmok,
                    businessType: businessType,
                    divNb: divNb,
                    toNb: toNb,
                    divZip: divZip,
                    divAddr: divAddr,
                    divAddr1: divAddr1
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

    addCardButton = () => {
        // const newCoNmList = [...this.state.coNmList, `coNm${newCardCount}`];
        if (this.state.divCdList.includes('0000')) {
            alert("미등록 부서가 존재합니다.");
        } else {
            const newCardCount = this.state.cardCount + 1;
            const newDivCdList = [...this.state.divCdList, '0000'];

            CompanyService.getCoList()
                .then((response) => {
                    // const newDivNmList = response.data.map((item) => item.divNm);
                    const coCdList = response.data.map((item) => item.coCd);
                    const coNmList = response.data.map((item) => item.coNm);
                    const newCoNmList = [...new Set(coNmList)]

                    const coCd = response.data[0].coCd;
                    const coNm = response.data[0].coNm;
                    this.setState({
                        cardCount: newCardCount,
                        divCdList: newDivCdList,
                        coCdList: coCdList,
                        coNmList: newCoNmList,
                        // divNmList: newDivNmList,
                        focused: '0000',
                        coCd: coCd,
                        coNm: coNm,
                        divCd: '',
                        divNm: '',
                        ceoNm: '',
                        jongmok: '',
                        businessType: '',
                        divNb: '',
                        toNb: '',
                        divZip: '',
                        divAddr: '',
                        divAddr1: ''
                    })
                }).catch((error) => {
                    // 오류 발생 시의 처리
                    console.error(error);
                    // alert("중복된 회사 또는 모두 입력해주세요");
                    console.log(this.state.coCdList);
                    console.log(this.state.divCdList);
                    console.log(this.state.coNmList);
                })
        }
    }

    comInfo = () => {
        const { coNm } = this.state;
        CompanyService.getCoNm(coNm)
            .then((response) => {
                const coCd = response.data[0].coCd
                this.setState({
                    coCd: coCd
                })
                CompanyService.getCompany(coCd)
                    .then((response) => {
                        // const newDivNmList = response.data.map((item) => item.divNm);
                        const coCdList = response.data.map((item) => item.coCd);
                        const coNmList = response.data.map((item) => item.coNm);

                        const coCd = response.data[0].coCd;
                        const coNm = response.data[0].coNm;
                        const jongmok = response.data[0].jongmok;
                        const businessType = response.data[0].businessType;
                        const ceoNm = response.data[0].ceoNm;
                        const coZip = response.data[0].coZip;
                        const coAddr = response.data[0].coAddr;
                        const coAddr1 = response.data[0].coAddr1;
                        this.setState({
                            coCdList: coCdList,
                            coNmList: coNmList,
                            // divNmList: newDivNmList,
                            focused: '0000',
                            coCd: coCd,
                            coNm: coNm,
                            divCd: '',
                            divNm: '',
                            ceoNm: ceoNm,
                            jongmok: jongmok,
                            businessType: businessType,
                            divNb: '',
                            toNb: '',
                            divZip: coZip,
                            divAddr: coAddr,
                            divAddr1: coAddr1
                        })
                    })
            }).catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                // alert("중복된 회사 또는 모두 입력해주세요");
            })
    }


    insertDivs = () => {
        const { coNm } = this.state;
        CompanyService.getCoNm(coNm)
            .then((response) => {
                const coCd = response.data[0].coCd
                this.setState({
                    coCd: coCd
                })

                const { divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1 } = this.state;
                return DivsService.insertDivs(coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1)

                    .then((response) => {
                        console.log(response.data);
                        window.confirm('부서등록 완료!');
                        const coCdList = response.data.map((item) => item.coCd);
                        const divCdList = response.data.map((item) => item.divCd);
                        const divNmList = response.data.map((item) => item.divNm);
                        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                        this.setState({
                            cardCount: cardCount, // state에 값을 저장
                            coCdList: coCdList,
                            divCdList: divCdList,
                            divNmList: divNmList,
                            focused: coCdList[cardCount - 1],
                            coCd: '',
                            divNm: '',
                            jongmok: '',
                            businessType: '',
                            divNb: '',
                            toNb: '',
                            ceoNm: '',
                            divZip: '',
                            divAddr: '',
                            divAddr1: '',
                            isChanged: false
                        });
                        // window.location.reload();
                        // window.location.href="/acctmgmt/ozt/co";
                    })
            })
            .catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                alert("중복된 부서 또는 모두 입력해주세요");
            });
    }

    addrButton = () => {
        this.addrRef.current.handleUp();
    }

    closeAddrDialog = () => {
        this.addrRef.current.handleDown();
    }

    cardClick = (divCd) => {
        console.log(divCd);
        // this.setState({ coCd: coCdList[index] });
        // console.log(index)
        this.setState({ focused: divCd })
        {
            divCd == '0000' ?
                this.setState({
                    coCd: '',
                    coNm: '',
                    divCd: '',
                    divNm: '',
                    ceoNm: '',
                    jongmok: '',
                    businessType: '',
                    divNb: '',
                    toNb: '',
                    divZip: '',
                    divAddr: '',
                    divAddr1: ''
                }) :
                DivsService.getDivision(divCd)

                    .then((response) => {
                        const coCd = response.data[0].coCd;
                        const divCd = response.data[0].divCd;
                        const divNm = response.data[0].divNm;
                        const ceoNm = response.data[0].ceoNm;
                        const jongmok = response.data[0].jongmok;
                        const businessType = response.data[0].businessType;
                        const divNb = response.data[0].divNb;
                        const toNb = response.data[0].toNb;
                        const divZip = response.data[0].divZip;
                        const divAddr = response.data[0].divAddr;
                        const divAddr1 = response.data[0].divAddr1;

                        this.setState({
                            coCd: coCd,
                            divCd: divCd,
                            divNm: divNm,
                            ceoNm: ceoNm,
                            jongmok: jongmok,
                            businessType: businessType,
                            divNb: divNb,
                            toNb: toNb,
                            divZip: divZip,
                            divAddr: divAddr,
                            divAddr1: divAddr1
                        })
                        CompanyService.getCompany(coCd)
                            .then((response) => {
                                const coNm = response.data[0].coNm;

                                this.setState({
                                    coNm: coNm
                                })
                            })
                    })
                    .catch((error) => {
                        // 오류 발생 시의 처리
                        console.error(error);
                        // alert("중복된 회사 또는 모두 입력해주세요");
                    })
        }
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


    searchClick = (divCd) => {
        DivsService.getDivision(divCd)
            .then((response) => {
                const coCdList = response.data.map((item) => item.coCd);
                const divCdList = response.data.map((item) => item.divCd);
                const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
                const divNmList = response.data.map((item) => item.divNm);
                const cardCount = response.data.length;

                const coCd = response.data[0].coCd;
                const coNm = response.data[0].coNm;
                const divCd = response.data[0].divCd;
                const divNm = response.data[0].divNm;
                const jongmok = response.data[0].jongmok;
                const businessType = response.data[0].businessType;
                const coNb = response.data[0].coNb;
                const ceoNm = response.data[0].ceoNm;
                const coZip = response.data[0].coZip;
                const coAddr = response.data[0].coAddr;
                const coAddr1 = response.data[0].coAddr1;

                this.setState({
                    cardCount: cardCount,//??????
                    coCdList: coCdList,
                    coNmList: coNmList,  // 하고나서 coNm 불러오는 것도 해야함!!
                    divCdList: divCdList,
                    divNmList: divNmList,

                    focused: coCd,
                    coCd: coCd,
                    coNm: coNm,
                    divCd: divCd,
                    divNm: divNm,
                    jongmok: jongmok,
                    businessType: businessType,
                    coNb: coNb,
                    ceoNm: ceoNm,
                    coZip: coZip,
                    coAddr: coAddr,
                    coAddr1: coAddr1,
                    CodialTextField: ''
                })
            })
            .catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                // alert("중복된 회사 또는 모두 입력해주세요");
            })
    }

    setDivZipAddr = (data) => {
        this.setState({ divZip: data.divZip });
        this.setState({ divAddr: data.divAddr });
    }

    updateDivs = () => {
        const { coCd, divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1 } = this.state;

        console.log(divNm)
        DivsService.updateDivs(divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1)
            .then((response) => {
                console.log(response.data);
                window.confirm('업데이트 완료!');
                const divCdList = response.data.map((item) => item.divCd);
                const divNmList = response.data.map((item) => item.divNm);
                const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
                this.setState({
                    cardCount: cardCount, // state에 값을 저장
                    divCdList: divCdList,
                    divNmList: divNmList,
                    focused: divCd,
                    coCd: coCd,
                    divCd: divCd,
                    divNm: divNm,
                    ceoNm: ceoNm,
                    jongmok: jongmok,
                    businessType: businessType,
                    divNb: divNb,
                    toNb: toNb,
                    divZip: divZip,
                    divAddr: divAddr,
                    divAddr1: divAddr1,
                    isChanged: false,
                })
            })

            .catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                alert("업데이트 실패..");
            });
    }

    deleteDivs = () => {  //-> 이거 index 값 건드리는게 아닌듯....ㅠ 삭제 시 index가 달라지는데 그 적은 숫자를 그대로 가지고있네 ㄷㄷ
        const { divCd } = this.state;

        DivsService.deleteDivs(divCd)
            .then((response) => {
                console.log(response.data);
                window.confirm('부서삭제 완료!');
                const divCdList = response.data.map((item) => item.divCd);
                const divNmList = response.data.map((item) => item.divNm);
                const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
                this.setState({
                    cardCount: cardCount, // state에 값을 저장
                    divCdList: divCdList,
                    divNmList: divNmList,
                    focused: divCdList[0],
                    coCd: '',
                    divCd: '',
                    divNm: '',
                    ceoNm: '',
                    jongmok: '',
                    businessType: '',
                    divNb: '',
                    toNb: '',
                    divZip: '',
                    divAddr: '',
                    divAddr1: ''

                })
                console.log(divCdList)
            })
            // window.location.href="/acctmgmt/ozt/co";
            .catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                alert("삭제 실패..");
            });
    }

    handleChange = (e) => {
        this.setState({
            coCd: e.target.value
        })
    }

    render() {
        const { open, coCd, divCd, toNb, divNm, jongmok, businessType, ceoNm, divNb, divZip, divAddr, divAddr1 } = this.state;
        const { coNm } = this.state;
        const { cardCount, divCdList, divNmList, coCdList, coNmList } = this.state;


        const currentDate = new Date();

        //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

        const data = {
            id: 'root',
            name: coNm,
            children: [
                {
                    id: '1',
                    name: divNm,
                },
                {
                    id: '3',
                    name: divNm,
                    children: [
                        {
                            id: '4',
                            name: '부서자리'
                        },
                    ],
                },
            ],
        };

        return (
            <>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <ListIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <span>부서관리</span>
                    </Grid>
                </Grid>

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
                                sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                            >
                                {this.renderTree(data)}
                            </TreeView>
                        </Grid>

                        <Grid container sx={{ position: 'relative', bottom: '60px', width: '100%' }} >
                            <Button variant="extended" onClick={this.addCardButton}
                                sx={{
                                    border: '1px solid',
                                    width: '100%',
                                    height: '60px',
                                    backgroundColor: '#F6F6F6',
                                    color: 'black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    "&:hover": {
                                        backgroundColor: '#e0e0e0'
                                    }
                                }}>
                                <AddIcon />
                                추가
                            </Button>
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
                                <CustomInputLabel>회사선택</CustomInputLabel>
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
                                <CustomInputLabel sx={{ color: 'black' }}  >사업장코드</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }} >
                                <CustomTextField sx={{ ml: 2, backgroundColor: '#FFA7A7' }} name='divCd' onChange={this.handleCompany} value={divCd || ''} InputProps={{ readOnly: true }}></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >부서코드</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                                <CustomTextField name='toNb' sx={{ ml: 2, backgroundColor: '#FFA7A7' }} onChange={this.handleCompany} value={toNb || ''}></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                                <CustomInputLabel sx={{ color: 'black' }}  >부서명</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }} >
                                <CustomTextField sx={{ ml: 2 }} name='divNm' onChange={this.handleCompany} value={divNm || ''}></CustomTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >종목</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} name='jongmok' onChange={this.handleCompany} value={jongmok || ''}></CustomTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >업태</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                                <CustomTextField sx={{ ml: 2 }} name='businessType' onChange={this.handleCompany} value={businessType || ''}></CustomTextField>
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
                                <CustomTextField name='divNb' sx={{ ml: 2 }} onChange={this.handleCompany} value={divNb || ''}></CustomTextField>
                            </Grid>

                            <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#EAEAEA', borderBottom: '1px solid lightgray', }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >부서주소</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField size='small' id="divZip" name="divZip" onChange={this.handleCompany} value={divZip || ''} InputProps={{ readOnly: true }}
                                    sx={{ ml: 2, width: '150px' }}></TextField>
                                <Button sx={{ ml: 1 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
                            </Grid>

                            <Grid item xs={6}></Grid>

                            <Grid item xs={2} sx={{ height: 50, borderBottom: '1px solid lightgray', backgroundColor: '#EAEAEA' }}>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField size='small' sx={{ ml: 2, width: '570px' }} id="divAddr" name="divAddr" onChange={this.handleCompany} value={divAddr || ''} InputProps={{ readOnly: true }}></TextField>
                            </Grid>
                            <Grid item xs={4}></Grid>

                            <Grid item xs={2} sx={{ height: 50, borderBottom: '1px solid lightgray', backgroundColor: '#EAEAEA' }}></Grid>
                            <Grid item xs={6} sx={{ borderBottom: '1px solid #EAEAEA' }}>
                                <TextField size='small' sx={{ ml: 2, width: '570px' }} name="divAddr1" onChange={this.handleCompany} value={divAddr1 || ''} ></TextField>
                            </Grid>
                            <Grid item xs={4} sx={{ borderBottom: '1px solid #EAEAEA' }}></Grid>

                        </Grid>
                    </Grid>
                </Grid>

                <AddressComponent setDivZipAddr={this.setDivZipAddr} ref={this.addrRef} />
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
