import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCasts,
  getDetail,
  getRecommendations,
  getTrailers,
} from "../../api/api";
import { useGlobalContext } from "../../App";
import { CardCast } from "../../components/CardCast";
import { CardMovie } from "../../components/CardMovie";
import { CardSeason } from "../../components/CardSeason";
import { CardTrailer } from "../../components/CardTrailer";
import { Image } from "../../components/Image";
import { Loading } from "../../components/Loading";
import { Section } from "../../components/Section";
import { SliderContainer } from "../../components/SliderContainer";
import { TrailerModal } from "../../components/TrailerModal";
import { Cast } from "../../types/Cast";
import { MediaType } from "../../types/MediaType";
import { Movie } from "../../types/Movie";
import { Trailer } from "../../types/Trailer";
import {
  formatDate,
  formattedRuntime,
  imageSrcMovie,
  youtubeThumbnail,
} from "../../utils";
import NotFound from "../NotFound/NotFound";

type Props = {
  mediaType: MediaType;
};

const DetailMovie = ({ mediaType }: Props) => {
  const globalContext = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState<Movie | null | undefined>(undefined);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ src: string; title: string }>({
    src: "",
    title: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getDetail(mediaType, parseInt(id as string));
        if (movie) {
          setMovie(movie);
          setCasts(await getCasts(movie.mediaType, movie.id));
          setTrailers(await getTrailers(movie.mediaType, movie.id));
          setRecommendations(
            await getRecommendations(movie.mediaType, movie.id)
          );
        } else {
          setMovie(null); // Ensure the movie is set to null if not found
        }
      } catch (error) {
        console.error("Failed to fetch movie details", error);
        setMovie(null); // Handle errors gracefully
      }
    };

    fetchMovie();
  }, [id, mediaType, location]);

  if (movie === null) {
    return <NotFound />;
  }

  if (movie === undefined) {
    return <Loading />;
  }

  const getGenreName = (id: number) => {
    const genre = globalContext.genres[movie.mediaType]?.find(
      (g) => g.id === id
    );
    return genre ? genre.name : "";
  };

  const playTrailer = async (key: string) => {
    if (key) {
      setTrailer({
        src: `https://www.youtube.com/embed/${key}?autoplay=0`,
        title: movie.title || "Trailer",
      });
    }
  };

  return (
    <div className="flex-grow">
      <TrailerModal
        onHide={() => setTrailer({ src: "", title: "" })}
        infos={trailer}
      />
      <div className="relative h-[300px]">
        <Image src={imageSrcMovie(movie.coverPath)} alt={movie.title} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
      </div>
      <Section className="-mt-[100px] md:-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src={imageSrcMovie(movie.posterPath)}
          alt={movie.title}
          className="w-[125px] min-w-[125px] md:w-[200px] md:min-w-[200px] md:h-[300px] mobile:mx-auto"
        />
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-2xl font-bold line-clamp-1">{movie.title}</p>
          <div className="flex items-center">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-1 text-sm font-bold text-gray-900 dark:text-white">
                {movie.voteAverage.toFixed(1)}
              </p>
            </div>
            {movie.mediaType === "movie" && movie.runtime !== 0 && (
              <div className="ml-4 flex items-center gap-1">
                <IoMdTime size={20} />
                <p>{formatDate(movie.releaseDate)}</p>
                {movie.runtime && (
                  <>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <p>{formattedRuntime(movie.runtime)}</p>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-y-1.5 text-sm" aria-label="Genres">
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
          <p className="line-clamp-3 opacity-[0.9]">{movie.description}</p>
        </div>
      </Section>
      <Section title="Casts" hidden={casts.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="py-0 flex flex-col gap-7">
            <SliderContainer>
              {casts.map((cast, i) => (
                <div className="flex-shrink-0 w-[200px] mb-6" key={i}>
                  <CardCast cast={cast} key={i} />
                </div>
              ))}
            </SliderContainer>
          </div>
        </div>
      </Section>
      <Section title="Trailers" hidden={trailers.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="py-0 flex flex-col gap-7 mb-12">
            <SliderContainer>
              {trailers.map((trailer, i) => (
                <div className="w-[200px] mb-6" key={i}>
                  <CardTrailer
                    imageSrc={youtubeThumbnail(trailer.key)}
                    onClick={() => playTrailer(trailer.key)}
                    key={i}
                  />
                </div>
              ))}
            </SliderContainer>
          </div>
        </div>
      </Section>
      <Section title="Seasons" hidden={movie.seasons.length === 0}>
        <SliderContainer>
          {movie.seasons.map((season, i) => (
            <div className="w-[200px] mb-6" key={i}>
              <CardSeason
                season={season}
                onClick={() =>
                  navigate(`/tv/${movie.id}/season/${season.seasonNumber}`)
                }
              />
            </div>
          ))}
        </SliderContainer>
      </Section>
      <Section title="Recommendations" hidden={recommendations.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="py-0 flex flex-col gap-7 mb-12">
            <SliderContainer>
              {recommendations.map((recommendation, i) => (
                <div className="w-[200px] mb-6" key={i}>
                  <CardMovie
                    onClick={() => {
                      navigate(`/${mediaType}/${recommendation.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    movie={recommendation}
                    isRecommendation
                  />
                </div>
              ))}
            </SliderContainer>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DetailMovie;
