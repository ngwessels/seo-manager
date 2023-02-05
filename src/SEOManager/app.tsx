//React
import React from "react";
//Redux
import { connect } from "react-redux";

//Components
const Analytics = React.lazy(() => import("./firebase-services/analytics")); //Sets Analytics
const Authentication = React.lazy(
  () => import("./firebase-services/authentication")
); //Sets Authentication
const Screens = React.lazy(() => import("./screens/index"));

import { Options } from "./interfaces";

interface State {
  authentication: boolean;
  isManagerOpen: boolean;
}

class App extends React.Component<Options, State> {
  constructor(props: Options) {
    super(props);
    this.state = {
      authentication: props?.isManagerOpen === true ? true : false,
      isManagerOpen: props?.isManagerOpen === true ? true : false
    };
    if (props?.isManagerOpen === true && props?.onOpen) {
      props?.onOpen();
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      if (this.props?.data) {
        const action = {
          type: "SET_INITIAL_SEO_DATA",
          results: this.props.data
        };
        this.props.dispatch(action);
      }
    }, 100);
  };

  componentDidUpdate = (prevProps: any) => {
    if (JSON.stringify(prevProps?.data) !== JSON.stringify(this.props?.data)) {
      const action = {
        type: "SET_INITIAL_SEO_DATA",
        results: this.props.data
      };
      this.props.dispatch(action);
    }
  };

  clickToOpenManager = () => {
    this.setState({ isManagerOpen: true, authentication: true });
    if (this.props?.onOpen) {
      this.props.onOpen();
    }
  };
  clickToCloseManager = () => {
    this.setState({ isManagerOpen: false });
    if (this.props?.onClose) {
      this.props.onClose();
    }
  };

  onChangeComplete = (e: any) => {
    this.setState({ isManagerOpen: false });
    if (this.props?.onChangeComplete) {
      this.props.onChangeComplete(e);
    }
    if (this.props?.onClose) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <>
        <button
          type="button"
          id={"open-seo-manager"}
          style={{ display: "none" }}
          onClick={this.clickToOpenManager}
        />
        <React.Suspense fallback={<></>}>
          <Analytics />
          {this.state?.authentication && <Authentication />}
          {this.state.isManagerOpen === true && (
            <Screens
              data={this.props?.data}
              isNewPage={this.props?.isNewPage}
              onClose={this.clickToCloseManager}
              onChangeComplete={this.onChangeComplete}
            />
          )}
        </React.Suspense>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user
});

export default connect(mapStateToProps)(App);
