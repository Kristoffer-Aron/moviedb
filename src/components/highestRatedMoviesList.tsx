import { useState } from 'react';
import { useFetchHighestRatedMoviesQuery, useFetchHighestRatedMoviesByGenreQuery } from "../store";
import MovieCard from "./movieCard"
import GenreFilter from "./genreFilter"
import SearchPerson from "./searchPerson"

function HighestRatedMoviesList() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data: allMovies, error: allError, isFetching: allFetching } = useFetchHighestRatedMoviesQuery(undefined, { skip: selectedGenre !== '' });
  const { data: genreMovies, error: genreError, isFetching: genreFetching } = useFetchHighestRatedMoviesByGenreQuery(selectedGenre, { skip: selectedGenre === '' });

  const data = selectedGenre ? genreMovies : allMovies;
  const error = selectedGenre ? genreError : allError;
  const isFetching = selectedGenre ? genreFetching : allFetching;

  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  } else if (error) {
    content = <div>Error loading movies.</div>;
  } else {
    content = data.results.filter(movie => movie.poster_path !== null && movie.vote_average !== 0).map((movie) => {
      return <MovieCard key={movie.id} movie={movie}></MovieCard>
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <GenreFilter type="movie" onGenreSelect={setSelectedGenre} />
        <SearchPerson />
      </div>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </>
  );
}
export default HighestRatedMoviesList;