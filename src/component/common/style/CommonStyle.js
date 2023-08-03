import { Autocomplete, Grid, InputLabel, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "styled-components";

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: 8,
}));

export const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  borderTop: "3px solid black",
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  width: 255,
  "& .MuiInputBase-root": {
    height: 40
  },
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  width: 255,
  height: 40,
}));

export const CustomAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: 255,
  "& .MuiInputBase-root": {
    height: 40,
    paddingLeft: 9,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
}));

export const CustomGridContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "0px",
  marginTop: "16px",
  marginBottom: "16px",
  paddingBottom: "16px",
  border: "3px solid #EAEAEA",
}));