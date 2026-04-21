// Interface for the API response from TheMovieDB for TV shows
export interface TMDBTvApiResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

// Interface for a TvShow object as used in the app
export interface TvShow {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  genre_ids?: number[];
  adult?: boolean;
  backdrop_path?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  popularity?: number;
  vote_count?: number;
}