// 벨로퍼트 리액트 21/11/18
// 19 - React.Memo를 사용하여 컴포넌트 리렌더링 방지

// React.memo는 컴포넌트의 props가 바뀌지 않았다면 리렌더링을 방지한다.
// 이 함수를 활용하여 컴포넌트가 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정하여 컴포넌트의 리렌더링 성능을 최적화 해줄 수 있다.

import React, { useMemo, useRef, useState, useCallback } from "react";
import UserList from "./MemoUserList";
import CreateUser from "./MemoCreateUser";

const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
};

function UseCallbackApp() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
    });
    const { username, email } = inputs;

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

    // User들 중 하나를 클릭하여 비활성/활성화 할 때마다 모든 User들이 리렌더링 되고 CreateUser도 리렌더링 된다.
    // Why? -> users 배열이 바뀔때마다 onCreate도 새로 만들어지고, onToggle, onRemove도 새로 만들어지기 때문이다.

    // 이를 최적화 하기 위해서는 deps에서 users를 지우고, 함수들에서 현재 useState로 관리하는 users를 참조하지 않게 해야한다.
    // 함수형 업데이트를 활용햐면 setUsers에 등록하는 콜백함수의 파라미터에서 최신 users를 참조하기 때문에
    // deps에 users를 넣지 않아도 된다.

    // const onChange = useCallback(
    //     (e) => {
    //         const { name, value } = e.target;
    //         setInputs({
    //             ...inputs,
    //             [name]: value,
    //         });
    //     },
    //     [inputs]
    // );
    // -> 기존의 onChange의 deps에는 inputs이 있었다.
    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({
            ...inputs,
            [name]: value,
        }));
    }, []);
    // -> setInputs를 함수형 업데이트로 바꾸어 최신 inputs와의 의존성을 없앤다.

    // const onCreate = useCallback(() => {
    //     const user = {
    //         id: nextId.current,
    //         username,
    //         email,
    //     };
    //     setUsers(users.concat(user));

    //     setInputs({
    //         username: "",
    //         email: "",
    //     });
    //     nextId.current += 1;
    // }, [users, username, email]);
    const onCreate = useCallback(() => {
        const user = {
            id: nextId.current,
            username,
            email,
        };

        setUsers((users) => users.concat(user));
        setInputs({
            username: "",
            email: "",
        });
        nextId.current += 1;
    }, [username, email]);
    // -> setUsers를 함수형 업데이트로 바꾸어 deps에서 users를 뺄수있게 됐다.

    // const onRemove = useCallback(
    //     (id) => {
    //         setUsers(users.filter((user) => user.id !== id));
    //     },
    //     [users]
    // );
    const onRemove = useCallback((id) => {
        setUsers((users) => users.filter((user) => user.id !== id));
    }, []);
    // -> setUsers를 함수형 업데이트로 바꾸어 deps에서 users를 뺄수있게 됐다.

    // const onToggle = useCallback(
    //     (id) => {
    //         setUsers(
    //             users.map((user) =>
    //                 user.id === id ? { ...user, active: !user.active } : user
    //             )
    //         );
    //     },
    //     [users]
    // );
    const onToggle = useCallback((id) => {
        setUsers((users) =>
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    }, []);
    // -> setUsers를 함수형 업데이트로 바꾸어 deps에서 users를 뺄수있게 됐다.

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
            <h2>useCallback</h2>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성사용자 수 : {count}</div>
        </>
    );
}

export default UseCallbackApp;
