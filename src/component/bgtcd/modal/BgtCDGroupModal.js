import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
class BgtCDGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    /* 기본 기능 */
    handleUp = () => {
        this.setState({ open: true });
    }
    handleDown = () => {
        this.setState({ open: false });
    }
    /* 기본 기능 end */


    render() {
        const { open } = this.state;
        return (
            //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
            <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
                <DialogTitle
                    sx={{
                        backgroundColor: "#7895CB",
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 60,
                    }}
                >
                    {this.props.DialogTitle}
                    <IconButton
                        size="small"
                        onClick={() =>
                            this.setState({ open: false })
                        }>
                        <CloseIcon fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>{this.props.DialogContentComponent}</DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "#4A55A2",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#4A55A2",
                            },
                        }}
                        onClick={() => {
                            this.handleDown();
                            this.props.clickDialogConfirmButton();
                        }}
                    >확인</Button>
                    <Button variant="outlined"
                        onClick={this.handleDown}
                    >취소</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default BgtCDGroupModal;