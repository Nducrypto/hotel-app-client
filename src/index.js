import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import { SearchContextProvider } from "./States/Context/ContextProvider";
import { AuthContextProvider } from "./States/Context/AuthContext";
import Reducer from "./States/Reducer";

const store = legacy_createStore(Reducer, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <SearchContextProvider> */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    {/* </SearchContextProvider> */}
  </Provider>
);

// reportWebVitals();
