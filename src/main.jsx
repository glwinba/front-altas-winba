import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./app.css";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { userReducer } from "./reducers/usersReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


// const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composedEnhacers = composeAlt(applyMiddleware(thunk));

const store = createStore(userReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
