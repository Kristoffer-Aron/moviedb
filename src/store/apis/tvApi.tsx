import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tvApi = createApi({
  reducerPath: 'tv',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularTvShows: builder.query({
        query: () => {
          return {
            url: 'discover/tv',
            params: {
              sort_by: 'popularity.desc',
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchHighestRatedTvShows: builder.query({
        query: () => {
          return {
            url: 'discover/tv',
            params: {
              sort_by: 'vote_average.desc',
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchSearchTvShow: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/tv',
            params: {
              query: searchTerm,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchAiringTodayTvShows: builder.query({
        query: () => {
          return {
            url: 'tv/airing_today',
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchTvVideos: builder.query({
        query: (tvId) => {
          return {
            url: `tv/${tvId}/videos`,
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchTvDetails: builder.query({
        query: (tvId) => {
          return {
            url: `tv/${tvId}`,
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchTvGenres: builder.query({
        query: () => {
          return {
            url: 'genre/tv/list',
            params: {
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchPopularTvShowsByGenre: builder.query({
        query: (genreId) => {
          return {
            url: 'discover/tv',
            params: {
              sort_by: 'popularity.desc',
              with_genres: genreId,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
      fetchHighestRatedTvShowsByGenre: builder.query({
        query: (genreId) => {
          return {
            url: 'discover/tv',
            params: {
              sort_by: 'vote_average.desc',
              with_genres: genreId,
              api_key: '95e34df0a98601764ebc91fa99e2daff'
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {useFetchPopularTvShowsQuery, useFetchHighestRatedTvShowsQuery, useFetchSearchTvShowQuery, useFetchAiringTodayTvShowsQuery, useFetchTvVideosQuery, useFetchTvDetailsQuery, useFetchTvGenresQuery, useFetchPopularTvShowsByGenreQuery, useFetchHighestRatedTvShowsByGenreQuery} = tvApi;
export { tvApi };