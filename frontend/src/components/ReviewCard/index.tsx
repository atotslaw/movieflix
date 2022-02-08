import { ReactComponent as StarIcon } from 'assets/images/star-image.svg';
import { Review } from 'types/review';

import './styles.css';

type Props ={
    review: Review;
} 

const ReviewCard = ( { review } : Props) => {

    return (
        <div className="base-card review-card-container" key={review.id}>
            <div className="card-user-container">
                <div className="card-user-star">
                    <StarIcon />
                </div>
                <h6 className="review-user-name text-white">{review.user.name}</h6>
            </div>
            <div className="review-text text-white">
                <p>
                    {review.text}
                </p> 
            </div>
        </div>
    );
}

export default ReviewCard;