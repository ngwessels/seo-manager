//React
import React from "react";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BootstrapDialog } from "./BootstrapDialog";

//Components
import { DialogScreens } from "../interfaces";

interface State {
  hidden: boolean;
}

class Loading extends React.Component<DialogScreens, State> {
  constructor(props: DialogScreens) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, 500);
  }

  render() {
    if (this.state.hidden === true) {
      return null;
    }
    return (
      <>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="SEO Manager Loading"
          open={true}
          maxWidth={false}
          style={{ zIndex: 100 }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            SEO Manager
            <IconButton
              aria-label="close"
              onClick={this.props.onClose}
              sx={{
                position: "absolute",
                right: 12,
                top: 10,
                color: "#94a3b8",
                "&:hover": { color: "#f8fafc", backgroundColor: "rgba(255,255,255,0.1)" }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ borderColor: "#e2e8f0" }}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2.5
              }}
            >
              <CircularProgress size={36} sx={{ color: "#1e293b" }} />
              <Typography sx={{ color: "#64748b", fontSize: "0.9rem" }}>
                Loading your SEO data...
              </Typography>
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }
}

export default Loading;
