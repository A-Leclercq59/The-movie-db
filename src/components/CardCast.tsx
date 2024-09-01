import { Cast } from "../types/Cast";
import { imageSrcMovie } from "../utils";
import { Image } from "./Image";

type Props = {
  cast: Cast;
};

export const CardCast = ({ cast }: Props) => {
  return (
    <div className="group mx-3 my-1.5">
      <div className="h-[200px] relative rounded-lg overflow-hidden">
        {cast.profilePath ? (
          <Image src={imageSrcMovie(cast.profilePath)} alt={cast.name} />
        ) : (
          <Image
            src="/cast-not-found.png"
            alt={cast.name}
            className="rounded-0 rounded-md max-h-[220px]"
          />
        )}
      </div>
      <p className="font-semibold">{cast.name}</p>
      <p className="opacity-[0.9] text-sm">{cast.characterName}</p>
    </div>
  );
};
