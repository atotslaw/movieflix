import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { SpringPage } from 'types/vendor/spring';
import CardLoader from './CardLoader';
import { Movie } from 'types/movie';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';

import './styles.css';

type controlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
}

const Catalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  const [controlComponentsData, setControlComponentsData] = useState<controlComponentsData>(
    {
      activePage: 0,
      filterData: {genre: null}
    }
  );

  /* trata o evento da mudança da pagina */
  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData });
  };

  /* trata o evento da mudança do filtro */
  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({activePage: 0, filterData: data });
  };


  const getMovies = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: pageNumber,
        size: 4,
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
      <div className="row catalog-search-container">
        <MovieFilter onSubmitFilter={handleSubmitFilter}/>
      </div>

      <div className="row">
        {isLoading ? <CardLoader /> : (
          page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-3 col-xl-3 card-container" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
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