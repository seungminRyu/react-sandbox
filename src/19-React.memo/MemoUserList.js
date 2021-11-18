import React from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
    return (
        <div>
            <b
                style={{
                    cursor: "pointer",
                    color: user.active ? "green" : "black",
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
});

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

// React.memo에서 두번째 파라미터에 propsAreEqual이라는 함수를 사용하여 특정 값들만 비교를 하는것도 가능하다.
// export default React.memo(UserList);
export default React.memo(
    UserList,
    (prevProps, nextProps) => prevProps.users === nextProps.users
);
