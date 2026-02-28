import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DialogProps } from "@mui/material/Dialog";

export const BootstrapDialog: React.ComponentType<DialogProps> = styled(Dialog)(
  ({ theme }) => ({
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(4px)"
    },
    "& .MuiDialogTitle-root": {
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      color: "#f8fafc",
      padding: theme.spacing(2, 3),
      fontSize: "1.05rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      position: "relative"
    },
    "& .MuiDialogContent-root": {
      padding: theme.spacing(3),
      width: "95vw",
      maxWidth: "900px",
      backgroundColor: "#f8fafc"
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1.5, 3),
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e2e8f0"
    },
    "& .MuiPaper-root": {
      margin: "0px",
      maxWidth: "none !important",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }
  })
);
