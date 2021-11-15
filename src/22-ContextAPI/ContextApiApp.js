// 벨로퍼트 리액트 21/11/15
// 22 - context API를 사용한 전역 값 관리

import React, {
    useCallback,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import UserList from "./ContextApiUserList";
import CreateUser from "../CreateUser";
import useInputs from "../hooks/useInputs";

const countActiveUsers = (users) => {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
};

const initialState = {
    users: [
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
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case "CREATE_USER":
            return {
                users: state.users.concat(action.user),
            };
        case "TOGGLE_USER":
            return {
                users: state.users.map((user) =>
                    user.id === action.id
                        ? { ...user, active: !user.active }
                        : user
                ),
            };
        case "REMOVE_USER":
            return {
                users: state.users.filter((user) => user.id !== action.id),
            };
        default:
            return state;
    }
}

// UserDispatch라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);

function ContextApiApp() {
    const [{ username, email }, onChange, reset] = useInputs({
        username: "",
        email: "",
    });

    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: {
                id: nextId.current,
                username,
                email,
            },
        });
        reset();
        nextId.current += 1;
    }, [username, email, reset]);

    const onRemove = useCallback((id) => {
        dispatch({
            type: "REMOVE_USER",
            id,
        });
    }, []);

    const onToggle = useCallback((id) => {
        dispatch({
            type: "TOGGLE_USER",
            id,
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        // Context 안의 Provider라는 컴포넌트의 value를 통해 Context의 값을 정할 수 있다.
        // Provider에 의해 감싸진 컴포넌트 중 어디서든지 Context의 값을 다른 곳에서 바로 조회하고 사용할 수 있다.
        <UserDispatch.Provider value={dispatch}>
            <h2>Context API</h2>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            {/* 
                이제 UserList 컴포넌트에서도 onRemove와 onToggle을 prop으로 받지않고
                context로 부터 가져올 수 있다.
             */}
            {/* context 사용 전 */}
            {/* <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> */}
            {/* context 사용 후 */}
            {/* UserList 컴포넌트 내부에서 context로 부터 dispatch를 가져온다. */}
            <UserList users={users} />
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default ContextApiApp;
