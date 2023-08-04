// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   Autocomplete,
//   Button,
//   Checkbox,
//   Dialog,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputAdornment,
//   TextField
// } from "@mui/material";
// import { randomId } from "@mui/x-data-grid-generator";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import React, { Component, createRef } from "react";
// import { connect } from "react-redux";
// import BgtICFService from "../../../../service/BgtICFService";
// import { CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomLargeButtonGridContainer, CustomLargeDataGridContainer, CustomLargeFormGridContainer, CustomSearchButton } from "../../../common/style/CommonDialogStyle";
// import BgtGrDialogComponent from "./dialog/BgtGrDialogComponent";
// import { CustomDataGrid, CustomInputLabel, CustomTextField } from "../../../common/style/CommonStyle";

// const columns = [
//   {
//     field: "gisu",
//     headerName: "기수",
//     width: 50,
//     headerAlign: "center",
//     align: "center",
//   },
//   {
//     field: "bgtGrNm",
//     headerName: "예산그룹",
//     width: 180,
//     headerAlign: "center",
//   },
//   {
//     field: "bgtCd",
//     headerName: "예산과목코드",
//     width: 180,
//     headerAlign: "center",
//   },
//   {
//     field: "bgtNm",
//     headerName: "예산과목명",
//     width: 180,
//     headerAlign: "center",
//   },
//   {
//     field: "bgtData",
//     headerName: "상위예산과목",
//     width: 300,
//     headerAlign: "center",
//   },
// ];

// class BgtCDSubReg extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       bgtGr: { Cd: "", Nm: "" },
//       selectedRow: { bgtCDCd: "", bgtCDNm: "" },
//       bgtGrCd: "",
//       bgtCDRows: [],
//       gisu: "모든예산과목",
//       keyword: "",
//       columns: columns,
//       rangeState: true,
//       rangeTextField: dayjs(new Date()).format("YYYY-MM-DD"),
//       bgtCDMarkTextField: "",
//       bgtGrTextField: "",
//       keywordTextField: "",
//     };

//     this.childBgtGrRef = createRef();
//   }

//   initBgtCDDialog = () => {
//     this.setState({ keyword: "", rangeState: true });

//     this.handleUp();
//   }

//   handleUp = () => {
//     this.setState({ open: true });
//   };

//   handleDown = () => {
//     this.setState({ open: false });
//   };

//   handleClickRow = (params) => {
//     this.setState({ bgtCd: params.row.bgtCd, bgtNm: params.row.bgtNm });
//   };

//   handleInputChange = async (e) => {
//     const { name, value } = e.target;
//     await this.setState({ [name]: value });
//     console.log("test");
//   };

//   handleSearchBgtGr = () => {
//     BgtICFService.findBgtGrCdAndBgtGrNmByKeyword(this.state.keyword).then(
//       async (response) => {
//         const bgtCDRows = response.map((row) => ({
//           id: row.bgtGrCd,
//           bgtGrCd: row.bgtGrCd,
//           bgtGrNm: row.bgtGrNm,
//         }));
//         await this.setState({ bgtCDRows: bgtCDRows });
//         console.log(this.state);
//       }
//     );
//   };

//   handleClickConfirm = () => {
//     this.props.handleSetBgtCDTextField({
//       bgtCd: this.state.bgtCd,
//       bgtNm: this.state.bgtNm,
//     });

//     this.handleDown();
//   };

//   handleClickBgtGrSearchIcon = () => {
//     // console.dir(this.childBgtGrRef);
//     this.childBgtGrRef.current.handleInitBgtGrDialog();
//     // this.childBgtGrRef.current.handleUp();
//   };

//   handleSetBgtCDTextField = (response) => {
//     this.setState({
//       bgtGrTextField: response.bgtGrCd + ". " + response.bgtGrNm,
//       bgtGrCd: response.bgtGrCd,
//     });
//   };

//   handleClickSearchIcon = () => {
//     let tmpRange = "";

//     if (this.state.rangeState) {
//       tmpRange = this.state.rangeTextField;
//     } else {
//       tmpRange = dayjs("1900-01-01").format("YYYY-MM-DD");
//     }

//     BgtICFService.findBgcCDByGisuAndGroupCdAndToDtAndKeyword({
//       gisu: this.state.gisu,
//       bgtGrCd: this.state.bgtGrCd,
//       keyword: this.state.keyword,
//       range: tmpRange,
//       accessToken: this.props.accessToken,
//       user: this.props.user,
//     }).then((response) => {
//       const bgtCDRows = response.map((row) => ({
//         id: randomId(),
//         gisu: row.gisu,
//         bgtGrNm: row.bgtGrNm,
//         bgtCd: row.bgtCd,
//         bgtNm: row.bgtNm,
//       }));
//       this.setState({ bgtCDRows: bgtCDRows });

//       console.log(this.state);
//     });
//   };

//   toggleRangeState = () => {
//     this.setState((prevState) => ({
//       rangeState: !prevState.rangeState,
//     }));
//   };

//   handleChangeDatePicker = async (newValue) => {
//     await this.setState({
//       rangeTextField: dayjs(newValue).format("YYYY-MM-DD"),
//     });
//     console.log(this.state);
//   };

//   render() {
//     const {
//       open,
//       bgtGrCd,
//       columns,
//       rangeState,
//       bgtCDMarkTextField,
//       bgtGrTextField,
//       keywordTextField,
//       rangeTextField,
//     } = this.state;

//     return (
//       <>
//         <Dialog
//           open={open}
//           PaperProps={{ sx: { maxWidth: 1200, width: 1200, height: 840 } }}
//         >
//           <CustomDialogTitle>
//             예산과목검색
//             <IconButton size="small" onClick={this.handleDown}>
//               <CloseIcon sx={{ color: "white" }} />
//             </IconButton>
//           </CustomDialogTitle>
//           <CustomDialogContent>
//             <CustomLargeFormGridContainer container direction="row" spacing={2}>
//               <Grid item xs={4}>
//                 <Grid
//                   container
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <CustomInputLabel>과목표시</CustomInputLabel>
//                   <Autocomplete
//                     name="gisu"
//                     size="small"
//                     sx={{ width: 255 }}
//                     value={this.state.gisu}
//                     options={["모든예산과목", "당기승인예산"]}
//                     disabled={true}
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </Grid>
//               </Grid>
//               <Grid item xs={4}>
//                 <Grid
//                   container
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <CustomInputLabel>예산그룹</CustomInputLabel>
//                   <CustomTextField
//                     name="bgtGrTextField"
//                     value={bgtGrTextField}
//                     onChange={this.handleInputChange}
//                     variant="outlined"
//                     onKeyDown={this.handlePressEnter}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <SearchIcon
//                             onClick={this.handleClickBgtGrSearchIcon}
//                           />
//                         </InputAdornment>
//                       ),
//                     }}
//                   ></CustomTextField>
//                 </Grid>
//               </Grid>
//               <Grid item xs={4}>
//                 <Grid
//                   container
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <CustomInputLabel>검색어</CustomInputLabel>
//                   <CustomTextField
//                     name="keyword"
//                     value={this.state.keyword}
//                     onChange={this.handleInputChange}
//                     variant="outlined"
//                     onKeyDown={this.handlePressEnter}
//                   />
//                   <CustomSearchButton
//                     variant="outlined"
//                     sx={{ right: "-11px" }}
//                   >
//                     <SearchIcon onClick={this.handleClickSearchIcon} />
//                   </CustomSearchButton>
//                 </Grid>
//               </Grid>
//               <Grid item>
//                 <Grid
//                   container
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                   sx={{ pl: "66px" }}
//                 >
//                   <CustomInputLabel>범위</CustomInputLabel>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={rangeState}
//                         sx={{ mr: "-10px" }}
//                         onClick={this.toggleRangeState}
//                       />
//                     }
//                     label="기준일"
//                     sx={{ mr: "8px" }}
//                   />
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       name="rangeTextField"
//                       disabled={!rangeState}
//                       format="YYYY-MM-DD"
//                       value={dayjs(rangeTextField)}
//                       onChange={this.handleChangeDatePicker}
//                       slotProps={{
//                         textField: {
//                           size: "small",
//                           sx: { width: "166px", mr: "8px" },
//                           inputProps: {
//                             sx: { height: "auto" },
//                           },
//                         },
//                       }}
//                     />
//                   </LocalizationProvider>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={!rangeState}
//                         sx={{ mr: "-10px" }}
//                         onClick={this.toggleRangeState}
//                       />
//                     }
//                     label="전체"
//                   />
//                 </Grid>
//               </Grid>
//             </CustomLargeFormGridContainer>
//             <CustomLargeDataGridContainer container>
//               <CustomDataGrid
//                 checkboxSelection
//                 columns={columns}
//                 rows={this.state.bgtCDRows}
//                 showColumnVerticalBorder={true}
//                 showCellVerticalBorder={true}
//                 onRowClick={this.handleClickRow}
//                 hideFooter
//                 sx={{ borderTop: "3px solid black" }}
//               />
//             </CustomLargeDataGridContainer>
//           </CustomDialogContent>
//           <CustomDialogActions>
//             <CustomLargeButtonGridContainer
//               container
//               justifyContent="flex-end"
//               sx={{ maxWidth: "1168px", ml: 2, mr: 2, mb: 2 }}
//             >
//               <CustomConfirmButton
//                 variant="outlined"
//                 onClick={this.handleClickConfirm}
//               >
//                 확인
//               </CustomConfirmButton>
//               <Button variant="outlined" onClick={this.handleDown}>
//                 취소
//               </Button>
//             </CustomLargeButtonGridContainer>
//           </CustomDialogActions>
//         </Dialog>
//         <BgtGrDialogComponent
//           ref={this.childBgtGrRef}
//           handleSetBgtCDTextField={this.handleSetBgtCDTextField}
//         />
//       </>
//     );
//   }
// }

// export default BgtCDSubReg;

