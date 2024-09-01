import React from "react";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type Props = {
  children?: React.ReactNode;
  autoPlay?: boolean;
};

export const SliderContainer = ({ children, autoPlay = false }: Props) => {
  const childrenCount = React.Children.count(children);

  const settings: Settings = {
    autoplay: autoPlay,
    infinite: childrenCount > 1,
    swipe: false,
    autoplaySpeed: 5000,
    slidesToShow: childrenCount > 1 ? 4.7 : 1,
    slidesToScroll: childrenCount > 1 ? 2 : 1,
    pauseOnHover: childrenCount > 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: childrenCount > 1 ? 3 : 1,
          slidesToScroll: childrenCount > 1 ? 3 : 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: childrenCount > 1 ? 2 : 1,
          slidesToScroll: childrenCount > 1 ? 2 : 1,
        },
      },
    ],
  };

  return <Slider {...settings}>{children ? children : ""}</Slider>;
};

const SamplePrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-600 focus:outline-none"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="sr-only">Previous</span>
    </button>
  );
};

const SampleNextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-600 focus:outline-none"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span className="sr-only">Next</span>
    </button>
  );
};
