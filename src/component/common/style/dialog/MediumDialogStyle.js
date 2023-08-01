import styled from "styled-components";
import { DialogTitle, DialogContent, DialogActions, Grid, InputLabel, IconButton, Button, TextField, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

export const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#7895CB",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 60,
  padding: 16,
}));

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  size: "small"
}));

export const CustomCloseIcon = styled(CloseIcon)(({ theme }) => ({
  size: "medium",
  color: "white" 
}));

export const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  margin: 0,
  padding: 0,
}));

export const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
  margin: 0,
  padding: 0,
}));

export const CustomSearchGridContainer = styled(Grid)(({ theme }) => ({
  position:"relative",
  maxWidth: "468px",
  border: "3px solid #EAEAEA",
  display: "flex",
  marginLeft: 16,
  marginTop: 8,
  marginRight: 16,
  marginBottom: 16,
  paddingBottom: 16
}));

export const CustomDataGridContainer = styled(Grid)(({ theme }) => ({
  height: "370px",
  maxWidth: "468px",
  marginLeft: 16,
  marginRight: 16
}));

export const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  borderTop: "3px solid black",
}));

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: 8,
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({

}));

export const CustomSearchButton = styled(Button)(({ theme }) => ({
  padding: "0px",
  minWidth: "5px",
  position: "relative",
  right: "-66px",
}));

export const CustomButtonGridContainer = styled(Grid)(({ theme }) => ({
  maxWidth: "468px",
  marginLeft: 16,
  marginRight: 16,
  marginBottom: 16,
}));

export const CustomConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4A55A2",
  color: "white",
  "&:hover": {
    backgroundColor: "#4A55A2",
  },
  marginRight: 8,
}));
