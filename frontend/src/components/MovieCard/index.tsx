import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie?: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="card-container">
      <div>
        <img
          className="card-img-container"
          src={movie?.imgUrl}
          alt={movie?.title}
        />
      </div>
      <div className="card-bottom-container">
        <h5>{movie?.title}</h5>
        <h6 className="text-primary">{movie?.year}</h6>
        <p>{movie?.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
