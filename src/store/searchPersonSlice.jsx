import {createSlice} from '@reduxjs/toolkit';

const searchPersonSlice = createSlice({
    name: 'searchPerson',
    initialState: {
        searchTerm: ''
    },
    reducers:{
        changeSearchPersonTerm(state, action){
            state.searchTerm = action.payload;
        }
    }
})
export const {changeSearchPersonTerm} = searchPersonSlice.actions;
export const searchPersonReducer = searchPersonSlice.reducer;
