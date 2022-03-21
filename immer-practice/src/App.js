import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({
    username: '',
    name: '',
  });
  const [data, setData] = useState({
    array: [],
    uselsessValue: null,
  });
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        username: form.username,
        name: form.name,
      };
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );
      setForm({
        name: '',
        username: '',
      });
      nextId.current += 1;
    },
    [form.name, form.username]
  );
  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
