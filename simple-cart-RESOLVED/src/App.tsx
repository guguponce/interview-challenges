import { useEffect, useState, useContext } from "react";

import api from "./api";
import { carritoContext } from "./context/CarritoContext";
import { Product } from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentHover, setCurrentHover] = useState<string[]>([]);
  const { carrito, amountToPay, totalAmountProducts, handleAdd, handleRemove } =
    useContext(carritoContext);
  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  return (
    <main>
      <header>Estampitiency</header>
      <section>
        {products.map((product) => (
          <article
            key={product.id}
            onMouseEnter={() => setCurrentHover([product.id])}
            onMouseLeave={() =>
              setCurrentHover((current) =>
                current.filter((id) => id !== product.id)
              )
            }
            style={
              currentHover.includes(product.id)
                ? { backgroundColor: "#ffffff" }
                : {}
            }
          >
            <img src={product.image} />
            <div>
              <div className="productNamePrice">
                <p className="nameTag">{product.title}</p>
                <p className="priceTag">${product.price}</p>
              </div>
              <p>{product.description}</p>
            </div>
            {carrito.some((prod) => prod.id === product.id) ? (
              <div className="quantityContainer">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="quantityBtn minusBtn"
                >
                  -
                </button>
                <div className="quantityDisplay">
                  {carrito.find((prod) => prod.id == product.id)?.quantity}
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className="quantityBtn plusBtn"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleAdd(product);
                }}
              >
                Agregar
              </button>
            )}
          </article>
        ))}
      </section>
      <aside>
        <button>
          {totalAmountProducts} productos (total: ${amountToPay})
        </button>
      </aside>
      <footer>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">
          acá
        </a>
      </footer>
    </main>
  );
}

export default App;
