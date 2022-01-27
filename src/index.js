import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import rootReducer from "./redux-2-module";
import rootReducer from "./redux-middleware-1-intro/modules";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import myLogger from "./redux-middleware-2-create-middleware/middlewares/myLogger";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const store = createStore(
    rootReducer,
    // looger 를 사용할때는 logger가 가장 마지막에 와야한다.
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
