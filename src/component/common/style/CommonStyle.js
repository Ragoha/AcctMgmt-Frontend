import { InputLabel, Select, TextField } from "@mui/material";
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