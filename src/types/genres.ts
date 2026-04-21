export interface GenreFilterProps {
  type?: 'movie' | 'tv';
  onGenreSelect: (genreId: string) => void;
}

export interface Genre {
  id: number;
  name: string;
}