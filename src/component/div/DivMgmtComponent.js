import React, { Component } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, Divider, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputAdornment from '@mui/material/InputAdornment';
import { CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle } from '../common/style/CommonDialogStyle';
import { CustomDataGrid, CustomGridContainer, CustomInputLabel, CustomTextField } from '../common/style/CommonStyle';


import CompanyService from '../../service/CompanyService';
import DivsService from '../../service/DivsService';
import AddressComponent from './dialog/AddressComponent';
import CoDialogComponent from './dialog/CoDialogComponent';

class DivMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.coDialogRef = React.createRef();
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
    DivsService.getDivsList()
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
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
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
      alert("미등록 사업장이 존재합니다.");
    } else {
      const newCardCount = this.state.cardCount + 1;
      CompanyService.getCoList()

        .then((response) => {

          const newDivCdList = response.data.map((item) => item.divCd);
          const newDivNmList = response.data.map((item) => item.divNm);
          const newCoCdList = response.data.map((item) => item.coCd);

          const coCdList = response.data[0].coCd;
          this.setState({
            coCdList: coCdList,
            cardCount: newCardCount,
            divCdList: newDivCdList,
            coCdList: newCoCdList,
            divNmList: newDivNmList,
            focused: '0000',
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
        }).catch((error) => {
          // 오류 발생 시의 처리
          console.error(error);
          // alert("중복된 회사 또는 모두 입력해주세요");
          console.log(this.state.coCdList);
        })
    }
  }

  insertDivs = () => {
    const { coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1 } = this.state;
    DivsService.insertDivs(coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('사업장등록 완료!');
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
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("중복된 사업장 또는 모두 입력해주세요");
      });
  }

  addrButton = () => {
    // this.setState((current) => ({
    //   openAddr: !current.openAddr
    // }));
    // this.setState({ openAddr: true });
    this.addrRef.current.handleUp();
    //  this.setState({ coZip: this.addrRef.current.value.coZip });
    //  this.setState({ coAddr: this.addrRef.current.value.coAddr });

    // console.log(this.addrRef.current.value.coZip, this.addrRef.current.value.coAddr);
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
          })
          .catch((error) => {
            // 오류 발생 시의 처리
            console.error(error);
            // alert("중복된 회사 또는 모두 입력해주세요");
          })
    }
  }

  helpClick = () => {
    this.coDialogRef.current.handleUp();
  };


  closeDialog = () => {
    this.dialogRef.current.handleDown();
  }

  handleSetCodialTextField = async (data) => {
    await this.setState({
      CodialTextField: data.coCd + ". " + data.coNm,
      coCd: data.coCd  //밑에 coCd 넘겨주기
    });
  };

  searchClick = (coCd) => {
    CompanyService.getCo(coCd)
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
        const cardCount = response.data.length;

        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
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
          coNmList: coNmList,

          focused: coCd,
          coCd: coCd,
          coNm: coNm,
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

  // searchName =(e)=>{
  //   this.setState({CodialTextField : e.target.value});
  // }

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
        window.confirm('사업장삭제 완료!');
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
    const { data } = this.state;
    const { cardCount, divCdList, divNmList, coCdList } = this.state;


    const currentDate = new Date();

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관


    const cards = divCdList.map((divCd, index) => (
      <Card key={divCd} focused={this.state.focused === divCd} sx={{ width: '100%', height: 70, position: 'relative', border: this.state.focused === divCd ? '2px solid #7895CB' : '1px solid #000', backgroundColor: this.state.focused === divCd ? '#C5DFF8' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(divCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 8 }} gutterBottom style={{ position: 'relative', top: '-10px', left: "-10px" }}>
              {divCdList[index]}
            </Typography>
            <Typography sx={{ fontSize: 10 }} style={{ position: 'relative', left: "90px" }} >
              {formattedDate}
            </Typography>
            {/* <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "8px", top:'0px' }}>
              {index + 1}
            </Typography> */}
            <Typography sx={{ fontSize: 10 }} variant='h3' style={{ position: 'relative', bottom: "2px" }}>
              {divNmList[index]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));

    return (
      <>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>사업장관리</span>
          </Grid>
        </Grid>

        <CustomGridContainer container direction="row" spacing={2}
          justifyContent="left"
          alignItems="center" >

          <Grid item xs={4}>
            <Grid container alignItems="center">
              <CustomInputLabel >사업장</CustomInputLabel>
              <CustomTextField name='CodialTextField' value={this.state.CodialTextField} placeholder="사업장코드/사업장명 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.helpClick} /></InputAdornment>
                  ),
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          <Button variant="outlined" onClick={() => this.searchClick(coCd)} style={{ padding: "0px", minWidth: "5px", position: 'absolute', top: '165px', right: "35px" }}>
            <SearchIcon fontSize="medium" />
          </Button>
        </CustomGridContainer >

        <Grid sx={{ position: 'relative', display: 'flex', width: '100%' }}>
          <Grid container sx={{ width: '15%', height: 670, border: '1px solid #EAEAEA', backgroundColor: '#f5f5f5' }}>

            <Grid item sx={{ mb: 1, display: 'flex', justifyContent: 'left', alignItems: "center", width: '100%', height: 22, backgroundColor: '#f5f5f5', borderBottom: '1px solid' }}>
              <CustomInputLabel >총 사업장:</CustomInputLabel><CustomInputLabel >{cardCount}</CustomInputLabel>
            </Grid>

            <Grid item sx={{ pl: 1.2, width: '95%', height: 'calc(100% - 5%)', overflowY: 'auto' }}>
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1 }}>
                  {card}
                </Grid>
              ))}
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
              <Grid item xs={10.6}>
                <CustomInputLabel sx={{ mt: 1, color: 'black' }}>기본정보</CustomInputLabel>
              </Grid>

              <Grid item xs={0.7}>
                {coCd && divCd ?
                  <Button variant="outlined" onClick={this.updateDivs}>수정</Button>
                  :
                  <Button variant="outlined" onClick={this.insertDivs}>저장</Button>
                }
              </Grid>

              <Grid item xs={0.7}>
                <Button variant="outlined" onClick={this.deleteDivs}>삭제</Button>
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel>회사선택</InputLabel>
                </Grid>
                <Grid item xs={4} size='small' sx={{mt: 1,  display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA'}}>
                {divCd != 0 ?
                  <TextField xs={4} value={coCd} InputProps={{ readOnly: true }}></TextField>
                  :
                  <FormControl  sx={{ width: 200 }}>
                    <Select name='coCd' value={coCd} onChange={this.handleCompany}>
                      {coCdList.map((coCd) => (
                        <MenuItem key={coCd} value={coCd}>
                          {coCd}
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

              <Grid item xs={2} sx={{  display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                <CustomInputLabel sx={{ color: 'black' }}  >사업장명</CustomInputLabel>
              </Grid>
              <Grid item xs={4} sx={{  display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }} >
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


              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <CustomInputLabel sx={{ color: 'black' }}  >사업자번호</CustomInputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                <CustomTextField name='divNb' sx={{ ml: 2 }} onChange={this.handleCompany} value={divNb || ''}></CustomTextField>
              </Grid>


              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <CustomInputLabel sx={{ color: 'black' }}  >세무서번호</CustomInputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                <CustomTextField name='toNb' sx={{ ml: 2 }} onChange={this.handleCompany} value={toNb || ''}></CustomTextField>
              </Grid>


              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#EAEAEA', borderBottom: '1px solid lightgray', }}>
                <CustomInputLabel sx={{ color: 'black' }}  >사업장주소</CustomInputLabel>
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
        <CoDialogComponent handleSetCodialTextField={this.handleSetCodialTextField} ref={this.coDialogRef} />
      </>
    );
  }
}


export default DivMgmtComponent;