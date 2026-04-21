// Interface for the API response from TheMovieDB
export interface TMDBApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Interface for a Movie object as used in the app
export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids?: number[]; // Optional, as it might not always be included
  adult?: boolean;
  backdrop_path?: string;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
}