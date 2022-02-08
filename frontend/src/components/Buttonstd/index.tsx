import './styles.css';

type Props = {
  text: string;
}

const Buttonstd = ({ text } : Props ) => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h6>{text}</h6>
      </button>
    </div>
  );
};

export default Buttonstd;
