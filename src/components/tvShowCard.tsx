import { Link } from 'react-router-dom';
import { useFetchFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from '../store';
import { TvShow } from '../types/tv';
import React from 'react';

function TvShowCard({ tvshow }: { tvshow: TvShow }) {
    const posterBasePath = 'https://image.tmdb.org/t/p/w185';

    // For simplicity, using a hardcoded user ID. In a real app, this would come from authentication
    const user = { id: 1 };
    const { data: favorites } = useFetchFavoritesQuery(user);
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    const isFavorite = favorites?.some(fav => fav.tvShowId === tvshow.id);

    const handleFavoriteClick = async () => {
        if (isFavorite && favorites) {
            // Find the favorite entry and remove it
            const favoriteEntry = favorites.find(fav => fav.tvShowId === tvshow.id);
            if (favoriteEntry) {
                await removeFavorite(favoriteEntry);
            }
        } else {
            // Add to favorites
            await addFavorite({ id: user.id, favoriteTvShowId: tvshow.id, mediaType: 'tv' });
        }
    };

    return (
        <div className="col-lg-2 mb-4">
            <div className="card">
                <img src= {posterBasePath + tvshow.poster_path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title "><span>{tvshow.name.substring(0,200)}</span></h5>
                    <span
                        className={isFavorite ? "fas fa-star text-warning" : "far fa-star"}
                        aria-hidden="true"
                        style={{cursor: 'pointer'}}
                        onClick={handleFavoriteClick}
                    ></span>
                    <span className="ml-1">{tvshow.vote_average}</span>
                    <p className="card-text">{tvshow.overview.substring(0,125).concat('....')}</p>
                    <div className="d-flex justify-content-between p-0">
                        <span className="far fa-calendar" aria-hidden="true"> {tvshow.first_air_date}</span>
                        <Link to={`/tv/${tvshow.id}`} className="far fa-play-circle" style={{cursor: 'pointer'}}></Link>
                    </div>
                </div>
            </div>
        </div>
      );
}


      
export default TvShowCard;

    
