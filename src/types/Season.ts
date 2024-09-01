import { Episode } from "./Episode";

export type Season = {
  id: number;
  movieName: string;
  name: string;
  seasonNumber: number;
  posterPath: string;
  episodes: Episode[];
  airDate: string;
};
