import React, { Component } from "react";
import { connect } from "react-redux";

import { ApartmentOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import InputMask from "react-input-mask";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InputAdornment from "@mui/material/InputAdornment";
import CompanyService from "../../service/CompanyService";
import CustomSwal from '../common/CustomSwal.js';
import {
  CustomDatePrToTextField,
  CustomGridContainer,
  CustomHeaderGridContainer,
  CustomHeaderInputLabel,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
  CustomWideTextField
} from "../common/style/CommonStyle";
import AddressComponent from "./dialog/AddressComponent";
import CoDialogComponent from "./dialog/CoDialogComponent";
import GisuDialogComponent from "./dialog/GisuDialogComponent";
import DivsService from "../../service/DivsService";

class CoMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.coDialogRef = React.createRef();
    this.addrRef = React.createRef();
    this.gisuRef = React.createRef();
    this.state = {
      open: false,
      focused: null,
      cards: [],
      cardCount: 0,
      coCd: "",
      coNm: "",
      gisu: 0,
      frDt: new Date(), // 기수 시작일 날짜 객체
      toDt: new Date(), // 기수 종료일 날짜 객체
      //insertId: '', //등록자
      insertDt: '', //등록일  String???
      //insertIp: '', //등록자 ip
      //modifyId: '', //수정자
      //modifyDt: '', //수정일
      //modifyIp: '', //수정 ip
      selectedRow: { gisu: "", frDt: "", toDt: "" },
      jongmok: "", //종목
      businessType: "", //업태
      coNb: "", //사업자번호
      ceoNm: "", //대표자명
      coZip: "", //우편번호
      coAddr: "", //주소
      coAddr1: "", //상세주소
      coCdList: [],
      coNmList: [],
      ceoNmList: [],
      CodialTextField: "",
      dateRange: "",
      isChanged: false, //수정중일때 변화 감지 변수 : 바뀐게 있다면 true로 바꿔서 alert창 띄우기&&수정이 완료되면 초기화
      // inputValue: '',
      isCoCdEditable: false,
      isDisabled: false,
      originalTextFieldValue: ''
    };
  }

  componentDidMount() {
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;

    console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

    this.setState({ coCd: coCd });
    console.log(coCd)
    // {coCd && empId?
    CompanyService.getCoList({
      accessToken: this.props.accessToken,
      // coCd: coCd
    })
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const ceoNmList = response.data.map((item) => item.ceoNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
        const gisu = response.data[0].gisu;
        const frDt = dayjs(response.data[0].frDt).format("YYYY-MM-DD");
        const toDt = dayjs(response.data[0].toDt).format("YYYY-MM-DD");
        const jongmok = response.data[0].jongmok;
        const businessType = response.data[0].businessType;
        const coNb = response.data[0].coNb;
        const ceoNm = response.data[0].ceoNm;
        const coZip = response.data[0].coZip;
        const coAddr = response.data[0].coAddr;
        const coAddr1 = response.data[0].coAddr1;
        const insertDt = response.data[0].insertDt;

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          ceoNmList: ceoNmList,

          focused: coCd,
          coCd: coCd,
          originCd: coCd,
          coNm: coNm,
          gisu: gisu,
          frDt: frDt,
          toDt: toDt,
          dateRange: frDt + " ~ " + toDt,
          jongmok: jongmok,
          businessType: businessType,
          coNb: coNb,
          ceoNm: ceoNm,
          coZip: coZip,
          coAddr: coAddr,
          coAddr1: coAddr1,
          insertDt: insertDt,
          CodialTextField: '',
          isChanged: false
        })
      }) //db 에 아무것도 없을때 focused coCd 잡히는 것 에러 남 이거 잡아야함!
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error("뭔데이거" + error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
    // }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    // :
    // CompanyService.getCoList()
    //       .then((response) => {
    //         const coCdList = response.data.map((item) => item.coCd);
    //         const coNmList = response.data.map((item) => item.coNm);
    //         const ceoNmList = response.data.map((item) => item.ceoNm);
    //         const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

    //         const coCd = response.data[0].coCd;
    //         const coNm = response.data[0].coNm;
    //         const gisu = response.data[0].gisu;
    //         const frDt = dayjs(response.data[0].frDt).format('YYYY-MM-DD');
    //         const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
    //         const jongmok = response.data[0].jongmok;
    //         const businessType = response.data[0].businessType;
    //         const coNb = response.data[0].coNb;
    //         const ceoNm = response.data[0].ceoNm;
    //         const coZip = response.data[0].coZip;
    //         const coAddr = response.data[0].coAddr;
    //         const coAddr1 = response.data[0].coAddr1;

    //         this.setState({
    //           cardCount: cardCount, // state에 값을 저장
    //           coCdList: coCdList,
    //           coNmList: coNmList,
    //           ceoNmList: ceoNmList,

    //           focused: coCd,
    //           coCd: coCd,
    //           coNm: coNm,
    //           gisu: gisu,
    //           frDt: frDt,
    //           toDt: toDt,
    //           dateRange: frDt + ' ~ ' + toDt,
    //           jongmok: jongmok,
    //           businessType: businessType,
    //           coNb: coNb,
    //           ceoNm: ceoNm,
    //           coZip: coZip,
    //           coAddr: coAddr,
    //           coAddr1: coAddr1
    //         })
    // }) //db 에 아무것도 없을때 focused coCd 잡히는 것 에러 남 이거 잡아야함!
    // .catch((error) => {
    //   // 오류 발생 시의 처리
    //   console.error(error);
    //   // alert("중복된 회사 또는 모두 입력해주세요");
    // });
    // }
  }

  handleCompany = (e) => {
    // console.log(e.target.id);
    {
      this.setState({
        isChanged: true,
        [e.target.name]: e.target.value,
      });
    }
  };

  handleCdChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); ///[^0-9]*$/ 둘 다 되는건가?
    this.setState({
      isChanged: true,
      [e.target.name]: numericValue
    });
  };

  addCardButton = () => {
    // const newCoNmList = [...this.state.coNmList, `coNm${newCardCount}`];
    if (this.state.coCdList.includes("0000")) {
      CustomSwal.showCommonToast('warning', '미등록 회사가 존재합니다.');
    } else {
      const newCardCount = this.state.cardCount + 1;
      const newCoCdList = [...this.state.coCdList, "0000"];
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
        coAddr1: '',
        insertDt: '',
        isCoCdEditable: true,
        isDisabled: true
      })
    }
  }; //여기에 모든 state값 초기화 하면 됨 !!!!!

  insertCo = () => {
    const { coCd, coNm, gisu, frDt, toDt, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1, insertDt } = this.state;

    if (!this.state.coCdList.includes('0000')) {
      CustomSwal.showCommonToast("error", "등록할 회사를 추가해주세요");
    } else {
      const impValues = { coCd };
      if (Object.values(impValues).some((value) => value === "")) {
        CustomSwal.showCommonToast("warning", "필수 값을 입력하세요");
        return;
      }
      //showCommonSwalYn = (title, text, icon, yesButtonText)
      CustomSwal.showCommonSwalYn("저장", "저장하시겠습니까?", "info", "저장", (confirmed) => {
        if (confirmed) {
          // confirmed가 true인 경우에만 저장 로직을 실행
          CompanyService.insertCo({
            accessToken: this.props.accessToken,
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
          })

            .then((response) => {
              console.log(response.data);
              CustomSwal.showCommonToast("success", "회사 등록되었습니다.");
              const coCdList = response.data.map((item) => item.coCd);
              const coNmList = response.data.map((item) => item.coNm);
              const ceoNmList = response.data.map((item) => item.ceoNm);
              const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

              const insertDt = response.data[0].insertDt;
              this.setState({
                cardCount: cardCount, // state에 값을 저장
                coCdList: coCdList,
                coNmList: coNmList,
                ceoNmList: ceoNmList,
                focused: coCdList[cardCount - 1],
                coCd: coCd,
                coNm: coNm,
                gisu: gisu ? gisu : 0,
                frDt: frDt,
                toDt: toDt,
                dateRange: frDt && toDt ? frDt + ' ~ ' + toDt : "",
                jongmok: jongmok,
                businessType: businessType,
                coNb: coNb,
                ceoNm: ceoNm,
                coZip: coZip,
                coAddr: coAddr,
                coAddr1: coAddr1,
                insertDt: insertDt,
                isCoCdEditable: false,
                isChanged: false
              });
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              CustomSwal.showCommonToast('warning', '회사 등록에 실패했습니다.');
            });
        }
      })
    }
  };

  addrButton = () => {
    this.addrRef.current.handleUp();
    //  this.setState({ coZip: this.addrRef.current.value.coZip });
    //  this.setState({ coAddr: this.addrRef.current.value.coAddr });

    // console.log(this.addrRef.current.value.coZip, this.addrRef.current.value.coAddr);
  };

  closeAddrDialog = () => {
    this.addrRef.current.handleDown();
  };

  cardClick = (coCd) => {
    console.log(coCd);
    // this.setState({ coCd: coCdList[index] });
    // console.log(index)
    if (this.state.isChanged) {
      CustomSwal.showCommonSwalYn("저장", "수정중인 내용이 있습니다. 저장하시겠습니까?", "info", "저장", (confirmed) => {
        if (confirmed) {
          if (this.state.insertDt) {
            this.updateCo();
          }
          else {
            this.insertCo();
          }
        }
        // else {
        //   this.setState({
        //     isChanged: false   ///????????????????????????이게 낫나??
        //   })
        // }
      })
    }
    else {
      this.setState({ focused: coCd }); //, isChanged: false
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
            coAddr1: '',
            insertDt: '',
            isCoCdEditable: true
          }) :
          CompanyService.getCompany({
            accessToken: this.props.accessToken,
            coCd: coCd
          })

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
              const insertDt = response.data[0].insertDt;

              this.setState({
                coCd: coCd,
                originCd: coCd,
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
                insertDt: insertDt,
                isCoCdEditable: false
              })
              console.log(frDt, toDt)
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              // alert("중복된 회사 또는 모두 입력해주세요");
            });
      }
    }
  }

  helpClick = () => {
    this.coDialogRef.current.handleUp();
    this.coDialogRef.current.setCoKeyword(this.state.CodialTextField);
  };

  subHelpClick = () => {
    this.coDialogRef.current.handleUp();
    // this.coDialogRef.current.setCoKeyword(this.state.CodialTextField);
  };

  closeDialog = () => {
    this.dialogRef.current.handleDown();
  };

  handleSetCodialTextField = async (data) => {
    await this.setState({
      CodialTextField: data.coCd && data.coNm ? data.coCd + ". " + data.coNm : "",
      coCd: data.coCd, //밑에 coCd 넘겨주기
    });
    this.searchClick(data.coCd);
  };

  searchClick = (coCd) => {
    CompanyService.getCompany({
      accessToken: this.props.accessToken,
      coCd: coCd,
    })
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
        const cardCount = response.data.length;

        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
        const gisu = response.data[0].gisu;
        const frDt = dayjs(response.data[0].frDt).format("YYYY-MM-DD");
        const toDt = dayjs(response.data[0].toDt).format("YYYY-MM-DD");
        const jongmok = response.data[0].jongmok;
        const businessType = response.data[0].businessType;
        const coNb = response.data[0].coNb;
        const ceoNm = response.data[0].ceoNm;
        const coZip = response.data[0].coZip;
        const coAddr = response.data[0].coAddr;
        const coAddr1 = response.data[0].coAddr1;
        const insertDt = response.data[0].insertDt;

        this.setState({
          cardCount: cardCount, //??????
          coCdList: coCdList,
          coNmList: coNmList,

          focused: coCd,
          coCd: coCd,
          coNm: coNm,
          gisu: gisu,
          frDt: frDt,
          toDt: toDt,
          dateRange: frDt + " ~ " + toDt,
          jongmok: jongmok,
          businessType: businessType,
          coNb: coNb,
          ceoNm: ceoNm,
          coZip: coZip,
          coAddr: coAddr,
          coAddr1: coAddr1,
          insertDt: insertDt,
        });
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
  };

  // searchName =(e)=>{
  //   this.setState({CodialTextField : e.target.value});
  // }

  setCoZipAddr = (data) => {
    this.setState({ coZip: data.coZip });
    this.setState({ coAddr: data.coAddr });
  };

  handleGisu = () => {
    this.gisuRef.current.handleUp();
    this.setState({
      isChanged: true
    })
  };

  updateCo = () => {
    const {
      coCd,
      coNm,
      gisu,
      frDt,
      toDt,
      jongmok,
      businessType,
      coNb,
      ceoNm,
      coZip,
      coAddr,
      coAddr1,
    } = this.state;

    if (!coCd) {
      CustomSwal.showCommonToast("error", "수정 할 회사를 선택해주세요.");
    } else {
      console.log(coNm);
      CompanyService.updateCo({
        accessToken: this.props.accessToken,
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
      })
        .then((response) => {
          console.log(response.data);
          CustomSwal.showCommonToast("success", "수정되었습니다.");
          // this.componentDidMount()
          const coCdList = response.data.map((item) => item.coCd);
          const coNmList = response.data.map((item) => item.coNm);
          const ceoNmList = response.data.map((item) => item.ceoNm);
          const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
          this.setState({
            cardCount: cardCount, // state에 값을 저장
            coCdList: coCdList,
            coNmList: coNmList,
            ceoNmList: ceoNmList,
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
            isChanged: false,
            isCoCdEditable: false
          })
        })
        .catch((error) => {
          // 오류 발생 시의 처리
          CustomSwal.showCommonToast("warning", "수정에 실패하였습니다.");
          console.error(error);
        })
    }
  }


  deleteCo = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = this.state;

    if (userInfo.coCd === coCd) {
      CustomSwal.showCommonToast("error", "계정 회사는 <br />삭제가 불가능합니다.");
    } else {
      if (coCd === '') {
        CustomSwal.showCommonSwalYn("삭제", "정말 삭제하시겠습니까?", "info", "확인", (confirmed) => {
          if (confirmed) {
            CustomSwal.showCommonToast("success", "삭제되었습니다.");
            this.componentDidMount();
          }
        })
      } else {
        DivsService.getDivision({
          accessToken: this.props.accessToken,
          coCd: coCd
        })
          .then((response) => {
            console.log(response.data.length);

            CustomSwal.showCommonSwalYn("삭제", "정말 삭제하시겠습니까?", "info", "확인", (confirmed) => {
              if (response.data.length > 0) {
                CustomSwal.showCommonToast("error", "하위에 사업장이 존재합니다.");
              } else {
                if (confirmed) {
                  CompanyService.deleteCo({
                    accessToken: this.props.accessToken,
                    coCd: coCd,
                  })
                    .then((response) => {
                      console.log(response.data);
                      CustomSwal.showCommonToast("success", "삭제되었습니다.");
                      const coCdList = response.data.map((item) => item.coCd);
                      const coNmList = response.data.map((item) => item.coNm);
                      const ceoNmList = response.data.map((item) => item.ceoNm);
                      const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                      const coCd = response.data[0].coCd;
                      const coNm = response.data[0].coNm;
                      const gisu = response.data[0].gisu;
                      const frDt = dayjs(response.data[0].frDt).format("YYYY-MM-DD");
                      const toDt = dayjs(response.data[0].toDt).format("YYYY-MM-DD");
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
                        ceoNmList: ceoNmList,
                        focused: coCdList[0],
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
                        CodialTextField: "",
                        isCoCdEditable: false,
                        isChanged: false
                      });
                    })
                    // window.location.href="/acctmgmt/ozt/co";
                    .catch((error) => {
                      // 오류 발생 시의 처리
                      CustomSwal.showCommonToast("error", "삭제실패");
                      console.error(error);
                    });
                }
              }
            })
          })
      }
    }
  }

  setGisuInfo = async (data) => {
    await this.setState({
      selectedRow: {
        gisu: data.gisu,
        frDt: data.frDt,
        toDt: data.toDt,
      }
    })
    this.insertDate(this.state.selectedRow);
  }

  insertDate = (selectedRow) => {
    console.log(selectedRow)
    if (selectedRow.gisu == "" || selectedRow.frDt == "" || selectedRow.toDt == "") {
      CustomSwal.showCommonToast("warning", "적용 할 기수를 선택해주세요.");
    } else {
      this.setState({
        dateRange:
          dayjs(selectedRow.frDt).format("YYYY-MM-DD") +
          " ~ " +
          dayjs(selectedRow.toDt).format("YYYY-MM-DD"),
        gisu: selectedRow.gisu,

        frDt: dayjs(selectedRow.frDt).format("YYYY-MM-DD"),
        toDt: dayjs(selectedRow.toDt).format("YYYY-MM-DD"),
        open: false,
      });
      console.log(selectedRow);
    }
  };

  //열 클릭 시, 값 콘솔에 적용
  handleClickRow = (params) => {
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
  };

  handleBlur = (e) => {
    const { coCd } = this.state;
    const newCoCd = e.target.value;
    const { coCdList } = this.state;

    if (coCdList.includes(newCoCd)) {
      CustomSwal.showCommonToast("warning", "사용중인 회사코드입니다.");
      this.setState({
        coCd: '',
        isDisabled: true
      });
    } else {
      this.setState({
        coCd: newCoCd,
        isDisabled: false
      });
    }
  }

  reClick = () => {
    // if (this.state.CodialTextField) {      
      this.searchClick(this.state.CodialTextField);
  //   } else {
  //     this.componentDidMount();
  // }
}

  handleTextFieldChange = (e) => {
    this.setState({ CodialTextField: e.target.value });
  };

  handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      this.helpClick();
    }
    if (event.key == "Backspace") {
      this.setState({ CodialTextField: "" });
    };
  }

  render() {

    const { open, coCd, coNm, jongmok, businessType, ceoNm, coNb, coZip, coAddr, coAddr1, openAddr, gisu, frDt, toDt, insertDt } = this.state;
    const { selectedRow } = this.state;
    const { isDisabled } = this.state;
    const { cardCount, coCdList, coNmList, ceoNmList } = this.state;

    // const currentDate = dayjs(insertDt).format("YYYY-MM-DD");

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = dayjs(insertDt).format("YYYY-MM-DD");
    //`${currentDate.getFullYear()}-${(
    //   currentDate.getMonth() + 1
    // )
    //   .toString()
    //   .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

    const cards = coCdList.map((coCd, index) => (
      <Card
        key={coCd}
        focused={this.state.focused === coCd}
        sx={{
          width: "100%",
          height: 70,
          position: "relative",
          border:
            this.state.focused === coCd
              ? '1px solid rgba(49, 98, 240, 0.9)' : '1px solid #D5D5D5',
          backgroundColor: this.state.focused === coCd ? 'rgba(160, 210, 255, 0.2)' : 'white'
        }}
      >
        <CardActionArea onClick={() => this.cardClick(coCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography
              sx={{ fontSize: 14 }}
              gutterBottom
              style={{ position: "absolute", top: "3px", left: "5px" }}
            >
              {coCdList[index]}
            </Typography>
            <Typography
              sx={{
                fontSize: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
              style={{ position: "absolute", right: "30px", top: "6px" }}
            >
              {ceoNmList[index] && ceoNmList[index].length > 5
                ? `${ceoNmList[index].slice(0, 5)}...`
                : ceoNmList[index]}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="h3"
              style={{ position: "absolute", bottom: "30px", left: "5px" }}
            >
              {coNmList[index] && coNmList[index].length > 8
                ? `${coNmList[index].slice(0, 8)}...`
                : coNmList[index]}
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
              <ApartmentOutlined sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>회사등록</CustomHeaderInputLabel>
            </Grid>
          </Grid>
          <Grid item>
            {insertDt ? (
              <Button sx={{ mr: 1 }} variant="outlined" onClick={this.updateCo}>
                저 장
              </Button>
            ) : (
              <Button sx={{ mr: 1 }} variant="outlined" onClick={this.insertCo}>
                저 장
              </Button>
            )}
            <Button variant="outlined" onClick={this.deleteCo}>
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
          position = 'relative'
        >
          <Grid item xs={4}>
            <Grid container alignItems="center" >
              <CustomInputLabel>회사</CustomInputLabel>
              <CustomTextField
                name="CodialTextField"
                value={this.state.CodialTextField}
                onChange={this.handleTextFieldChange} // 입력 필드 값이 변경될 때 호출되는 핸들러 함수
                onKeyDown={this.handleEnterKey} // 엔터 키 입력 처리
                placeholder="회사코드/회사명 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.subHelpClick} />
                    </InputAdornment>
                  )
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          <CustomSearchButton
            variant="outlined"
            onClick={this.reClick}
            sx={{
              minWidth: "5px",
              position: "absolute",
              bottom: '25px',
              right: "0px",
            }}>
            <SearchIcon fontSize="medium" />
          </CustomSearchButton>
        </CustomGridContainer>

        <Grid sx={{ position: "relative", display: "flex", width: "100%" }}>
          <Grid
            container
            sx={{
              width: "25%",
              height: "calc(100vh - 309px)",
              // height: 670,
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
                borderBottom: "3px solid #000",
              }}
            >
              <CustomInputLabel sx={{ ml: 1 }}>총 회사:</CustomInputLabel>
              <InputLabel
                sx={{
                  color: "#0054FF",
                  fontWeight: "bold",
                }}
              >
                {cardCount}
              </InputLabel>
              <CustomInputLabel>건</CustomInputLabel>
            </Grid>

            <Grid
              item
              sx={{
                pl: 1,
                pr: 1,
                pb: 1,
                width: "100%",
                // height: "calc(100vh - 345px)",
                height: "calc(100% - 7%)",
                overflowY: "auto",
              }}
            >
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1 }}>
                  {card}
                </Grid>
              ))}
            </Grid>

            <Grid container sx={{ width: "100%" }}>
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
                <AddIcon sx={{ mb: 0.2, fontSize: "medium", color: "blue" }} />
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
            <Grid container sx={{ mt: "-4px", border: "2px solid #EAEAEA",borderTop:"3px solid black" }} >
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
                <CustomInputLabel>회사코드</CustomInputLabel>
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
                  disabled={!this.state.isCoCdEditable}
                  sx={{ backgroundColor: "#FFEAEA" }}
                  name="coCd"
                  onChange={this.handleCdChange}
                  // onChange={this.handleCompany}
                  onBlur={this.handleBlur}
                  value={coCd || ""}
                  inputProps={{ maxLength: 8 }} // 최대 8자까지 허용
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
                <CustomInputLabel>회사명</CustomInputLabel>
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
                  name="coNm"
                  onChange={this.handleCompany}
                  value={coNm || ""}
                  inputProps={{ maxLength: 29 }}
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
                <CustomInputLabel>종목</CustomInputLabel>
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
                  name="jongmok"
                  onChange={this.handleCompany}
                  value={jongmok || ""}
                  inputProps={{ maxLength: 29 }}
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
                }}
              >
                <CustomWideTextField
                  name="businessType"
                  onChange={this.handleCompany}
                  value={businessType || ""}
                  inputProps={{ maxLength: 29 }}
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
                <CustomInputLabel>대표자명</CustomInputLabel>
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
                  name="ceoNm"
                  onChange={this.handleCompany}
                  value={ceoNm || ""}
                  inputProps={{ maxLength: 20 }}
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
                <CustomInputLabel>사업자번호</CustomInputLabel>
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
                  name="coNb"
                  onChange={this.handleCompany}
                  value={coNb || ""}
                  placeholder="ex)123-45-67890"
                  InputProps={{
                    inputComponent: InputMask,
                    inputProps: {
                      mask: "999-99-99999",
                      maskChar: "0"
                    }
                  }}>
                </CustomWideTextField>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  backgroundColor: "#FCFCFC",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomInputLabel>회사주소</CustomInputLabel>
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
                        id="coZip"
                        name="coZip"
                        onChange={this.handleCompany}
                        value={coZip || ""}
                        InputProps={{ readOnly: true }}
                        sx={{ mt: 1, ml: 1, width: "150px" }}
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
                      id="coAddr"
                      name="coAddr"
                      onChange={this.handleCompany}
                      value={coAddr || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item>
                    <CustomWideTextField
                      name="coAddr1"
                      onChange={this.handleCompany}
                      value={coAddr1 || ""}
                      sx={{ mt: "0px !important" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "#FCFCFC",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  회계기수
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid lightgray",
                }}
              >
                <CustomInputLabel
                  sx={{ ml: 1 }}
                  name="gisu"
                  onChange={this.handleCompany}
                  value={gisu || ""}
                >
                  {gisu}
                </CustomInputLabel>
                <CustomInputLabel sx={{ textAlign: "right", mr: 1 }}>
                  기
                </CustomInputLabel>
                <CustomDatePrToTextField
                  name="dateRange"
                  disabled={true}
                  value={this.state.dateRange || ""}
                  onChange={this.handleCompany}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon
                          sx={{ fontSize: "16px", color: "gray" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                ></CustomDatePrToTextField>

                <Button
                  size="medium"
                  sx={{ ml: 1 }}
                  variant="outlined"
                  onClick={this.handleGisu}
                  disabled={isDisabled}
                >
                  기수등록
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <AddressComponent setCoZipAddr={this.setCoZipAddr} ref={this.addrRef} />
        <CoDialogComponent
          handleSetCodialTextField={this.handleSetCodialTextField}
          ref={this.coDialogRef}
        />
        <GisuDialogComponent
          ref={this.gisuRef}
          coCd={this.state.coCd}
          setGisuInfo={this.setGisuInfo}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  CoMgmtComponent
);
