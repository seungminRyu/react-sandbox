import React from "react";
import UseMemoApp from "./UseMemo";
import UseCallbackApp from "./UseCallback";
import CustomHookApp from "./CustomHook";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Sandbox</h1>
                {/* <UseMemoApp /> */}
                <UseCallbackApp />
                {/* <CustomHookApp /> */}
            </header>
        </div>
    );
}

export default App;
