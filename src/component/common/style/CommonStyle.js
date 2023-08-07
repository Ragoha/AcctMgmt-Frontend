import { Autocomplete, Button, Grid, InputLabel, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "styled-components";

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