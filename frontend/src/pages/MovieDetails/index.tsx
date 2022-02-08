import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'util/requests';
import MovieDetailsLoader from './MovieDetailsLoader';
import MovieInfoLoader from './MovieInfoLoader';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  
  const { movieId } = useParams<UrlParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <Link to="/movies">
          <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            {isLoading ? (
              <MovieInfoLoader />
            ) : (
              <>
                <div className="img-container">
                  <img src={movie?.imgUrl} alt={movie?.title} />
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <MovieDetailsLoader />
            ) : (
              <div className="description-container">
                <h2>Subtítulo do filme</h2>
                <p>{movie?.subtitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
