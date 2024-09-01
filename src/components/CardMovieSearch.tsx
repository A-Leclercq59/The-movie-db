import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../App";
import { Movie } from "../types/Movie";
import { imageSrcMovie } from "../utils";
import { Image } from "./Image";

type Props = {
  movie: Movie;
};

export const CardMovieSearch = ({ movie }: Props) => {
  const globalContext = useGlobalContext();
  const navigate = useNavigate();

  const getGenreName = (id: number) => {
    const genre = globalContext.genres[movie.mediaType]?.find(
      (g) => g.id === id
    );
    return genre ? genre.name : "";
  };

  return (
    <article className="flex flex-col items-center w-full border rounded-lg shadow lg:flex-row lg:max-w-xl border-gray-700 bg-gray-800">
      <figure className="w-full lg:w-1/3 h-full">
        {movie.coverPath ? (
          <Image
            src={imageSrcMovie(movie.coverPath)}
            alt={movie.title}
            className="rounded-0 rounded-md"
          />
        ) : (
          <Image
            src="/search-not-found.png"
            alt={movie.title}
            className="rounded-0 rounded-md max-h-[220px]"
          />
        )}
      </figure>
      <section className="flex flex-col p-4 leading-normal h-full justify-between lg:w-2/3">
        <header className="flex flex-col">
          <div
            className="self-end"
            onClick={() => navigate(`/${movie.mediaType}/${movie.id}`)}
          >
            <FaExternalLinkAlt className="cursor-pointer hover:text-white/50" />
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.title}
          </h2>
        </header>
        <section>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 max-w-4xl">
            {movie.description}
          </p>
        </section>
        <footer>
          <div
            className="flex flex-wrap gap-y-1.5 text-sm "
            aria-label="Genres"
          >
            {movie.genreIds.map((id, i) => {
              const genreName = getGenreName(id);
              return (
                <span
                  className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-blue-900 text-white"
                  key={i}
                >
                  {genreName}
                </span>
              );
            })}
          </div>
        </footer>
      </section>
    </article>
  );
};
