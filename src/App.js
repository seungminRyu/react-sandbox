import React from "react";
import UseMemoApp from "./17-UseMemo/UseMemoApp";
import UseCallbackApp from "./18-UseCallback/UseCallbackApp";
import ReactMemoApp from "./19-React.memo/ReactMemoApp";
import CustomHookApp from "./21-CustomHooks/CustomHookApp";
import ContextApiApp from "./22-ContextAPI/ContextApiApp";
// import CounterContainer from "./redux-3-make-counter/CounterContainer";
import TodosContainer from "./redux-4-make-todo/TodosContainer";
import ImmerApp from "./23-immer/ImmerApp";
import ApiUsers from "./API-1-basic/ApiUsers";
import CounterContainer from "./redux-middleware-1-intro/CounterContainer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Sandbox</h1>
                {/* <UseMemoApp /> */}
                {/* <UseCallbackApp /> */}
                {/* <ReactMemoApp /> */}
                {/* <CustomHookApp /> */}
                {/* <ContextApiApp /> */}
                {/* <CounterContainer />
                <hr />
                <TodosContainer /> */}
                {/* <ImmerApp /> */}
                {/* <ApiUsers /> */}
                <CounterContainer />
            </header>
        </div>
    );
}

export default App;
