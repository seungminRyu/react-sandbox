// 벨로퍼트 리액트 21/11/14
// 21 - 커스텀 Hooks 만들기

import React, {
    useCallback,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";

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

function CustomHookApp() {
    // hook 사용 이전
    // const [inputs, setInputs] = useState({
    //     username: "",
    //     email: "",
    // });
    // const { username, email } = inputs;

    // const onChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputs({
    //         ...inputs,
    //         [name]: value,
    //     });
    // };
    // -> 항상 input 을 만들기 위해 사용하는 코드들을 hook으로 만든다.

    // hook 사용 이후
    const [{ username, email }, onChange, reset] = useInputs({
        username: "",
        email: "",
    });
    // -> input을 위한 state, onChange, reset을 모두 hook으로 받아온다.

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
        <>
            <h2>Custom Hooks</h2>
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

export default CustomHookApp;
