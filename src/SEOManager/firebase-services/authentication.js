//React
import React from "react";
//Redux
import { connect } from "react-redux";

//Firebase
import firebase from "src/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebase);

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    onAuthStateChanged(auth, async (user) => {
      this.loadUser(user);
    });
    if (auth?.currentUser) {
      this.loadUser(auth.currentUser);
    }
  };

  loadUser = async (user) => {
    const permissionLevels = ["owner", "admin", "editor"];
    if (user) {
      const customClaims = await user.getIdTokenResult(true);
      if (
        customClaims?.claims?.[this.props?.seoData?.initial?.projectId] &&
        permissionLevels.includes(
          customClaims?.claims?.[this.props?.seoData?.initial?.projectId]
        )
      ) {
        user.authorizedProject = true;
      } else {
        user.authorizedProject = false;
      }
    }

    const action = {
      type: "SET_USER",
      results: user
    };
    this.props.dispatch(action);
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(Authentication);
