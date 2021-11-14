// 벨로퍼트 리액트
// 17 - useMemo 를 사용하여 연산한 값 재 사용하기

import React, { useMemo, useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
};

function UseMemoApp() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
    });

    const { username, email } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const [users, setUsers] = useState([
        {
            id: 1,
            username: "velopert",
            email: "public.velopert@gmail.com",
            active: true,
        },
        {
            id: 2,
            username: "tester",
            email: "tester@example.com",
            active: false,
        },
        {
            id: 3,
            username: "liz",
            email: "liz@example.com",
            active: false,
        },
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email,
        };
        setUsers(users.concat(user));

        setInputs({
            username: "",
            email: "",
        });
        nextId.current += 1;
    };

    const onRemove = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };
    const onToggle = (id) => {
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    };
    // const count = countActiveUsers(users);
    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
            <h2>useMemo</h2>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            {/* 
              활성 사용자 수를 세는건, users 에 변화가 있을때만 세야되는건데,
              input 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 불필요한 자원이 낭비된다.
              useMemo를 활용하여 이전에 계산 한 값을 재사용할 수 있다.
            */}
            <div>활성사용자 수 : {count}</div>
        </>
    );
}

export default UseMemoApp;
