import { Routes, Route, Link } from 'react-router-dom';
import HighestRatedMovieList from "./components/highestRatedMoviesList";
import PopularMoviesList from "./components/popularMoviesList";
import PopularTvShowsList from "./components/popularTvShowsList";
import HighestRatedTvShowsList from "./components/highestRatedTvShowsList";
import AiringTodayTvShowsList from "./components/airingTodayTvShowList";
import UpcomingMoviesList from "./components/upcomingMoviesList";
import MovieDetail from "./components/movieDetail";
import FavoritesList from "./components/favoritesList";
import SearchMovie from "./components/searchMovie";
import SearchedMovieList from "./components/searchedMovieList";
import SearchedPersonList from "./components/searchedPersonList";
import MovieImg from './assets/Image/movie_black2.jpg';
import Home from './components/home';
import React from 'react';

function App() {
  return (
    <div>
      <div className="jumbotron pb-3 pt-3">
        <div className="navbar navbar-expand-lg">
          <nav className="nav navbar-nav">    
            <Link to='/' className="nav-item nav-link">Home</Link>
            <Link to='/favorites' className="nav-item nav-link">Favorites</Link>
            <span className="nav-item nav-link">| Movies:</span>
            <Link to='/popular' className="nav-item nav-link">Popular</Link>
            <Link to='/highest-rated' className="nav-item nav-link">Highest Rated</Link>
            <Link to='/upcoming' className="nav-item nav-link">Upcoming</Link>
            <span className="nav-item nav-link">| Tv Shows:</span>
            <Link to='/popular-tv' className="nav-item nav-link">Popular</Link>
            <Link to='/highest-rated-tv' className="nav-item nav-link">Highest Rated</Link>
            <Link to='/airing-today-tv' className="nav-item nav-link">Airing Today</Link>
          </nav>
        </div>
          <span className='h1'>React Moviefinder <img className="rounded movie_img m-3" src={MovieImg} width="75" height="75"/></span>
          <span className="d-flex justify-content-between p-0">This small App demonstrates React, Redux-Toolkit, RTK Query and React-Router<SearchMovie/></span>
        </div>
        <Routes>
            <Route path='/' element={<Home/>} />  
            <Route path='/popular' element={<PopularMoviesList/>} />    
            <Route path='/highest-rated' element={<HighestRatedMovieList/>} />
            <Route path='/upcoming' element={<UpcomingMoviesList/>} />
            <Route path='/favorites' element={<FavoritesList/>} />
            <Route path='/movie/:movieId' element={<MovieDetail/>} />
            <Route path='/searchedMovie' element={<SearchedMovieList/>} />
            <Route path='/searchedPerson' element={<SearchedPersonList/>} />
            <Route path='/popular-tv' element={<PopularTvShowsList/>} />
            <Route path='/highest-rated-tv' element={<HighestRatedTvShowsList/>} /> 
            <Route path='/airing-today-tv' element={<AiringTodayTvShowsList/>} />
        </Routes>
    </div>
  );
}
export default App;