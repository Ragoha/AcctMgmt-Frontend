import React, { Component } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'; // 변경된 import

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




import ListIcon from '@mui/icons-material/List';


import CompanyService from '../../service/CompanyService';
import CoDialogComponent from '../co/dialog/CoDialogComponent';
import { CustomGridContainer, CustomInputLabel, CustomTextField } from '../common/style/CommonStyle';

class PjtComponent extends Component {
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
      selectedRow: { gisu: '', frDt: '', toDt: '' },
      coCdList: [],
      coNmList: [],
      CodialTextField: '',
      isChanged: false, //수정중일때 변화 감지 변수 : 바뀐게 있다면 true로 바꿔서 alert창 띄우기&&수정이 완료되면 초기화
      coNm: "",
      dateRange: [null, null], // 날짜 범위를 배열로 저장합니다.
      // value: dayjs('2022-04-17'),
    }
  }

  handleDateRangeChange = (newValue) => {
    this.setState({ dateRange: newValue });
  };
  componentDidMount() {
    CompanyService.getCoList() //카드리스트 전체조회 함수
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd); //회사코드 리스트
        const coNmList = response.data.map((item) => item.coNm); //회사 이름 리스트
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정 (총회사 띄우는거) 

        const coCd = response.data[0].coCd; //가장 먼저 저장된 coCd 코드 저장해서 이걸 통해서 리스트 순서를 정함

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,

          focused: coCd,
          coCd: coCd,
        })
      }) //db 에 아무것도 없을때 focused coCd 잡히는 것 에러 남 이거 잡아야함!
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
  }

  //추가, 수정, 텍스트 필드애들을 변화 감지해서 값 넣어주기
  //수정 시 값 변화를 인식
  handleCompany = (e) => {
    {
      this.setState({
        isChanged: true,
        [e.target.name]: e.target.value
      })
    }
  }
  //카드 리스트 생성
  addCardButton = () => {
    //0000을 갖고있는 카드가 생기면 생성되지 않도록 막은 조건
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
      })
    }
  }//여기에 모든 state값 초기화 하면 됨 !!!!!
  // 저장 버튼 누르면 텍스트 필드 갑 읽어와서 저장 해주는 친구들
  insertCo = () => {
    const { coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;
    CompanyService.insertCo(coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('회사등록 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        // this.setState({
        //   cardCount: cardCount, // state에 값을 저장
        //   coCdList: coCdList,
        //   coNmList: coNmList,
        // coCd: '',
        // });
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("중복된 회사 또는 모두 입력해주세요");
      });
  }
  //카드를 클릭하면 우측에 데이터 랜더링 함수
  cardClick = (coCd) => {
    console.log(coCd);
    // this.setState({ coCd: coCdList[index] });
    // console.log(index)
    if (this.state.isChanged) {
      alert('변경된 내용이 저장되지 않았습니다.'); //확인 취소 같이 나오는 어럴트
    } else {
      this.setState({ focused: coCd })
      {
        coCd == '0000' ?
          this.setState({
            coCd: '',
          }) :
          CompanyService.getCompany(coCd)

            .then((response) => {
              const coCd = response.data[0].coCd;
              this.setState({
                coCd: coCd,
              })
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              // alert("중복된 회사 또는 모두 입력해주세요");
            })
      }
    }
  }


  //헬퍼코드
  helpClick = () => {
    this.coDialogRef.current.handleUp();
  };

  // 다이얼로그 닫을 때 사용
  closeDialog = () => {
    this.dialogRef.current.handleDown();
  }
  // 검색한 다음 텍스트필드 값 변경해주는거 검색한 내용으로
  handleSetCodialTextField = async (data) => {
    await this.setState({
      CodialTextField: data.coCd + ". " + data.coNm,
      coCd: data.coCd  //밑에 coCd 넘겨주기
    });
  };
  // 검색한 내용들 나오는 곳
  searchClick = (coCd) => {
    CompanyService.getCompany(coCd)
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
        const cardCount = response.data.length;

        const coCd = response.data[0].coCd;

        this.setState({
          cardCount: cardCount,//??????
          coCdList: coCdList,
          coNmList: coNmList,

          focused: coCd,
          coCd: coCd,
        })
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      })
  }

  updateCo = () => {
    const { coCd } = this.state;

    CompanyService.updateCo(coCd)
      .then((response) => {
        console.log(response.data);
        window.confirm('업데이트 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          // cardCount: cardCount, // state에 값을 저장
          // coCdList: coCdList,
          // coNmList: coNmList,
          focused: coCd,
          coCd: coCd,
        })
      })

      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("업데이트 실패..");
      });
  }
  //db로 삭제 요청
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
        })
      })
      // window.location.href="/acctmgmt/ozt/co";
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("삭제 실패..");
      });
  }
  render() {

    const { coCd } = this.state;
    const { cardCount, coCdList, coNmList } = this.state;
    const { value } = this.state;
    // const currentDate = new Date();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

    const cards = coCdList.map((coCd, index) => (
      <Card
        key={coCd} focused={this.state.focused === coCd} sx={{ width: '100%', height: 70, position: 'relative', border: this.state.focused === coCd ? '2px solid #7895CB' : '1px solid #000', backgroundColor: this.state.focused === coCd ? '#C5DFF8' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(coCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 8 }} gutterBottom style={{ position: 'relative', top: '-10px', left: "-10px" }}>
              {coCdList[index]}
            </Typography>
            {/* 날짜 찍는 곳 */}
            <Typography sx={{ fontSize: 10 }} style={{ position: 'relative', left: "90px" }} >
              {formattedDate}
            </Typography>
            <Typography sx={{ fontSize: 10 }} variant='h3' style={{ position: 'relative', bottom: "2px" }}>
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
            <span>프로젝트 등록</span>
          </Grid>
        </Grid>
        <hr />

        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <CustomGridContainer container direction="row"
          sx={{ pt: 2, pl: 2 }}
          justifyContent="left"
          alignItems="center">

          <CustomInputLabel >프로젝트</CustomInputLabel>
          <CustomTextField name='CodialTextField' value={this.state.CodialTextField} placeholder="프로젝트코드 "
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon onClick={this.helpClick} /></InputAdornment>
              ),
            }}
          ></CustomTextField>
        </CustomGridContainer>
        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

        <Grid sx={{ position: 'relative', display: 'flex', width: '100%', }}>
          <Grid container
            bgcolor={'#f5f5f5'}
            sx={{ width: '15%', height: 670, border: '1px solid #EAEAEA' }}>
            <Grid item sx={{ mb: 1, display: 'flex', justifyContent: 'left', alignItems: "center", width: '100%', height: 22, backgroundColor: '#f5f5f5', borderBottom: '1px solid' }}>
              <InputLabel >프로젝트:</InputLabel><InputLabel sx={{ ml: 0.5, color: '#0054FF', fontWeight: 'bold' }}>{cardCount}</InputLabel>건
            </Grid>

            <Grid item sx={{ pl: 1.2, width: '95%', height: 'calc(100% - 5%)', overflowY: 'auto' }}>
              {/* 각 카드를 래핑하는 Grid 컨테이너를 추가하여 아래쪽에 스페이싱을 넣습니다 */}
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1 }}>
                  {card}
                </Grid>
              ))}
            </Grid>

            <Grid container
              sx={{ position: 'relative', bottom: '60px', width: '100%' }} >
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
                }}
              >
                <AddIcon />
                추가
              </Button>
            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
          <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%', maxHeight: 40, borderBottom: '4px solid #000' }}>
            <Grid item>
              <InputLabel sx={{ ml: 2, mr: 2, mt: 1, textAlign: 'left', color: 'black' }}>● 기본등록사항</InputLabel>
            </Grid>
            <Grid item alignItems={'right'}>
              {coCd ?
                <Button variant="outlined" onClick={this.updateCo} >수정</Button>
                :
                <Button variant="outlined" onClick={this.insertCo}>저장</Button>
              }
              <Button variant="outlined" onClick={this.deleteCo}>삭제</Button>
            </Grid>
            <Grid item xs={12} width={'100%'}>
              <InputLabel sx={{ ml: 3.8, mr: 2, mt: 2, textAlign: 'left', color: 'blue' }}>기본정보</InputLabel>
              <hr />
            </Grid>

            <Grid container width={"100%"} border={'4px solid #111111'}>
              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트코드</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField disabled size='small' sx={{ ml: 2 }} name='coCd' onChange={this.handleCompany} value={coCd || ''} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트구분</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''} InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트명</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''} InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트약칭</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2 }} name='coCd' onChange={this.handleCompany} value={coCd || ''} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트분류</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2 }} name='coCd' onChange={this.handleCompany} value={coCd || ''} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >사용권한설정</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2 }} name='coCd' onChange={this.handleCompany} value={coCd || ''} />
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트기간</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Controlled picker"
                      showDaysOutsideCurrentMonth
                      value={value}
                      onChange={(newValue) => this.handleDateRangeChange(newValue)}
                    />
                    <DatePicker
                      label="Controlled picker"
                      showDaysOutsideCurrentMonth
                      value={value}
                      onChange={(newValue) => this.handleDateRangeChange(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={2} sx={{ mt: 1, height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#EAEAEA' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트시작일</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ mt: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                <TextField type="date" name='dateRange' value={this.state.dateRange || ''} onChange={this.handleCompany} ></TextField>
              </Grid>



            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        </Grid > {/*  전체화면 닫는 곳*/}
        <CoDialogComponent handleSetCodialTextField={this.handleSetCodialTextField} ref={this.coDialogRef} />
      </>
    );
  }
}


export default PjtComponent;