import { InformationCircleIcon, PlayIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Movie } from "../../typing";
import { tmdbBaseUrl } from "../../utils/configs";

function Banner({ bannerMovie }: { bannerMovie: Movie | null }) {
  const title =
    bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name || "";
  const image_url =
    bannerMovie?.backdrop_path || bannerMovie?.poster_path || "";
  return (
    <section className="flex flex-col space-y-2 py-16 pl-4 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${tmdbBaseUrl}${image_url}`}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">{title}</h1>
      <p className="max-w-xs text-xs text-shadow-md line-clamp-4 md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {bannerMovie?.overview}
      </p>
      <div className="flex space-x-2">
        <button className="banner--button bg-neutral-100 text-neutral-900">
          <PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
          play
        </button>
        <button className="banner--button bg-neutral-400 bg-opacity-50 backdrop-blur-sm">
          more info
          <InformationCircleIcon className="h-5 w-5 text-black md:h-8 md:w-8" />
        </button>
      </div>
    </section>
  );
}

export default Banner;
