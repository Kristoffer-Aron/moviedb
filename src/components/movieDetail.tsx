import { useParams } from 'react-router-dom';
import { useFetchMovieVideosQuery } from '../store';
import React from 'react';

function MovieDetail() {
  const { movieId } = useParams();
  const { data: videos, error, isFetching } = useFetchMovieVideosQuery(movieId!, { skip: !movieId }); // movieId! tells TypeScript we are sure movieId is not undefined. Skip the query if movieId is not available.

  let content;
  if (isFetching) {
    content = <div>Loading video...</div>;
  } else if (error) {
    content = <div>Error loading video.</div>;
  } else if (videos && videos.results && videos.results.length > 0) {
    // Find the first YouTube trailer
    const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailer) {
      content = (
        <div className="video-container">
          <h3>Movie Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else {
      content = <div>No trailer available for this movie.</div>;
    }
  } else {
    content = <div>No video available for this movie.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;