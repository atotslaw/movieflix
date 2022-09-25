import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg';
import Login from './Login';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
        <div className="home-banner-container">
            <h1 className="home-banner-text text-white">Avalie Filmes</h1>
            <p className="home-banner-p text-white">Diga o que você achou do seu filme favorito.</p>
            <AuthImage />
        </div>
        <div className="home-card">
          <div className="home-content-container">
              <Login />
          </div>
        </div>
    </div>
  );
};

export default Home;