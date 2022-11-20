import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { Review } from 'types/review';
import { Movie } from 'types/movie';
import CardLoader from 'pages/Catalog/CardLoader';
import FormReview from 'components/FormReview';
import ReviewCard from 'components/ReviewCard';
import MovieReviewsLoader from './MoviesReviewsLoader';
import MovieDetailscard from 'components/MovieDetailscard';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieReviews = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();
  const [review, setReview] = useState<Review[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `movies/${movieId}`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getReviews = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `movies/${movieId}/reviews`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setReview(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="movie-reviews-container">
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="movie-reviews-detailscard-container">
          <MovieDetailscard movie={movie} />
        </div>
      )}

      <div className="movie-reviews-frm">
        <FormReview
          placeholder="Deixe suas avaliações aqui"
          valueMovieId={movieId}
          onCreate={() => getReviews()}
        />
      </div>

      <div className="movie-reviews-list">
        <div className="col-sm-6 col-lg-6 col-xl-6 reviews-list">
          {isLoading ? (
            <MovieReviewsLoader />
          ) : (
            review?.map((review) => (
              <div className="col-sm-12 col-lg-12 col-xl-12" key={review?.id}>
                <ReviewCard review={review} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieReviews;
