import React from "react";
import Greetings from './Greetings';

function App() {
  const onClick = (name: string) => console.log(`${name} says hello`);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Sandbox</h1>
      </header>
      <Greetings name="react & typescript" mark="😎" optional="new app" onClick={onClick} />
    </div>
  );
}

export default App;
