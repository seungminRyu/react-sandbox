import React, { useState, useRef } from "react";

// useRef는 컴포넌트에서 외부 라이브러리의 인스턴스 또는 DOM을 특정 값 안에 담을 때 사용한다.
// 추가적으로, 이를 통해 컴포넌트 내부에서 관리하고 있는 값을 관리할 때 유용하다. 단 이 값은 렌더링과 관계가 없어야 한다.
// ref 안에 DOM을 담을 때는 초기값을 null로 설정 한다.

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
}

function MyForm({ onSubmit }: MyFormProps) {
  const $input = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const { name, description } = form;
  
  // 이벤트의 타입도 지정 해야한다.
  const onChange = (e: 
    React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    });
    
    if (!$input.current) return;
    $input.current.focus();  
  };

  return (
    <div>
      <h2>My Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={name} onChange={onChange} ref={$input} />
        <textarea name="description" value={description} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default MyForm;