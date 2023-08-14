import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, InputLabel, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputAdornment from '@mui/material/InputAdornment';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomTextField, CustomWideTextField } from '../common/style/CommonStyle';


import CompanyService from '../../service/CompanyService';
import DivsService from '../../service/DivsService';
import AddressComponent from './dialog/AddressComponent';
import DivDialogComponent from './dialog/DivDialogComponent';

class DivMgmtComponent extends Component {
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
      insertId: '', //등록자
      //insertDt: '', //등록일  String???
      //insertIp: '', //등록자 ip
      modifyId: '', //수정자
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

    this.setState({ coCd: coCd })
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
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    // DivsService.getDivsList({
    //   accessToken: this.props.accessToken})
    //   .then((response) => {
    //     const coCdList = response.data.map((item) => item.coCd);
    //     const divCdList = response.data.map((item) => item.divCd);
    //     const divNmList = response.data.map((item) => item.divNm);
    //     const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

    //     const coCd = response.data[0].coCd;
    //     const divCd = response.data[0].divCd;
    //     const divNm = response.data[0].divNm;
    //     const ceoNm = response.data[0].ceoNm;
    //     const jongmok = response.data[0].jongmok;
    //     const businessType = response.data[0].businessType;
    //     const divNb = response.data[0].divNb;
    //     const toNb = response.data[0].toNb;
    //     const divZip = response.data[0].divZip;
    //     const divAddr = response.data[0].divAddr;
    //     const divAddr1 = response.data[0].divAddr1;

    //     this.setState({
    //       cardCount: cardCount, // state에 값을 저장
    //       coCdList: coCdList,
    //       divCdList: divCdList,
    //       divNmList: divNmList,

    //       focused: divCd,
    //       coCd: coCd,
    //       divCd: divCd,
    //       divNm: divNm,
    //       ceoNm: ceoNm,
    //       jongmok: jongmok,
    //       businessType: businessType,
    //       divNb: divNb,
    //       toNb: toNb,
    //       divZip: divZip,
    //       divAddr: divAddr,
    //       divAddr1: divAddr1
    //     })
    //     CompanyService.getCompany(coCd)
    //       .then((response) => {
    //         const coNm = response.data[0].coNm;

    //         this.setState({
    //           coNm: coNm
    //         })
    //       })
    //   })
    //   .catch((error) => {
    //     // 오류 발생 시의 처리
    //     console.error(error);
    //     // alert("중복된 회사 또는 모두 입력해주세요");
    //   });
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
    console.log(this.state.cardCount);
    // const newCoNmList = [...this.state.coNmList, `coNm${newCardCount}`];
    if (this.state.divCdList.includes('0000')) {
      alert("미등록 사업장이 존재합니다.");
    } else {
      const newCardCount = this.state.cardCount + 1;
      const newDivCdList = [...this.state.divCdList, '0000'];

      CompanyService.getCoList({
        accessToken: this.props.accessToken
      })
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
    CompanyService.getCoNm({
      accessToken: this.props.accessToken,
      coNm: coNm
    })
      .then((response) => {
        const coCd = response.data[0].coCd
        this.setState({
          coCd: coCd
        })
        CompanyService.getCompany({
          accessToken: this.props.accessToken,
          coCd: coCd
        })
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
    const userInfo = this.props.userInfo;
    const { empId, empEmail } = userInfo;
    CompanyService.getCoNm({
      accessToken: this.props.accessToken,
      coNm: coNm
    })
      .then((response) => {
        const coCd = response.data[0].coCd

        this.setState({
          coCd: coCd
        })

        const { divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1, insertId } = this.state;
        return DivsService.insertDivs({
          accessToken: this.props.accessToken,
          coCd: coCd,
          divNm: divNm,
          ceoNm: ceoNm,
          jongmok: jongmok,
          businessType: businessType,
          divNb: divNb,
          toNb: toNb,
          divZip: divZip,
          divAddr: divAddr,
          divAddr1: divAddr1,
          insertId: empId
        })

          .then((response) => {
            console.log(response.data);
            window.confirm('사업장등록 완료!');

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

                  focused: coCdList[cardCount - 1],
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
                  insertId: insertId
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
          })
      })
    //       const coCdList = response.data.map((item) => item.coCd);
    //       const divCdList = response.data.map((item) => item.divCd);
    //       const divNmList = response.data.map((item) => item.divNm);
    //       const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

    //       this.setState({
    //         cardCount: cardCount, // state에 값을 저장
    //         coCdList: coCdList,
    //         divCdList: divCdList,
    //         divNmList: divNmList,
    //         focused: coCdList[cardCount - 1],
    //         coCd: '',
    //         divNm: '',
    //         jongmok: '',
    //         businessType: '',
    //         divNb: '',
    //         toNb: '',
    //         ceoNm: '',
    //         divZip: '',
    //         divAddr: '',
    //         divAddr1: '',
    //         isChanged: false
    //       });
    //       // window.location.reload();
    //       // window.location.href="/acctmgmt/ozt/co";
    //     })
    // })
    // .catch((error) => {
    //   // 오류 발생 시의 처리
    //   console.error(error);
    //   alert("중복된 사업장 또는 모두 입력해주세요");
    // });
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
        DivsService.getDiv({
          accessToken: this.props.accessToken,
          divCd: divCd
        })

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
    DivsService.getDivision({
      accessToken: this.props.accessToken,
      divCd: divCd
    })
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

  // searchName =(e)=>{
  //   this.setState({CodialTextField : e.target.value});
  // }

  setDivZipAddr = (data) => {
    this.setState({ divZip: data.divZip });
    this.setState({ divAddr: data.divAddr });
  }

  updateDivs = () => {
    const { divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1, modifyId } = this.state;
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;

    console.log(divCd, divNm, ceoNm, jongmok, businessType, divNb, toNb, divZip, divAddr, divAddr1, modifyId)
    console.log(divNm)

    DivsService.updateDivs({
      accessToken: this.props.accessToken,
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
      modifyId: empId
    })
      .then((response) => {
        console.log(response.data);
        window.confirm('업데이트 완료!');

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
              divAddr1: divAddr1,
              modifyId: modifyId
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
      })
  }

  deleteDivs = () => {  //-> 이거 index 값 건드리는게 아닌듯....ㅠ 삭제 시 index가 달라지는데 그 적은 숫자를 그대로 가지고있네 ㄷㄷ
    const { divCd } = this.state;

    DivsService.deleteDivs({
      accessToken: this.props.accessToken,
      divCd: divCd
    })
      .then((response) => {
        console.log(response.data);
        window.confirm('사업장삭제 완료!');

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
              focused: divCdList[0],
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
      }).catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("업데이트 실패..");
      });
  }

  handleChange = (e) => {
    this.setState({
      coCd: e.target.value
    })
  }

  render() {
    const { open, coCd, divCd, toNb, divNm, jongmok, businessType, ceoNm, divNb, divZip, divAddr, divAddr1, modifyId } = this.state;
    const { coNm } = this.state;
    const { cardCount, divCdList, divNmList, coCdList, coNmList } = this.state;

    const currentDate = new Date();

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관


    const cards = divCdList.map((divCd, index) => (
      <Card key={divCd} focused={this.state.focused === divCd} sx={{ width: '100%', height: 70, position: 'relative', border: this.state.focused === divCd ? '2px solid #6798FD' : '1px solid #000', backgroundColor: this.state.focused === divCd ? '#E5FFFF' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(divCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 14 }} gutterBottom style={{ position: 'relative', top: '-10px', left: "-10px" }}>
              {divCdList[index]}
            </Typography>
            <Typography sx={{ fontSize: 10 }} style={{ position: 'relative', left: "180px", bottom: '33px' }} >
              {formattedDate}
            </Typography>
            {/* <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "8px", top:'0px' }}>
              {index + 1}
            </Typography> */}
            <Typography sx={{ fontSize: 14 }} variant='h3' style={{ position: 'relative', bottom: "15px", left: "-9px" }}>
              {divNmList[index]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));

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
              <DomainDisabledIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>사업장등록</CustomHeaderInputLabel>
            </Grid>
          </Grid>

          <Grid item >
            <Button sx={{ mr: 1 }} variant="outlined" onClick={this.comInfo}>
              회사정보불러오기
            </Button>

            {coCd && divCd ? (
              <Button sx={{ mr: 1 }} variant="outlined" onClick={this.updateDivs}>
                수 정
              </Button>
            ) : (
              <Button sx={{ mr: 1 }} variant="outlined" onClick={this.insertDivs}>
                저 장
              </Button>
            )}
            <Button variant="outlined" onClick={this.deleteDivs}>
              삭 제
            </Button>
          </Grid>
        </CustomHeaderGridContainer>

        <CustomGridContainer
          container
          direction="row"
          spacing={2}
          justifyContent="left"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Grid container alignItems="center">
              <CustomInputLabel>사업장</CustomInputLabel>
              <CustomTextField
                name="DivdialTextField"
                value={this.state.DivdialTextField}
                placeholder="사업장코드/사업장명 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.helpClick} />
                    </InputAdornment>
                  ),
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          {/* <Button
            variant="outlined"
            onClick={() => this.searchClick(divCd)}
            style={{
              padding: "0px",
              minWidth: "5px",
              position: "relative",
              top: "10px",
              left: "1015px",
            }}
          >
            <SearchIcon fontSize="medium" />
          </Button> */}
        </CustomGridContainer>

        <Grid sx={{ position: "relative", display: "flex", width: "100%" }}>
          <Grid
            container
            sx={{
              width: "22%",
              height: 670,
              border: "1px solid #EAEAEA",
              backgroundColor: "#FCFCFC",
            }}
          >
            <Grid
              item
              sx={{
                mb: 1,
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#FCFCFC",
                borderBottom:"2px solid #000",
              }}
            >
              <CustomInputLabel sx={{ ml: 1 }}>총 사업장:</CustomInputLabel>
              <InputLabel sx={{
                color: "#0054FF",
                fontWeight: "bold",
              }}>{cardCount}</InputLabel>
              <CustomInputLabel>건</CustomInputLabel>
            </Grid>

            <Grid
              item
              sx={{
                pl: 1,
                pr: 1,
                width: "100%",
                height: "calc(100% - 5%)",
                overflowY: "auto",
              }}
            >
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1 }}>
                  {card}
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              sx={{ position: "relative", bottom: "60px", width: "100%" }}
            >
               <Button
                variant="extended"
                onClick={this.addCardButton}
                sx={{
                  border: "1px solid #D5D5D5",
                  width: "100%",
                  height: "60px",
                  backgroundColor: "white",
                  color: "#5D5D5D",
                  display: "flex",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <AddIcon sx={{ mb:0.2, fontSize:'medium',color: "blue" }} />
                추가
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="column" sx={{ ml: 2, height: 670 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <CustomInputLabel sx={{ fontSize: 18 }}>
                  기본정보
                </CustomInputLabel>
              </Grid>
            </Grid>

            <Grid container sx={{ mt:'-4px',border: "2px solid #EAEAEA" }}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop:"2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel>회사명</CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop:"2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                {divCd != 0 ? (
                  <CustomWideTextField
                    xs={4}
                    sx={{ ml: 2 }}
                    value={coCd + " . " + coNm}
                    InputProps={{ readOnly: true }}
                  ></CustomWideTextField> //disabled={true}
                ) : (
                  <FormControl
                    sx={{
                      ml: 2,
                      width: 255,
                      "& .MuiInputBase-root": {
                        height: 40,
                      },
                    }}
                  >
                    <Select
                      name="coNm"
                      value={coNm}
                      onChange={this.handleCompany}
                    >
                      {coNmList.map((coNm) => (
                        <MenuItem key={coNm} value={coNm}>
                          {coNm}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop:"2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  사업장코드
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop:"2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  sx={{ ml: 2, backgroundColor: "#FFEAEA" }}
                  name="divCd"
                  onChange={this.handleCompany}
                  value={divCd || ""}
                  InputProps={{ readOnly: true }}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  사업장명
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: '1px solid #EAEAEA'
                }}
              >
                <CustomWideTextField
                  sx={{ ml: 2 }}
                  name="divNm"
                  onChange={this.handleCompany}
                  value={divNm || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  종목
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  sx={{ ml: 2 }}
                  name="jongmok"
                  onChange={this.handleCompany}
                  value={jongmok || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  업태
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: '1px solid #EAEAEA'
                }}
              >
                <CustomWideTextField
                  sx={{ ml: 2 }}
                  name="businessType"
                  onChange={this.handleCompany}
                  value={businessType || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  대표자명
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  sx={{ ml: 2 }}
                  name="ceoNm"
                  onChange={this.handleCompany}
                  value={ceoNm || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  사업자번호
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: '1px solid #EAEAEA'
                }}
              >
                <CustomWideTextField
                  name="divNb"
                  sx={{ ml: 2 }}
                  onChange={this.handleCompany}
                  value={divNb || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  세무서번호
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <CustomWideTextField
                  name="toNb"
                  sx={{ ml: 2 }}
                  onChange={this.handleCompany}
                  value={toNb || ""}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  backgroundColor: "#FCFCFC",
                  borderRight: '1px solid #EAEAEA'
                }}
              >
                <CustomInputLabel sx={{ mt: 1 }}>사업장주소</CustomInputLabel>
              </Grid>
              <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ width: "calc(100% + -24px)" }}
                >
                  <Grid item>
                    <Grid container direction="row">
                      <TextField
                        size="small"
                        id="divZip"
                        name="divZip"
                        onChange={this.handleCompany}
                        value={divZip || ""}
                        InputProps={{ readOnly: true }}
                        sx={{ mt:1, ml: 1, width: "150px" }}
                      ></TextField>
                      <Button
                        sx={{ ml: 1, mt: 1 }}
                        variant="outlined"
                        onClick={this.addrButton}
                      >
                        우편번호
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <CustomWideTextField
                      id="divAddr"
                      name="divAddr"
                      onChange={this.handleCompany}
                      value={divAddr || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item >
                    <CustomWideTextField
                      name="divAddr1"
                      onChange={this.handleCompany}
                      value={divAddr1 || ""}
                      sx={{mt: "0px !important"}}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        <AddressComponent
          setDivZipAddr={this.setDivZipAddr}
          ref={this.addrRef}
        />
        <DivDialogComponent
          handleSetDivdialTextField={this.handleSetDivdialTextField}
          ref={this.divDialogRef}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {} //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(DivMgmtComponent);
