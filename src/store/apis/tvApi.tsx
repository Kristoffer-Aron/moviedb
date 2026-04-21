import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDBTvApiResponse, TvShow } from '../../types/tv';

const tvApi = createApi({
  reducerPath: 'tv',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularTvShows: builder.query<TvShow[], void>({
        query: () => ({
          url: 'discover/tv',
          params: {
            sort_by: 'popularity.desc',
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
      fetchHighestRatedTvShows: builder.query<TvShow[], void>({
        query: () => ({
          url: 'discover/tv',
          params: {
            sort_by: 'vote_average.desc',
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
      fetchSearchTvShow: builder.query<TvShow[], string>({
        query: (searchTerm) => ({
          url: 'search/tv',
          params: {
            query: searchTerm,
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
      fetchAiringTodayTvShows: builder.query<TvShow[], void>({
        query: () => ({
          url: 'tv/airing_today',
          params: {
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
      fetchTvVideos: builder.query<any, string>({
        query: (tvId) => ({
          url: `tv/${tvId}/videos`,
          params: {
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
      }),
      fetchTvDetails: builder.query<TvShow, string>({
        query: (tvId) => ({
          url: `tv/${tvId}`,
          params: {
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
      }),
      fetchTvGenres: builder.query<any, void>({
        query: () => ({
          url: 'genre/tv/list',
          params: {
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
      }),
      fetchPopularTvShowsByGenre: builder.query<TvShow[], string>({
        query: (genreId) => ({
          url: 'discover/tv',
          params: {
            sort_by: 'popularity.desc',
            with_genres: genreId,
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
      fetchHighestRatedTvShowsByGenre: builder.query<TvShow[], string>({
        query: (genreId) => ({
          url: 'discover/tv',
          params: {
            sort_by: 'vote_average.desc',
            with_genres: genreId,
            api_key: '95e34df0a98601764ebc91fa99e2daff'
          },
          method: 'GET',
        }),
        transformResponse: (response: TMDBTvApiResponse) => response.results,
      }),
    };
  },
});

export const { useFetchPopularTvShowsQuery, useFetchHighestRatedTvShowsQuery, useFetchSearchTvShowQuery, useFetchAiringTodayTvShowsQuery, useFetchTvVideosQuery, useFetchTvDetailsQuery, useFetchTvGenresQuery, useFetchPopularTvShowsByGenreQuery, useFetchHighestRatedTvShowsByGenreQuery } = tvApi;
export { tvApi };