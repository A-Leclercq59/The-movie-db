import { MediaType } from "./MediaType";
import { Season } from "./Season";

export type Movie = {
  id: number;
  mediaType: MediaType;
  title: string;
  description: string;
  posterPath: string;
  coverPath: string;
  genreIds: number[];
  seasons: Season[];
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  runtime: number;
};
