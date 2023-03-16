import type { Item } from "./types";

import { useEffect, useRef, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    const id = items ? items.length + Math.random() : Math.random();
    const text = inputRef.current?.value ? inputRef.current?.value : "";
    // if (!/^\s+$/.test(text) && text !== "") {
    setItems((prev) => {
      formRef.current?.reset();
      return prev
        ? [...prev, { id, text, completed: false }]
        : [{ id, text, completed: false }];
    });

    // Should implement
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);
  if(!items.length){ return (<p>Loading...</p>)}
  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form ref={formRef} onSubmit={handleAdd}>
        <input ref={inputRef} name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text}{" "}
            <button onClick={() => handleRemove(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
