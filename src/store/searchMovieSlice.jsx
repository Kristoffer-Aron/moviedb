import {createSlice} from '@reduxjs/toolkit';

const searchMovieSlice = createSlice({
    name: 'searchMovie',
    initialState: {
        searchTerm: ''
    },
    reducers:{
        changeSearchTerm(state, action){
            state.searchTerm = action.payload;
        }
    }
})
export const {changeSearchTerm} = searchMovieSlice.actions; //"mini-reducer-functions" - action creators
export const searchMovieReducer = searchMovieSlice.reducer;  //combined reducer