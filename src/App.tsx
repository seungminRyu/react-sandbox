import React from "react";
import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';

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
      <h2>Greetings</h2>
      <Greetings name="react & typescript" mark="😎" optional="new app" onClick={onClick} />
      <h2>Counter</h2>
      <Counter/>
      <h2>My Form</h2>
      <MyForm onSubmit={onSubmit} />
    </div>
  );
}

export default App;
