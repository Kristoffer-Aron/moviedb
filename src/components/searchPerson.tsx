import { useSelector, useDispatch } from "react-redux";
import { changeSearchPersonTerm, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import React from 'react';

function SearchPerson() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector<RootState, string>((state) => {
    return state.searchPerson.searchTerm;
  });
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchPersonTerm(event.target.value));
  }
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/searchedPerson");
  }
  return (
   <form onSubmit={handleSubmit}>
     <label >Search Directors & Actors</label>
     <input className="input ml-2" value={searchTerm} onChange={handleSearchTermChange}/>
     </form>    
  );
}
export default SearchPerson;
