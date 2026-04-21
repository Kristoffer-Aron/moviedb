import { useState } from 'react';
import { useFetchMovieGenresQuery } from '../store';
import { useFetchTvGenresQuery } from '../store/apis/tvApi';
import React from 'react';

function GenreFilter({ type = 'movie', onGenreSelect }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data: movieGenres } = useFetchMovieGenresQuery(undefined, { skip: type !== 'movie' });
  const { data: tvGenres } = useFetchTvGenresQuery(undefined, { skip: type !== 'tv' });

  const genres = type === 'movie' ? movieGenres?.genres : tvGenres?.genres;

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onGenreSelect(genreId);
  };

  return (
    <div className="container mt-2 mb-4">
      <label htmlFor="genreSelect">Filter by Genre: </label>
      <select
        id="genreSelect"
        className="form-control"
        value={selectedGenre}
        onChange={handleGenreChange}
        style={{ width: '200px', display: 'inline-block', marginLeft: '10px' }}
      >
        <option value="">All Genres</option>
        {genres && genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
