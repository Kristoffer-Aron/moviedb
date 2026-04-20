import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const favoritesApi = createApi({
  reducerPath: 'favorites',          //Bliver til navnet på vores state i storen
  baseQuery: fetchBaseQuery({     //fetchBaseQuery er en funktion fra RTK Query, som vi bruger til at lave vores baseQuery - preconfigureret fetch
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      return fetch(...args);     //preconfiguret version af 'fetch' der er klar til at lave requests til vores API
    },
  }),
  endpoints(builder) {
    return {
      removeFavorite: builder.mutation({
        invalidatesTags: (result, error, favorite) => {
          return [{ type: 'Favorite', id: favorite.id }];
        },
        query: (favorite) => {
          return {
            url: `/favorites/${favorite.id}`,
            method: 'DELETE',
          };
        },
      }),
      addFavorite: builder.mutation({
        invalidatesTags: (result, error, user) => {          //invalidatesTags[favorite]
          return [{ type: 'UsersFavorites', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/favorites',
            method: 'POST',
            body: {
              userId: user.id,
              movieId: user.favoriteMovieId,
            },
          };
        },
      }),
      fetchFavorites: builder.query({
        providesTags: (result, error, user) => {               //providesTags[favorite]
          const tags = result.map((favorite) => {
            return { type: 'Favorite', id: favorite.id };
          });
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
