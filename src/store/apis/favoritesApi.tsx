import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Favorite } from '../../types/favorites';
import React from 'react';

type TagType = 'Favorite' | 'UsersFavorites';

const favoritesApi = createApi({
  reducerPath: 'favorites',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  tagTypes: ['Favorite', 'UsersFavorites'] as const,
  endpoints(builder) {
    return {
      removeFavorite: builder.mutation<void, Favorite>({
        invalidatesTags: (result, error, favorite) => [
          { type: 'Favorite' as const, id: favorite.id },
        ],
        query: (favorite) => {
          return {
            url: `/favorites/${favorite.id}`,
            method: 'DELETE',
          };
        },
      }),
      addFavorite: builder.mutation<void, { id: number; favoriteMovieId?: number; favoriteTvShowId?: number; mediaType: string }>({
        invalidatesTags: (result, error, user) => [
          { type: 'UsersFavorites' as const, id: user.id },
        ],
        query: (user) => {
          return {
            url: '/favorites',
            method: 'POST',
            body: {
              userId: user.id,
              movieId: user.favoriteMovieId,
              tvShowId: user.favoriteTvShowId,
              mediaType: user.mediaType,
            },
          };
        },
      }),
      fetchFavorites: builder.query<Favorite[], { id: number }>({
        providesTags: (result, error, user) => {
          const tags: Array<{ type: TagType; id: number }> = [];
          if (result) {
            result.forEach((favorite) => {
              tags.push({ type: 'Favorite', id: favorite.id });
            });
          }
          tags.push({ type: 'UsersFavorites', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: '/favorites',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;
export { favoritesApi };
