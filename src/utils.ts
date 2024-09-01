import { useEffect } from "react";
import { MediaType } from "./types/MediaType";
import { Movie } from "./types/Movie";
import { Season } from "./types/Season";

export const cn = (val1: string, val2?: string) => {
  return val1 + " " + (val2 || "");
};

export const formatResult = (obj: any, mediaType?: MediaType): Movie => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    genreIds: obj.genre_ids || obj.genres?.map((g: any) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    voteAverage: obj.vote_average,
    voteCount: obj.vote_count,
    releaseDate: obj.release_date,
    runtime: obj.runtime,
    seasons:
      obj.seasons?.map(
        (season: any) =>
          ({
            id: season.id,
            movieName: obj.title,
            name: season.name,
            posterPath: season.poster_path,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodes: [],
          } satisfies Season)
      ) || [],
  };
};

export const isMovie = (movie: any): movie is Movie => {
  return (movie as Movie) !== undefined;
};

export const mergeMovies = (movies: Movie[], tvs: Movie[]) => {
  const arrs: Movie[] = [];
  const maxLength = Math.max(movies.length, tvs.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < movies.length) {
      arrs.push(movies[i]);
    }
    if (i < tvs.length) {
      arrs.push(tvs[i]);
    }
  }

  return arrs;
};

export const imageSrcMovie = (path: string) => {
  if (!path) return "";

  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  return {
    fullStars,
    halfStars,
    emptyStars,
  };
};

export const youtubeThumbnail = (key: string) => {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
};

export const formattedRuntime = (min: number) => {
  const hours = Math.floor(min / 60);
  const remainingMinutes = min % 60;
  return `${hours}h${remainingMinutes.toString().padStart(2, "0")}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const useDynamicTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
