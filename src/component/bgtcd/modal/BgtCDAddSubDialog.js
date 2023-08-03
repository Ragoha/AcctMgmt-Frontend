
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputLabel, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Component } from "react";
import {
    CustomButtonGridContainer,
    CustomCloseIcon,
    CustomConfirmButton,
    CustomDataGridContainer,
    CustomDialogActions,
    CustomDialogContent,
    CustomDialogTitle,
    CustomLargeFormGridContainer,
    CustomSearchButton,
    CustomShortFormGridContainer
} from "../../common/style/CommonDialogStyle";
import { CustomDataGrid, CustomInputLabel, CustomTextField } from "../../common/style/CommonStyle";
import { DataGrid } from "@mui/x-data-grid";
class BgtCDADDSubDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            columns : [
                {field:"groupcd" , headerName:"그룹코드",width:220, headerAlign:"center", editable:true},
                {field:"groupName" , headerName:"그룹명",width:220, headerAlign:"center",editable:true},
            ],
            rows:[
                { id: 1, groupcd: 'Snow', groupName: 'Jon' },
                { id: 2, groupcd: 'Snow', groupName: 'Jon' },
                { id: 3, groupcd: 'Snow', groupName: 'Jon' },
            
            ]
        };
    }

    handleUp = () => {
        this.setState({ open: true });
    };

    handleDown = () => {
        this.setState({ open: false });
    };

    render() {
        const { open ,columns,rows} = this.state;

        return (
            <Dialog
                open={open}
                PaperProps={{ sx: { width: 500, height: 600 } }}>
                <CustomDialogTitle>
                    예산과목등록
                    <IconButton size="small" onClick={this.handleDown}>
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                </CustomDialogTitle>
                <CustomDialogContent >
                    <CustomShortFormGridContainer container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Button>
                                삭제
                            </Button>

                        </Grid>
                        <Grid item xs={12}>
                            <CustomDataGrid
                                sx={{borderTop: "3px solid black"}}
                                columns={columns}
                                rows={rows}
                                showColumnVerticalBorder={true}
                                showCellVerticalBorder={true} // 각 셀마다 영역주기
                                editMode='row'
                                hideFooter
                            />

                        </Grid>
                    </CustomShortFormGridContainer>
                </CustomDialogContent>

            </Dialog>
        );
    }
}

export default BgtCDADDSubDialog;

