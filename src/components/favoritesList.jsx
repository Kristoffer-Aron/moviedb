import { useFetchFavoritesQuery, useRemoveFavoriteMutation, useFetchMovieDetailsQuery } from "../store";
import MovieCard from "./movieCard";

function FavoritesList() {
  // For simplicity, using a hardcoded user ID. In a real app, this would come from authentication
  const user = { id: 1 };
  const { data: favorites, error, isFetching } = useFetchFavoritesQuery(user);
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleRemoveFavorite = async (favoriteId) => {
    await removeFavorite({ id: favoriteId });
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
          <FavoriteMovieCard
            key={favorite.id}
            favoriteId={favorite.id}
            movieId={favorite.movieId}
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

function FavoriteMovieCard({ favoriteId, movieId, onRemove }) {
  const { data: movie, error, isFetching } = useFetchMovieDetailsQuery(movieId);

  if (isFetching) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <div className="card-body">
            <div>Loading movie...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <div className="card-body">
            <div>Error loading movie</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-2 mb-4">
      <div className="card">
        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{movie.title.substring(0, 200)}</h5>
          <span
            className="fas fa-star text-warning"
            aria-hidden="true"
            style={{cursor: 'pointer'}}
            onClick={() => onRemove(favoriteId)}
          ></span>
          <span className="ml-1">{movie.vote_average}</span>
          <p className="card-text">{movie.overview.substring(0, 125).concat('....')}</p>
          <div className="d-flex justify-content-between p-0">
            <span className="far fa-calendar" aria-hidden="true"> {movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;