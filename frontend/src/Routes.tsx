import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Navbar from 'components/Navbar';
import history from 'util/history';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import MovieReviews from 'pages/MovieReviews';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies/:movieId/reviews" roles={['ROLE_MEMBER']}>
        <MovieReviews />
      </PrivateRoute>
      <PrivateRoute path="/movies">
        <Catalog />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;