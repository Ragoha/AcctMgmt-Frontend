import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import styled from "styled-components";


export const CustomShortDialog = styled(Dialog)({
  "& .MuiPaper-elevation": {
    width: 500,
    height: 600,
    minHeight: 600
  },
})

export const CustomDialogTitle = styled(DialogTitle)({
  backgroundColor: "#7895CB",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 60,
  padding: 16,
});

export const CustomCloseIcon = styled(CloseIcon)({
  color: "white" 
});

export const CustomDialogContent = styled(DialogContent)({
  margin: 0,
  padding: 0,
});

export const CustomDialogActions = styled(DialogActions)({
  margin: 0,
  padding: 0,
});

export const CustomShortFormGridContainer = styled(Grid)({
  position:"relative",
  maxWidth: "468px",
  border: "3px solid #EAEAEA",
  display: "flex",
  marginLeft: 16,
  marginTop: 8,
  marginRight: 16,
  marginBottom: 16,
  paddingBottom: 16
});

export const CustomLargeFormGridContainer = styled(Grid)({
  position: "relative",
  maxWidth: "1168px",
  border: "3px solid #EAEAEA",
  display: "flex",
  marginLeft: 16,
  marginTop: 8,
  marginRight: 16,
  marginBottom: 16,
  paddingBottom: 16,
});

export const CustomShortDataGridContainer = styled(Grid)({
  height: "370px",
  maxWidth: "468px",
  marginLeft: 16,
  marginRight: 16
});

export const CustomLargeDataGridContainer = styled(Grid)({
  height: "552px",
  maxWidth: "1168px",
  marginLeft: 16,
  marginRight: 16,
});

export const CustomButtonGridContainer = styled(Grid)({
  maxWidth: "468px",
  marginLeft: 16,
  marginRight: 16,
  marginBottom: 16,
});

export const CustomLargeButtonGridContainer = styled(Grid)({
  maxWidth: "1168px",
  marginLeft: 16,
  marginRight: 16,
  marginBottom: 16,
});

export const CustomConfirmButton = styled(Button)({
  backgroundColor: "#4A55A2",
  color: "white",
  "&:hover": {
    backgroundColor: "#4A55A2",
  },
  marginRight: 8,
});
