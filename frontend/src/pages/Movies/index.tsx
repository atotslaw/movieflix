import MovieCard from 'components/MovieCard';
import { Link } from 'react-router-dom';
/*
import { useEffect, useState } from 'react';
import MovieCard from 'components/MovieCard';
import { Movie } from '../../types/movie';
import { SpringPage } from 'types/vendor/spring';
*/
import './styles.css';
//import { AxiosRequestConfig } from 'axios';
//import { requestBackend } from 'util/requests';

const Movies = () => {
/*
  useEffect(() => {
    const params : AxiosRequestConfig ={

      url: '/movies',
      withCredentials: true,
      params : {
        page: 0,
        size: 12,
      }, 
    };
    
    requestBackend(params).then((response) => {
      setPage(response.data);
      
    });
 })
*/

  return (
    <div className="movies-container text-white">
      <div className="row">
        <h1 className="screen-title">Tela listagem de filmes</h1>
      </div>
      <div className="row item-movie-container" >
          <Link to="/movies/1">
            Acessar movies/1 
          </Link>
          <Link to="/movies/2">
            Acessar /movies/2
          </Link>
      </div>
    </div>
  );
};

export default Movies;
