import React from "react";
import Greetings from './Greetings';
import Counter from './Counter';

function App() {
  const onClick = (name: string) => console.log(`${name} says hello`);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Sandbox</h1>
      </header>
      <Greetings name="react & typescript" mark="😎" optional="new app" onClick={onClick} />
      <Counter/>
    </div>
  );
}

export default App;
