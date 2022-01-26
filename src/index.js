import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import rootReducer from "./redux-2-module";
import rootReducer from "./redux-middleware-1-intro/modules";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import myLogger from "./redux-middleware-2-create-middleware/myLogger";
import logger from "redux-logger";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(myLogger, logger))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
