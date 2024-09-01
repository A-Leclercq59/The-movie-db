import { Season } from "../types/Season";
import { imageSrcMovie } from "../utils";
import { Image } from "./Image";

type Props = {
  season: Season;
  onClick?: () => void;
};

export const CardSeason = ({ season, onClick }: Props) => {
  return (
    <div
      className="group mx-3 my-1.5 cursor-pointer"
      onClick={() => (onClick ? onClick() : "")}
    >
      <div className="h-[200px] relative rounded-lg overflow-hidden">
        {season.posterPath ? (
          <Image src={imageSrcMovie(season.posterPath)} alt={season.name} />
        ) : (
          <Image
            src="/search-not-found.png"
            alt={season.name}
            className="rounded-0 rounded-md max-h-[220px]"
          />
        )}
      </div>
      <p className="font-semibold">{season.name}</p>
    </div>
  );
};
