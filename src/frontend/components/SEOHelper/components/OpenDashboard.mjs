/* eslint-disable eol-last */
import React from "react";

import { Button } from "@mui/material";
import { getUserToken } from "src/utilities/fetch";

class OpenDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      userToken: ""
    };
  }

  componentDidMount = () => {
    this.init();
  };

  componentWillUnmount = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  };

  init = () => {
    const interval = setInterval(async () => {
      this.setUserToken();
    }, 60 * 1000);
    this.setUserToken();
    this.setState({ interval });
  };

  setUserToken = async () => {
    const userToken = await getUserToken();
    this.setState({ userToken });
  };

  openWindow = () => {
    const urlPath =
      process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
      process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
        ? `https://seomanager.dev/dashboard/?userToken=${this.state.userToken}&projectId=${this.props.projectId}`
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test"
        ? `http://localhost:3001/dashboard/?userToken=${this.state.userToken}&projectId=${this.props.projectId}`
        : `https://testing.seomanager.dev/dashboard/?userToken=${this.state.userToken}&projectId=${this.props.projectId}`;
    window.open(urlPath, "_blank");
  };

  render() {
    if (window?.location?.href?.includes("seomanager.dev/dashboard")) {
      return null;
    }
    if (!this.state.userToken) {
      return null;
    }
    return (
      <>
        <Button variant="text" onClick={this.openWindow} type="button">
          Open Dashboard
        </Button>
      </>
    );
  }
}

export default OpenDashboard;
