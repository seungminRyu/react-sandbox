import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import rootReducer from "./redux-2-module";
// import rootReducer from "./redux-middleware-1-intro/modules";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import myLogger from "./redux-middleware-2-create-middleware/middlewares/myLogger";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import rootReducer, {
    rootSaga,
} from "./redux-middleware-10-redux-saga/modules";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    context: {
        history: customHistory,
    },
}); // 사가 미들웨어를 만든다.

const store = createStore(
    rootReducer,
    // looger 를 사용할때는 logger가 가장 마지막에 와야한다.
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({ history: customHistory }),
            sagaMiddleware,
            logger
        )
    )
);

sagaMiddleware.run(rootSaga); //루트 사가를 실행해준다.
//  스토어 생성이 된 다음에 위 코드를 실행해야 한다.

ReactDOM.render(
    <Router history={customHistory}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);
