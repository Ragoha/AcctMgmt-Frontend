import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    CustomButtonGridContainer,
    CustomCloseIcon,
    CustomConfirmButton,
    CustomDialogActions,
    CustomDialogContent,
    CustomDialogTitle,
    CustomShortDataGridContainer,
    CustomShortDialog,
} from "../../common/style/CommonDialogStyle";
import PgrService from "../../../service/PgrService";
import { randomId } from "@mui/x-data-grid-generator";
import CustomSwal from "../../common/CustomSwal";

class PgrInsertDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedRow: { coCd: "", pgrCd: "", pgrNm: "" }, //클릭된 열의 cd와 이름
            pgrRows: [],
            data: {
                columns: [
                    {
                        field: "coCd",
                        headerName: "",
                        editable: false,
                        width: 90,
                        headerAlign: "center",
                        align: "center",
                    },
                    {
                        field: "pgrCd",
                        headerName: "코드",
                        editable: true,
                        width: 188.2,
                        headerAlign: "center",
                        align: "center",
                    },
                    {
                        field: "pgrNm",
                        headerName: "분류명",
                        editable: true,
                        width: 188.2,
                        headerAlign: "center",
                        align: "center",
                    },
                ],
                rows: [{ id: 1, coCd: "", pgrCd: "", pgrNm: "" }],
            },
        };
    }

    handleUp = () => {
        this.setState({ open: true });
        this.initPgr();
    };

    handleDown = () => {
        this.setState({ open: false });
        // this.props.setcoCdInfo(this.state.selectedRow);
    };

    initPgr = () => {
        const userInfo = this.props.userInfo;
        const { coCd } = userInfo;
        PgrService.findpgrByCoCd({
            accessToken: this.props.accessToken,
            coCd: coCd,
        }).then((response) => {
            const pgrRows = response.map((row) => ({
                id: randomId(),
                coCd: row.coCd,
                pgrCd: row.pgrCd,
                pgrNm: row.pgrNm,
            }));
            pgrRows.push({
                id: randomId(),
                coCd: coCd,
                pgrCd: "",
                pgrNm: "",
                isNew: true,
            });
            this.setState({ pgrRows: pgrRows });
        });
    };

    insertPgr = (data) => {
        PgrService.insertPgr({
            accessToken: this.props.accessToken,
            coCd: this.props.coCd,
            pgr: data,
        }).then(() => {
            this.initPgr();
        });
    }

    handleClickDelete = (data) => {
        console.log(this.state.selectedRow.gisu);
        CustomSwal.showCommonSwalYn("삭제", "삭제하시겠습니까?", "info", "확인", (confirmed) => {
            if (confirmed) {
                PgrService.deletePgr({
                    accessToken: this.props.accessToken,
                    coCd: this.state.selectedRow.coCd,
                    pgrCd: this.state.selectedRow.pgrCd,
                }).then(() => {
                    CustomSwal.showCommonToast("success", "삭제되었습니다.");
                    this.initPgr();
                });
            }
        })
    };

    handleClickConfirm = () => {
        this.handleDown();
    };

    handleClickRow = (params) => {
        this.setState({ selectedRow: params.row }, () => {
            console.log(this.state.selectedRow);
        });
    };

    // processRowUpdate = (newRow) => {
    //     if (newRow.isNew) {
    //         if (newRow.PgrCd !== "" && newRow.PgrNm !== "") {
    //             console.log("저장");
    //             this.insertPgr(newRow);
    //         }
    //         return newRow;
    //     } else {
    //         console.log(newRow);
    //         console.log(this.state.selectedRow);
    //         const updatedRow = { ...newRow, isNew: false };
    //         this.updatePgr(updatedRow);
    //         return updatedRow;
    //     }
    // };
    processRowUpdate = (newRow) => {
        console.log("영차",newRow);

        if (newRow.isNew) {
            if (newRow.pgrCd !== "" && newRow.pgrNm !== "") {
                console.log("저장");
                this.insertPgr(newRow);
            }
            this.setState({ selectedRow: newRow });

            return newRow;
        } else {
            console.log(newRow);
            console.log(this.state.selectedRow);
            const updatedRow = { ...newRow, isNew: false };

            CustomSwal.showCommonToast("warning", "그룹은 수정이 불가능합니다.");
            return this.state.selectedRow;
        }
    };

    render() {
        const { open, data, pgrRows } = this.state;

        return (
            <CustomShortDialog
                open={open}
                PaperProps={{ sx: { width: 500, height: 600 } }}
            >
                <CustomDialogTitle sx={{ fontWeight: "bold" }}>
                    프로젝트그룹등록
                    <IconButton
                        size="small"
                        sx={{ ml: 33 }}
                        onClick={() => this.setState({ open: false })}
                    >
                        <CustomCloseIcon />
                    </IconButton>
                </CustomDialogTitle>
                <CustomDialogContent>
                    <Grid container direction="column" alignItems="flex-end">
                        <Button
                            sx={{ mt: 1, mb: 1, mr: 2 }}
                            variant="outlined"
                            onClick={this.handleClickDelete}
                        >
                            삭 제
                        </Button>
                    </Grid>

                    <Grid style={{ height: 413, width: "100%" }}>
                        <CustomShortDataGridContainer container>
                            <DataGrid
                                sx={{ borderTop: "2px solid #000" }}
                                rows={pgrRows}
                                columns={data.columns.map((col) => {
                                    if (col.field === "pgrCd" || col.field === "pgrNm") {
                                        return {
                                            ...col,
                                        };
                                    }
                                    return col;
                                })}
                                showColumnVerticalBorder={true}
                                showCellVerticalBorder={true}
                                processRowUpdate={this.processRowUpdate}
                                onRowClick={this.handleClickRow}
                                hideFooter
                            />
                        </CustomShortDataGridContainer>
                    </Grid>
                </CustomDialogContent>
                <CustomDialogActions>
                    <CustomButtonGridContainer container justifyContent="flex-end">
                        <CustomConfirmButton
                            variant="outlined"
                            onClick={this.handleDown}>
                            확 인
                        </CustomConfirmButton>

                        <Button
                            variant="outlined"
                            onClick={() => this.setState({ open: false })}
                        >
                            취 소
                        </Button>
                    </CustomButtonGridContainer>
                </CustomDialogActions>
            </CustomShortDialog>
        );
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.auth && state.auth.accessToken,
    userInfo: state.user || {},
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(
    PgrInsertDialogComponent
);
