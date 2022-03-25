import React from "react";

import { returnKey } from "utils/Init";

import "./styles.css";

//Firebase
import { firebase } from "../../firebase";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const storage = getStorage(firebase);
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
const auth = getAuth(firebase);

//Components
import Manager from "./Manager";

//Utils
import { hideModal, openModal, formattedFileName, addFiles } from "./utils";

type SEOObject = {
  children?: React.ReactNode;
  head: any;
  data: any;
  onChangeComplete?: any;
  onClose?: any;
  hideBootstrap?: boolean;
};

class SEOHelper extends React.Component<
  {
    children?: React.ReactNode;
    data: any;
    head: any;
    onChangeComplete: any;
    onClose: any;
    hideBootstrap?: boolean;
  },
  {
    data: any;
    head: any;
  }
> {
  state: {
    data: any;
    dataOriginal: any;
    head: any;
    loading: boolean;
    loaded: boolean;
    open: boolean;
    user: any;
    email: string;
    password: string;
    loginError: string;
    projectId: string;
    authorizedUser: boolean;
    openManager: boolean;
  };
  constructor(object: SEOObject) {
    super(object);
    this.checkComponentErrors(object);
    const initData: any = returnKey();
    this.state = {
      data: object.data,
      dataOriginal: object.data,
      head: object.head(this.formatHead(object.data)),
      loading: false,
      loaded: false,
      open: true,
      user: null,
      email: "",
      password: "",
      loginError: "",
      projectId: initData.projectId,
      authorizedUser: false,
      openManager: false
    };
  }

  componentDidMount = () => {
    console.log(`SEOHelper Mounted:`, Date.now());
    this.setState({ loading: true, user: false, loaded: true });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const customClaims = await user.getIdTokenResult(true);
        const userData = { ...user, customClaims: customClaims.claims };
        if (customClaims?.claims?.[this.state.projectId] === "admin") {
          this.setState({ authorizedUser: true });
          // this.openManager(userData);
        } else {
          this.setState({ authorizedUser: false });
        }
        this.setState({ user: userData });
      } else {
        this.setState({ user: false });
      }
      this.setState({ loading: false });
      getAnalytics(firebase);
    });
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
        {this.props.hideBootstrap !== true &&
          this.state &&
          this.state.open === true && (
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
              crossOrigin="anonymous"
            />
          )}
        {this.props.children}
      </>
    );
  };

  signIn = async (e: any) => {
    //Sign in User
    e.preventDefault();
    this.setState({ loading: true });
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({ loginError: error.code, loading: false });
      });
  };

  signOut = async () => {
    //Signs out user
    await signOut(auth);
  };

  resetData = () => {
    //Resets Props data to original
    this.setState({ data: this.state.dataOriginal, openManager: false });
  };

  updateData = (data: any, original: boolean) => {
    this.setState({ data });
    if (original === true) {
      this.setState({ dataOriginal: data });
    }
  };

  openManager = (user?: any) => {
    //Checks if user is authorized to make updates
    if (
      this.state.user?.customClaims?.[this.state.projectId] === "admin" ||
      user?.customClaims?.[this.state.projectId] === "admin"
    ) {
      this.setState({ openManager: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading === false && this.state.user === null ? (
          <>{this.state.head}</>
        ) : (
          <>{this.props.head(this.formatHead(this.state.data))}</>
        )}
        {this.state && this.state.loaded === false && (
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          />
        )}

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          id={"open-seo-manager"}
          style={{ display: "none" }}
          onClick={this.openManager}
        />
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  SEO Manager
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.resetData}
                />
              </div>
              <div className="modal-body">
                {this.state.user === false && this.state.loading === false && (
                  <form onSubmit={this.signIn}>
                    <label htmlFor="" className="form-label">
                      Please login to your SEO Manager Account to continue
                    </label>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                        required={true}
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                        required={true}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {this.state.loginError && (
                      <div
                        className="alert alert-danger d-flex align-items-center"
                        role="alert"
                        style={{ marginTop: 15 }}
                      >
                        <svg
                          className="bi flex-shrink-0 me-2"
                          width="24"
                          height="24"
                          role="img"
                          aria-label="Danger:"
                        >
                          <use xlinkHref="#exclamation-triangle-fill" />
                        </svg>
                        <div>{this.state.loginError}</div>
                      </div>
                    )}
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-dark"
                        type={"submit"}
                        style={{ marginTop: 15 }}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                )}
                {this.state.loading === true && (
                  <div
                    style={{
                      width: "100%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {this.state.loading === false &&
                  this.state.user &&
                  this.state.authorizedUser === true &&
                  this.state.openManager === true && (
                    <Manager
                      onChange={this.updateData}
                      data={this.state.data}
                      dataOriginal={this.state.dataOriginal}
                      resetData={this.resetData}
                      onChangeComplete={this.props.onChangeComplete}
                      user={this.state.user}
                    />
                  )}
                {this.state.loading === false &&
                  this.state.user &&
                  this.state.authorizedUser === false && (
                    <div>
                      <p>
                        Unfortunately it appears you are not authorized to make
                        changes to this website! Is it possible your signed in
                        on the wrong account?{" "}
                        <a onClick={this.signOut} style={{ cursor: "pointer" }}>
                          <strong>Click Here to Sign Out</strong>
                        </a>
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SEOHelper;

type PhotoObject = {
  image: string;
  newImage?: string;
  onChange: any;
  addPerformActionOnUpdate: any;
  data: any;
  file: any;
};

class PagePhotos extends React.Component<{
  image: string;
  newImage?: string;
  onChange: any;
  addPerformActionOnUpdate: any;
  data: any;
  file: any;
}> {
  state: {
    fileError: string;
  };

  constructor(object: PhotoObject) {
    super(object);
    this.state = {
      fileError: ""
    };
  }

  uploadNewFile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRef = ref(
          storage,
          `projects/${this.props.data.projectId}/pages/${this.props.file.name}`
        );
        const uploadTask = uploadBytesResumable(
          fileRef,
          this.props.file.object
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Error:", error);
            return resolve({ error: true, results: false });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.props.onChange(downloadURL, "image");
              return resolve({ error: false, results: downloadURL });
            });
          }
        );
      } catch (err) {
        console.error("Error:", err);
      }
    });
  };

  addFile = (e: any) => {
    let validContentType = ["image/jpeg", "image/png"];
    const photos = addFiles(e, validContentType, this.props.data);
    if (photos && !photos.error) {
      this.props.onChange(photos.results[0], "file");
      this.props.onChange(photos.results[0].object.localURL, "newImage");
      this.props.onChange("", "image");
      const action = {
        message: "-Upload new page photo and will replace current photo",
        action: this.uploadNewFile
      };
      this.props.addPerformActionOnUpdate(action, "file");
      this.setState({ fileError: "" });
    } else if (photos.error) {
      this.setState({ fileError: photos.error });
    }
  };

  deleteFile = () => {
    this.props.onChange("", "file");
    this.props.onChange("", "newImage");
    this.props.onChange("", "image");
  };

  render() {
    return (
      <>
        <div className="file-upload mb-3">
          <input
            className="file-input"
            type="file"
            onChange={this.addFile}
            multiple={false}
          />
          <div className={"overlay"} />
          {(this.props.newImage || this.props.image) && (
            <div className={"delete-btn-container"}>
              <div className="delete-btn" onClick={this.deleteFile}>
                <a className={"delete-button"}>DELETE</a>
                <div className="delete-hoverBtn">
                  <p className="delete-hoverText">ARE YOU SURE?</p>
                </div>
              </div>
            </div>
          )}

          {this.props.newImage || this.props.image ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 0,
                top: 0,
                left: 0
              }}
            >
              <img
                src={this.props.newImage || this.props.image}
                style={{
                  maxWidth: "100%"
                }}
              />
            </div>
          ) : (
            <div
              style={{
                zIndex: 10
              }}
            >
              <svg
                className="icon"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Page-1" fill="none" fillRule="evenodd">
                  <g id="135---Upload-File" fillRule="nonzero">
                    <path
                      id="Shape"
                      d="m45 5v5.64c-.3100728-.0017336-.6028238.1427891-.79.39l-7.97 10.36c-.2321692.3015898-.2730081.7088268-.1053486 1.0505127.1676595.3416858.5147463.5585742.8953486.5594873h2.97c.5522847 0 1 .4477153 1 1v8.7c-2.4140699.8930859-4.4288624 2.6205577-5.68 4.87-1.3148871-.924088-2.88287-1.4199757-4.49-1.42-4.098463-.0798372-7.4887279 3.1717757-7.58 7.27.0025703 1.2394906.3301312 2.4566379.95 3.53-2.4876122.8596901-4.1679958 3.1882217-4.2 5.82-.0024343.7641659.143604 1.5215278.43 2.23h-15.43c-2.209139 0-4-1.790861-4-4v-37h9c2.209139 0 4-1.790861 4-4v-9h27c2.209139 0 4 1.790861 4 4z"
                      fill="#a4c2f7"
                    />
                    <path
                      id="Shape"
                      d="m29.289 36.3c-.4803677-.0971145-.9689302-.1480134-1.459-.152-4.098463-.0798372-7.4887279 3.1717757-7.58 7.27.0025703 1.2394906.3301312 2.4566379.95 3.53-2.4882959.8599378-4.1688345 3.1894844-4.2 5.822-.0024343.7641659.143604 1.5215278.43 2.23h3c-.286396-.7084722-.4324343-1.4658341-.43-2.23.0320042-2.6317783 1.7123878-4.9603099 4.2-5.82-.6198688-1.0733621-.9474297-2.2905094-.95-3.53.0579363-3.5096239 2.5858828-6.4900808 6.039-7.12z"
                      fill="#7facfa"
                    />
                    <path
                      id="Shape"
                      d="m41 1h-3c2.209139 0 4 1.790861 4 4v5.64c-.3100728-.0017336-.6028238.1427891-.79.39l-7.97 10.36c-.2321692.3015898-.2730081.7088268-.1053486 1.0505127.1676595.3416858.5147463.5585742.8953486.5594873h2.97c.5522847 0 1 .4477153 1 1v8.7c-1.9933891.7448886-3.724038 2.0589578-4.977 3.779.8206538.2368081 1.5974232.605267 2.3 1.091 1.2503977-2.2488979 3.2640474-3.9763021 5.677-4.87v-8.7c0-.5522847-.4477153-1-1-1h-2.97c-.3806023-.0009131-.7276891-.2178015-.8953486-.5594873-.1676595-.3416859-.1268206-.7489229.1053486-1.0505127l7.97-10.36c.1871762-.2472109.4799272-.3917336.79-.39v-5.64c0-2.209139-1.790861-4-4-4z"
                      fill="#7facfa"
                    />
                    <path
                      id="Shape"
                      d="m14 1v9c0 2.209139-1.790861 4-4 4h-9z"
                      fill="#e8edfc"
                    />
                    <path
                      id="Shape"
                      d="m59 52.77c-.0765094 3.5144351-2.9854814 6.3025729-6.5 6.23h-26c-2.6494875.0284709-5.0510605-1.5541143-6.07-4-.286396-.7084722-.4324343-1.4658341-.43-2.23.0320042-2.6317783 1.7123878-4.9603099 4.2-5.82-.6198688-1.0733621-.9474297-2.2905094-.95-3.53.0912721-4.0982243 3.481537-7.3498372 7.58-7.27 1.60713.0000243 3.1751129.495912 4.49 1.42 1.2511376-2.2494423 3.2659301-3.9769141 5.68-4.87v12.3c0 .5522847.4477153 1 1 1h6c.5522847 0 1-.4477153 1-1v-12.23c4.0203621 1.4998194 6.7031019 5.319246 6.75 9.61-.0037166 1.5713127-.3771119 3.1197043-1.09 4.52 2.5585622.8196318 4.3063464 3.1835704 4.34 5.87z"
                      fill="#e8edfc"
                    />
                    <path
                      id="Shape"
                      d="m38 34.412v10.588c0 .5522847.4477153 1 1 1h3c-.5522847 0-1-.4477153-1-1v-12.3c-1.083917.4091207-2.0963967.9869091-3 1.712z"
                      fill="#cad9fc"
                    />
                    <path
                      id="Shape"
                      d="m54.66 46.9c.7128881-1.4002957 1.0862834-2.9486873 1.09-4.52-.0468981-4.290754-2.7296379-8.1101806-6.75-9.61v1.768c2.3611081 1.9206712 3.7372103 4.7983762 3.75 7.842-.0037166 1.5713127-.3771119 3.1197043-1.09 4.52 2.5585622.8196318 4.3063464 3.1835704 4.34 5.87-.0765094 3.5144351-2.9854814 6.3025729-6.5 6.23h3c3.5145186.0725729 6.4234906-2.7155649 6.5-6.23-.0336536-2.6864296-1.7814378-5.0503682-4.34-5.87z"
                      fill="#cad9fc"
                    />
                    <path
                      id="Shape"
                      d="m52.97 23h-2.97c-.5522847 0-1 .4477153-1 1v21c0 .5522847-.4477153 1-1 1h-6c-.5522847 0-1-.4477153-1-1v-21c0-.5522847-.4477153-1-1-1h-2.97c-.3806023-.0009131-.7276891-.2178015-.8953486-.5594873-.1676595-.3416859-.1268206-.7489229.1053486-1.0505127l7.97-10.36c.1894263-.2440794.4810387-.3868932.79-.3868932s.6005737.1428138.79.3868932l7.97 10.36c.2321692.3015898.2730081.7088268.1053486 1.0505127-.1676595.3416858-.5147463.5585742-.8953486.5594873z"
                      fill="#e8edfc"
                    />
                    <path
                      id="Shape"
                      d="m53.76 21.39-7.97-10.36c-.1894263-.2440794-.4810387-.3868932-.79-.3868932s-.6005737.1428138-.79.3868932l-.71.923 7.26 9.437c.2321692.3015898.2730081.7088268.1053486 1.0505127-.1676595.3416858-.5147463.5585742-.8953486.5594873h-2.97c-.5522847 0-1 .4477153-1 1v21c0 .5522847-.4477153 1-1 1h3c.5522847 0 1-.4477153 1-1v-21c0-.5522847.4477153-1 1-1h2.97c.3806023-.0009131.7276891-.2178015.8953486-.5594873.1676595-.3416859.1268206-.7489229-.1053486-1.0505127z"
                      fill="#cad9fc"
                    />
                    <path
                      id="Shape"
                      d="m5 55h3c-2.209139 0-4-1.790861-4-4v-37l13-13h-3l-13 13v37c0 2.209139 1.790861 4 4 4z"
                      fill="#fff"
                    />
                    <path id="Rectangle-path" d="m0 43h2v8h-2z" fill="#fff" />
                    <g fill="#428dff">
                      <path
                        id="Shape"
                        d="m35 6c.5522847 0 1-.44771525 1-1s-.4477153-1-1-1h-6c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1z"
                      />
                      <path
                        id="Shape"
                        d="m41 6c.5522847 0 1-.44771525 1-1s-.4477153-1-1-1h-2c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1z"
                      />
                      <path
                        id="Shape"
                        d="m9 20h9c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-9c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1z"
                      />
                      <path
                        id="Shape"
                        d="m22 19c0 .5522847.4477153 1 1 1h8c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-8c-.5522847 0-1 .4477153-1 1z"
                      />
                      <path
                        id="Shape"
                        d="m9 25h15c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-15c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1z"
                      />
                      <path
                        id="Shape"
                        d="m9 30h9c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-9c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1z"
                      />
                      <path
                        id="Shape"
                        d="m55.989 46.375c.5032696-1.2717784.7614736-2.6272645.761-3.995-.0273794-4.4543198-2.6714766-8.4760894-6.75-10.267v-8.113h2.969c.7619202.000163 1.457747-.4325997 1.7944905-1.116066.3367436-.6834663.2558999-1.4988943-.2084905-2.102934l-7.97-10.36c-.1591429-.2000741-.3584195-.364605-.585-.483v-4.938c-.0033061-2.76005315-2.2399468-4.99669388-5-5h-27c-.2651948.00005664-.5195073.10545063-.707.293l-13 13c-.18754937.1874927-.29294336.4418052-.293.707v29c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-28h8c2.7600532-.0033061 4.9966939-2.2399468 5-5v-8h26c1.6568542 0 3 1.34314575 3 3v4.938c-.2265805.118395-.4258571.2829259-.585.483l-7.969 10.359c-.4648847.6038939-.5461601 1.4195059-.2095895 2.1032645.3365706.6837587 1.0324835 1.1168106 1.7945895 1.1167355h2.969v8.036c-2.0289252.8891847-3.7660443 2.3323937-5.012 4.164-1.2777798-.688627-2.7064739-1.0494083-4.158-1.05-4.6502555-.0786277-8.487525 3.6199993-8.58 8.27.0014189 1.0429338.2051843 2.0756848.6 3.041-2.3424917 1.2385948-3.819752 3.6593831-3.85 6.309.0009251.4125035.0384051.8241136.112 1.23h-14.112c-1.65685425 0-3-1.3431458-3-3 0-.5522847-.44771525-1-1-1s-1 .4477153-1 1c.00330612 2.7600532 2.23994685 4.9966939 5 5h14.812c1.3021307 2.4826769 3.8847011 4.0272764 6.688 4h26c4.0652284.0685868 7.41956-3.1649889 7.5-7.23-.022792-2.7178626-1.5741326-5.1912666-4.011-6.395zm-45.989-33.375h-6.586l9.586-9.586v6.586c0 1.6568542-1.3431458 3-3 3zm27.031 9 7.969-10.36 7.969 10.36h-2.969c-1.1045695 0-2 .8954305-2 2v21h-6v-21c0-1.1045695-.8954305-2-2-2zm15.469 36h-26c-2.2392108.0179433-4.2688701-1.3143783-5.143-3.376-.2380639-.5890132-.3593143-1.2187004-.357-1.854.021157-2.2146836 1.4427787-4.1729255 3.542-4.879.2773347-.1008183.4959814-.3189803.597415-.5960906.1014335-.2771103.0752965-.584873-.071415-.8409094-.5352204-.9215976-.817412-1.9682595-.818-3.034.091668-3.5457415 3.0339629-6.3494177 6.58-6.27 1.4023371.0002504 2.7703638.4336742 3.917 1.241.2335156.1606817.523672.2161741.8.153.276524-.0647208.5124865-.2439651.649-.493.8843883-1.5953695 2.2035278-2.9068799 3.804-3.782v10.731c0 1.1045695.8954305 2 2 2h6c1.1045695 0 2-.8954305 2-2v-10.646c2.9148594 1.622971 4.7299075 4.6898291 4.75 8.026-.0027233 1.4154499-.339522 2.8102693-.983 4.071-.1312369.2592533-.1432161.5627699-.0328202.8315601.110396.2687901.3322483.4762688.6078202.5684399 2.1497627.6831341 3.6225199 2.6635858 3.658 4.919-.0801662 2.9605146-2.5392002 5.2988324-5.5 5.23z"
                      />
                      <circle id="Oval" cx="1" cy="47" r="1" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          )}
          <div className="card-subtitle">Drag n Drop your file here</div>
        </div>
        {this.state.fileError && (
          <div
            className="alert alert-danger d-flex align-items-center mb-3"
            role="alert"
          >
            <div>{this.state.fileError}</div>
          </div>
        )}
      </>
    );
  }
}
