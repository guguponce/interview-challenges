import React, { useEffect, useState } from "react";
import api from "./api.js";

function App() {
  const [pokemon, setPokemon] = useState<{
    name: string;
    image: string;
    id: number;
  }>();
  const [gameState, setGameState] = useState<"initial" | "fail" | "guessed">(
    "initial"
  );
  const [pastPokemons, setPastPokemons] = useState<{
    correct: number[];
    incorrect: number[];
  }>({ correct: [], incorrect: [] });

  const guess = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guess.current?.value.toLowerCase().replace(/\W+/, "") === pokemon?.name.toLowerCase().replace(/\W+/, "")) {
      localStorage.setItem(
        "pastPokemons",
        JSON.stringify({
          ...pastPokemons,
          correct: [...pastPokemons?.correct, pokemon?.id],
        })
      );
      if (pokemon?.id) {
        setPastPokemons((prev) => ({
          ...prev,
          correct: [...prev?.correct, pokemon?.id],
        }));
      }
      setGameState("guessed");
    } else {
      localStorage.setItem(
        "pastPokemons",
        JSON.stringify({
          ...pastPokemons,
          incorrect: [...pastPokemons?.incorrect, pokemon?.id],
        })
      );
      if (pokemon?.id) {
        setPastPokemons((prev) => ({
          ...prev,
          incorrect: [...prev?.incorrect, pokemon?.id],
        }));
      }
      setGameState("fail");
    }
  };

  const handleNewPokemon = () => {
    setGameState("initial");
    api.random().then((res) => setPokemon(res));
  };

  useEffect(() => {
    api.random().then((res) => setPokemon(res));
    const localResults = localStorage.getItem("pastPokemons");
    if (localResults) {
      setPastPokemons(JSON.parse(localResults));
    }
  }, []);

  if (!pokemon) {
    return <main>Let&apos;s get this party started</main>;
  } else {
    return (
      <main>
        <div
          id="correct-container"
          className="pastPokemonsContainer nes-container is-rounded"
        >
          <p className="nes-badge">
            <span className="is-success">
              Guessed: {pastPokemons.correct.length}
            </span>
          </p>
          <div className="pastPokemonsImgs">
            {pastPokemons.correct.map((id) => (
              <img
                key={id}
                className="pastPokemon show"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt=""
              />
            ))}
          </div>
        </div>
        <div id="main-game" className="nes-container with-title is-centered">
          <p className="title">Which Pokemon is hidding?</p>
          <img
            id="guess-img"
            className={
              gameState === "guessed"
                ? "show"
                : gameState === "fail"
                ? "show"
                : ""
            }
            src={pokemon.image}
            alt=""
          />
          {gameState === "guessed" && (
            <div className="nes-container is-rounded">
              <p>You are correct! {pokemon.name.toUpperCase()} is yours!</p>
            </div>
          )}
          {gameState === "fail" && (
            <div className="nes-container is-rounded">
              <p>
                {pokemon.name.toUpperCase()} was hidding from you! You'll catch
                it next time!{" "}
              </p>
            </div>
          )}
          {gameState === "initial" ? (
            <form onSubmit={handleSubmit} className="nes-field">
              <label htmlFor="name_field">Which Pokemon is it?</label>

              <input
                autoFocus
                ref={guess}
                type="text"
                id="name_field"
                className="nes-input"
              />
              <button type="submit" className="nes-btn is-primary">
                Guess
              </button>
            </form>
          ) : gameState === "guessed" ? (
            <button
              className="nes-btn is-success"
              autoFocus
              onClick={() => handleNewPokemon()}
            >
              Guess another one!
            </button>
          ) : (
            <button
              className="nes-btn is-error"
              type="button"
              autoFocus
              onClick={() => handleNewPokemon()}
            >
              Try Again
            </button>
          )}
        </div>

        <div
          id="incorrect-container"
          className="pastPokemonsContainer nes-container is-rounded"
        >
          <p className="nes-badge">
            <span className="is-error">
              Guessed: {pastPokemons.incorrect.length}
            </span>
          </p>
          <div className="pastPokemonsImgs">
            {pastPokemons.incorrect.map((id) => (
              <img
                key={id}
                className="pastPokemon show"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt=""
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
