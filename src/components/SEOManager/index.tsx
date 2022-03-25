//React
import React from "react";

//React-Helmet
import Helmet from "react-helmet";

//Firebase
import { firebase } from "./../../firebase";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebase);

type SEOObject = {
  children?: React.ReactNode;
  data: any;
};

class SEOHelper extends React.Component<
  {
    children?: React.ReactNode;
    path?: string;
  },
  {
    data: any;
  }
> {
  state: {
    data: any;
  };
  constructor(object: SEOObject) {
    super(object);
    this.state = {
      data: object.data
    };
  }

  componentDidMount() {
    console.log("SEO Manager Finished Rendering at:", Date.now());
    onAuthStateChanged(auth, async (user) => {
      console.log("NPM Calling Analytics:");
      getAnalytics(firebase);
      console.log("NPM USER:", user);
      if (user) {
      } else {
        // await signInAnonymously(auth);
      }
    });
  }

  render() {
    return (
      <Helmet>
        <title>{this.props.data.title || ""}</title>
        <meta
          name="description"
          content={this.props.data.description || ""}
          key={"description"}
        />

        {this.state.data.keywords && (
          <meta name="keywords" content={this.state.data.keywords} />
        )}
        {this.state.data.canonicalURL && (
          <link
            href={`${this.state.data.canonicalURL}${this.state.data.path}`}
            rel="canonical"
          />
        )}

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        {this.state.data.title && (
          <meta property="og:title" content={this.state.data.title} />
        )}
        {this.state.data.description && (
          <meta
            property="og:description"
            content={this.state.data.description}
          />
        )}

        {this.state.data.image && (
          <meta property="og:image" content={this.state.data.image} />
        )}
        {this.state.data.canonicalURL && (
          <meta
            property="og:url"
            content={`${this.state.data.canonicalURL}${this.state.data.path}`}
          />
        )}

        {this.state.data.title && (
          <meta name="twitter:title" content={this.state.data.title} />
        )}
        {this.state.data.description && (
          <meta
            name="twitter:description"
            content={this.state.data.description}
          />
        )}
        {this.state.data.image && (
          <meta name="twitter:image" content={this.state.data.image} />
        )}
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta
          name="robots"
          content={`${this.state.data.index || "index"}, ${
            this.state.data.follow || "follow"
          }`}
        />
        {this.props.children}
      </Helmet>
    );
  }
}

export default SEOHelper;
