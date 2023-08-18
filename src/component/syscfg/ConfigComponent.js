import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import React from 'react';
import { connect } from 'react-redux';
import { SET_CONFIG } from '../../store/Config';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from '@mui/material';
import {CustomInputLabel, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomGridContainer, CustomTextField } from '../common/style/CommonStyle';

class ConfigComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: null,
      coCd: '',
      coNm: '',
      data: [
        {
          options: ["부서예산", "프로젝트예산"],
          value: ['1', '2'],
        },
        {
          options: ["미사용", "사용"],
          value: ['0', '1'],
        },
        {
          options: [
            "일별",
            "월별",
            "연도별(프로젝트별)",
            "연도별(사업장별)",
          ],
          value: ['1', '2', '3', '4'],
        },
        {
          options: [
            "이월안함",
            "사고+명시+계속비",
            "사고이월",
            "명시+계속비",
          ],
          value: ['1', '2', '3', '4'],
        },
        {
          options: ["미사용", "사용"],
          value: ['0', '1'],
        },
        // ... 나머지 데이터 설정 ...
      ],
      selectedValue: "", // 선택한 라디오 버튼의 값 저장
      selectedRowId: null, // 선택한 행의 ID 저장
      selectedTab: "common", // 선택한 탭 저장 (common 또는 decision)
      settingsKey: '', // settingsKey를 state에 추가
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
    const selectedRowData = this.state.data.find((row) => row.id === selectedRowId);

    console.log("Selected value:", e.target.value);
    console.log("Settings key:", settingsKey);
    console.log("Radio button value:", selectedRowData[settingsKey]);

    try {
      const selectedData = this.state.data.find((row) => row.id === selectedRowId);

      if (selectedData) {
        const optionsIndex = selectedData.value.indexOf(selectedValue);
        const commonSettingValue = selectedData.options[optionsIndex];
        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

        const newData = {
          id: selectedData.id,
          option: selectedData.option,
          commonSettingValue: commonSettingValue,
        };
        this.props.setConfig(newData);

        // API 호출 및 업데이트
        const response = axios.post(
          ACCTMGMT_API_BASE_URL + '/api/config/' + selectedData.id + '/' + selectedValue + '/' + commonSettingValue + '/' + this.state.coCd,
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // 화면에 업데이트된 값을 표시
        this.setState((prevState) => ({
          data: prevState.data.map((row) =>
            row.id === selectedRowId ? { ...row, commonSettingValue } : row
          ),
          selectedValue: commonSettingValue, // 이 부분 수정
          [settingsKey]: commonSettingValue, // 추가 수정
        }));

        console.log("선택한 값:", selectedValue);
        console.log("API 응답:", response.data);
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
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    const accessToken = this.props.accessToken; // Redux Store에서 토큰 가져오기
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;

    console.log("엑세스 토큰 : " + accessToken);
    console.log("로그인 유저 데이터: " + coCd);

    this.setState({ coCd: coCd });

    try {
      // 인증된 사용자 확인
      const responseInfo = await axios.get(ACCTMGMT_API_BASE_URL + '/info', {
        headers: {
          "access-token": accessToken,
        },
        withCredentials: true,
      });
      console.log('인증된 사용자 : ', responseInfo.data);

      // 회사 이름 찾기
      const responseCompany = await axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + coCd, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('회사이름 : ', responseCompany.data);
      this.setState({ coNm: responseCompany.data });

      // Config Data 가져오기
      const responseConfig = await axios.get(ACCTMGMT_API_BASE_URL + '/api/configdate/' + coCd);
      console.log('Config Data: ', responseConfig.data);
      const userData = {
        id: responseConfig.data.map((sys) => sys.sysCd),
        option: responseConfig.data.map((sys) => sys.sysNm),
        budgetManagement: responseConfig.data.map((sys) => sys.cfgvalue),
      };
      this.setState((prevState) => ({
        data: prevState.data.map((row, index) => ({
          ...row,
          id: userData.id[index],
          option: userData.option[index],
          commonSettingValue: userData.budgetManagement[index],
        })),
        ...userData,
      }));
      if (this.state.data.length > 0) {
        const firstRowId = this.state.data[0].id;
        this.setState({ selectedRowId: firstRowId });

        const firstRow = document.querySelector(`tr[data-row-id="${firstRowId}"]`);
        if (firstRow) {
          firstRow.click();

          const firstRadioInput = firstRow.querySelector('input[type="radio"]');
          if (firstRadioInput) {
            firstRadioInput.focus();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { selectedTab, coNm, data, selectedRowId, coCd } = this.state;

    const settingsKey = 'commonSettingValue';
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
            justifyContent="left"
            alignItems="center"
            spacing={2}
          >
            <Grid container alignItems="center" direction="row" sx={{ mt: 2, ml: 5 }}>
              <CustomHeaderInputLabel>회사</CustomHeaderInputLabel>
              {/* <TextField aria-readonly placeholder={coNm} disabled ></TextField> */}
              <CustomTextField
                value={comName}
                disabled
                sx={{ ml: 2 }}
              />
            </Grid>
          </CustomGridContainer>
          <Grid item xs={12}>
          <CustomInputLabel sx={{fontSize: 18, }}>공통설정</CustomInputLabel>
          </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table style={{ border: "1px solid #ccc", borderTop:'2px solid black' }}>
                <TableHead sx={{ bgcolor: "beige" }}>
                  <TableRow>
                    <TableCell
                      style={{ border: "1px solid #ccc", width: "19vh", fontWeight: 'bold'}}
                    >
                      옵션명(option)
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #ccc", width: "10vh", fontWeight: 'bold' }}
                    >
                      설정값(SettingValue)
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
                        {(row[settingsKey])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {selectedRowData && (
            <Grid item xs={4} >
              <Paper style={{ padding: 10, border: '1px solid #d5d5d5', borderTop:'2px solid black' }}>
                <FormControl component="fieldset" sx={{ width: "30vh" }}>
                  <FormLabel component="label">설정</FormLabel>
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
                              selectedRowData.value[idx] === selectedRowData[settingsKey] ||
                              (this.state.selectedRowId === selectedRowData.id &&
                                optionValue === selectedRowData[settingsKey])
                            }
                            onChange={(e) => this.handleRadioChange(e, settingsKey)}
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
        </Grid >
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