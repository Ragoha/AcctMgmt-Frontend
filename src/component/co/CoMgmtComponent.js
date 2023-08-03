import React, { Component } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, Container, DialogActions, Divider, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';
import { GridRowModel } from '@mui/x-data-grid-pro';
import dayjs from 'dayjs';

import CompanyService from '../../service/CompanyService';
import AddressComponent from './dialog/AddressComponent';
import CoDialogComponent from './dialog/CoDialogComponent';
import { CustomGridContainer, CustomInputLabel } from '../common/style/CommonStyle';

class CoMgmtComponent extends Component {
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
      coNm: '',
      gisu: 0,
      frDt: new Date(), // 기수 시작일 날짜 객체
      toDt: new Date(), // 기수 종료일 날짜 객체
      //insertId: '', //등록자
      //insertDt: '', //등록일  String???
      //insertIp: '', //등록자 ip
      //modifyId: '', //수정자
      //modifyDt: '', //수정일
      //modifyIp: '', //수정 ip
      selectedRow: { gisu: '', frDt: '', toDt: '' },
      jongmok: '', //종목
      businessType: '', //업태
      coNb: '', //사업자번호
      ceoNm: '', //대표자명
      coZip: '', //우편번호
      coAddr: '', //주소
      coAddr1: '', //상세주소
      coCdList: [],
      coNmList: [],
      CodialTextField: '',
      dateRange: '',
      isChanged: false, //수정중일때 변화 감지 변수 : 바뀐게 있다면 true로 바꿔서 alert창 띄우기&&수정이 완료되면 초기화

      data: {
        columns: [
          { field: 'gisu', headerName: '기수', editable: true, width: 90, headerAlign: 'center' },
          { field: 'frDt', headerName: '시작일', type: 'date', editable: true, width: 180.1, headerAlign: 'center' },
          { field: 'toDt', headerName: '종료일', type: 'date', editable: true, width: 180.2, headerAlign: 'center' },
        ],
        rows: [
          { id: 1, 'gisu': '', 'frDt': '', 'toDt': '' },
          // { id: 2, 'name': randomTraderName(), 'startDate': randomCreatedDate(),'endDate': randomCreatedDate() },
          // { id: 3, 'name': randomTraderName(), 'startDate': randomCreatedDate(),'endDate': randomCreatedDate() },
          // { id: 4, 'name': randomTraderName(), 'startDate': randomCreatedDate(),'endDate': randomCreatedDate() },
          // { id: 5, 'name': randomTraderName(), 'startDate': randomCreatedDate(),'endDate': randomCreatedDate() }
          // Add more rows here...
        ]
      }
    }
  }


  componentDidMount() {
    CompanyService.getCoList()
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
        const gisu = response.data[0].gisu;
        const frDt = dayjs(response.data[0].frDt).format('YYYY-MM-DD');
        const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
        const jongmok = response.data[0].jongmok;
        const businessType = response.data[0].businessType;
        const coNb = response.data[0].coNb;
        const ceoNm = response.data[0].ceoNm;
        const coZip = response.data[0].coZip;
        const coAddr = response.data[0].coAddr;
        const coAddr1 = response.data[0].coAddr1;

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,

          focused: coCd,
          coCd: coCd,
          coNm: coNm,
          gisu: gisu,
          frDt: frDt,
          toDt: toDt,
          dateRange: frDt + ' ~ ' + toDt,
          jongmok: jongmok,
          businessType: businessType,
          coNb: coNb,
          ceoNm: ceoNm,
          coZip: coZip,
          coAddr: coAddr,
          coAddr1: coAddr1
        })
      }) //db 에 아무것도 없을때 focused coCd 잡히는 것 에러 남 이거 잡아야함!
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
  }


  handleCompany = (e) => {
    // console.log(e.target.id);
    {
      this.setState({
        isChanged: true,
        [e.target.name]: e.target.value
      })

      // console.log(this.state);
    }
  }

  addCardButton = () => {
    // const newCoNmList = [...this.state.coNmList, `coNm${newCardCount}`];
    if (this.state.coCdList.includes('0000')) {
      alert("미등록 회사가 존재합니다.");
    } else {
      const newCardCount = this.state.cardCount + 1;
      const newCoCdList = [...this.state.coCdList, '0000'];
      // 상태를 업데이트하여 카드를 추가하고 컴포넌트를 다시 렌더링
      this.setState({
        cardCount: newCardCount,
        coCdList: newCoCdList,
        // coNmList: newCoNmList,
        focused: '0000',
        coCd: '',
        coNm: '',
        gisu: '',
        frDt: '',
        toDt: '',
        dateRange: '',
        jongmok: '',
        businessType: '',
        coNb: '',
        ceoNm: '',
        coZip: '',
        coAddr: '',
        coAddr1: ''
      })
    }
  }//여기에 모든 state값 초기화 하면 됨 !!!!!

  insertCo = () => {
    const { coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;
    CompanyService.insertCo(coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('회사등록 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          focused: coCdList[cardCount - 1],
          coCd: '',
          coNm: '',
          gisu: '',
          frDt: '',
          toDt: '',
          dateRange: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: '',
          isChanged: false
        });
        // window.location.reload();
        // window.location.href="/acctmgmt/ozt/co";
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("회사등록 실패ㅠ");
      });
  }

  addrButton = () => {
    this.addrRef.current.handleUp();
    //  this.setState({ coZip: this.addrRef.current.value.coZip });
    //  this.setState({ coAddr: this.addrRef.current.value.coAddr });

    // console.log(this.addrRef.current.value.coZip, this.addrRef.current.value.coAddr);
  }

  closeAddrDialog = () => {
    this.addrRef.current.handleDown();
  }

  cardClick = (coCd) => {
    console.log(coCd);
    // this.setState({ coCd: coCdList[index] });
    // console.log(index)
    if (this.state.isChanged) {
      alert('수정중인 내용이 있습니다.');
    } else {
      this.setState({ focused: coCd })
      {
        coCd == '0000' ?
          this.setState({
            coCd: '',
            coNm: '',
            gisu: '',
            frDt: '',
            toDt: '',
            dateRange: '',
            jongmok: '',
            businessType: '',
            coNb: '',
            ceoNm: '',
            coZip: '',
            coAddr: '',
            coAddr1: ''
          }) :
          CompanyService.getCompany(coCd)

            .then((response) => {
              const coCd = response.data[0].coCd;
              const coNm = response.data[0].coNm;
              const gisu = response.data[0].gisu;
              const frDt = dayjs(response.data[0].frDt).format('YYYY-MM-DD');
              const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
              const jongmok = response.data[0].jongmok;
              const businessType = response.data[0].businessType;
              const coNb = response.data[0].coNb;
              const ceoNm = response.data[0].ceoNm;
              const coZip = response.data[0].coZip;
              const coAddr = response.data[0].coAddr;
              const coAddr1 = response.data[0].coAddr1;

              this.setState({
                coCd: coCd,
                coNm: coNm,
                gisu: gisu,
                frDt: frDt,
                toDt: toDt,
                dateRange: frDt + ' ~ ' + toDt,
                jongmok: jongmok,
                businessType: businessType,
                coNb: coNb,
                ceoNm: ceoNm,
                coZip: coZip,
                coAddr: coAddr,
                coAddr1: coAddr1
              })
              console.log(frDt, toDt)
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              // alert("중복된 회사 또는 모두 입력해주세요");
            })
      }
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
    CompanyService.getCompany(coCd)
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
        const cardCount = response.data.length;

        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
        const gisu = response.data[0].gisu;
        const frDt = dayjs(response.data[0].frDt).format('YYYY-MM-DD');
        const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
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
          gisu: gisu,
          frDt: frDt,
          toDt: toDt,
          dateRange: frDt + ' ~ ' + toDt,
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

  setCoZipAddr = (data) => {
    this.setState({ coZip: data.coZip });
    this.setState({ coAddr: data.coAddr });
  }

  handleGisu = () => {
    this.setState({ open: true });
  }

  updateCo = () => {
    const { coCd, coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;

    console.log(coNm)
    CompanyService.updateCo(coCd, coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1)
      .then((response) => {
        console.log(response.data);
        window.confirm('업데이트 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          focused: coCd,
          coCd: coCd,
          coNm: coNm,
          gisu: gisu,
          frDt: frDt,
          toDt: toDt,
          jongmok: jongmok,
          businessType: businessType,
          coNb: coNb,
          ceoNm: ceoNm,
          coZip: coZip,
          coAddr: coAddr,
          coAddr1: coAddr1,
          isChanged: false
        })
      })

      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("업데이트 실패..");
      });
  }

  deleteCo = () => {  //-> 이거 index 값 건드리는게 아닌듯....ㅠ 삭제 시 index가 달라지는데 그 적은 숫자를 그대로 가지고있네 ㄷㄷ
    const { coCd } = this.state;

    CompanyService.deleteCo(coCd)
      .then((response) => {
        console.log(response.data);
        window.confirm('회사삭제 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          focused: coCdList[0],
          coCd: '',
          coNm: '',
          gisu: '',
          frDt: '',
          toDt: '',
          dateRange: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: ''
        })
      })
      // window.location.href="/acctmgmt/ozt/co";
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("회사삭제 실패..");
      });
  }

  insertDate = (selectedRow) => {
    this.setState({
      dateRange: dayjs(selectedRow.frDt).format('YYYY-MM-DD') + " ~ " + dayjs(selectedRow.toDt).format('YYYY-MM-DD'),
      gisu: selectedRow.gisu,

      frDt: dayjs(selectedRow.frDt).format('YYYY-MM-DD'),
      toDt: dayjs(selectedRow.toDt).format('YYYY-MM-DD'),
      open: false
    })
    console.log(selectedRow);
  }

  //열 클릭 시, 값 콘솔에 적용
  handleClickRow = (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
  }

  // processRowUpdate = (updatedRow) => {
  //   // Update the rows state with the modified row
  //   this.setState((prevState) => ({
  //     rows: prevState.rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)),
  //   }), () => {
  //     console.log('Row updated and saved:', updatedRow);
  //   });
  // };

  render() {
    const { open, coCd, coNm, jongmok, businessType, ceoNm, coNb, coZip, coAddr, coAddr1, openAddr, gisu, frDt, toDt } = this.state;
    const { selectedRow } = this.state;
    const { data } = this.state;
    const { cardCount, coCdList, coNmList } = this.state;


    const currentDate = new Date();

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관


    const cards = coCdList.map((coCd, index) => (
      <Card key={coCd} focused={this.state.focused === coCd} sx={{ mb: 1, width: '100%', height: 100, position: 'relative', border: this.state.focused === coCd ? '5px solid #7895CB' : '1px solid #000', backgroundColor: this.state.focused === coCd ? '#C5DFF8' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(coCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 15 }} gutterBottom style={{ position: 'absolute', top: '7px' }}>
              {coCdList[index]}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "9px", bottom: '4px' }} >
              {formattedDate}
            </Typography>

            <Typography sx={{ fontSize: 25 }} variant='h3' style={{ position: 'absolute', bottom: '8px' }}>
              {coNmList[index]}
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
            <span>회사관리</span>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />

        <CustomGridContainer container direction="row"
          justifyContent="left"
          alignItems="center">

          <CustomInputLabel>회사</CustomInputLabel>
          <Paper sx={{ width: '21%', mt: 1, ml: 1, mb: 1, border: '1px solid #000' }}>
            <InputBase name='CodialTextField' value={this.state.CodialTextField} sx={{ width: '80%', ml: 1 }} placeholder="회사코드/회사명 검색하세요" />
            <IconButton type="button" onClick={this.helpClick} >
              <SearchIcon />
            </IconButton>
            <Button variant="outlined" onClick={() => this.searchClick(coCd)} style={{ padding: "0px", minWidth: "5px", position: 'absolute', top: '155px', right: "35px" }}>
              <SearchIcon fontSize="medium" />
            </Button>
          </Paper>
        </CustomGridContainer>

        <Grid sx={{ display: 'flex' }} >
          <Grid container sx={{ width: 380, height: 570, border: '1px solid #EAEAEA' }} >

            <Grid item sx={{ display: 'flex', justifyContent: 'left', alignItems: "center", height: 22, width: '100%', backgroundColor: '#EAEAEA' }}>
              <InputLabel >총 회사:</InputLabel><InputLabel sx={{ ml: 0.5, color: '#4A55A2' }}>{cardCount}</InputLabel>
            </Grid>

            <Grid item sx={{ height: 'calc(100% - 5%)', overflowY: 'auto', width: '100%' }}>
              <Grid item  >
                <Card item>
                  {cards}
                </Card>
              </Grid>
            </Grid>

            <Grid item sx={{ ml: 0.6, position: 'absolute', top: '785px', width: '20%' }} >
              <Fab variant="extended" onClick={this.addCardButton}
                sx={{
                  backgroundColor: '#4A55A2', color: 'white', display: 'flex', justifyContent: 'center', width: '95%',
                  "&:hover": {
                    backgroundColor: '#4A55A2'
                  }
                }}>
                <AddIcon />
                추가
              </Fab>
            </Grid>
          </Grid>


          <Container sx={{ height: 630, border: '1px solid #EAEAEA' }}>
            <Grid container sx={{ height: 40, borderBottom: '2px solid #000' }}>
              <Grid item xs={10}>
                <InputLabel sx={{ mt:1,color: 'black' }}>기본정보</InputLabel>
              </Grid>

              <Grid item xs={1}>
                {coCd ?
                  <Button variant="outlined" onClick={this.updateCo}>수정</Button>
                  :
                  <Button variant="outlined" onClick={this.insertCo}>저장</Button>
                }
              </Grid>

              <Grid item xs={1}>
                <Button variant="outlined" onClick={this.deleteCo}>삭제</Button>
              </Grid>
            </Grid>


            <Grid container  >
              <Grid item xs={2} sx={{ mt:1,height:50,display: 'flex',justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                <InputLabel sx={{  mr:2,color: 'black'}}  >회사코드</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1,display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }} >
                <TextField size='small' sx={{ ml:2,backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''} InputProps={{ readOnly: true }}></TextField>
              </Grid>

              <Grid item xs={2} sx={{ mt:1,display: 'flex',justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }} >
                <InputLabel sx={{ mr:2,color: 'black'}}  >회사명</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1,display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }} >
                <TextField sx={{ ml:2}} size='small' name='coNm' onChange={this.handleCompany} value={coNm || ''}></TextField>
              </Grid>


              <Grid item xs={2} sx={{mt:1, height:50,display: 'flex',justifyContent: 'flex-end' ,alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr:2,color: 'black' }}  >종목</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{mt:1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField sx={{ml:2 }} size='small' name='jongmok' onChange={this.handleCompany} value={jongmok || ''}></TextField>
              </Grid>


              <Grid item xs={2} sx={{ mt:1,display: 'flex', justifyContent: 'flex-end' ,alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr:2, color: 'black' }}  >업태</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{mt:1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA'}}>
                <TextField sx={{ ml:2 }} size='small' name='businessType' onChange={this.handleCompany} value={businessType || ''}></TextField>
              </Grid>


              <Grid item xs={2} sx={{mt:1,height:50,display: 'flex',justifyContent: 'flex-end' , alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr:2, color: 'black' }}  >대표자명</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1,display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField sx={{ ml:2  }} size='small' name='ceoNm' onChange={this.handleCompany} value={ceoNm || ''}></TextField>
              </Grid>


              <Grid item xs={2} sx={{ mt:1,display: 'flex',justifyContent: 'flex-end' , alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr:2, color: 'black'}}  >사업자번호</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1,display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA' }}>
                <TextField size='small' name='coNb' sx={{ ml:2 }} onChange={this.handleCompany} value={coNb || ''}></TextField>
              </Grid>


              <Grid item xs={2} sx={{ mt:1,height:50,display: 'flex',justifyContent: 'flex-end' , alignItems: 'center', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr:2, color: 'black' }}  >회사주소</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1,display: 'flex', alignItems: 'center' }}>
                <TextField id="coZip" size='small' name="coZip" onChange={this.handleCompany} value={coZip || ''} InputProps={{ readOnly: true }}
                  sx={{ ml:2, width: '150px' }}></TextField>
                <Button sx={{  ml: 1 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
              </Grid>

              <Grid item xs={6}></Grid>

              <Grid item xs={2} sx={{height:50}}></Grid>
              <Grid item xs={6}>
                <TextField sx={{ ml:2,width: '570px'}} id="coAddr" name="coAddr" size='small' onChange={this.handleCompany} value={coAddr || ''} InputProps={{ readOnly: true }}></TextField>
              </Grid>
              <Grid item xs={4}></Grid>
              
              <Grid item xs={2} sx={{ height:50,borderBottom: '1px solid #EAEAEA' }}></Grid>
              <Grid item xs={6} sx={{ borderBottom: '1px solid #EAEAEA' }}>
                <TextField sx={{ ml:2,width: '570px' }} name="coAddr1" size='small' onChange={this.handleCompany} value={coAddr1 || ''} ></TextField>
              </Grid>
              <Grid item xs={4} sx={{ borderBottom: '1px solid #EAEAEA' }}></Grid>
            

              <Grid item xs={2} sx={{ mt:1, height:50, display: 'flex',justifyContent: 'flex-end' , alignItems: 'center', backgroundColor: '#EAEAEA',borderBottom: '1px solid lightgray', }}>
                <InputLabel sx={{  mr:2, color: 'black' }}  >회계기수</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt:1, display: 'flex', alignItems: 'center' }}>
                <InputLabel sx={{ml:2}} name='gisu' onChange={this.handleCompany} value={gisu || ''}>{gisu}</InputLabel>
                <InputLabel sx={{ textAlign: 'right', mr: 1 }}>기</InputLabel>
                <TextField name='dateRange' value={this.state.dateRange || ''} onChange={this.handleCompany} size='small' InputProps={{ readOnly: true }}></TextField>
                <Button size="medium" sx={{  ml: 1 }} variant="outlined" onClick={this.handleGisu}>
                  기수등록
                </Button>
              </Grid>
              <Grid item xs={6}></Grid>

            </Grid>
          </Container>

          <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
            <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
              회계기수 등록
              <IconButton size='small' sx={{ ml: 36 }} onClick={() => this.setState({ open: false })}>
                <CloseIcon fontSize='medium' sx={{ color: 'white' }} />
              </IconButton>
              <Divider sx={{ border: '1px solid #EAEAEA' }} />
            </DialogTitle>
            <DialogContent >

              <Grid container direction="column" alignItems="flex-end">
                <Button sx={{ mt: 1, mb: 1 }} variant="outlined" >삭제</Button>
              </Grid>

              <Divider sx={{ border: '1px solid #EAEAEA', mb: 3 }} />

              <Grid style={{ height: 350, width: '100%' }} >
                <DataGrid sx={{ borderTop: '2px solid #000' }}
                  rows={data.rows} columns={data.columns}
                  showColumnVerticalBorder={true}
                  showCellVerticalBorder={true} // 각 셀마다 영역주기
                  processRowUpdate={this.processRowUpdate} //-> 이거 해봐야함
                  onRowClick={this.handleClickRow}
                  hideFooter
                />
              </Grid>

            </DialogContent>
            <Divider />
            <DialogActions>
              <Grid container sx={{ mr: 22 }}>
                <Button variant="outlined" onClick={() => this.insertDate(selectedRow)}
                  sx={{
                    backgroundColor: '#4A55A2', color: 'white', mr: 1,
                    "&:hover": {
                      backgroundColor: '#4A55A2'
                    }
                  }}>확인</Button>

                <Button variant="outlined" onClick={() => this.setState({ open: false })} >취소</Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </Grid>

        <AddressComponent setCoZipAddr={this.setCoZipAddr} ref={this.addrRef} />
        <CoDialogComponent handleSetCodialTextField={this.handleSetCodialTextField} ref={this.coDialogRef} />
      </>
    );
  }
}


export default CoMgmtComponent;