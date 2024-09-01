import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../../api/api";
import { CardMovieSearch } from "../../components/CardMovieSearch";
import { Section } from "../../components/Section";
import { Movie } from "../../types/Movie";
import { useDynamicTitle } from "../../utils";

const Search = () => {
  const [params] = useSearchParams();
  const page = useRef(1);
  const totalPage = useRef(2);
  const loadingRef = useRef(false);
  const totalResults = useRef(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const query = params.get("q");

  useDynamicTitle(`Search - ${query} - TheMovieDB`);

  const fetchSearch = async () => {
    if (loadingRef.current || page.current > totalPage.current) return;

    loadingRef.current = true;

    if (query && query.trim() !== "") {
      const {
        movies: newMovies,
        totalPages,
        totalResults: numberResults,
      } = await search(query, page.current);

      totalPage.current = totalPages;
      page.current = page.current + 1;
      totalResults.current = numberResults;

      const filteredMovies = newMovies.filter(
        (movie) => movie.mediaType !== "person"
      );

      setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
    }
    loadingRef.current = false;
  };

  useEffect(() => {
    setMovies([]);
    page.current = 1;
    fetchSearch();
  }, [params]);

  const onWindowScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 100
    ) {
      fetchSearch();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return (
    <div className="flex-grow">
      <Section
        title={`Search results for '${params.get("q")}'`}
        className="py-0 flex flex-col mb-12"
        hidden={movies.length === 0}
      >
        <div className="mt-4 font-medium">
          <p>Totals: {totalResults.current}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          {movies.map((movie, i) => (
            <CardMovieSearch movie={movie} key={i} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Search;
