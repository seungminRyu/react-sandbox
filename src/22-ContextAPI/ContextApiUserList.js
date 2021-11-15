import React, { useContext } from "react";
import { UserDispatch } from "./ContextApiApp";

// context 사용 전
// const User = React.memo(function User({ user, onRemove, onToggle }) {
// context 사용 후
const User = React.memo(function User({ user }) {
    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <b
                style={{
                    cursor: "pointer",
                    color: user.active ? "green" : "black",
                }}
                // onClick={() => onToggle(user.id)}
                onClick={() => {
                    dispatch({ type: "TOGGLE_USER", id: user.id });
                }}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            {/* <button onClick={() => onRemove(user.id)}>삭제</button> */}
            <button
                onClick={() => {
                    dispatch({ type: "REMOVE_USER", id: user.id });
                }}
            >
                삭제
            </button>
        </div>
    );
});

// context 사용 전
// function UserList({ users, onRemove, onToggle }) {
// context 사용 후
function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    // onRemove={onRemove}
                    // onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);
