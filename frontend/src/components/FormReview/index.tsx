import { useForm } from "react-hook-form";
import { requestBackend } from 'util/requests';
import { useHistory } from "react-router";

import "./styles.css";
import { toast } from "react-toastify";

type Props = {
    value?: boolean;
    placeholder?: string;
    valueMovieId?: string;  
}
type FormState = {
    text: string;
    movieId: number;
    userId: number;
}
const FormReview = ({ value, placeholder, valueMovieId }: Props) => {

    const { register, handleSubmit, formState: {errors} } = useForm<FormState>();
    const  history = useHistory();

    const onSubmit = (data: FormState) => {
      const payload = {
          ...data,
          movieId: valueMovieId
      }
      // console.log(payload);
      
      requestBackend({ 
          url: '/reviews', 
          method: 'POST',
          withCredentials: true, 
          data: payload
        })
            .then(() => {  
                // document.location.reload();
                toast.info('Obrigado pela avaliação!');
                history.push('/movies');
            })

        }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-review-container">
                <div className="margin-botton-30">
                    <input
                        type="text"
                        id="TextReview"
                        disabled = {value}
                        className={`form-control input-review ${errors.text ? 'is-invalid' : ''} `}
                        placeholder={placeholder}
                        {...register("text", { required: "Avaliação vazia não salva!" })}
                    />
                    {errors.text && (
                        <div className="errorvalidation-review">
                            {errors.text.message}
                        </div>
                    )}
                </div>
                <button className="form-control btn-review btn-primary">SALVAR AVALIAÇÃO</button>
            </div>
        </form>
    );
};
export default FormReview;