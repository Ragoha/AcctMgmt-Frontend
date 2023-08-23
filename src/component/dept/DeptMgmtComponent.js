import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from "@mui/icons-material/Group";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import { ApartmentOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';

import { Button, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import CustomSwal from '../common/CustomSwal.js';
import CompanyService from '../../service/CompanyService';
import DeptService from '../../service/DeptService';
import DivsService from '../../service/DivsService';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomSearchButton, CustomTextField, CustomWideTextField } from '../common/style/CommonStyle';
import AddressComponent from './dialog/AddressComponent';
import DeptDialogComponent from './dialog/DeptDialogComponent';

class DeptMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.deptDialogRef = React.createRef();
    this.addrRef = React.createRef();
    this.state = {
      open: false,
      focused: null,
      trees: [],
      cardCount: 0,
      coCd: '',
      divCd: '',
      deptCd: '',
      coNm: '',
      divNm: '',
      deptNm: '',
      insertId: '', //등록자
      insertDt: '', //등록일  String???
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
      rows: [],
      coCdList: [],
      divCdList: [],
      coNmList: [],
      divNmList: [],
      deptCdList: [],
      deptNmList: [],
      CodialTextField: '',
      isChanged: false,
      isDeptCdEditable: false,
      expanded: []
    }
  }

  handleToggle = (event, nodeIds) => {
    this.setState({
      expanded: nodeIds,
    });
  };

  componentDidMount() {
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;

    console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

    this.setState({ coCd: coCd });
    CompanyService.getCompany({
      accessToken: this.props.accessToken,
      coCd: coCd
    })
      .then((response) => {
        const coNm = response.data[0].coNm;

        this.setState({
          coNm: coNm,
          isDeptCdEditable: false
        })
      })
    DivsService.getDivision({
      accessToken: this.props.accessToken,
      coCd: coCd
    })
      .then((response) => {
        console.log(response.data)
        const divCdList = response.data.map((item) => item.divCd);
        const divNmList = response.data.map((item) => item.divNm);
        const newDivCdList = [...new Set(divCdList)]
        // const divCd = response.data[0].divCd;  //이거 고쳣음..!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        const divNm = response.data[0].divNm;

        const expanded = [`co-${coCd}`, ...newDivCdList.map(divCd => `div-${divCd}`)];
        this.setState({
          divCdList: divCdList,
          divNmList: divNmList,
          newDivCdList: newDivCdList,
          // divCd: divCd,
          divNm: divNm,
          expanded: expanded
        })
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      })
    DeptService.getDivDept({
      accessToken: this.props.accessToken,
      coCd: coCd
    })
      .then((response) => {
        console.log("여기");
        console.log(response);
        console.log(response.data);

        this.setState({ rows: response.data });
        // console.log({ rows: response.data })
        const coCdList = response.data.map((item) => item.coCd);
        const divCdList = response.data.map((item) => item.divCd);
        const divNmList = response.data.map((item) => item.divNm);
        // console.log(divCdList);
        const deptCdList = response.data.map((item) => item.deptCd);
        const deptNmList = response.data.map((item) => item.deptNm);

        this.state.rows.map((row) => {
          console.log(row.divCd);
        })
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
          // divCdList: divCdList,
          // divNmList: divNmList,
          deptCdList: deptCdList,
          deptNmList: deptNmList,


          focused: `co-${coCd}`,
          coCd: coCd,
          divCd: '',
          divNm: '',
          deptCd: '',
          deptNm: '',
          // ceoNm: ceoNm,
          deptZip: '',
          deptAddr: '',
          deptAddr1: '',
          insertDt: '',
          DeptdialTextField: '',
          isChanged: false
        })
        // if(!response.data.length){
        //     this.setState({
        //         cardCount: 0 
        //     })
        // }
      }).catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
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

  handleCdChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); ///[^0-9]*$/ 둘 다 되는건가?
    this.setState({
      isChanged: true,
      [e.target.name]: numericValue
    });
  };

  handleBlur = (e) => {
    const { deptCd } = this.state;
    const newDeptCd = e.target.value;
    const { deptCdList } = this.state;

    if (deptCdList.includes(newDeptCd)) {
      CustomSwal.showCommonToast("warning", "사용중인 부서코드입니다.");
      this.setState({
        deptCd: ''
      });
    } else {
      // this.showCommonToast("success", "사용가능한 회사코드입니다.");
      this.setState({
        deptCd: newDeptCd
      });
    }
  }

  addrButton = () => {
    this.addrRef.current.handleUp();
  }

  closeAddrDialog = () => {
    this.addrRef.current.handleDown();
  }


  helpClick = () => {
    this.deptDialogRef.current.handleUp();
    this.deptDialogRef.current.setDeptKeyword(this.state.DeptdialTextField);
  };

  subHelpClick = () => {
    this.deptDialogRef.current.handleUp();
  };

  closeDialog = () => {
    this.dialogRef.current.handleDown();
  }

  handleSetDeptdialTextField = async (data) => {
    await this.setState({
      DeptdialTextField: data.deptCd && data.deptNm ? data.deptCd + ". " + data.deptNm : "",
      deptCd: data.deptCd  //밑에 coCd 넘겨주기
    });
    this.searchClick(data.deptCd);
  };

  searchClick = (deptCd) => {
    const row = this.state;
    DeptService.getDepartment({
      accessToken: this.props.accessToken,
      deptCd: deptCd
    })
      .then((response) => {
        // const coCdList = response.data.map((item) => item.coCd);
        const divCdList = response.data.map((item) => item.divCd);
        // const coNmList = response.data.map((item) => item.coNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
        // const divNmList = response.data.map((item) => item.divNm);
        const deptCdList = response.data.map((item) => item.deptCd);
        const deptNmList = response.data.map((item) => item.deptNm);
        const cardCount = response.data.length;

        // const coCd = response.data[0].coCd;
        // const coNm = response.data[0].coNm;
        const divCd = response.data[0].divCd;
        const divNm = response.data[0].divNm;
        const deptCd = response.data[0].deptCd;
        const deptNm = response.data[0].deptNm;
        const deptZip = response.data[0].deptZip;
        const deptAddr = response.data[0].deptAddr;
        const deptAddr1 = response.data[0].deptAddr1;
        const insertDt = response.data[0].insertDt;

        this.setState({
          cardCount: cardCount,//??????
          //   coCdList: coCdList,
          //   coNmList: coNmList,  // 하고나서 coNm 불러오는 것도 해야함!!
          //   divCdList: divCdList,
          //   divNmList: divNmList,
          deptCdList: deptCdList,
          deptNmList: deptNmList,

          focused: `dept-${row.deptCd}`,
          //   coCd: coCd,
          //   coNm: coNm,
          divCd: divCd,
          divNm: divNm,
          deptCd: deptCd,
          deptNm: deptNm,
          deptZip: deptZip,
          deptAddr: deptAddr,
          deptAddr1: deptAddr1,
          insertDt: insertDt
        })
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      })
  }

  setDeptZipAddr = (data) => {
    this.setState({ deptZip: data.deptZip });
    this.setState({ deptAddr: data.deptAddr });
  }


  handleChange = (e) => {
    this.setState({
      coCd: e.target.value
    })
  }

  addTree = () => {
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;
    console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

    this.setState({ coCd: coCd });

    const newCardCount = this.state.cardCount + 1;
    const newDeptCdList = [...this.state.deptCdList, '0000'];

    if (this.state.deptCdList.includes("0000")) {
      CustomSwal.showCommonToast('warning', '미등록 부서가 존재합니다.');
    } else {
      DivsService.getDivision({
        accessToken: this.props.accessToken,
        coCd: coCd
      })
        .then((response) => {
          console.log(response.data)
          // const divCdList = response.data.map((item) => item.divCd);
          // const divNmList = response.data.map((item) => item.divNm);

          // const divCd = response.data[0].divCd;
          // const divNm = response.data[0].divNm;

          this.setState({
            cardCount: newCardCount,
            deptCdList: newDeptCdList,
            // divCdList: divCdList,
            // divNmList: divNmList,
            focused: null,
            // coCd: coCd,
            // divCd: divCd,
            // divNm: divNm,
            deptCd: '',
            deptNm: '',
            deptZip: '',
            deptAddr: '',
            deptAddr1: '',
            insertDt: '',
            isDeptCdEditable: true
          })
        })
    }
  }

  insertDept = () => {
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;
    const row = this.state;

    this.setState({
      coCd: coCd
    })
    const { divCd, deptCd, deptNm, deptZip, deptAddr, deptAddr1, insertId, insertDt } = this.state;

    if (!this.state.deptCdList.includes('0000')) {
      CustomSwal.showCommonToast("error", "등록할 부서를 추가해주세요");
    } else {
      const impValues = { coCd, divCd, deptCd };
      if (Object.values(impValues).some((value) => value === "")) {
        CustomSwal.showCommonToast("warning", "필수 값을 입력하세요");
        return;
      }
      //showCommonSwalYn = (title, text, icon, yesButtonText)
      CustomSwal.showCommonSwalYn("저장", "저장하시겠습니까?", "info", "저장", (confirmed) => {
        if (confirmed) {
          // confirmed가 true인 경우에만 저장 로직을 실행
          DeptService.insertDept({
            accessToken: this.props.accessToken,
            coCd: coCd,
            divCd: divCd,
            deptCd: deptCd,
            deptNm: deptNm,
            deptZip: deptZip,
            deptAddr: deptAddr,
            deptAddr1: deptAddr1,
            insertId: empId
          })
            .then((response) => {
              console.log(response.data);
              CustomSwal.showCommonToast("success", "부서 등록되었습니다.");

              console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

              this.setState({ coCd: coCd });
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              CustomSwal.showCommonToast('warning', '부서 등록에 실패했습니다.'); //사용중인 부서코드입니다.
            })
          DivsService.getDivision({
            accessToken: this.props.accessToken,
            coCd: coCd
          })
            .then((response) => {
              console.log(response.data)
              const divCdList = response.data.map((item) => item.divCd);
              const divNmList = response.data.map((item) => item.divNm);

              const divCd = response.data[0].divCd;
              const divNm = response.data[0].divNm;
              this.setState({
                divCdList: divCdList,
                divNmList: divNmList,
                divCd: divCd,
                divNm: divNm,
                isDeptCdEditable: false
              })
            }).catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              CustomSwal.showCommonToast('warning', '사업장 조회에 실패했습니다.');
            });
          DeptService.getDivDept({
            accessToken: this.props.accessToken,
            coCd: coCd
          })
            .then((response) => {
              // console.log(response.data)
              this.setState({ rows: response.data });
              // console.log({ rows: response.data })
              const coCdList = response.data.map((item) => item.coCd);
              // const divCdList = response.data.map((item) => item.divCd);
              // const divNmList = response.data.map((item) => item.divNm);
              // console.log(divCdList);
              const deptCdList = response.data.map((item) => item.deptCd);
              const deptNmList = response.data.map((item) => item.deptNm);
              this.state.rows.map((row) => {
                console.log(row.divCd);
              })
              const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

              const coCd = response.data[0].coCd;
              // const divCd = response.data[0].divCd;
              // const divNm = response.data[0].divNm;
              // const deptCd = response.data[0].deptCd;
              // const deptNm = response.data[0].deptNm;
              // const ceoNm = response.data[0].ceoNm;
              // const deptZip = response.data[0].deptZip;
              // const deptAddr = response.data[0].deptAddr;
              // const deptAddr1 = response.data[0].deptAddr1;
              const insertDt = response.data[0].insertDt;

              this.setState({
                cardCount: cardCount, // state에 값을 저장
                coCdList: coCdList,
                // divCdList: divCdList,
                // divNmList: divNmList,
                deptCdList: deptCdList,
                deptNmList: deptNmList,

                focused: `dept-${row.deptCd}`,
                coCd: coCd,
                divCd: divCd,
                // divNm: divNm,
                deptCd: deptCd,
                deptNm: deptNm,
                // ceoNm: ceoNm,
                deptZip: deptZip,
                deptAddr: deptAddr,
                deptAddr1: deptAddr1,
                insertDt: insertDt,
                isDeptCdEditable: false,
                isChanged: false
              })
            }).catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              CustomSwal.showCommonToast('warning', '실패했습니다.');
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


        }
      })
    }
  }

  updateDept = () => {
    const { deptCd, deptNm, deptZip, deptAddr, deptAddr1 } = this.state;
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;
    const row = this.state;

    if (!deptCd) {
      CustomSwal.showCommonToast("error", "수정 할 부서를 선택해주세요."); //이거 부서선택했다가 사업장이나 회사가면 초기화 안되는듯 insertDt가 그거 초기화해주면 사실상 필요는 없으려나 그래도 있는게
    } else {
      DeptService.updateDept({
        accessToken: this.props.accessToken,
        deptCd: deptCd,
        deptNm: deptNm,
        deptZip: deptZip,
        deptAddr: deptAddr,
        deptAddr1: deptAddr1
      })
        .then((response) => {
          console.log(response.data);
          CustomSwal.showCommonToast("success", "수정되었습니다.");

          console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

          this.setState({ coCd: coCd });
          DivsService.getDivision({
            accessToken: this.props.accessToken,
            coCd: coCd
          })
            .then((response) => {
              console.log(response.data)
              const divCdList = response.data.map((item) => item.divCd);
              const divNmList = response.data.map((item) => item.divNm);

              const divCd = response.data[0].divCd;
              const divNm = response.data[0].divNm;
              this.setState({
                divCdList: divCdList,
                divNmList: divNmList,
                divCd: divCd,
                divNm: divNm
              })
              DeptService.getDivDept({
                accessToken: this.props.accessToken,
                coCd: coCd
              })
                .then((response) => {
                  // console.log(response.data)
                  this.setState({ rows: response.data });
                  // console.log({ rows: response.data })
                  const coCdList = response.data.map((item) => item.coCd);
                  // const divCdList = response.data.map((item) => item.divCd);
                  // const divNmList = response.data.map((item) => item.divNm);
                  console.log(divCdList);
                  const deptCdList = response.data.map((item) => item.deptCd);
                  const deptNmList = response.data.map((item) => item.deptNm);
                  this.state.rows.map((row) => {
                    console.log(row.divCd);
                  })
                  const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                  const coCd = response.data[0].coCd;
                  // const divCd = response.data[0].divCd;
                  // const divNm = response.data[0].divNm;
                  // const deptCd = response.data[0].deptCd;
                  // const deptNm = response.data[0].deptNm;
                  // const ceoNm = response.data[0].ceoNm;
                  // const deptZip = response.data[0].deptZip;
                  // const deptAddr = response.data[0].deptAddr;
                  // const deptAddr1 = response.data[0].deptAddr1;

                  this.setState({
                    cardCount: cardCount, // state에 값을 저장
                    coCdList: coCdList,
                    // divCdList: divCdList,
                    // divNmList: divNmList,
                    deptCdList: deptCdList,
                    deptNmList: deptNmList,

                    focused: `dept-${row.deptCd}`,
                    coCd: coCd,
                    divCd: divCd,
                    divNm: divNm,
                    deptCd: deptCd,
                    deptNm: deptNm,
                    // ceoNm: ceoNm,
                    deptZip: deptZip,
                    deptAddr: deptAddr,
                    deptAddr1: deptAddr1,
                    isChanged: false
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
        }).catch((error) => {
          // 오류 발생 시의 처리
          console.error(error);
          CustomSwal.showCommonToast("warning", "수정에 실패하였습니다.");
        });
    }
  }

  deleteDept = () => {
    const { deptCd, focused } = this.state;
    if (focused && !deptCd) {
      CustomSwal.showCommonToast("error", "삭제 할 부서를 선택해주세요.");
    } else {
      if (deptCd === '0000') {
        CustomSwal.showCommonSwalYn("삭제", "정말 삭제하시겠습니까?", "info", "확인", (confirmed) => {
          if (confirmed) {
            CustomSwal.showCommonToast("success", "삭제되었습니다.");
            this.componentDidMount();
          }
        })
      } else {
        CustomSwal.showCommonSwalYn("삭제", "정말 삭제하시겠습니까?", "info", "확인", (confirmed) => {
          if (confirmed) {
            const userInfo = this.props.userInfo;
            const { coCd, empId, empEmail } = userInfo;
            console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

            this.setState({ coCd: coCd });
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
            DeptService.deleteDept({
              accessToken: this.props.accessToken,
              deptCd: deptCd
            })
              .then((response) => {
                console.log(response.data);
                CustomSwal.showCommonToast("success", "삭제되었습니다.");
              }).catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                CustomSwal.showCommonToast("error", "삭제에 실패했습니다.");
              });
            DivsService.getDivision({
              accessToken: this.props.accessToken,
              coCd: coCd
            })
              .then((response) => {
                console.log(response.data)
                const divCdList = response.data.map((item) => item.divCd);
                const divNmList = response.data.map((item) => item.divNm);

                const divCd = response.data[0].divCd;
                const divNm = response.data[0].divNm;
                this.setState({
                  divCdList: divCdList,
                  divNmList: divNmList,
                  divCd: divCd,
                  divNm: divNm
                })
              }).catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                CustomSwal.showCommonToast("error", "사업장 조회에 실패했습니다.");
              });
            DeptService.getDivDept({
              accessToken: this.props.accessToken,
              coCd: coCd
            })
              .then((response) => {
                // console.log(response.data)
                this.setState({ rows: response.data });
                // console.log({ rows: response.data })
                const coCdList = response.data.map((item) => item.coCd);
                // const divCdList = response.data.map((item) => item.divCd);
                // const divNmList = response.data.map((item) => item.divNm);
                // console.log(divCdList);
                const deptCdList = response.data.map((item) => item.deptCd);
                const deptNmList = response.data.map((item) => item.deptNm);
                this.state.rows.map((row) => {
                  console.log(row.divCd);
                })
                const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

                const coCd = response.data[0].coCd;
                // const divCd = response.data[0].divCd;
                // const divNm = response.data[0].divNm;
                // const deptCd = response.data[0].deptCd;
                // const deptNm = response.data[0].deptNm;
                // const ceoNm = response.data[0].ceoNm;
                // const deptZip = response.data[0].deptZip;
                // const deptAddr = response.data[0].deptAddr;
                // const deptAddr1 = response.data[0].deptAddr1;

                this.setState({
                  cardCount: cardCount, // state에 값을 저장
                  coCdList: coCdList,
                  // divCdList: divCdList,
                  // divNmList: divNmList,
                  deptCdList: deptCdList,
                  deptNmList: deptNmList,

                  focused: `co-${coCd}`,
                  coCd: coCd,
                  divCd: '',
                  divNm: '',
                  deptCd: '',
                  deptNm: '',
                  ceoNm: '',
                  deptZip: '',
                  deptAddr: '',
                  deptAddr1: '',
                  DeptdialTextField: '',
                  insertDt: '',
                  isDeptCdEditable: false,
                  isChanged: false
                })
              })
              .catch((error) => {
                // 오류 발생 시의 처리
                console.error(error);
                CustomSwal.showCommonToast("error", "등록된 부서가 없습니다.");
                this.setState({
                  cardCount: 0, // state에 값을 저장
                  coCdList: '',
                  // divCdList: divCdList,
                  // divNmList: divNmList,
                  deptCdList: '',
                  deptNmList: '',
                  focused: `co-${coCd}`,
                  coCd: coCd,
                  divCd: '',
                  divNm: '',
                  deptCd: '',
                  deptNm: '',
                  // ceoNm: ceoNm,
                  deptZip: '',
                  deptAddr: '',
                  deptAddr1: '',
                  DeptdialTextField: '',
                  insertDt: '',
                  isDeptCdEditable: false,
                  isChanged: false
                })
              });
          }
        })
      }
    }
  }

  reClick = () => {
    this.componentDidMount();
  }

  handleSelect = (nodeId) => {
    console.log(nodeId)
    const userInfo = this.props.userInfo;
    const { coCd, empId, empEmail } = userInfo;
    const { cardCount } = this.state;
    this.setState({
      coCd: coCd,
      cardCount: cardCount
    })
    if (this.state.isChanged) {
      CustomSwal.showCommonSwalYn("저장", "수정중인 내용이 있습니다. 저장하시겠습니까?", "info", "저장", (confirmed) => {
        if (confirmed) {
          if (this.state.insertDt) {
            this.updateDept();
          }
          else {
            this.insertDept();
          }
        }
        // else {
        //     this.setState({
        //         isChanged: false
        //     })
        // }
      })
    }
    else {
      if (nodeId.startsWith('div-')) {
        const parts = nodeId.split('-');
        const divCd = parts[1];

        this.setState({
          focused: nodeId,
          coCd: coCd,
          divCd: divCd,
          // divNm: divNm,
          deptCd: '',
          deptNm: '',
          deptZip: '',
          deptAddr: '',
          deptAddr1: '',
          insertDt: '',
          isDeptCdEditable: true
        })
        if (cardCount <= 0 || !this.state.deptCdList.includes('0000')) {
          this.setState({
            isDeptCdEditable: false
          })
        }

      } else if (nodeId.startsWith('dept-')) {
        const parts = nodeId.split('-');
        const deptCd = parts[1];

        this.setState({
          deptCd: deptCd
        })
        console.log(deptCd)
        console.log(coCd)

        DeptService.getDepartment({
          accessToken: this.props.accessToken,
          deptCd: deptCd
        })
          .then((response) => {
            console.log(response.data)
            const coCdList = response.data.map((item) => item.coCd);
            // const divCdList = response.data.map((item) => item.divCd);
            // const divNmList = response.data.map((item) => item.divNm);
            const deptCdList = response.data.map((item) => item.deptCd);
            const deptNmList = response.data.map((item) => item.deptNm);

            const coCd = response.data[0].coCd;
            const divCd = response.data[0].divCd;
            const divNm = response.data[0].divNm;
            const deptCd = response.data[0].deptCd;
            const deptNm = response.data[0].deptNm;
            // const ceoNm = response.data[0].ceoNm;
            const deptZip = response.data[0].deptZip;
            const deptAddr = response.data[0].deptAddr;
            const deptAddr1 = response.data[0].deptAddr1;
            const insertDt = response.data[0].insertDt;


            this.setState({
              coCdList: coCdList,
              // divCdList: divCdList,
              // divNmList: divNmList,
              focused: nodeId,
              coCd: coCd,
              divCd: divCd,
              divNm: divNm,
              deptCd: deptCd,
              deptNm: deptNm,
              // ceoNm: ceoNm,
              deptZip: deptZip,
              deptAddr: deptAddr,
              deptAddr1: deptAddr1,
              insertDt: insertDt,
              isDeptCdEditable: false
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
      } else if (nodeId.startsWith('co-')) {
        const parts = nodeId.split('-');
        const coCd = parts[1];

        this.setState({
          focused: nodeId,
          insertDt: ''
        })
      }
    }
  }

  handleTextFieldChange = (e) => {
    this.setState({ DeptdialTextField: e.target.value });
  };

  handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      this.helpClick();
    }
    if (event.key == "Backspace") {
      this.setState({ DeptdialTextField: "" });
    };
  };

  render() {
    const { open, divCd, coCd, deptCd, deptNm, divNm, ceoNm, deptZip, deptAddr, deptAddr1, rows, insertId, modifyId, insertDt } = this.state;
    const { coNm } = this.state;
    const { cardCount, divCdList, divNmList, coCdList, coNmList, deptCdList, deptNmList, index } = this.state;

    const currentDate = new Date();

    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

    const newDivCdList = [...new Set(divCdList)]
    const newDeptCdList = [...new Set(deptCdList)]

    const expanded = [`co-${coCd}`, ...newDivCdList.map(divCd => `div-${divCd}`)];
    const CustomTreeView = styled(TreeView)(({ theme }) => ({
      // [`& .Mui-selected`]: {
      //     backgroundColor: 'transparent !important', // Override the selected background color
      // },
      // [`"&:hover"`]: {
      //     backgroundColor: 'transparent !important', // Override the selected background color
      // },
    }));

    // "&:hover": {
    //     backgroundColor: "#4A55A2",
    //   },
    const trees = (
      <TreeItem nodeId={`co-${coCd}`} label={<Grid sx={{ display: 'flex', alignItems: 'center', backgroundColor: this.state.focused === `co-${coCd}` ? '#D9E5FF' : 'white' }}><ApartmentOutlined sx={{ color: 'gray', mt: -0.2, mr: 0.5 }} />{coCd + '. ' + coNm}</Grid>} onClick={() => this.handleSelect(`co-${coCd}`)}>
        {newDivCdList.map((divCd, index) => (
          <TreeItem key={`div-${index}`} nodeId={`div-${divCd}`} label={<Grid sx={{ display: 'flex', alignItems: 'center', backgroundColor: this.state.focused === `div-${divCd}` ? '#CEFBC9' : 'white' }}><DomainDisabledIcon sx={{ color: 'gray', mt: -0.2, mr: 0.5 }} />{divCd + '. ' + divNmList[index]}</Grid>}
            onClick={() => this.handleSelect(`div-${divCd}`)}
          >
            {rows.map((row, subIndex) => (
              (row.divCd === divCd) ?
                <TreeItem
                  key={`dept-${subIndex}`}
                  nodeId={`dept-${row.deptCd}`}
                  label={<Grid sx={{ display: 'flex', alignItems: 'center', backgroundColor: this.state.focused === `dept-${row.deptCd}` ? '#E8D9FF' : 'white' }}><GroupIcon sx={{ color: 'gray', mt: -0.2, mr: 0.5 }} />{row.deptCd + '. ' + row.deptNm}</Grid>}
                  onClick={() => this.handleSelect(`dept-${row.deptCd}`)}
                />
                : null
            )
            )}
          </TreeItem >
        ))}
      </TreeItem >
    );

    // deptCdList.map((deptCd, subIndex) => (
    //   <TreeItem
    //     key={`dept-${subIndex}`}
    //     nodeId={`dept-${deptCd}`}
    //     label={deptNmList[subIndex]}
    //     onClick={() => this.handleSelect(`dept-${deptCd}`)}
    //   />
    // )

    // console.log(newDivCdList)
    // console.log(divCdList)
    // console.log(newDeptCdList)
    // console.log(deptCdList)
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
          <Grid item>
            <Button
              sx={{ mr: 1 }}
              variant="outlined"
              onClick={this.addTree}
            >
              추 가
            </Button>

            {insertDt ? (
              <Button
                sx={{ mr: 1 }}
                variant="outlined"
                onClick={this.updateDept}
              >
                수 정
              </Button>
            ) : (
              <Button
                sx={{ mr: 1 }}
                variant="outlined"
                onClick={this.insertDept}
              >
                저 장
              </Button>
            )}
            <Button variant="outlined" onClick={this.deleteDept}>
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
          position='relative'
        >
          {/* <Grid item xs={3}>
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
                    </Grid> */}

          <Grid item xs={4}>
            <Grid container alignItems="center">
              <CustomInputLabel>부서</CustomInputLabel>
              <CustomTextField
                name="DeptdialTextField"
                value={this.state.DeptdialTextField}
                onChange={this.handleTextFieldChange} // 입력 필드 값이 변경될 때 호출되는 핸들러 함수
                onKeyDown={this.handleEnterKey} // 엔터 키 입력 처리
                placeholder="부서코드/부서명 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.subHelpClick} />
                    </InputAdornment>
                  ),
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          <CustomSearchButton
            variant="outlined"
            onClick={
              !this.state.DeptdialTextField
                ? this.reClick
                : this.helpClick
            }
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
              height: "calc(100vh - 240px)",
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
                borderBottom: "2px solid #000",
              }}
            >
              <CustomInputLabel sx={{ ml: 1 }}>총 부서:</CustomInputLabel>
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
                height: "calc(100% - 7%)",
                overflowY: "auto",
              }}
            >
              <CustomTreeView
                // defaultExpanded={initialExpanded}
                expanded={this.state.expanded}
                onNodeToggle={this.handleToggle}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              // sx={{ height: 110, flexGrow: 1, maxWidth: 400 }}
              >
                {trees}
              </CustomTreeView>
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

            <Grid
              container
              sx={{ mt: "-4px", border: "2px solid #EAEAEA" }}
            >
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop: "2px solid #000",
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
                size="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  xs={4}
                  sx={{ ml: 2 }}
                  value={coCd + ". " + coNm}
                  InputProps={{ readOnly: true }}
                ></CustomWideTextField>
              </Grid>

              {/* <Grid item xs={4} size='small' sx={{ //이거는 일단은 필요없음......
                                display: "flex",
                                alignItems: "center",
                                borderTop: "2px solid #000",
                                borderBottom: "1px solid lightgray",
                                borderRight: "1px solid #EAEAEA",
                            }}>
                                {divCd != 0 ?
                                    <CustomWideTextField xs={4} sx={{ ml: 2 }} value={coCd + ' . ' + coNm} InputProps={{ readOnly: true }}></CustomWideTextField> //disabled={true}
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
                            </Grid> */}

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop: "2px solid #000",
                  borderBottom: "1px solid lightgray",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel sx={{ color: "black" }}>
                  사업장
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "2px solid #000",
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
                  부서코드
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
                  disabled={!this.state.isDeptCdEditable}
                  sx={{ ml: 2, backgroundColor: "#FFEAEA" }}
                  name="deptCd"
                  onChange={this.handleCdChange}
                  onBlur={this.handleBlur}
                  value={deptCd || ""}
                  inputProps={{ maxLength: 8 }}
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
                  부서명
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
                  sx={{ ml: 2 }}
                  name="deptNm"
                  onChange={this.handleCompany}
                  value={deptNm || ""}
                  inputProps={{ maxLength: 29 }}
                ></CustomWideTextField>
              </Grid>

              {/* <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >종목</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: "1px solid lightgray", borderRight: '1px solid #EAEAEA' }}>
                                <CustomWideTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomWideTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >업태</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: "1px solid lightgray" }}>
                                <CustomWideTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomWideTextField>
                            </Grid>



                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >대표자명</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: "1px solid lightgray", borderRight: '1px solid #EAEAEA' }}>
                                <CustomWideTextField sx={{ ml: 2 }} name='ceoNm' onChange={this.handleCompany} value={ceoNm || ''}></CustomWideTextField>
                            </Grid>


                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid lightgray', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                                <CustomInputLabel sx={{ color: 'black' }}  >사업자번호</CustomInputLabel>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: "1px solid lightgray" }}>
                                <CustomWideTextField sx={{ ml: 2 }} onChange={this.handleCompany} ></CustomWideTextField>
                            </Grid> */}

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  backgroundColor: "#FCFCFC",

                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomInputLabel sx={{ mt: 1 }}>부서주소</CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ width: "calc(100% + -24px)" }}
                >
                  <Grid item>
                    <Grid container direction="row">
                      <TextField
                        size="small"
                        id="deptZip"
                        name="deptZip"
                        onChange={this.handleCompany}
                        value={deptZip || ""}
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
                      id="deptAddr"
                      name="deptAddr"
                      onChange={this.handleCompany}
                      value={deptAddr || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item>
                    <CustomWideTextField
                      name="deptAddr1"
                      onChange={this.handleCompany}
                      value={deptAddr1 || ""}
                      sx={{ mt: "0px !important" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <AddressComponent
          setDeptZipAddr={this.setDeptZipAddr}
          ref={this.addrRef}
        />
        <DeptDialogComponent
          handleSetDeptdialTextField={this.handleSetDeptdialTextField}
          ref={this.deptDialogRef}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {} //  userInfo 정보 매핑해주기..
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(DeptMgmtComponent);
