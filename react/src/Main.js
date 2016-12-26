import {react} from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Authentication from 'utilities/Authentication';
import App from './App';
import UserMenu from 'components/menus/UserMenu';
import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import LoginPage from 'components/pages/LoginPage';
import RecipeListPage from 'components/pages/RecipeListPage';

ReactDOM.render(<UserMenu />, document.getElementById('userInfo'));

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="about" component={AboutPage} />
            <Route path="login" component={LoginPage} />
            <Route path="recipes" component={RecipeListPage} onEnter={Authentication.authenticateRoute} />
        </Route>
    </Router>, 
document.getElementById('content'));