import React from "react";
import UseMemoApp from "./17-UseMemo/UseMemoApp";
import UseCallbackApp from "./18-UseCallback/UseCallbackApp";
import CustomHookApp from "./21-CustomHooks/CustomHookApp";
import ContextApiApp from "./22-ContextAPI/ContextApiApp";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Sandbox</h1>
                {/* <UseMemoApp /> */}
                {/* <UseCallbackApp /> */}
                {/* <CustomHookApp /> */}
                <ContextApiApp />
            </header>
        </div>
    );
}

export default App;
