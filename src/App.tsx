import React from "react";
import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';
import ReducerCounter from './ReducerCounter';
import ReducerSample  from "./ReducerSample";

function App() {
  const onClick = (name: string) => console.log(`${name} says hello`);

  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Sandbox</h1>
      </header>
      <Greetings name="react & typescript" mark="😎" optional="new app" onClick={onClick} />
      <Counter/>
      <MyForm onSubmit={onSubmit} />
      <ReducerCounter/>
      <ReducerSample/>
    </div>
  );
}

export default App;
