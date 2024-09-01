import { MdPlayCircleOutline } from "react-icons/md";
import { Movie } from "../types/Movie";
import { cn, imageSrcMovie } from "../utils";
import { Image } from "./Image";

type Props = {
  movie: Movie;
  onPlayTrailer?: () => void;
  isRecommendation?: boolean;
  onClick?: () => void;
};

export const CardMovie = ({
  movie,
  onPlayTrailer,
  isRecommendation,
  onClick,
}: Props) => {
  return (
    <div
      className="h-full relative cursor-pointer"
      onClick={() => (onClick ? onClick() : "")}
    >
      <div className="p-2 w-full text-left absolute bottom-0">
        <div
          className={cn(
            "flex items-center",
            isRecommendation ? "justify-between" : ""
          )}
        >
          {/* Section étoile et votes, cachée si c'est une recommandation */}
          {!isRecommendation && (
            <div className="flex items-center">
              <StarIcon />
              <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                {movie.voteAverage.toFixed(1)}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <p className="text-sm font-medium">{movie.voteCount} votes</p>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h5 className="my-2 font-bold tracking-tight">{movie.title}</h5>
          {isRecommendation && (
            <div className="flex items-center">
              <StarIcon />
              <p className="ms-1 text-sm font-bold text-gray-900 dark:text-white">
                {movie.voteAverage.toFixed(1)}
              </p>
            </div>
          )}
        </div>
      </div>

      {onPlayTrailer && (
        <div className="p-2 absolute right-0">
          <button
            className="rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onPlayTrailer();
            }}
          >
            <MdPlayCircleOutline size={22} />
          </button>
        </div>
      )}

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
          className="rounded-0 rounded-md max-h-[200px]"
        />
      )}
    </div>
  );
};

const StarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-300 me-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);
