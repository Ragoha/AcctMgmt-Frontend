import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid,
    Tabs,
    Tab,
    TextField,
    InputLabel,
    colors,
} from '@mui/material';

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
    handleRowClick = (rowData) => {
        this.setState({
            selectedValue: rowData.commonSettingValue,
            // selectedValue: rowData.value,
            selectedRowId: rowData.id,
        });
        const option = rowData.id;
        console.log(option);
    };

    // 라디오 버튼 선택 시 실행되는 함수
    handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        this.setState((prevState) => ({
            data: prevState.data.map((row) =>
                row.id === prevState.selectedRowId
                    ? { ...row, commonSettingValue: selectedValue }
                    : row
            ),
            selectedValue,
        }));
        console.log(selectedValue);

        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        const option = this.state.selectedRowId;
        const userInfo = this.props.userInfo;
        const { coCd } = userInfo;

        axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + option + '/' + selectedValue + '/' + coCd, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // 성공적으로 응답을 받은 경우 처리할 작업
                // console.log(response.data);
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
        console.log("엑세스 토큰 : " + accessToken);
        console.log("로그인 유저 데이터: " + coCd + "/" + empId + "/" + empEmail);
        this.setState({ coCd: coCd });
        axios.get(ACCTMGMT_API_BASE_URL + '/info', {
            headers: {
                // Authorization: `Bearer ${accessToken}`, 
                // Authorization: accessToken, 
                "access-token": accessToken,
            },
            withCredentials: true, // 필요한 경우 withCredentials 옵션 사용
        })
            .then((response) => {
                // 요청 성공 시 처리할 작업
                console.log('hihi : ', (response.data));
                axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + coCd, {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        // 요청 성공 시 처리할 작업
                        console.log('hihi : ', (response.data));
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
                            budgetManagement: data.map((sys) => sys.sysYn), // sysYn을 budgetManagement로 설정
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
        const { selectedTab, coCd, coNm, data, selectedRowId } = this.state;

        // console.log('aeeee', coCd);
        const settingsKey =
            selectedTab === 'common' ? 'commonSettingValue' : 'decisionSettingValue';

        const selectedRowData = data.find((row) => row.id === selectedRowId);

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <TextField aria-readonly placeholder={coNm} disabled ></TextField> */}
                    <TextField
                        value={coNm}
                        disabled
                        variant="standard"
                        InputProps={{
                            style: {
                                color: "",      // 원하는 색상으로 변경
                                fontSize: '95px',  // 원하는 글꼴 크기로 변경
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
                            <TableHead sx={{ bgcolor: 'beige' }}>
                                <TableRow>
                                    <TableCell style={{ border: "1px solid #ccc", width: "19vh" }}>
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
                            <FormControl component="fieldset" sx={{ width: '30vh' }}>
                                <FormLabel component="label" >
                                    설정
                                </FormLabel>
                                <RadioGroup
                                    name={`radio-group-${selectedRowData.id}`}
                                    value={selectedRowData[settingsKey]}
                                    onChange={this.handleRadioChange}
                                >
                                    {selectedRowData.options.map((optionValue, idx) => (
                                        <FormControlLabel
                                            key={optionValue}
                                            // value={optionValue}
                                            value={selectedRowData.value[idx]}
                                            control={<Radio />}
                                            // label={`${idx + 1}.${optionValue}`} // 라벨을 순서와 함께 표시
                                            label={optionValue}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps)(ConfigComponent);
