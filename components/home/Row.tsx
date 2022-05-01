import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../../typing";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ movies, title }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrolledX, setIsScrolledX] = useState(false);
  const checkScrollDirection = (scrollWidth: number, scrollTo: number) => {
    if (scrollWidth === scrollTo) {
      setIsScrolledXFinished(true);
    } else {
      setIsScrolledXFinished(false);
    }
    if (scrollTo > 0) {
      setIsScrolledX(true);
    } else {
      setIsScrolledX(false);
    }
  };
  const [isScrolledXFinished, setIsScrolledXFinished] = useState(false);
  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      checkScrollDirection(scrollWidth, scrollTo);
    }
  };

  return (
    <div className="">
      <h2 className="transistion w-56 cursor-pointer text-lg font-semibold capitalize text-stone-200 duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute bottom-0 top-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isScrolledX && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className={`absolute bottom-0 top-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            isScrolledXFinished && "hidden"
          }`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
