import React, { Component } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, Divider, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


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
        // const coCdList = response.data.map((item) => item.coCd);
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
          // coCdList: coCdList,
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
      const newDivCdList = [...this.state.divCdList, '0000'];
      // 상태를 업데이트하여 카드를 추가하고 컴포넌트를 다시 렌더링
      this.setState({
        cardCount: newCardCount,
        divCdList: newDivCdList,
        // coNmList: newCoNmList,
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
    }
  }//여기에 모든 state값 초기화 하면 됨 !!!!!

  insertDivs = () => {
    const { coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1 } = this.state;
    DivsService.insertDivs(coCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('사업장등록 완료!');
        // const coCdList = response.data.map((item) => item.coCd);
        // const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          // coCdList: coCdList,
          // coNmList: coNmList,
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
        // const divNmList = response.data.map((item) => item.divNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          divCdList: divCdList,
          // divNmList: divNmList,
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

  render() {
    const { open, coCd, divCd, toNb, divNm, jongmok, businessType, ceoNm, divNb, divZip, divAddr, divAddr1 } = this.state;
    const { data } = this.state;
    const { cardCount, divCdList, divNmList, coCdList } = this.state;


    const currentDate = new Date();

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관


    const cards = divCdList.map((divCd, index) => (
      <Card key={divCd} focused={this.state.focused === divCd} sx={{ mb: 1, width: '100%', height: 100, position: 'relative', border: this.state.focused === divCd ? '5px solid #7895CB' : '1px solid #000', backgroundColor: this.state.focused === divCd ? '#C5DFF8' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(divCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 15 }} gutterBottom style={{ position: 'absolute', top: '7px' }}>
              {divCdList[index]}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "9px", bottom: '4px' }} >
              {formattedDate}
            </Typography>
            {/* <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "8px", top:'0px' }}>
              {index + 1}
            </Typography> */}
            <Typography sx={{ fontSize: 25 }} variant='h3' style={{ position: 'absolute', bottom: '8px' }}>
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
        <Divider sx={{ my: 1 }} />

        <Grid container direction="row"
          justifyContent="left"
          alignItems="center" sx={{ minHeight: 50, border: '1px solid #EAEAEA', mb: '10px' }}>

          <InputLabel sx={{ fontWeight: 'bold', ml: 3 }}>사업장</InputLabel>
          <Paper sx={{ width: '21%', mt: 1, ml: 1, mb: 1, border: '1px solid #000' }}>
            <InputBase name='CodialTextField' value={this.state.CodialTextField} onChange={this.searchName} sx={{ width: '80%', ml: 1 }} placeholder="사업장코드/사업장명 검색하세요" />
            <IconButton type="button" onClick={this.helpClick} >
              <SearchIcon />
            </IconButton>
            <Button variant="outlined" onClick={() => this.searchClick(coCd)} style={{ padding: "0px", minWidth: "5px", position: 'absolute', top: '155px', right: "35px" }}>
              <SearchIcon fontSize="medium" />
            </Button>
          </Paper>
        </Grid>

        <Grid sx={{ display: 'flex' }}>
          <Grid container sx={{ width: '25%', height: 570, border: '1px solid #EAEAEA' }}>

            {/* <Divider sx={{ width: '20.2%', border: '1px solid #000', position: 'absolute', top: '264px'  }} /> */}

            <Grid container sx={{ display: 'flex', justifyContent: 'left', alignItems: "center", width: '100%', height: 22, backgroundColor: '#EAEAEA' }}>
              <InputLabel >총 사업장:</InputLabel><InputLabel sx={{ ml: 0.5, color: '#4A55A2' }}>{cardCount}</InputLabel>
            </Grid>

            <Grid sx={{ width: '100%', height: 'calc(100% - 5%)', overflowY: 'auto' }}>
              <Grid item xs={12} >
                <Card>
                  {cards}
                </Card>
              </Grid>
            </Grid>

            <Grid container sx={{ ml: 0.6, position: 'absolute', top: '785px', width: '20%' }} >
              <Fab variant="extended" onClick={this.addCardButton}
                sx={{
                  backgroundColor: '#4A55A2', color: 'white', display: 'flex', justifyContent: 'center', width: '95%',
                  "&:hover": {
                    backgroundColor: '#4A55A2'
                  }
                }}>
                <AddIcon />
                INSERT
              </Fab>
            </Grid>
          </Grid>

          <Grid container sx={{ ml: 1, width: '75%', height: 630, border: '1px solid #EAEAEA' }}>
            <Grid container sx={{ width: '100%', maxHeight: 40, borderLeft: '1px solid #000', borderBottom: '1px solid #000' }}>
              <Grid item>
                <InputLabel sx={{ ml: 2, mr: 2, mt: 1, textAlign: 'center', color: 'black' }}>기본정보</InputLabel>
              </Grid>



              <Grid item sx={{ ml: 117.3, mr: 1 }}>
                {coCd && divCd ?
                  <Button variant="outlined" onClick={this.updateDivs}>수정</Button>
                  :
                  <Button variant="outlined" onClick={this.insertDivs}>저장</Button>
                }
              </Grid>

              <Grid item >
                <Button variant="outlined" onClick={this.deleteDivs}>삭제</Button>
              </Grid>
              {/* <Divider sx={{width: '60.8%', border: '1px solid #000', position:'absolute', top:'264px'}}/> */}
            </Grid>

            {/* 
            <Grid container sx={{ width: '100%', height: 'calc(100% - 65px)' }}> */}

            {/* <Grid container direction="row"
                  justifyContent="center"
                  alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', height: 50 }}>
                  <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }} >회사코드</InputLabel>
                  <TextField size='small' sx={{ backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''}></TextField>
                </Grid> */}

            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel>회사선택</InputLabel>
              {divCd?
                <TextField value={coCd} InputProps={{ readOnly: true }}></TextField>
                 :
                <FormControl sx={{ width: 200 }}>
                  <Select
                    name='coCd'
                    onChange={this.handleCompany}
                  //value={coCd}?
                  >
                    <MenuItem >{coCd}</MenuItem>
                  </Select>
                </FormControl> 
                }
            </Grid>

            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "10px" }}  >사업장코드</InputLabel>
              <TextField size='small' name='divCd' sx={{ mr: 3.7, backgroundColor: '#FFA7A7' }} onChange={this.handleCompany} value={divCd || ''} InputProps={{ readOnly: true }}></TextField>
            </Grid>


            <Grid item
              sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "10px" }}  >사업장명</InputLabel>
              <TextField size='small' name='divNm' onChange={this.handleCompany} value={divNm || ''}></TextField>
            </Grid>


            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "10px" }}  >대표자명</InputLabel>
              <TextField size='small' name='ceoNm' onChange={this.handleCompany} value={ceoNm || ''}></TextField>
            </Grid>



            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "40px" }}  >종목</InputLabel>
              <TextField size='small' name='jongmok' onChange={this.handleCompany} value={jongmok || ''}></TextField>
            </Grid>

            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "28px" }}  >업태</InputLabel>
              <TextField size='small' name='businessType' onChange={this.handleCompany} value={businessType || ''}></TextField>
            </Grid>



            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "10px" }}  >사업자번호</InputLabel>
              <TextField size='small' name='divNb' sx={{ mr: 3.7 }} onChange={this.handleCompany} value={divNb || ''}></TextField>
            </Grid>


            <Grid item sx={{ width: '50%', height: 50, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', marginRight: "10px" }}  >세무서번호</InputLabel>
              <TextField size='small' name='toNb' sx={{ mr: 3.7 }} onChange={this.handleCompany} value={toNb || ''}></TextField>
            </Grid>


            <Grid item sx={{ width: '50%', height: 15, display: 'flex', alignItems: 'center' }}>
              <InputLabel sx={{ color: 'black', mr: 2.2 }}  >사업장주소</InputLabel>
              <TextField id="divZip" size='small' name="divZip" onChange={this.handleCompany} value={divZip || ''} InputProps={{ readOnly: true }}
                sx={{
                  width: '150px', mr: 0.2 // 원하는 가로 크기를 지정 '기본크기는 약 222px'
                }}></TextField> <Button sx={{ direction: "row", justifyContent: "center", alignItems: "center", mt: 0.2, ml: 0.2 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
            </Grid>


            <Grid item sx={{ width: '50%', height: 10 }}></Grid>

            <Grid item
              sx={{ width: '50%', ml: 12, height: 25, display: 'flex', alignItems: 'center' }}>
              <InputLabel ></InputLabel>
              <TextField sx={{ width: '570px', mr: 21 }} id="divAddr" name="divAddr" size='small' onChange={this.handleCompany} value={divAddr || ''} InputProps={{ readOnly: true }}></TextField>
            </Grid>

            <Grid item
              sx={{ width: '50%', ml: 12, height: 5, display: 'flex', alignItems: 'center' }}>
              <InputLabel ></InputLabel>
              <TextField sx={{ width: '570px', mr: 21 }} name="divAddr1" size='small' onChange={this.handleCompany} value={divAddr1 || ''} ></TextField>
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