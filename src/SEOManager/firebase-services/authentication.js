//React
import React from "react";
//Redux
import { connect } from "react-redux";

//Firebase
import firebase from "src/firebase";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
const auth = getAuth(firebase);

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.loadUser(user);
      } else {
        await signInAnonymously(auth);
      }
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
      } else if (
        customClaims?.claims?.[this.props?.seoData?.initial?.projectId]
      ) {
        const { timeStamp } = JSON.parse(
          customClaims?.claims?.[this.props?.seoData?.initial?.projectId]
        );
        const userPermissionTimeStamp = new Date(timeStamp).toISOString();
        const now = new Date().toISOString();

        if (now < userPermissionTimeStamp) {
          userData.authorizedProject = timeStamp;
        } else {
          userData.authorizedProject = false;
        }
      } else {
        let hasAuthorizedPages = false;
        let authorizedPages = {};
        Object.keys(customClaims?.claims).forEach((key) => {
          if (key.includes(`${this.props?.seoData?.initial?.projectId}-`)) {
            const { timeStamp } = JSON.parse(customClaims?.claims?.[key]);
            hasAuthorizedPages = true;
            const pageId = key.split("-")[1];
            authorizedPages[pageId] = timeStamp;
          }
        });

        if (hasAuthorizedPages) {
          userData.authorizedPages = authorizedPages;
        } else {
          userData.authorizedProject = false;
        }
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
