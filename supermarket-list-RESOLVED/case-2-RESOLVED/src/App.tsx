import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    if (items) {
      setItems(
        [...items].map((it) => {
          if (it.id === id) {
            it.completed = !it.completed;
          }
          return it;
        })
      );
    }
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    const text = event.target.text.value;
    setTimeout(() => {
      if (!/^\s+$/.test(text) && text !== "") {
        setItems((items) =>
          items.concat({
            id: +new Date(),
            completed: false,
            text,
          })
        );
      }
    }, 1000);
    event.target.text.value = "";
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(item.id);
              }}
            >
              {item.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.id);
              }}
            >
              [X]
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
