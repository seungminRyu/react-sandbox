import React, { useReducer } from "react";

type Color = 'red' | 'orange' | 'yellow';

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: Color }
  | { type: 'TOGGLE_GOOD' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      };
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hello',
    color: 'red',
    isGood: true
  });

  const onSetCount = () => dispatch({ type: 'SET_COUNT', count: 5 });
  const onSetText = () => dispatch({ type: 'SET_TEXT', text: 'hi' });
  const onSetColor = () => dispatch({ type: 'SET_COLOR', color: 'red' });
  const onToggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <div>
      <h2>Reducer Sample</h2>
      <p>
        <code>count: </code> {state.count}
      </p>
      <p>
        <code>text: </code> {state.text}
      </p>
      <p>
        <code>color: </code> {state.color}
      </p>
      <p>
        <code>isGood: </code> {state.isGood ? 'true' : 'false'}
      </p>
      <div>
        <button onClick={onSetCount}>set count</button>
        <button onClick={onSetText}>set text</button>
        <button onClick={onSetColor}>set color</button>
        <button onClick={onToggleGood}>toggle good</button>
      </div>
    </div>
  );
}

export default ReducerSample;