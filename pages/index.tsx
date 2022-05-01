import Head from "next/head";
import Banner from "../components/home/Banner";
import { APP_NAME } from "../utils/configs";
import axios from "axios";
import { GetServerSideProps } from "next";
import { tmdbAxios } from "../utils/customAxios";
import requests from "../utils/request";
import { Movie } from "../typing";
import { useEffect, useState } from "react";
import Row from "../components/home/Row";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  useEffect(() => {
    const num = Math.floor(Math.random() * netflixOriginals.length);
    setBannerMovie(netflixOriginals[num]);
  }, [netflixOriginals]);
  return (
    <div className="relative h-screen w-full bg-hero-pattern from-gray-900/10 to-[#010511] pb-24 lg:h-[140vh]">
      <Head>
        <title>Home | {APP_NAME}</title>
      </Head>
      <Banner bannerMovie={bannerMovie} />
      <section className="space-y-2 pl-4 md:space-y-5">
        <Row title="trending now" movies={trendingNow} />
        <Row title="top rated" movies={topRated} />
        <Row title="action thrillers" movies={actionMovies} />
        {/* My List */}

        <Row title="comedies" movies={comedyMovies} />
        <Row title="scary movies" movies={horrorMovies} />
        <Row title="romance movies" movies={romanceMovies} />
        <Row title="documentaries" movies={documentaries} />
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const netflixOriginalsRequest = tmdbAxios.get(requests.fetchNetflixOriginals),
    trendingNowRequest = tmdbAxios.get(requests.fetchTrending),
    topRatedRequest = tmdbAxios.get(requests.fetchTopRated),
    actionMoviesRequest = tmdbAxios.get(requests.fetchActionMovies),
    comedyMoviesRequest = tmdbAxios.get(requests.fetchComedyMovies),
    horrorMoviesRequest = tmdbAxios.get(requests.fetchHorrorMovies),
    romanceMoviesRequest = tmdbAxios.get(requests.fetchRomanceMovies),
    documentariesRequest = tmdbAxios.get(requests.fetchDocumentaries);

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await axios
    .all([
      netflixOriginalsRequest,
      trendingNowRequest,
      topRatedRequest,
      actionMoviesRequest,
      comedyMoviesRequest,
      horrorMoviesRequest,
      romanceMoviesRequest,
      documentariesRequest,
    ])
    .then(
      axios.spread(
        (
          netflixOriginalsResponse,
          trendingNowResponse,
          topRatedResponse,
          actionMoviesResponse,
          comedyMoviesResponse,
          horrorMoviesResponse,
          romanceMoviesResponse,
          documentariesResponse
        ) => {
          const netflixOriginals = netflixOriginalsResponse.data.results,
            trendingNow = trendingNowResponse.data.results,
            topRated = topRatedResponse.data.results,
            actionMovies = actionMoviesResponse.data.results,
            comedyMovies = comedyMoviesResponse.data.results,
            horrorMovies = horrorMoviesResponse.data.results,
            romanceMovies = romanceMoviesResponse.data.results,
            documentaries = documentariesResponse.data.results;

          return [
            netflixOriginals,
            trendingNow,
            topRated,
            actionMovies,
            comedyMovies,
            horrorMovies,
            romanceMovies,
            documentaries,
          ];
        }
      )
    );

  return {
    props: {
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
  };
};
