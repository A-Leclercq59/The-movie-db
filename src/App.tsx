import { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "./api/api";
import Router from "./router/Router";
import { Genre } from "./types/Genre";

type GenresState = {
  movie: Genre[];
  tv: Genre[];
  person: Genre[];
};

const GlobalContext = createContext({
  genres: {
    movie: [] as Genre[],
    tv: [] as Genre[],
    person: [] as Genre[],
  },
});

export const useGlobalContext = () => useContext(GlobalContext);

function App() {
  const [genres, setGenres] = useState<GenresState>({
    movie: [],
    tv: [],
    person: [],
  });

  const fetchGenres = async () => {
    const movie = await getGenres("movie");
    const tv = await getGenres("tv");

    setGenres({
      movie,
      tv,
      person: [],
    });
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          genres,
        }}
      >
        <Router />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
