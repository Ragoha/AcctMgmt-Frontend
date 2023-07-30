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
} from '@mui/material';

class ConfigComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coCd: '',
            coNm: '',
            data: [
                {
                    id: 1,
                    option: "예산관리구분",
                    commonSettingValue: "1.부서예산",
                    options: ["1.부서예산", "2.프로젝트예산"],
                    value: ['1', '2'],
                },
                {
                    id: 2,
                    option: "품의서 사용여부",
                    commonSettingValue: "0.미사용",
                    options: ["0.미사용", "1.사용"],
                    value: ['0', '1'],
                },
                {
                    id: 3,
                    option: "승인번호부여",
                    commonSettingValue: "1.일별",
                    options: [
                        "1.일별",
                        "2.월별",
                        "3.연도별(프로젝트별)",
                        "4.연도별(사업장별)",
                    ],
                    value: ['1', '2', '3', '4'],
                },
                {
                    id: 4,
                    option: "이월대상구분",
                    commonSettingValue: "1.이월안함",
                    options: [
                        "1.이월안함",
                        "2.사고+명시+계속비",
                        "3.사고이월",
                        "4.명시+계속비",
                    ],
                    value: ['1', '2', '3', '4'],
                },
                {
                    id: 5,
                    option: "프로젝트/부서별 하위사업 관리여부",
                    commonSettingValue: "1.사용",
                    options: ["0.미사용", "1.사용"],
                    value: ['0', '1'],
                },
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
            selectedRowId: rowData.id,
        });
        const option = rowData.id;
        console.log(option);
    };


    // 라디오 버튼 선택 시 실행되는 함수
    handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        const selectedLabel = e.target.labels[0].textContent;
        this.setState((prevState) => ({
            data: prevState.data.map((row) =>
                row.id === prevState.selectedRowId
                    ? { ...row, commonSettingValue: selectedLabel }
                    : row
            ),
            selectedValue,
        }));
        console.log(selectedValue);

        const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
        const option = this.state.selectedRowId;
        const userInfo = this.props.userInfo;
        const { coCd } = userInfo;

        axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + option + '/' + selectedValue + '/' + coCd, { withCredentials: true })

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
                axios.post(ACCTMGMT_API_BASE_URL + '/api/config/' + coCd, { withCredentials: true })
                    .then((response) => {
                        // 요청 성공 시 처리할 작업
                        console.log('hihi : ', (response.data));
                        this.setState({ coNm: response.data });
                    })
                    .catch((error) => {
                        // 요청 실패 시 처리할 작업
                        console.error(error);
                    })
            })
            .catch((error) => {
                // 요청 실패 시 처리할 작업
                console.error(error);
            });
    }
    render() {
        const { selectedTab, coCd, coNm } = this.state;

        console.log('aeeee', coCd);
        const settingsKey =
            selectedTab === 'common' ? 'commonSettingValue' : 'decisionSettingValue';

        const selectedRowData = this.state.data.find((row) => row.id === this.state.selectedRowId);

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel>회사</InputLabel>{" "}
                    <TextField aria-readonly label={coNm} disabled></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Tabs value={selectedTab} onChange={this.handleTabChange}>
                        <Tab label="Common Settings" value="common" />
                    </Tabs>
                </Grid>
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table style={{ border: "1px solid #ccc" }}>
                            <TableHead sx={{ bgcolor: 'beige' }}>
                                <TableRow>
                                    <TableCell style={{ border: "1px solid #ccc" }}>
                                        옵션명(option)
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "1px solid #ccc", width: "20vh" }}
                                    >
                                        설정값(SettingValue)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        onClick={() => this.handleRowClick(row)}
                                        style={{
                                            backgroundColor:
                                                row.id === this.state.selectedRowId
                                                    ? "#e8f0fe"
                                                    : "white",
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
                <Grid item xs={4}>
                    <Paper style={{ padding: 10 }}>
                        <FormControl component="fieldset" sx={{ width: '30vh' }}>
                            <FormLabel component="legend" >
                                설정
                            </FormLabel>
                            <RadioGroup
                                name="settingValue"
                                value={this.state.selectedValue}
                                onChange={this.handleRadioChange}
                            >
                                {selectedRowData?.options.map((option, idx) => (
                                    <FormControlLabel
                                        key={option}
                                        value={selectedRowData.value[idx]}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

// const mapStateToProps = (state) => ({
//     accessToken: state.authToken.accessToken,
//   });  

// export default connect(mapStateToProps, { SET_TOKEN })(ConfigComponent);
const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
    userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps)(ConfigComponent);
