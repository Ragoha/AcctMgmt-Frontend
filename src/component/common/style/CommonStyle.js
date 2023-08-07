import { Autocomplete, Button, Grid, InputLabel, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "styled-components";

//[230806] seunghong's BGTCD CustomBotton 
/* ******** [230806]  if you never use, plz insert this code in  commentline**********     */
export const CustomBtnBgtcd = styled(Button)(({theme}) =>({
  boxShadow: 'none',
  fontWeight: "bold",
  width:'120px',
  fontSize: 15,
  padding: '3px 3px',
  border: '2px solid',
  backgroundColor: '#FFFFFF',
  color: '#1976D2', // 기본 글씨 색을 '#1976D2'로 설정
  borderColor: '#0062cc',
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out', // 배경색과 글씨 색 변경 애니메이션
  
  '&:hover': {
    backgroundColor: '#1976D2',
    borderColor: '#4A55A2',
    boxShadow: 'none',
    color: '#FFFFFF', // hover 상태일 때 글씨 색을 흰색으로 변경
  },
}));


//---------------------------------------

export const CustomInputLabel = styled(InputLabel)({
  fontWeight: "bold",
  marginRight: 8,
});

export const CustomDataGrid = styled(DataGrid)({
  borderTop: "3px solid black",
});

export const CustomTextField = styled(TextField)({
  width: 255,
  "& .MuiInputBase-root": {
    height: 40,
  },
});


export const CustomSelect = styled(Select)({
  width: 255,
  height: 40,
});

export const CustomAutoComplete = styled(Autocomplete)({
  width: 255,
  "& .MuiInputBase-root": {
    height: 40,
    paddingLeft: 9,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
});

export const CustomGridContainer = styled(Grid)({
  width: "100% !important",
  marginLeft: "0px !important",
  marginTop: "16px",
  marginBottom: "16px ",
  paddingBottom: "16px ",
  border: "3px solid #EAEAEA",
});

export const CustomSearchButton = styled(Button)({
  padding: "0px",
  marginRight: 8,
  minWidth: "5px",
  // position: "absolute",
});