/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-empty */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
//React
import React from "react";

// import firebase from "src/firebase";
// import { getAnalytics } from "firebase/analytics";

const SEOManager = React.lazy(() => import("./../../../SEOManager/index"));

export class SEOHelper extends React.Component {
  constructor(props) {
    super(props);
    this.checkComponentErrors(props);
    this.state = {
      data: props.data,
      head: props.head(this.formatHead(props.data)),
      loading: true,
      loaded: false,
      componentLoaded: false
    };
  }

  componentDidMount = () => {
    // console.log(`SEOHelperLite Mounted:`, Date.now());
    this.setState({ loading: false, loaded: true, componentLoaded: true });
    // getAnalytics(firebase);
  };

  componentDidUpdate = (prevProps) => {
    if (
      JSON.stringify(prevProps?.data) !== JSON.stringify(this.props?.data) &&
      this.props?.data &&
      this.props?.head
    ) {
      this.setState({
        data: this.props?.data,
        head: this.props.head(this.formatHead(this.props?.data))
      });
    }
  };

  checkComponentErrors = (object) => {
    if (!object.head) {
      throw "Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet.";
    }
  };

  formatHead = (data) => {
    if (!data || data.valid === false) {
      return null;
    }
    return (
      <>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta
          name="robots"
          content={`${data?.page?.index || "index"}, ${
            data?.page?.follow || "follow"
          }`}
        />
        {data?.global?.themeColor && (
          <meta name="theme-color" content={data?.global?.themeColor} />
        )}

        {data?.global?.favicon?.url && (
          <link
            rel="icon"
            type="image/x-icon"
            href={data.global.favicon.url}
            sizes="192x192"
          />
        )}

        {data?.global?.canonicalURL && data?.page?.path && (
          <link
            href={`${data.global.canonicalURL}${data.page.path}`}
            rel="canonical"
          />
        )}
        {data?.global?.canonicalURL && data?.page?.path && (
          <meta
            property="og:url"
            content={`${data.global.canonicalURL}${data.page.path}`}
          />
        )}

        {data?.page?.image?.url && (
          <meta property="og:image" content={data.page.image.url} />
        )}

        {data?.page?.image?.url && (
          <meta name="twitter:image" content={data.page.image.url} />
        )}

        <title>{data?.page?.title || data?.global?.defaultTitle || ""}</title>
        <meta
          property="og:title"
          content={data?.page?.title || data?.global?.defaultTitle || ""}
        />
        <meta
          name="twitter:title"
          content={data?.page?.title || data?.global?.defaultTitle || ""}
        />

        <meta
          name="description"
          content={
            data?.page?.description || data?.global?.defaultDescription || ""
          }
          key={"description"}
        />
        <meta
          property="og:description"
          content={
            data?.page?.description || data?.global?.defaultDescription || ""
          }
        />
        <meta
          name="twitter:description"
          content={
            data?.page?.description || data?.global?.defaultDescription || ""
          }
        />

        {data?.page?.keywords && (
          <meta name="keywords" content={data.page.keywords} />
        )}

        {data?.page?.ldJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data.page.ldJson }}
          />
        )}
        {data?.page?.events && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data.page.events)
            }}
          />
        )}
        {/* {this.props.children} */}
      </>
    );
  };

  render() {
    return (
      <>
        {this.state.loaded === false ? (
          <>{this.state.head}</>
        ) : (
          <>{this.props.head(this.formatHead(this.state.data))}</>
        )}
        {this.state.componentLoaded === true ? (
          <React.Suspense fallback={<></>}>
            <SEOManager data={this.state.data} />
          </React.Suspense>
        ) : null}
      </>
    );
  }
}
