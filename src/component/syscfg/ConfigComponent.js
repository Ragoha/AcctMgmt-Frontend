import SettingsIcon from "@mui/icons-material/Settings";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import SyscfgService from "../../service/SyscfgService";
import { SET_CONFIG } from "../../store/Config";
import {
  CustomGridContainer,
  CustomHeaderGridContainer,
  CustomHeaderInputLabel,
  CustomInputLabel,
  CustomTextField,
} from "../common/style/CommonStyle";

class ConfigComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: null,
      coCd: "",
      coNm: "",
      data: [
        {
          options: ["부서예산", "프로젝트예산"],
          value: ["1", "2"],
        },
        {
          options: ["미사용", "사용"],
          value: ["0", "1"],
        },
        {
          options: ["일별", "월별", "연도별(프로젝트별)", "연도별(사업장별)"],
          value: ["1", "2", "3", "4"],
        },
        {
          options: ["이월안함", "사고+명시+계속비", "사고이월", "명시+계속비"],
          value: ["1", "2", "3", "4"],
        },
        {
          options: ["모든사원에 허용", "일부 사원에 허용"],
          value: ["0", "1"],
        },
        // ... 나머지 데이터 설정 ...
      ],
      selectedValue: "", // 선택한 라디오 버튼의 값 저장
      selectedRowId: null, // 선택한 행의 ID 저장
      selectedTab: "common", // 선택한 탭 저장 (common 또는 decision)
      settingsKey: "", // settingsKey를 state에 추가
    };
  }

  handleRowClick = (rowData) => {
    this.setState({
      selectedValue: rowData[this.state.settingsKey], // this.state.settingsKey 사용
      selectedRowId: rowData.id,
    });
    const option = rowData.id;
    console.log(option);
  };

  handleRadioChange = (e, settingsKey) => {
    const selectedValue = e.target.value;
    const selectedRowId = this.state.selectedRowId;
    const selectedRowData = this.state.data.find(
      (row) => row.id === selectedRowId
    );

    console.log("Selected value:", e.target.value);
    console.log("Settings key:", settingsKey);
    console.log("Radio button value:", selectedRowData[settingsKey]);

    try {
      const selectedData = this.state.data.find(
        (row) => row.id === selectedRowId
      );

      if (selectedData) {
        const optionsIndex = selectedData.value.indexOf(selectedValue);
        const commonSettingValue = selectedData.options[optionsIndex];
        SyscfgService.configCheck({
          selectedData: selectedData.id,
          selectedValue: selectedValue,
          commonSettingValue: commonSettingValue,
          coCd: this.state.coCd,
          accessToken: this.props.accessToken,
        })
          .then(() => {
            SyscfgService.config({
              coCd: this.state.coCd,
              accessToken: this.props.accessToken,
            })
              .then((response) => {
                const what2 = this.props.setConfig(response.data); // 환경설정 초기 데이터 리덕스 저장
                console.log("2번 : ", what2);
              })
              .catch((error) => {
                console.error(error);
              });
            // 화면에 업데이트된 값을 표시
            this.setState((prevState) => ({
              data: prevState.data.map((row) =>
                row.id === selectedRowId ? { ...row, commonSettingValue } : row
              ),
              selectedValue: commonSettingValue, // 이 부분 수정
              [settingsKey]: commonSettingValue, // 추가 수정
            }));
            console.log("선택한 값:", selectedValue);
          })
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 탭 변경 시 실행되는 함수
  handleTabChange = (newValue) => {
    this.setState({ selectedTab: newValue });
  };
  async componentDidMount() {
    const userInfo = this.props.userInfo;
    const { coCd, coNm } = userInfo;

    console.log("로그인 유저 데이터: " + coCd);

    this.setState({ coCd: coCd });

    try {
      this.setState({ coNm: coNm });
      SyscfgService.config({
        accessToken: this.props.accessToken,
        coCd: coCd,
      })
        .then((response) => {
          console.log("Config Data: ", response.data);
          const userData = {
            id: response.data.map((sys) => sys.sysCd),
            option: response.data.map((sys) => sys.sysNm),
            budgetManagement: response.data.map((sys) => sys.cfgvalue),
          };
          this.setState(
            (prevState) => ({
              data: prevState.data.map((row, index) => ({
                ...row,
                id: userData.id[index],
                option: userData.option[index],
                commonSettingValue: userData.budgetManagement[index],
              })),
              ...userData,
            }),
            () => {
              // setState 콜백 내에서 firstRowId를 설정
              const firstRowId = this.state.data[0].id;
              console.log("firstRowId: " + firstRowId);
              this.setState({ selectedRowId: firstRowId }, () => {
                const firstRow = document.querySelector(
                  `tr[data-row-id="${firstRowId}"]`
                );
                if (firstRow) {
                  firstRow.click();

                  const firstRadioInput = document.querySelector('input[type="radio"]');
                  if (firstRadioInput) {
                    firstRadioInput.focus();
                  }
                }
              });
            }
          );
        })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { selectedTab, coNm, data, selectedRowId, coCd } = this.state;

    const settingsKey = "commonSettingValue";
    console.log("셋팅 키 값 : " + settingsKey);
    const selectedRowData = data.find((row) => row.id === selectedRowId);
    const comName = coCd + ". " + coNm;
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
              <SettingsIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>시스템환경설정</CustomHeaderInputLabel>
            </Grid>
          </Grid>
        </CustomHeaderGridContainer>
        <Grid container sx={{ mt: 1 }}>
          <CustomGridContainer
            container
            direction="row"
            spacing={2}
            justifyContent="left"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Grid container alignItems="center">
                <CustomInputLabel>회사명</CustomInputLabel>
                <CustomTextField value={comName} disabled />
              </Grid>
            </Grid>
          </CustomGridContainer>
          <Grid item xs={12}>
            <CustomInputLabel sx={{ fontSize: 18 }}>공통설정</CustomInputLabel>
          </Grid>
          <Grid item xs={8} sx={{ pr: 2 }}>
            <TableContainer component={Paper}>
              <Table
                style={{
                  border: "1px solid #ccc",
                  borderTop: "3px solid black",
                }}
              >
                <TableHead sx={{ bgcolor: "beige" }}>
                  <TableRow>
                    <TableCell
                      style={{
                        border: "1px solid #ccc",
                        width: "19vh",
                        fontWeight: "bold",
                      }}
                    >
                      옵션명(option)
                    </TableCell>
                    <TableCell
                      style={{
                        border: "1px solid #ccc",
                        width: "10vh",
                        fontWeight: "bold",
                      }}
                    >
                      옵션값(OptionValue)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => this.handleRowClick(row)}
                      style={{
                        backgroundColor:
                          row.id === selectedRowId ? "#e8f0fe" : "white",
                        border: "1px solid #ccc",
                      }}
                    >
                      <TableCell style={{ border: "1px solid #ccc" }}>
                        {row.option}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #ccc" }}>
                        {row[settingsKey]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {selectedRowData && (
            <Grid item xs={4}>
              <Paper
                style={{
                  padding: 10,
                  border: "1px solid #d5d5d5",
                  borderTop: "3px solid black",
                }}
              >
                <FormControl component="fieldset" sx={{ width: "30vh" }}>
                  <FormLabel component="label">옵션</FormLabel>
                  <RadioGroup
                    name={`radio-group-${selectedRowData.id}`}
                    value={selectedRowData[settingsKey]}
                    onChange={(e) => this.handleRadioChange(e, settingsKey)}
                  >
                    {selectedRowData.options.map((optionValue, idx) => (
                      <FormControlLabel
                        key={optionValue}
                        value={selectedRowData.value[idx]}
                        control={
                          <Radio
                            checked={
                              selectedRowData.value[idx] ===
                              selectedRowData[settingsKey] ||
                              (this.state.selectedRowId ===
                                selectedRowData.id &&
                                optionValue === selectedRowData[settingsKey])
                            }
                            onChange={(e) =>
                              this.handleRadioChange(e, settingsKey)
                            }
                          />
                        }
                        label={selectedRowData.value[idx] + "." + optionValue}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  configData: state.config.configData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setConfig: (config) => dispatch(SET_CONFIG(config)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
