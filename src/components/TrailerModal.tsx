import { useEffect, useState } from "react";
import { cn } from "../utils";

type Props = {
  infos: {
    src: string;
    title: string;
  };
  onHide: () => void;
};

export const TrailerModal = ({ infos, onHide }: Props) => {
  const [show, setShow] = useState(false);

  const hide = () => {
    setShow(false);
    onHide();
  };

  useEffect(() => {
    if (infos.src) setShow(true);
  }, [infos.src]);

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-md",
        show ? "visible" : "invisible"
      )}
      onClick={() => hide()}
    >
      <div
        className="relative w-full max-w-2xl mx-auto bg-gray-700 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-white">
            Trailer of {infos.title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center hover:bg-gray-600 hover:text-white"
            onClick={() => hide()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {infos.src && (
            <iframe
              src={infos.src}
              className="w-full h-[400px]"
              title={infos.title}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};
