/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-empty */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-fragments */
//React
import React from "react";

type SEOObject = {
  children?: React.ReactNode;
  head: any;
  data: any;
};

class SEOHelperLite extends React.Component<
  {
    children?: React.ReactNode;
    data: any;
    head: any;
  },
  {
    data: any;
    head: any;
  }
> {
  state: {
    data: any;
    head: any;
    loading: boolean;
  };
  constructor(object: SEOObject) {
    super(object);
    this.checkComponentErrors(object);
    this.state = {
      data: object.data,
      head: object.head(this.formatHead(object.data)),
      loading: true
    };
  }

  componentDidMount = () => {
    console.log(`SEOHelperLite Mounted:`, Date.now());
    this.setState({ loading: false });
  };

  checkComponentErrors = (object: SEOObject) => {
    if (!object.data) {
      throw "Please add this tag to your SEOHelper component 'data={this.props.seo}'. If you are using NextJS make sure you are calling our fetchSEO function in getServerSideProps or getStaticProps and passing the data as a prop.";
    }
    if (!object.head) {
      throw "Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet.";
    }
  };

  formatHead = (data: any) => {
    if (!data || data.valid === false) {
      return null;
    }
    return (
      <>
        <title>{data.title || ""}</title>
        <meta
          name="description"
          content={data.description || ""}
          key={"description"}
        />
        {data.keywords && <meta name="keywords" content={data.keywords} />}
        {data.canonicalURL && (
          <link href={`${data.canonicalURL}${data.path}`} rel="canonical" />
        )}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        {data.title && <meta property="og:title" content={data.title} />}
        {data.description && (
          <meta property="og:description" content={data.description} />
        )}

        {data.image && <meta property="og:image" content={data.image} />}
        {data.canonicalURL && (
          <meta
            property="og:url"
            content={`${data.canonicalURL}${data.path}`}
          />
        )}
        {data.title && <meta name="twitter:title" content={data.title} />}
        {data.description && (
          <meta name="twitter:description" content={data.description} />
        )}
        {data.image && <meta name="twitter:image" content={data.image} />}
        {(data.pageFavicon || data.projectFavicon) && (
          <link
            rel="icon"
            type="image/x-icon"
            href={data.pageFavicon || data.projectFavicon}
            sizes="192x192"
          />
        )}
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta
          name="robots"
          content={`${data.index || "index"}, ${data.follow || "follow"}`}
        />
        {this.props.children}
      </>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading === true ? (
          <>{this.state.head}</>
        ) : (
          <>{this.props.head(this.formatHead(this.state.data))}</>
        )}
      </React.Fragment>
    );
  }
}

export default SEOHelperLite;
