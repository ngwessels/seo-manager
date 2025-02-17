//React
import React from "react";
//Redux
import { connect } from "react-redux";

//Utilities
import { returnKey } from "src/utilities/setupInit";

//Components
const Login = React.lazy(() => import("./login"));
const Loading = React.lazy(() => import("./loading"));
const Manager = React.lazy(() => import("./Manager"));
const NotAuthorized = React.lazy(() => import("./notAuthorized"));

import { Options } from "../interfaces";

interface State {
  loading: boolean;
  projectId: string;
}

class Screens extends React.Component<Options, State> {
  constructor(props: Options) {
    super(props);
    const initData: any = returnKey();
    this.state = {
      loading: false,
      projectId: initData.projectId
    };
  }

  onClose = () => {
    this.props.onClose();
  };

  setLoading = (bool: boolean) => {
    this.setState({ loading: bool });
  };

  render() {
    console.log(this.props?.user);
    return (
      <React.Fragment>
        <React.Suspense fallback={<></>}>
          {this.props?.user?.isLoggedIn === false && (
            <Login onClose={this.onClose} />
          )}

          {(this.props?.user?.isLoggedIn === null ||
            this.state?.loading === true) && <Loading onClose={this.onClose} />}
          {this.props?.user?.isLoggedIn === true &&
            this.props?.user?.authorizedProject === true && (
              <Manager
                data={this.props?.data}
                isNewPage={this.props?.isNewPage}
                onClose={this.onClose}
                onIsLoading={this.setLoading}
                isLoading={this.state.loading}
                onChangeComplete={this.props.onChangeComplete}
              />
            )}

          {this.props?.user?.isLoggedIn === true &&
            !this.props?.user?.authorizedProject && (
              <NotAuthorized onClose={this.onClose} />
            )}
        </React.Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user
});

export default connect(mapStateToProps)(Screens);
