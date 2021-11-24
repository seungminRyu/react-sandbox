// 벨로퍼트 리액트 21/11/24
// 23 - Immer 를 사용한 더 쉬운 불변성 관리

// < 리듀서에서 Immer 사용하기 >
// 객체의 구조가 복잡하지 않은 경우 새 항목을 추가하거나 제거 할 때는 Immer를 사용하는 것 보다
// concat과 filter를 사용하는 것이 더 코드가 짧고 간단하다.

import React, {
    useCallback,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import UserList from "../22-ContextAPI/ContextApiUserList";
import CreateUser from "../CreateUser";
import useInputs from "../hooks/useInputs";
import produce from "immer";

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
            // Immer 사용 전
            // return {
            //     users: state.users.concat(action.user),
            // };
            // Immer 사용 후
            return produce(state, (draft) => {
                draft.users.push(action.user);
            });
        case "TOGGLE_USER":
            // Immer 사용 전
            // return {
            //     users: state.users.map((user) =>
            //         user.id === action.id
            //             ? { ...user, active: !user.active }
            //             : user
            //     ),
            // };
            // Immer 사용 후
            return produce(state, (draft) => {
                const user = draft.users.find((user) => user.id === action.id);
                user.active = !user.action;
            });
        case "REMOVE_USER":
            return produce(state, (draft) => {
                const index = draft.users.findIndex(
                    (user) => user.id === action.id
                );
                draft.users.splice(index, 1);
            });
        default:
            return state;
    }
}

export const UserDispatch = React.createContext(null);

function ContextApiApp() {
    const [{ username, email }, onChange, reset] = useInputs({
        username: "",
        email: "",
    });

    const [state, dispatch] = useReducer(reducer, initialState);
    const { users } = state;

    const nextId = useRef(4);

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
        <UserDispatch.Provider value={dispatch}>
            <h2>Context API</h2>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} />
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default ContextApiApp;
