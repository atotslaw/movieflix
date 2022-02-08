import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import history from 'util/history';
import { removeAuthData } from 'util/storage';
import { getTokenData, isAuthenticated } from 'util/auth';

import './styles.css';

const Navbar = () => {

  /* contexto global de autenticação (definido no App.tsx */ 
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar bg-primary navbar-light main-nav">
        <div className="container-fluid">
            <Link to="/movies" className="nav-logo-text">
                <h4>MovieFlix</h4>
            </Link>
            <div 
            // className="nav-login-logout" 
            className={`nav-login-logout${
              !authContextData.authenticated ? '-disable' : ''
            }`}
            >
              {authContextData.authenticated ? (
                  <>
                  <a className="nav-login-logout-text" href="#logout" onClick={handleLogoutClick}>
                      SAIR
                  </a>
                  </>
                  ) : ( <p></p>
              )}
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
