import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { SpringPage } from 'types/vendor/spring';
import CardLoader from './CardLoader';
import { Movie } from 'types/movie';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';

import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: pageNumber,
        size: 2,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getMovies(0);
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de filmes</h1>
      </div>

      <div className="row">
        {isLoading ? <CardLoader /> : (
          page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-6 col-xl-6" key={movie.id}>
            <Link to={`/movies/${movie.id}/reviews`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        )))}
      </div>

      <div className="row">
          <Pagination 
            pageCount={(page) ? page.totalPages : 0}
            range={3}
            onChange={getMovies} 
          />
      </div>
    </div>
  );
};

export default Catalog;