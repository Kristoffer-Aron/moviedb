import { useState } from 'react';
import { useFetchHighestRatedTvShowsQuery, useFetchHighestRatedTvShowsByGenreQuery } from "../store";
import TvShowCard from "./tvShowCard"
import GenreFilter from "./genreFilter"
import SearchPerson from "./searchPerson"

function HighestRatedTvShowsList() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data: allShows, error: allError, isFetching: allFetching } = useFetchHighestRatedTvShowsQuery(undefined, { skip: selectedGenre !== '' });
  const { data: genreShows, error: genreError, isFetching: genreFetching } = useFetchHighestRatedTvShowsByGenreQuery(selectedGenre, { skip: selectedGenre === '' });

  const data = selectedGenre ? genreShows : allShows;
  const error = selectedGenre ? genreError : allError;
  const isFetching = selectedGenre ? genreFetching : allFetching;

  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  } else if (error) {
    content = <div>Error loading tv shows.</div>;
  } else {
    content = data.results.filter(tvshow => tvshow.poster_path !== null && tvshow.vote_average !== 0).map((tvshow) => {
      return <TvShowCard key={tvshow.id} tvshow={tvshow}></TvShowCard>
    });
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <GenreFilter type="tv" onGenreSelect={setSelectedGenre} />
        <SearchPerson />
      </div>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </>
  );
}
export default HighestRatedTvShowsList;