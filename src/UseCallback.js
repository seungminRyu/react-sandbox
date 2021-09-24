// useMemo는 특정 결과값을 재사용 할 때 사용하는 반면,
// useCallback은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

// 아래의 onCreate, onRemove, onToggle는 컴포넌트가 리렌더링 될 때마다 새로 만들어진다.
// 따라서 useCallback을 활용하여 함수를 재사용할 수 있다.

import React, { useMemo, useRef, useState, useCallback } from "react";
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function UseCallback() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);
  
  const nextId = useRef(4);
  const onCreate = useCallback(
    () => {
      const user = {
        id: nextId.current,
        username,
        email
      };
      setUsers(users.concat(user));
  
      setInputs({
        username: '',
        email: ''
      });
      nextId.current += 1;
    }, 
    [users, username, email]
  );

  const onRemove = useCallback(
    id => {
      setUsers(users.filter(user => user.id !== id));
    },
    [users]
  );
  

  const onToggle = useCallback(
    id => {
      setUsers(
        users.map(user => 
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );
  // 함수 내에 사용하는 state 또는 props가 있다면, 꼭 deps 배열안에 포함시켜야 한다.
  // deps배열안에 함수에서 사용하는 값을 넣지 않게 되면, 함수 내에서 해당 값들을 참조할때 가장 최신값을 보장할 수 없다.
  
  // useCallback은 useMemo 기반으로 만들어 졌다. 다만 함수 위해서 사용할때 더 편하게 해준 것 뿐이다.
  // 따라서 다음과 같이도 사용할수 있다.
  // const onToggle = useCallback(
  //   () => id => {
  //     setUsers(
  //       users.map(user => 
  //         user.id === id ? { ...user, active: !user.active } : user
  //       )
  //     );
  //   },
  //   [users]
  // ); 

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
      <div>활성사용자 수 : {count}</div>
    </>
  )
}

export default UseCallback;