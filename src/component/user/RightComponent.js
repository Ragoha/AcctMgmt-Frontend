import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

class RightComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // RightComponent에서 입력한 값들을 state로 관리
            projectCode: '',
            projectName: '',
            projectPeriod: '',
        };
    }

    componentDidUpdate(prevProps) {
        const { selectedCard } = this.props;
        // 새로운 카드를 눌렀을 때 텍스트 필드에 해당 카드의 값이 나오도록 설정
        if (prevProps.selectedCard !== selectedCard) {
            if (selectedCard) {
                this.setState({
                    projectCode: selectedCard.projectCode,
                    projectName: selectedCard.projectName,
                    projectPeriod: selectedCard.projectPeriod,
                });
            } else {
                // 선택한 카드가 없을 때 빈값으로 상태 초기화
                this.setState({
                    projectCode: '',
                    projectName: '',
                    projectPeriod: '',
                });
            }
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSaveButtonClick = () => {
        const { projectCode, projectName, projectPeriod } = this.state;
        // onSaveButtonClick을 통해 선택한 카드에 입력된 정보를 카드리스트에 적용하는 함수 호출
        this.props.onSaveButtonClick({
            ...this.props.selectedCard,
            projectCode,
            projectName,
            projectPeriod,
        });
    };

    render() {
        const { projectCode, projectName, projectPeriod } = this.state;
        const { selectedCard } = this.props;

        // 새로운 카드를 눌렀을 때, 우측 텍스트 필드를 빈 값으로 초기화합니다.
        if (!selectedCard) {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            name="projectCode"
                            value={projectCode}
                            onChange={this.handleInputChange}
                            label="프로젝트 코드"
                            size="small"
                            style={{ fontSize: '12px', width: '40%' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="projectName"
                            value={projectName}
                            onChange={this.handleInputChange}
                            label="프로젝트 명"
                            size="small"
                            multiline
                            style={{ fontSize: '10px', width: '40%' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="projectPeriod"
                            value={projectPeriod}
                            onChange={this.handleInputChange}
                            label="프로젝트 기간"
                            size="small"
                            style={{ fontSize: '10px', width: '40%' }}
                        />
                    </Grid>
                </Grid>
            );
        }

        // 선택한 카드가 있을 때에만 데이터 입력 텍스트 필드들을 보여줍니다.
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        name="projectCode"
                        value={projectCode}
                        onChange={this.handleInputChange}
                        label="프로젝트 코드"
                        size="small"
                        style={{ fontSize: '12px', width: '40%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="projectName"
                        value={projectName}
                        onChange={this.handleInputChange}
                        label="프로젝트 명"
                        size="small"
                        multiline
                        style={{ fontSize: '10px', width: '40%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="projectPeriod"
                        value={projectPeriod}
                        onChange={this.handleInputChange}
                        label="프로젝트 기간"
                        size="small"
                        style={{ fontSize: '10px', width: '40%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.handleSaveButtonClick}>
                        저장
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default RightComponent;
