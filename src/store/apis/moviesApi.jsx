import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'popularity.desc',
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'vote_average.desc',
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchSearchMovie: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/movie',
            params: {
              query: searchTerm,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchUpcomingMovies: builder.query({
        query: () => {
          return {
            url: 'movie/upcoming',
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchMovieVideos: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}/videos`,
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchMovieDetails: builder.query({
        query: (movieId) => {
          return {
            url: `movie/${movieId}`,
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery, useFetchUpcomingMoviesQuery, useFetchMovieVideosQuery, useFetchMovieDetailsQuery} = moviesApi;
export { moviesApi };