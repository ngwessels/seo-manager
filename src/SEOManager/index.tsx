//React
import React from "react";
//Redux
import { Provider } from "react-redux";
//Reducers
import store from "./redux/reducers/rootReducer";

//Mui
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({});

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
        <ThemeProvider theme={theme}>
          <App {...this.props} />
        </ThemeProvider>
      </Provider>
    );
  }
}
