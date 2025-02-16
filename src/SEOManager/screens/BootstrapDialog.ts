import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DialogProps } from "@mui/material/Dialog";

export const BootstrapDialog: React.ComponentType<DialogProps> = styled(Dialog)(
  ({ theme }) => ({
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
  })
);
