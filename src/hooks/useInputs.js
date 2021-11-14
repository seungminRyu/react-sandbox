// 벨로퍼트 리액트 21/11/14
// 21 - 커스텀 Hooks 만들기

// 컴포넌트를 만들때, 반복되는 로직들을 커스텀 Hooks로 만들어서 로직을 재사용 한다.
// 예를들어 input을 관리하는 코드는 비슷한 코드가 많이 반복되므로 hook으로 만들 수 있다.

import { useState, useCallback } from "react";

function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((form) => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;
