import React,{ useState } from "react";

function Counter() {
  // generics를 통해 타입 설정, 하지만 useState가 알아서 유추하기 때문에 해도 되고 안해도 된다.
  const [count, setCount] = useState<number>(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  
  // 하지만, 상태가 null일 수도 있고 아닐 수도 있는 것엔 타입을 명시해야한다.
  type Information = { name: string; description: string };
  const [info, setInfo] = useState<Information | null>(null);

  // 상태의 타입이 까다로운 경우에도 명시하는것이 좋다.
  type Todo = { id: number; text: string; done: boolean };
  const [todo, setTodo] = useState<Todo[]>([]);

  return (
    <div className="counter">
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
}

export default Counter;