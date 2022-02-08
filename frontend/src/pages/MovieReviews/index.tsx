import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import FormReview from 'components/FormReview';
import ReviewCard from 'components/ReviewCard';
import MovieDetailsLoader from 'pages/MovieDetails/MovieDetailsLoader';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieReviews = () => {
  
  const { movieId } = useParams<UrlParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<Review[]>();

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
}

useEffect(() => {
  getReviews();
}, []);

  return (
    <div className="movie-reviews-container">
        <div className="movie-reviews-title text-white">
            Tela detalhes do filme id: {movieId} 
        </div>

        <div className="movie-reviews-frm">
          <FormReview placeholder="Deixe sua avaliação aqui" 
                      valueMovieId={movieId}/>
        </div>

        <div className="movie-reviews-list">
            <div className="row">
                <div className="col-sm-6 col-lg-6 col-xl-6 reviews-list">
                    {isLoading ? <MovieDetailsLoader /> : (
                    review?.map((review) => (
                    <div className="col-sm-12 col-lg-12 col-xl-12" key={review?.id}>
                        <ReviewCard review={review} />
                    </div>
                    )))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default MovieReviews;
