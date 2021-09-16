import React, { useReducer } from "react";

// action을 or로 모두 나열
type Action = { type: 'INCREASE' } | { type: 'DECREASE' } | { type: 'DOUBLE' } | { type: 'RESET' };

// state의 타입은 number, reducer의 타입도 number 이다.
// 이렇게 리듀서는 받아오는 파라미터의 타입과 리턴타입을 일치 시키는 것이 중요하다.
// 이를 통해 특정 케이스의 리턴값을 반환 하지 않았거나, 상태의 타입이 바뀌게 되었을 경우의 에러를 감지해낼 수 있다.
function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    case 'DOUBLE':
      return state * 2;
    case 'RESET':
      return 0;
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerCounter() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });
  const onDouble = () => dispatch({ type: 'DOUBLE' });
  const onReset = () => dispatch({ type: 'RESET' });

  return (
    <div>
      <h2>Reducer Counter</h2>
      <p>{count}</p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <button onClick={onDouble}>x</button>
      <button onClick={onReset}>RS</button>
    </div>
  );
}

export default ReducerCounter;