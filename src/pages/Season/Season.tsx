import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeason } from "../../api/api";
import { Image } from "../../components/Image";
import { Loading } from "../../components/Loading";
import { Section } from "../../components/Section";
import { Season as SeasonType } from "../../types/Season";
import { formatDate, imageSrcMovie, useDynamicTitle } from "../../utils";
import NotFound from "../NotFound/NotFound";

const Season = () => {
  const [season, setSeason] = useState<SeasonType | null>(null);

  useDynamicTitle(`${season?.movieName} - Season ${season?.name} - TheMovieDB`);

  const params = useParams();

  const fetch = async () => {
    setSeason(
      await getSeason(
        parseInt(params.id as string),
        parseInt(params.seasonNumber as string)
      )
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  if (season === null) {
    return <NotFound />;
  }

  if (season === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="h-[195px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image
          className="rounded-0 rounded-none"
          src={imageSrcMovie(season.posterPath)}
          alt={season.name}
        />
      </div>

      <Section className="-mt-[90px] flex items-center relative z-10 mobile:block">
        <Image
          src={imageSrcMovie(season.posterPath)}
          alt={season.name}
          className="w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
        />
        <div className="px-3 flex flex-col items-start gap-3 py-3">
          <p className="text-xl line-clamp-1">{season.movieName}</p>
          <div className="flex items-center">
            <p className="text-sm opacity-[0.9]">
              {season.name} ({new Date(season.airDate).getFullYear()})
            </p>
            <p className="text-sm opacity-[0.9] ml-1">
              &#8226; {season.episodes?.length} episodes
            </p>
          </div>
        </div>
      </Section>

      <Section title="Episodes">
        {season.episodes.map((episode, i) => (
          <>
            <div
              className="my-6 flex flex-col md:flex-row items-stretch gap-4 rounded-md overflow-hidden px-3 py-1.5 mobile:block"
              key={i}
            >
              {episode.stillPath ? (
                <Image
                  src={imageSrcMovie(episode.stillPath)}
                  alt={episode.title}
                  className="min-w-[300px] w-[300px] h-[150px] self-center md:self-start"
                />
              ) : (
                <Image
                  src="/search-not-found.png"
                  alt={episode.title}
                  className="min-w-[300px] w-[300px] h-[150px] self-center md:self-start"
                />
              )}
              <div className="overflow-hidden flex flex-col gap-3 mobile:py-3 w-full">
                <p className="text-lg truncate">
                  {episode.episodeNumber}. {episode.title}
                </p>
                <p className="opacity-[0.9] line-clamp-5">{episode.overview}</p>
                <div className="mt-auto text-right">
                  {formatDate(episode.airDate)}
                </div>
              </div>
            </div>
            {i < season.episodes.length - 1 && (
              <hr className="my-10 mx-auto border-t border-gray-300 w-  md:w-3/5" />
            )}
          </>
        ))}
      </Section>
    </div>
  );
};

export default Season;
