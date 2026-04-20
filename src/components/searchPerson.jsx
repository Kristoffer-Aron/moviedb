import { useSelector, useDispatch } from "react-redux";
import { changeSearchPersonTerm } from "../store";
import { useNavigate } from "react-router-dom";

function SearchPerson() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => {
    return state.searchPerson.searchTerm;
  });
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchPersonTerm(event.target.value));
  }
  const handleSubmit = (event) => {
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
