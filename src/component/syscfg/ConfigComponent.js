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
import { CustomHeaderGridContainer, CustomHeaderInputLabel } from '../common/style/CommonStyle';

class ConfigComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coCd: '',
            coNm: '',
            data: [
                {
                    options: ["1.부서예산", "2.프로젝트예산"],
                    value: ['1', '2'],
                },
                {
                    options: ["0.미사용", "1.사용"],
                    value: ['0', '1'],
                },
                {
                    options: [
                        "1.일별",
                        "2.월별",
                        "3.연도별(프로젝트별)",
                        "4.연도별(사업장별)",
                    ],
                    value: ['1', '2', '3', '4'],
                },
                {
                    options: [
                        "1.이월안함",
                        "2.사고+명시+계속비",
                        "3.사고이월",
                        "4.명시+계속비",
                    ],
                    value: ['1', '2', '3', '4'],
                },
                {
                    options: ["0.미사용", "1.사용"],
                    value: ['0', '1'],
                },
                // ... 나머지 데이터 설정 ...
            ],
            selectedValue: "", // 선택한 라디오 버튼의 값 저장
            selectedRowId: null, // 선택한 행의 ID 저장
            selectedTab: "common", // 선택한 탭 저장 (common 또는 decision)
        };
    }

    // 테이블의 행 클릭 시 실행되는 함수
    // handleRowClick = (rowData) => {
    //     this.setState({
    //         // selectedValue: rowData.commonSettingValue,
    //         selectedValue: rowData.value,
    //         selectedRowId: rowData.id,
    //     });
    //     const option = rowData.id;
    //     console.log(option);
    // };
    handleRowClick = (rowData, settingsKey) => {
        this.setState({
            selectedValue: rowData[settingsKey],
            selectedRowId: rowData.id,
        });
        const option = rowData.id;
        console.log(option);
    };


    handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        this.setState((prevState) => {
            const selectedData = prevState.data.find(
                (row) => row.id === prevState.selectedRowId
            );

            if (selectedData) {
                const optionsIndex = selectedData.value.indexOf(selectedValue);
                const commonSettingValue = selectedData.options[optionsIndex];
                
                const newData = {
                    id: selectedData.id,
                    option: selectedData.option,
                    commonSettingValue: commonSettingValue,
                };
                this.props.setConfig(newData); //환경설정 초기데이터 리덕스 저장
                return {
                    data: prevState.data.map((row) =>
                        row.id === prevState.selectedRowId ? { ...row, commonSettingValue } : row
                    ),
                };
            }
            
        });
        console.log(selectedValue);
        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        const option = this.state.selectedRowId;
        // const configData  = this.props;
        const userInfo = this.props.userInfo;
        const { coCd } = userInfo;
        const settingvalue = this.props.configData.commonSettingValue;
        
        console.log("잘 찍히는게 맞는걸까??",settingvalue);
        axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + option + '/' + selectedValue + '/' + settingvalue + '/' +coCd, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // 성공적으로 응답을 받은 경우 처리할 작업
                // console.log(response.data);
                // this.props.setConfig(response.data);
                const { configData } = this.props;
                console.log("변경된 데이타:::" , configData);
            })
            .catch((error) => {
                // 에러가 발생한 경우 처리할 작업
                console.error(error);
            });
    };

    // 탭 변경 시 실행되는 함수
    handleTabChange = (newValue) => {
        this.setState({ selectedTab: newValue });
    };

    componentDidMount() {
        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        const accessToken = this.props.accessToken; // Redux Store에서 토큰 가져오기
        const userInfo = this.props.userInfo;
        const { coCd, empId, empEmail } = userInfo;
        const { configData } = this.props;
        console.log('Config 리덕스의 데이터:', configData);

        console.log("엑세스 토큰 : " + accessToken);
        console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);

        this.setState({ coCd: coCd });
        axios.get(ACCTMGMT_API_BASE_URL + '/info', { //로그인한 유저 확인하는 경로
            headers: {
                // Authorization: `Bearer ${accessToken}`, 
                // Authorization: accessToken, 
                "access-token": accessToken,
            },
            withCredentials: true, // 필요한 경우 withCredentials 옵션 사용
        })
            .then((response) => {
                // 요청 성공 시 처리할 작업
                console.log('인증된 사용자 : ', (response.data));
                axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + coCd, {}, { //회사코드로 회사이름 찾는 경로
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        // 요청 성공 시 처리할 작업
                        console.log('회사이름 : ', (response.data));
                        this.setState({ coNm: response.data });
                    })
                    .catch((error) => {
                        // 요청 실패 시 처리할 작업
                        console.error(error);
                    })
                axios.get(ACCTMGMT_API_BASE_URL + '/api/configdate/' + coCd)
                    .then((response) => {
                        console.log('Config Data: ', response.data);
                        // 받아온 데이터를 가공하여 userData 객체에 설정
                        const { data } = response;
                        const userData = {
                            id: data.map((sys) => sys.sysCd),
                            option: data.map((sys) => sys.sysNm), // sysNm을 option으로 설정
                            budgetManagement: data.map((sys) => sys.cfgvalue), // sysYn을 budgetManagement로 설정
                        };
                        // data 배열을 userData 객체의 값으로 설정하여 업데이트
                        this.setState((prevState) => ({
                            data: prevState.data.map((row, index) => ({
                                ...row,
                                id: userData.id[index], // id 값 설정
                                option: userData.option[index], // option 값 설정
                                commonSettingValue: userData.budgetManagement[index], // commonSettingValue 값 설정
                            })),
                            ...userData, // userData의 다른 값들도 setState로 업데이트
                        }));
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
            .catch((error) => {
                // 요청 실패 시 처리할 작업
                console.error(error);
            });
    }
    render() {
        const { selectedTab, coNm, data, selectedRowId } = this.state;

        // console.log('aeeee', coCd);
        const settingsKey ='commonSettingValue';
        console.log("셋팅 키 값 : "+ settingsKey);
        const selectedRowData = data.find((row) => row.id === selectedRowId);

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

            <Grid container spacing={2}>
              <Grid item xs={12} sx={{mt:3}}> 
                {/* <TextField aria-readonly placeholder={coNm} disabled ></TextField> */}
                <TextField
                  value={coNm}
                  disabled
                  InputProps={{
                    style: {
                      width:'200px',
                      height:'29px',
                      color: "", // 원하는 색상으로 변경
                      fontSize: "15px", // 원하는 글꼴 크기로 변경
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Tabs value={selectedTab} onChange={this.handleTabChange}>
                  <Tab label="공통설정" value="common" />
                </Tabs>
              </Grid>
              <Grid item xs={8}>
                <TableContainer component={Paper}>
                  <Table style={{ border: "1px solid #ccc" }}>
                    <TableHead sx={{ bgcolor: "beige" }}>
                      <TableRow>
                        <TableCell
                          style={{ border: "1px solid #ccc", width: "19vh" }}
                        >
                          옵션명(option)
                        </TableCell>
                        <TableCell
                          style={{ border: "1px solid #ccc", width: "10vh" }}
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
                  <Paper style={{ padding: 10 }}>
                    <FormControl component="fieldset" sx={{ width: "30vh" }}>
                      <FormLabel component="label">설정</FormLabel>
                      <RadioGroup
                        name={`radio-group-${selectedRowData.id}`}
                        value={selectedRowData[settingsKey]}
                        // onChange={this.handleRadioChange}
                        onChange={(e) => this.handleRadioChange(e)}
                      >
                        {selectedRowData.options.map(
                          (optionValue, idx, options) => (
                            <FormControlLabel
                              key={optionValue}
                              // value={optionValue}
                              value={selectedRowData.value[idx]}
                              // value = {options[idx]}
                              // control={<Radio />}
                              control={<Radio />}
                              // label={`${idx + 1}.${optionValue}`} // 라벨을 순서와 함께 표시
                              label={optionValue}
                            />
                          )
                        )}
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