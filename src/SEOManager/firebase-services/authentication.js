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
    let userData = {
      ...user
    };
    if (user) {
      const customClaims = await user.getIdTokenResult(true);

      if (
        customClaims?.claims?.[this.props?.seoData?.initial?.projectId] &&
        permissionLevels.includes(
          customClaims?.claims?.[this.props?.seoData?.initial?.projectId]
        )
      ) {
        userData.authorizedProject = true;
      } else {
        userData.authorizedProject = false;
      }
    }

    const action = {
      type: "SET_USER",
      results: JSON.parse(JSON.stringify(userData))
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
