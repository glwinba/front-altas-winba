import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./app.css";
import { legacy_createStore as createStore } from "redux";
import { userReducer } from "./reducers/usersReducer";
import { Provider } from "react-redux";

const store = createStore(userReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
