import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "95vw",
    maxWidth: "900px"
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& .MuiPaper-root": {
    margin: "0px",
    maxWidth: "none !important"
  }
}));
