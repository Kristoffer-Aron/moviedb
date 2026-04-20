import { useFetchSearchPersonQuery } from "../store";
import { useSelector } from "react-redux";
import SearchPerson from "./searchPerson";

function SearchedPersonList() {
  const searchTerm = useSelector((state) => {
    return state.searchPerson.searchTerm;
  });
  const { data, error, isFetching } = useFetchSearchPersonQuery(searchTerm);

  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading people.</div>;
  } else if (data && data.results && data.results.length > 0) {
    content = data.results.map((person) => {
      const profilePath = person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image';
      return (
        <div key={person.id} className="col-lg-2 mb-4">
          <div className="card">
            <img src={profilePath} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{person.name}</h5>
              <p className="card-text">
                <small className="text-muted">
                  {person.known_for_department && `Known for: ${person.known_for_department}`}
                </small>
              </p>
              {person.known_for && person.known_for.length > 0 && (
                <p className="card-text">
                  <small>
                    {person.known_for.map((work) => work.title || work.name).join(', ')}
                  </small>
                </p>
              )}
            </div>
          </div>
        </div>
      );
    });
  } else {
    content = <div>No people found.</div>;
  }

  return (
    <div className="container mt-4">
      <SearchPerson />
      <h2>People Search Results</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}
export default SearchedPersonList;
