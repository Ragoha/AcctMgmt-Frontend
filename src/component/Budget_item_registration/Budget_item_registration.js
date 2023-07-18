import { Box, Button, Container, Grid } from "@mui/material";
import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Budget_DataGrid from "./Budget_DataGrid";
import Detail_Info from "./Detail_Info";
import UserService from "../../service/UserService";
import FullFeaturedCrudGrid from "./BudgetComponent";
import BudgetComponent from "./BudgetComponent";
import BudgetRegService from "../../service/BudgetRegService";


class Budget_item_registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows :[],
            groupcd : 'GROUP1'
        }
    }
    componentDidMount() {
    }

    getDataGridRows(groupcd) {
        BudgetRegService.getGridData(groupcd)
            .then(rows => {
                console.log('통신성공')
                console.dir(rows) //데이터 받았음 .
                this.setState({ rows });
                //setState를 통해서 rows 값은 정의하고 , 상세정보 창에 띄울 데이터를 정의?하는 작업이  필요함.

            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    
    //onClick={this.getDataGridRows}
    render() {
        const {rows,groupcd} = this.state;
        return (
            <Container style={{ border: '2px solid black' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box>
                            <Button variant="outlined" size="medium" onClick={() => this.getDataGridRows(groupcd)} >Group_cd를 기반으로 데이터를 가져오는 로직</Button>
                            <Button variant="outlined" size="medium" >예산과목등록</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Budget_DataGrid rows={rows}/>
                        {/*<BudgetComponent/>*/}
                    </Grid>
                    <Grid item xs={5} border={3}>
                        <Detail_Info/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
export default Budget_item_registration;