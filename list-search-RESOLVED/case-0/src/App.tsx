import type { Product } from "./types";

import { useEffect, useState } from "react";

import api, { PRODUCTS } from "./api";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    api
      .search(query)
      .then()
      .then((res) => {
        setProducts(res);
        setIsLoading(false);
      });
  }, [query]);

  if (!products) {
    return <h3>Cargando...</h3>;
  }
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
        {isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          products.map((product) => (
            <li className={product.price <= 100 ? "sale" : ""} key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;
