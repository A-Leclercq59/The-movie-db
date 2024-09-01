import axios, { AxiosResponse } from "axios";

import { Cast } from "../types/Cast";
import { Episode } from "../types/Episode";
import { Genre } from "../types/Genre";
import { MediaType } from "../types/MediaType";
import { Movie } from "../types/Movie";
import { Season } from "../types/Season";
import { Trailer } from "../types/Trailer";
import { formatResult } from "../utils";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN as string}`,
  },
});

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,

    params: {
      ...config.params,
      api_key: process.env.API_TOKEN,
    },
  };
});

export const getTrendings = async (mediaType: MediaType): Promise<Movie[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[];
      }>
    >(`/trending/${mediaType}/day`);

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getPopulars = async (
  mediaType: MediaType,
  page = 1
): Promise<Movie[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[];
      }>
    >(`/${mediaType}/popular`, {
      params: {
        page,
      },
    });

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const search = async (
  query: string,
  page = 1
): Promise<{
  totalPages: number;
  totalResults: number;
  movies: Movie[];
}> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        total_pages: number;
        total_results: number;
        results: unknown[];
      }>
    >(`/search/multi`, {
      params: {
        query,
        page,
      },
    });

    return {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results.map((val) => formatResult(val)),
    };
  } catch (error) {
    console.error(error);
  }

  return {
    totalPages: 0,
    totalResults: 0,
    movies: [],
  };
};

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        genres: unknown[];
      }>
    >(`/genre/${mediaType}/list`);

    return data.genres as Genre[];
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getDetail = async (
  mediaType: MediaType,
  id: number
): Promise<null | Movie> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}`);

    return formatResult(data, mediaType);
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const getCasts = async (
  mediaType: MediaType,
  id: number
): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        cast: any[];
      }>
    >(`/${mediaType}/${id}/credits`);

    return (
      data.cast.map((cast) => ({
        id: cast.id,
        characterName: cast.character,
        name: cast.name,
        profilePath: cast.profile_path,
      })) ?? []
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getTrailers = async (
  mediaType: MediaType,
  id: number
): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: any[];
      }>
    >(`/${mediaType}/${id}/videos`);

    return (
      data.results
        .filter((res) => res.site.toLowerCase() === "youtube")
        .map((res) => ({
          id: res.id,
          key: res.key,
        })) ?? []
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getRecommendations = async (
  mediaType: MediaType,
  id: number
): Promise<Movie[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[];
      }>
    >(`/${mediaType}/${id}/recommendations`);

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getSeason = async (
  tvId: number,
  seasonNumber: number
): Promise<Season | null> => {
  try {
    const { data } = await axiosClient.get<any, any>(
      `/tv/${tvId}/season/${seasonNumber}`
    );

    const movie = await getDetail("tv", tvId);

    return {
      id: data.id,
      movieName: movie?.title || "",
      name: data.name,
      posterPath: data.poster_path,
      seasonNumber: data.season_number,
      airDate: data.air_date,
      episodes: data.episodes.map(
        (episode: any) =>
          ({
            id: episode.id,
            title: episode.name,
            overview: episode.overview,
            airDate: episode.air_date,
            stillPath: episode.still_path,
            episodeNumber: episode.episode_number,
          } satisfies Episode)
      ),
    };
  } catch (error) {
    console.error(error);
  }

  return null;
};
