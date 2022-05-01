import axios from "axios";
import requests from "./request";

const BASE_URL = { tmdb: "https://api.themoviedb.org/3" };
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const tmdbAxios = axios.create({
  baseURL: BASE_URL.tmdb,
});

tmdbAxios.interceptors.request.use((config) => {
  const type = config.url;
  const addAPIKey = () =>
    (config.url = config.url?.concat(`?api_key=${API_KEY}`));
  const addParams = (params: string) =>
    (config.url = config.url?.concat("&", params));
  let url = "";
  switch (type) {
    case requests.fetchTrending:
      url = "trending/movie/week";
      config.url = url;
      addAPIKey();
      break;

    case requests.fetchNetflixOriginals:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_networks=213");
      break;

    case requests.fetchTopRated:
      url = "movie/top_rated";
      config.url = url;
      addAPIKey();
      break;

    case requests.fetchActionMovies:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_genres=28");
      break;

    case requests.fetchComedyMovies:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_genres=35");
      break;

    case requests.fetchHorrorMovies:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_genres=27");
      break;

    case requests.fetchRomanceMovies:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_genres=10749");
      break;

    case requests.fetchDocumentaries:
      url = "discover/movie";
      config.url = url;
      addAPIKey();
      addParams("with_genres=99");
      break;
  }
  return config;
});

export { tmdbAxios };
