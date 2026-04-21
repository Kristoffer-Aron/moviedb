import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import React from 'react';

function SearchMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector<RootState, string>((state) => {
    return state.searchMovie.searchTerm;
  });
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    dispatch(changeSearchTerm(event.target.value));
  }
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
                 //dette for at undgå at Browseren automatisk prøver et udføre et submit  
                 //dispatch(changeSearchTerm(searchTerm));
                 event.preventDefault();
                 navigate("/searchedMovie");
  }
  return (
   <form onSubmit={handleSubmit}>
     <label >Search</label>
     <input className="input ml-2" value={searchTerm} onChange={handleSearchTermChange}/>
     </form>    
  );
}
export default SearchMovie;
