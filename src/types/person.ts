// Interface for known work (movie or TV show) from a person
export interface KnownFor {
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  poster_path?: string;
  overview?: string;
}

// Interface for a Person object from TMDB
export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  known_for: KnownFor[];
  adult?: boolean;
  gender?: number;
  known_for_id?: number;
  popularity?: number;
}

// Interface for the search person API response
export interface PersonSearchResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}
