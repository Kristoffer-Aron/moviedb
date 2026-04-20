import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './apis/moviesApi';
import { favoritesApi } from './apis/favoritesApi';
import { tvApi } from './apis/tvApi';
import { searchMovieReducer, changeSearchTerm } from './searchMovieSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer, //dette er en mere sikker måde, ungår "typo's"
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [tvApi.reducerPath]: tvApi.reducer,
    searchMovie: searchMovieReducer, //tilføjer searchMovie reducer til store
  },
  middleware: (getDefaultMiddleware) => {  //Thunk middelware er default når der benyttes Redux Toolkit configureStore.
    return getDefaultMiddleware()
    .concat(moviesApi.middleware)
    .concat(favoritesApi.middleware)
    .concat(tvApi.middleware);
  }
});
console.log(store.getState());
console.log(searchMovieReducer);
console.log(changeSearchTerm);
setupListeners(store.dispatch);

export { useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchSearchMovieQuery, useFetchUpcomingMoviesQuery, useFetchMovieVideosQuery, useFetchMovieDetailsQuery } from './apis/moviesApi';
export { useFetchFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from './apis/favoritesApi';
export { useFetchPopularTvShowsQuery, useFetchHighestRatedTvShowsQuery, useFetchSearchTvShowQuery, useFetchAiringTodayTvShowsQuery, useFetchTvVideosQuery, useFetchTvDetailsQuery } from './apis/tvApi';
export { changeSearchTerm } from './searchMovieSlice';