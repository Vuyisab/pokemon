import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemon(res.data.results.map((p) => p.name));
        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
        setLoading(false);
      });

    return () => cancel();
  }, [currentPageUrl]);

  if (loading) return <p>Loading ...</p>;

  const gotoNextPage = () => setcurrentPageUrl(nextPageUrl);
  const gotPreviousPage = () => setcurrentPageUrl(previousPageUrl);

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPreviousPage={previousPageUrl ? gotPreviousPage : null}
      />
    </>
  );
}

export default App;
