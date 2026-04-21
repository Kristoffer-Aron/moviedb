// Interface for a Favorite object
export interface Favorite {
  id: number;
  userId: number;
  movieId?: number;
  tvShowId?: number;
  mediaType: string;
}