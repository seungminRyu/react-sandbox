import React, { useState, useEffect } from "react";
import axios from "axios";

const END_POINT = "https://jsonplaceholder.typicode.com";

function ApiUsers() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            //  요청이 시작 될때는 error, users 를  초기화 하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꾼다.
            setLoading(true);
            const res = await axios.get(`${END_POINT}/users`);
            setUsers(res.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default ApiUsers;
