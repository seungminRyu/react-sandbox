import React, { useState } from "react";

// Todo를 위한 프리젠테이셔널 컴포넌트 Todos
// TodoItem, TodoList, Todos 이렇게 3가지의 컴포넌트로 만든다. 여러개의 컴포넌트를
// 만드는 이유는 컴포넌트의 리렌더링 성능을 최적화하기 위함이다.

// 컴포넌트 최적화를 위하여 React.memo를 사용한다.
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
    return (
        <li
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
            onClick={() => onToggle(todo.id)}
        >
            {todo.text}
        </li>
    );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용한다.
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
            ))}
        </ul>
    );
});

function Todos({ todos, onCreate, onToggle }) {
    // 리덕스를 사용한다고 해서 모든 상태를 리덕스로 관리해야하는 것은 아니다.
    const [text, setText] = useState("");
    const onChange = (e) => setText(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
        onCreate(text);
        setText(""); // 인풋 초기화
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={text}
                    placeholder="할 일을 입력하세요.."
                    onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
            <TodoList todos={todos} onToggle={onToggle} />
        </div>
    );
}

export default Todos;
