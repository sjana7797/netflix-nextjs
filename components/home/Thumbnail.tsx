import Image from "next/image";
import { Movie } from "../../typing";
import { tmdbBaseUrl } from "../../utils/configs";

interface Props {
  movie: Movie;
}
function Thumbnail({ movie }: Props) {
  const image_url = movie.backdrop_path || movie.poster_path;
  const title = movie.title || movie.original_name || movie.name;
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer bg-slate-700 bg-opacity-50 backdrop-blur-sm transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`${tmdbBaseUrl.concat(image_url)}`}
        alt={title}
        layout="fill"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
}

export default Thumbnail;
