import type { Product } from "./types";

import { useEffect, useRef, useState } from "react";

import api from "./api";

function Recommended() {
  let products = useRef<Product[]>([]);

  useEffect(() => {
    api.search().then((res) => {
      products.current = res
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .slice(0, 2);
    });
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {[...products.current].map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const initialProducts = useRef<Product[]>([]);
  const [favProducts, setFavProducts] = useState<string[]>([]);
  useEffect(() => {
    setProducts(
      initialProducts.current.filter((prod) => prod.title.includes(query))
    );
  }, [query]);

  useEffect(() => {
    api.search(query).then((res) => {
      initialProducts.current = res;
      setProducts(res);
    });
    const localFav = localStorage.getItem("fav");
    if (typeof localFav === "string") {
      setFavProducts((prev) => {
        if (typeof localFav === "string") {
          return localFav.split(",");
        } else {
          return prev;
        }
      });
    }
  }, []);

  useEffect(() => {
    !!favProducts.length && localStorage.setItem("fav", favProducts.join(","));
  }, [favProducts]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li
            className={favProducts.includes(product.id + "") ? "fav" : ""}
            key={product.id}
            onClick={() =>
              setFavProducts((prev) =>
                prev.includes(product.id + "")
                  ? [...prev].filter((prod) => prod !== product.id + "")
                  : [...prev, product.id + ""]
              )
            }
          >
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
