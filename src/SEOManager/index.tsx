//React
import React from "react";
//Redux
import { Provider } from "react-redux";
//Reducers
import store from "./redux/store";

//App.tsx
import App from "./app";

import { Options } from "./interfaces";

export default class index extends React.Component<Options> {
  constructor(props: Options) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App {...this.props} />
      </Provider>
    );
  }
}
