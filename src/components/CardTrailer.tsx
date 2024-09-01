import { FaPlay } from "react-icons/fa";
import { Image } from "./Image";

type Props = {
  imageSrc: string;
  onClick: () => void;
};

export const CardTrailer = ({ imageSrc, onClick }: Props) => {
  return (
    <div className="group mx-3 my-1.5 cursor-pointer" onClick={onClick}>
      <div className="h-[200px] relative rounded-lg overflow-hidden">
        <Image src={imageSrc} alt="test" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaPlay size={40} className="text-white" />
        </div>
      </div>
    </div>
  );
};
