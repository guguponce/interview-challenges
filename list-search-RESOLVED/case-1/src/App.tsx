import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";

const formatter = new Intl.NumberFormat(navigator.language.slice(3), {
  style: "currency",
  currency: "ARS", 
});

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [order, setOrder] = useState("");
  useEffect(() => {
    const quer = localStorage.getItem("query");
    const order = localStorage.getItem("order");

    if (typeof quer === "string") {
      setQuery(quer);
    }
    if (typeof order === "string") {
      setOrder(order);
    }
  }, []);

  const handleOrder = (order: string, prod: Product[]) => {
    const newOrder =
      order === "AZ"
        ? [...prod].sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase()
              ? -1
              : a.title.toLowerCase() > b.title.toLowerCase()
              ? 1
              : 0
          )
        : order === "price"
        ? [...prod].sort((a, b) => a.price - b.price)
        : prod;
    return newOrder;
  };

  useEffect(() => {
    api
      .search(query ? query : "")
      .then((res) => setProducts(handleOrder(order, res)));
  }, [query]);

  useEffect(() => {
    setProducts(handleOrder(order, products));
  }, [order]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          localStorage.setItem("query", e.target.value);
        }}
      />
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
          localStorage.setItem("order", e.target.value);
        }}
        name="order"
        id="order"
      >
        <option value="default">Default</option>
        <option value="AZ">A-Z</option>
        <option value="price">Price</option>
      </select>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>{formatter.format(product.price)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
