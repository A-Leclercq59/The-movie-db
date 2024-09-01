import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getPopulars, getTrailers, getTrendings } from "../../api/api";
import { CardMovie } from "../../components/CardMovie";
import { Loading } from "../../components/Loading";
import { Section } from "../../components/Section";
import { SliderContainer } from "../../components/SliderContainer";
import { TrailerModal } from "../../components/TrailerModal";
import { Movie } from "../../types/Movie";
import { mergeMovies, useDynamicTitle } from "../../utils";

const Home = () => {
  const navigate = useNavigate();

  useDynamicTitle("TheMovieDB");

  const [trendings, setTrendings] = useState<Movie[] | undefined>(undefined);
  const [populars, setPopulars] = useState<Movie[] | undefined>(undefined);

  const [trailer, setTrailer] = useState<{ src: string; title: string }>({
    src: "",
    title: "",
  });

  const playTrailer = async (movie: Movie) => {
    const trailers = await getTrailers(movie.mediaType, movie.id);

    if (trailers.length !== 0) {
      setTrailer({
        src: `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`,
        title: movie.title || "Trailer",
      });
    }
  };

  const fetchTrending = async () => {
    const movies = await getTrendings("movie");
    const tvs = await getTrendings("tv");

    setTrendings(mergeMovies(movies, tvs));
  };

  const fetchPopulars = async () => {
    const movies = await getPopulars("movie");
    const tvs = await getPopulars("tv");

    setPopulars(mergeMovies(movies, tvs));
  };

  useEffect(() => {
    fetchTrending();
    fetchPopulars();
  }, []);

  if (trendings === undefined || populars === undefined) {
    return <Loading />;
  }

  return (
    <main className="flex-grow">
      <TrailerModal
        onHide={() => setTrailer({ src: "", title: "" })}
        infos={trailer}
      />
      <Section
        title="Trending Today"
        className="py-0 flex flex-col gap-7 mb-12"
        hidden={trendings.length === 0}
        aria-label="Trending Movies and TV Shows"
      >
        <SliderContainer autoPlay>
          {trendings.map((movie, index) => (
            <CardMovie
              movie={movie}
              key={index}
              onPlayTrailer={() => playTrailer(movie)}
              onClick={() => navigate(`/${movie.mediaType}/${movie.id}`)}
            />
          ))}
        </SliderContainer>
      </Section>
      <Section
        title="Popular"
        className="py-0 flex flex-col gap-7"
        hidden={populars.length === 0}
        aria-label="Popular Movies and TV Shows"
      >
        <SliderContainer>
          {populars.map((movie, index) => (
            <CardMovie
              movie={movie}
              key={index}
              onPlayTrailer={() => playTrailer(movie)}
              onClick={() => navigate(`/${movie.mediaType}/${movie.id}`)}
            />
          ))}
        </SliderContainer>
      </Section>
    </main>
  );
};

export default Home;
