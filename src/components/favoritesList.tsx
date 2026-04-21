import { useFetchFavoritesQuery, useRemoveFavoriteMutation, useFetchMovieDetailsQuery } from "../store";
import { useFetchTvDetailsQuery } from "../store/apis/tvApi";
import { Favorite } from "../types/favorites";
import { Movie } from "../types/movies";
import { TvShow } from "../types/tv";
import MovieCard from "./movieCard";
import React from 'react';

function FavoritesList() {
  // For simplicity, using a hardcoded user ID. In a real app, this would come from authentication
  const user = { id: 1 };
  const { data: favorites, error, isFetching } = useFetchFavoritesQuery(user);
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleRemoveFavorite = async (favorite: Favorite) => {
    await removeFavorite(favorite);
  };

  let content;
  if (isFetching) {
    content = <div>Loading favorites...</div>;
  } else if (error) {
    content = <div>Error loading favorites.</div>;
  } else if (favorites && favorites.length > 0) {
    content = (
      <div className="row">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    );
  } else {
    content = <div>No favorite movies yet.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>My Favorite Movies</h2>
      {content}
    </div>
  );
}

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (favorite: Favorite) => void;
}

function FavoriteCard({ favorite, onRemove }: FavoriteCardProps) {
  const contentId = String(favorite.movieId || favorite.tvShowId || 0);
  const mediaType = favorite.mediaType || (favorite.movieId ? 'movie' : 'tv');

  const { data: movie, error: movieError, isFetching: movieFetching } = useFetchMovieDetailsQuery(contentId, { skip: mediaType !== 'movie' });
  const { data: tvShow, error: tvError, isFetching: tvFetching } = useFetchTvDetailsQuery(contentId, { skip: mediaType !== 'tv' });

  const isFetching = mediaType === 'movie' ? movieFetching : tvFetching;
  const error = mediaType === 'movie' ? movieError : tvError;
  const displayTitle = mediaType === 'movie' ? movie?.title : tvShow?.name;
  const displayDate = mediaType === 'movie' ? movie?.release_date : tvShow?.first_air_date;

  if (isFetching) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <div className="card-body">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const data = mediaType === 'movie' ? movie : tvShow;
  if (error || !data) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <div className="card-body">
            <div>Error loading</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-2 mb-4">
      <div className="card">
        <img src={`https://image.tmdb.org/t/p/w185${(data as Movie | TvShow)?.poster_path || ''}`} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{displayTitle?.substring(0, 200)}</h5>
          <span
            className="fas fa-star text-warning"
            aria-hidden="true"
            style={{cursor: 'pointer'}}
            onClick={() => onRemove(favorite)}
          ></span>
          <span className="ml-1">{data.vote_average}</span>
          <p className="card-text">{data.overview?.substring(0, 125).concat('....')}</p>
          <div className="d-flex justify-content-between p-0">
            <span className="far fa-calendar" aria-hidden="true"> {displayDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;