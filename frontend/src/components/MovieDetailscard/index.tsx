import { Movie } from 'types/movie';
import './styles.css';

type Props ={
    movie?: Movie;
} 

const MovieDetailscard = ( { movie } : Props) => {

    return (
        <div className="base-card moviecard">
            <div className="moviecard-img-container">
                <img src={movie?.imgUrl} alt={movie?.title} />
            </div>
            <div className="moviecard-data-container">
                <h5>{movie?.title}</h5>
                <h6 className="text-primary">{movie?.year}</h6>
                <p>{movie?.subTitle}</p>
            </div>
            <div className="moviecard-synopsis-container">
                 <p>{movie?.synopsis}</p>
            </div>
        </div>
    );
}

export default MovieDetailscard;