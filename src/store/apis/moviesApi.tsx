import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDBApiResponse, Movie } from '../../types/movies';
import { PersonSearchResponse } from '../../types/person';
import { MovieVideosResponse } from '../../types/videos';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query<Movie[], void>({
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
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
      fetchHighestRatedMovies: builder.query<Movie[], void>({
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
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
      fetchSearchMovie: builder.query<Movie[], string>({
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
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
      fetchUpcomingMovies: builder.query<Movie[], void>({
        query: () => {
          return {
            url: 'movie/upcoming',
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
      fetchMovieVideos: builder.query<MovieVideosResponse, string>({
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
      fetchMovieDetails: builder.query<Movie, string>({
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
      fetchSearchPerson: builder.query<PersonSearchResponse, string>({
        query: (searchTerm) => {
          return {
            url: 'search/person',
            params: {
              query: searchTerm,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchMovieGenres: builder.query<any, void>({
        query: () => {
          return {
            url: 'genre/movie/list',
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchPopularMoviesByGenre: builder.query<Movie[], string>({
        query: (genreId) => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'popularity.desc',
              with_genres: genreId,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
      fetchHighestRatedMoviesByGenre: builder.query<Movie[], string>({
        query: (genreId) => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'vote_average.desc',
              with_genres: genreId,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
        transformResponse: (response: TMDBApiResponse) => response.results,
      }),
    };
  },
});

export const {useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery, useFetchUpcomingMoviesQuery, useFetchMovieVideosQuery, useFetchMovieDetailsQuery, useFetchSearchPersonQuery, useFetchMovieGenresQuery, useFetchPopularMoviesByGenreQuery, useFetchHighestRatedMoviesByGenreQuery} = moviesApi;
export { moviesApi };