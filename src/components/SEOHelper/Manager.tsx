//React
import React from "react";

//Firebase
import { firebase } from "../../firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Server Call
import { serverCall } from "utils/call";

//React Tags
import ReactTags from "react-tag-autocomplete";

//Components
import PagePhotos from "./PagePhoto";

//Utils
import {
  hideModal,
  openModal,
  formattedFileName,
  addFiles,
  authSignOut
} from "./utils";

type ManagerObject = {
  data: any;
  dataOriginal: any;
  onChangeComplete?: any;
  onClose?: any;
  onChange: any;
  resetData: any;
  user: any;
};

class Manager extends React.Component<{
  data: any;
  onChangeComplete?: any;
  onClose?: any;
  onChange: any;
  dataOriginal: any;
  resetData: any;
  user: any;
}> {
  state: {
    saving: boolean;
    loading: boolean;
    newImage: "";
    file: any;
    performActionOnUpdate: any;
  };
  reactTags: any;

  constructor(object: ManagerObject) {
    super(object);
    this.state = {
      loading: true,
      saving: false,
      newImage: "",
      file: null,
      performActionOnUpdate: {}
    };
    this.reactTags = React.createRef();
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const response = await serverCall(
        "/seo/get",
        "put",
        { path: this.props.data.path },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );
      if (response) {
        this.props.onChange(response?.results, true);
      }
      this.setState({ loading: false });
    });
  };

  onChange = (value: any, location: string) => {
    let props = { ...this.props.data };
    if (props[location] || props[location] === "") {
      props[location] = value;
      this.props.onChange(props, false);
      this.setState({ data: props });
    } else {
      this.setState({ [location]: value });
    }
  };

  onDelete = (i: number) => {
    //On keyword tag delete
    let keywordsArray = this.props.data.keywordsArray;
    keywordsArray.splice(i, 1);
    let string = "";
    Object.keys(keywordsArray).forEach((idx) => {
      const item = keywordsArray[idx];
      string += `${item.name}, `;
    });
    this.onChange(keywordsArray, "keywordsArray");
    this.onChange(string, "keywords");
  };

  onAddition = (tag: any) => {
    //On adding a keyword tag
    let keywordsArray = this.props.data.keywordsArray;
    keywordsArray.push({ name: tag.name, id: keywordsArray.length });
    let string = "";
    Object.keys(keywordsArray).forEach((idx) => {
      const item = keywordsArray[idx];
      string += `${item.name}, `;
    });
    this.onChange(keywordsArray, "keywordsArray");
    this.onChange(string, "keywords");
  };

  addPerformAction = (e: any, type: string) => {
    //Adds a perform action that takes place when user clicks submit. TODO: A menu will pop up and user will accept that will details all major changes that will be made on save
    let performAction = this.state.performActionOnUpdate;
    performAction[type] = e;
    this.setState({ performActionOnUpdate: performAction });
  };

  saveData = () => {
    //Saves Data
    this.setState({ saving: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const awaitActions = Object.keys(this.state.performActionOnUpdate).map(
        async (idx) => {
          const action = this.state.performActionOnUpdate[idx];
          if (action && action.action) {
            await action.action();
          }
          return true;
        }
      );
      await Promise.all(awaitActions);

      const response = await serverCall(
        "/seo/update",
        "put",
        { data: this.props.data },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );

      this.setState({ saving: false });
      this.props.onChangeComplete(this.props.data.path); //TODO: onChangeComplete is a callback that informs client that a change has been made to SEO. Optionally they can use webhooks to revalidate their pages
      hideModal(); //Hides Modal
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
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
        ) : (
          <>
            <div className="form-floating mb-3">
              <PagePhotos
                onChange={this.onChange}
                image={this.props.data.image}
                newImage={this.state.newImage}
                addPerformActionOnUpdate={this.addPerformAction}
                data={this.props.data}
                file={this.state.file}
                user={this.props.user}
              />
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="title"
                placeholder="Home - Stark Industries"
                onChange={(e) => {
                  this.onChange(e.target.value, "title");
                }}
                value={this.props.data.title}
              />
              <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Page Description"
                id="description"
                onChange={(e) => {
                  this.onChange(e.target.value, "description");
                }}
                value={this.props.data.description}
                style={{ minHeight: 200 }}
              />
              <label htmlFor="description">Page Description</label>
            </div>
            <ReactTags
              ref={this.reactTags}
              tags={this.props.data.keywordsArray}
              onDelete={this.onDelete}
              onAddition={this.onAddition}
              placeholderText={"Add Page Keywords"}
              allowNew={true}
              allowBackspace={true}
            />
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="follow"
                aria-label="Should search engines follow the page?"
                value={this.props.data.follow}
                onChange={(e) => {
                  this.onChange(e.target.value, "follow");
                }}
              >
                <option>Open this select menu</option>
                <option value="follow">Follow</option>
                <option value="nofollow">No Following</option>
              </select>
              <label htmlFor="follow">
                Should search engines follow the page?
              </label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="index"
                aria-label="Should search engines index the page?"
                value={this.props.data.index}
                onChange={(e) => {
                  this.onChange(e.target.value, "index");
                }}
              >
                <option>Open this select menu</option>
                <option value="index">Index</option>
                <option value="noindex">No Index</option>
              </select>
              <label htmlFor="index">
                Should search engines index the page?
              </label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="changeFreq"
                aria-label="How often will the content change?"
                value={this.props.data.changeFreq}
                onChange={(e) => {
                  this.onChange(e.target.value, "changeFreq");
                }}
              >
                <option>Open this select menu</option>
                <option value="always">Always</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
              <label htmlFor="changeFreq">
                How often will the content change?
              </label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="priority"
                aria-label="Page Priority"
                value={this.props.data.priority}
                onChange={(e) => {
                  this.onChange(e.target.value, "priority");
                }}
              >
                <option>Open this select menu</option>
                <option value={0.1}>1</option>
                <option value={0.2}>2</option>
                <option value={0.3}>3</option>
                <option value={0.4}>4</option>
                <option value={0.5}>5</option>
                <option value={0.6}>6</option>
                <option value={0.7}>7</option>
                <option value={0.8}>8</option>
                <option value={0.9}>9</option>
                <option value={1.0}>10</option>
              </select>
              <label htmlFor="priority">
                Page Priority (10 being the highest)
              </label>
            </div>
            <div className="modal-footer">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  id={"close-seo-manager"}
                  onClick={this.props.resetData}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={authSignOut}
                >
                  Sign Out
                </button>
                {this.state.saving ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">saving...</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveData}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Manager;
